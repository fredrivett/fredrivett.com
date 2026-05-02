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

export const WORDS_TIMEZONE = "Europe/London";

function getZonedParts(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts: Record<string, string> = fmt
    .formatToParts(date)
    .filter((p) => p.type !== "literal")
    .reduce((acc, p) => ({ ...acc, [p.type]: p.value }), {});
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: String(Number(parts.hour) % 24).padStart(2, "0"),
    minute: parts.minute,
  };
}

export function buildWordSlug(date: Date): string {
  const p = getZonedParts(date, WORDS_TIMEZONE);
  return `${p.year}-${p.month}-${p.day}-${p.hour}${p.minute}`;
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
