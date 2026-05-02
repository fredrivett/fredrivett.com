const GITHUB_OWNER = "fredrivett";
const GITHUB_API = "https://api.github.com";

export type RepoMeta = {
  stars: number | null;
  lastCommit: string | null;
  createdAt: string | null;
};

type RepoApiResponse = {
  stargazers_count: number;
  default_branch: string;
  created_at: string;
  private: boolean;
};

type CommitApiResponse = {
  commit: {
    author: { date: string } | null;
    committer: { date: string } | null;
  };
};

type CommitsListItem = {
  commit: {
    author: { date: string } | null;
    committer: { date: string } | null;
  };
};

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_PAT;
  const base: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

export async function fetchRepoMeta(repo: string): Promise<RepoMeta> {
  const empty: RepoMeta = { stars: null, lastCommit: null, createdAt: null };
  try {
    const repoRes = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${repo}`, {
      headers: authHeaders(),
    });
    if (!repoRes.ok) return empty;
    const repoData = (await repoRes.json()) as RepoApiResponse;

    const commitRes = await fetch(
      `${GITHUB_API}/repos/${GITHUB_OWNER}/${repo}/commits/${repoData.default_branch}`,
      { headers: authHeaders() },
    );
    const commitData = commitRes.ok
      ? ((await commitRes.json()) as CommitApiResponse)
      : null;

    const commitDate =
      commitData?.commit.committer?.date ??
      commitData?.commit.author?.date ??
      null;

    return {
      stars: repoData.private ? null : repoData.stargazers_count,
      lastCommit: commitDate,
      createdAt: repoData.created_at,
    };
  } catch {
    return empty;
  }
}

const COMMITS_PAGE_SIZE = 100;
const COMMITS_MAX_PAGES = 10;

function parseNextLink(linkHeader: string | null): boolean {
  if (!linkHeader) return false;
  return /<[^>]+>;\s*rel="next"/.test(linkHeader);
}

export async function fetchCommitDates(
  repo: string,
  sinceIso: string,
): Promise<string[] | null> {
  const dates: string[] = [];
  for (let page = 1; page <= COMMITS_MAX_PAGES; page++) {
    const url = `${GITHUB_API}/repos/${GITHUB_OWNER}/${repo}/commits?since=${encodeURIComponent(
      sinceIso,
    )}&per_page=${COMMITS_PAGE_SIZE}&page=${page}`;
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(url, { headers: authHeaders() });
      if (!res.ok) return page === 1 ? null : dates;
      // eslint-disable-next-line no-await-in-loop
      const data = (await res.json()) as CommitsListItem[];
      if (!Array.isArray(data)) return null;
      data.forEach((item) => {
        const date =
          item.commit.committer?.date ?? item.commit.author?.date ?? null;
        if (date) dates.push(date);
      });
      if (data.length < COMMITS_PAGE_SIZE) return dates;
      if (!parseNextLink(res.headers.get("link"))) return dates;
    } catch {
      return page === 1 ? null : dates;
    }
  }
  return dates;
}
