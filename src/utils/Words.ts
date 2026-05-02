import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

import {
  WORDS_GOAL,
  WordEntry,
  WordEntryMeta,
  WordsStats,
} from "./words-shared";

const wordsDirectory = join(process.cwd(), "_words");

function ensureDir() {
  if (!fs.existsSync(wordsDirectory)) {
    fs.mkdirSync(wordsDirectory, { recursive: true });
  }
}

function readEntry(filename: string): WordEntry {
  const slug = filename.replace(/\.(md|mdx)$/, "");
  const fullPath = join(wordsDirectory, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    date: String(data.date ?? ""),
    time: String(data.time ?? ""),
    wordCount: Number(data.wordCount ?? 0),
    visibility: data.visibility === "private" ? "private" : "public",
    title: data.title ? String(data.title) : null,
    content,
  };
}

export function getAllWords(): WordEntry[] {
  ensureDir();
  const files = fs
    .readdirSync(wordsDirectory)
    .filter((f) => /\.(md|mdx)$/.test(f));

  return files.map(readEntry).sort((a, b) => (a.slug > b.slug ? -1 : 1));
}

export function getAllWordsMeta(): WordEntryMeta[] {
  return getAllWords().map(({ content: _content, ...rest }) => rest);
}

export function getWordBySlug(slug: string): WordEntry | null {
  ensureDir();
  const real = slug.replace(/\.(md|mdx)$/, "");
  const candidates = [`${real}.mdx`, `${real}.md`];
  const filename = candidates.find((f) =>
    fs.existsSync(join(wordsDirectory, f)),
  );
  if (!filename) return null;
  return readEntry(filename);
}

export function getWordsStats(entries?: WordEntryMeta[]): WordsStats {
  const items = entries ?? getAllWordsMeta();
  const totalWords = items.reduce((sum, e) => sum + e.wordCount, 0);
  const totalEntries = items.length;
  const days = new Set(items.map((e) => e.date));
  const daysHitGoal = items.filter((e) => e.wordCount >= WORDS_GOAL).length;
  const averageWords =
    totalEntries === 0 ? 0 : Math.round(totalWords / totalEntries);

  return {
    totalWords,
    totalEntries,
    daysWritten: days.size,
    averageWords,
    daysHitGoal,
  };
}

export type {
  WordEntry,
  WordEntryMeta,
  WordsStats,
  WordVisibility,
} from "./words-shared";
export {
  WORDS_GOAL,
  countWords,
  buildWordSlug,
  buildFrontmatter,
} from "./words-shared";
