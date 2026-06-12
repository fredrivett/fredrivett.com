import {
  differenceInCalendarDays,
  formatDistanceToNowStrict,
  parseISO,
} from "date-fns";

import type { ProjectState } from "data/projects";

export const STATE_LABEL: Record<ProjectState, string> = {
  building: "building",
  live: "live",
  idle: "idle",
  sold: "sold",
  explored: "explored",
  killed: "killed",
};

export const STATE_CLASS: Record<ProjectState, string> = {
  building: "bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200",
  live: "bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200",
  idle: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  sold: "bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200",
  explored:
    "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-200",
  killed: "bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-200",
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatRelative(iso: string | null): string {
  if (!iso) return "—";
  try {
    const date = parseISO(iso);
    const days = differenceInCalendarDays(new Date(), date);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days} days ago`;
    return `${formatDistanceToNowStrict(date)} ago`;
  } catch {
    return "—";
  }
}

export function formatLaunched(started: string | null): string {
  if (!started) return "";
  const [yearStr, monthStr] = started.split("-");
  const year = Number(yearStr);
  const monthIdx = Number(monthStr) - 1;
  if (!year || monthIdx < 0 || monthIdx > 11) return "";
  return `${MONTH_NAMES[monthIdx]} ${year}`;
}
