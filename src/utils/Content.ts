import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export type PostItems = {
  [key: string]: string;
};

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

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.(md|mdx)$/, "");

  // Try .mdx first, then .md
  let fullPath = join(postsDirectory, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = join(postsDirectory, `${realSlug}.md`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items: PostItems = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
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
