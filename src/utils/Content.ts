import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export type HeadingItem = {
  level: number;
  text: string;
  id: string;
};

export type PostItems = {
  [key: string]: string;
};

export type PostItemsWithHeadings = {
  [key: string]: string | boolean | HeadingItem[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  const idCounts: Map<string, number> = new Map();

  let match = headingRegex.exec(content);
  while (match !== null) {
    const level = match[1].length;
    // Remove markdown formatting like \. and ** from heading text
    const text = match[2]
      .replace(/\\./g, (m) => m[1]) // unescape characters like \.
      .replace(/\*\*(.+?)\*\*/g, "$1") // remove bold
      .replace(/_(.+?)_/g, "$1") // remove italic
      .replace(/`(.+?)`/g, "$1") // remove code
      .trim();

    const baseId = slugify(text);
    const count = idCounts.get(baseId) ?? 0;
    idCounts.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count}`;

    headings.push({ level, text, id });
    match = headingRegex.exec(content);
  }

  return headings;
}

export function getPostSlug({
  year,
  month,
  day,
  titleSlug,
}: {
  year: string;
  month: string;
  day: string;
  titleSlug: string;
}) {
  return [year, month, day, titleSlug].join("-");
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(
  slug: string,
  fields: string[] = [],
): PostItemsWithHeadings {
  const realSlug = slug.replace(/\.(md|mdx)$/, "");

  // Try .mdx first, then .md
  let fullPath = join(postsDirectory, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = join(postsDirectory, `${realSlug}.md`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items: PostItemsWithHeadings = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "headings") {
      items[field] = extractHeadings(content);
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  // Use UTC so the slug/date parts stay stable regardless of server/local timezone
  const postDate = new Date(data.date);
  items.year = postDate.getUTCFullYear().toString();
  items.month = String(postDate.getUTCMonth() + 1).padStart(2, "0");
  items.day = String(postDate.getUTCDate()).padStart(2, "0");
  // get slug string after date part
  items.titleSlug = realSlug.split("-").slice(3).join("-");

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
