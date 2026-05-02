export type WordVisibility = "public" | "private";

export const WORDS_GOAL = 100;

export type WordEntryMeta = {
  slug: string;
  date: string;
  time: string;
  wordCount: number;
  visibility: WordVisibility;
  title: string | null;
};

export type WordEntry = WordEntryMeta & {
  content: string;
};

export type WordsStats = {
  totalWords: number;
  totalEntries: number;
  daysWritten: number;
  averageWords: number;
  daysHitGoal: number;
};

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function buildWordSlug(date: Date): string {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mi = String(date.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}-${hh}${mi}`;
}

export function buildFrontmatter(entry: {
  date: string;
  time: string;
  wordCount: number;
  visibility: WordVisibility;
  title: string | null;
}): string {
  const lines = [
    "---",
    `date: "${entry.date}"`,
    `time: "${entry.time}"`,
    `wordCount: ${entry.wordCount}`,
    `visibility: ${entry.visibility}`,
  ];
  if (entry.title) {
    const escaped = entry.title.replace(/"/g, '\\"');
    lines.push(`title: "${escaped}"`);
  }
  lines.push("---", "");
  return lines.join("\n");
}
