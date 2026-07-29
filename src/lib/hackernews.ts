import { AppConfig } from "utils/AppConfig";

const HN_SEARCH_API = "https://hn.algolia.com/api/v1/search";

export const HN_ITEM_URL = "https://news.ycombinator.com/item?id=";

// Only surface a badge once a post has cleared a meaningful bar, so lone
// self-submissions don't show a lonely "1 point".
export const HN_MIN_POINTS = 5;

export type HnStory = {
  storyId: number;
  points: number;
  numComments: number;
};

type AlgoliaHit = {
  objectID: string;
  url: string | null;
  points: number | null;
  num_comments: number | null;
};

type AlgoliaResponse = {
  hits?: AlgoliaHit[];
};

// The bare site host without a leading "www." (e.g. "fredrivett.com").
function siteHost(): string {
  return new URL(AppConfig.url).hostname.replace(/^www\./, "");
}

// Normalise any submitted URL (or internal post path) down to a bare path key
// like "/2025/09/10/slug" so http/https, www. and trailing slashes all compare
// equal. Non-URL input is treated as an already-bare path.
export function hnPathKey(urlOrPath: string): string {
  let path = urlOrPath;
  try {
    path = new URL(urlOrPath).pathname;
  } catch {
    // Not an absolute URL — assume it's already a path.
  }
  return path.replace(/\/+$/, "").toLowerCase() || "/";
}

// Fetch every Hacker News submission that points at this site, keyed by the
// normalised post path. One request covers the whole domain, so this stays a
// single API call regardless of how many posts we have. Runs at build /
// ISR-revalidate time — never on a visitor request. Fails soft to an empty map.
export async function fetchHnSubmissions(): Promise<Map<string, HnStory>> {
  const byPath = new Map<string, HnStory>();
  const host = siteHost();

  try {
    const params = new URLSearchParams({
      query: host,
      restrictSearchableAttributes: "url",
      tags: "story",
      hitsPerPage: "1000",
    });
    const res = await fetch(`${HN_SEARCH_API}?${params.toString()}`);
    if (!res.ok) return byPath;

    const data = (await res.json()) as AlgoliaResponse;
    if (!Array.isArray(data.hits)) return byPath;

    data.hits.forEach((hit) => {
      if (!hit.url) return;

      // Algolia does a fuzzy text match, so keep only real hits on our host.
      let hostname: string;
      try {
        hostname = new URL(hit.url).hostname.replace(/^www\./, "");
      } catch {
        return;
      }
      if (hostname !== host) return;

      const story: HnStory = {
        storyId: Number(hit.objectID),
        points: hit.points ?? 0,
        numComments: hit.num_comments ?? 0,
      };
      if (!Number.isFinite(story.storyId)) return;

      // A URL can be submitted more than once — keep the top submission.
      const key = hnPathKey(hit.url);
      const existing = byPath.get(key);
      if (!existing || story.points > existing.points) byPath.set(key, story);
    });
  } catch {
    return byPath;
  }

  return byPath;
}
