import React from "react";

import { HN_ITEM_URL } from "lib/hackernews";

export type HnBadgeProps = {
  storyId: number;
  points: number;
  variant?: "inline" | "pill";
  className?: string;
};

const VARIANT_CLASSES: Record<NonNullable<HnBadgeProps["variant"]>, string> = {
  inline:
    "text-gray-400 hover:text-[#ff6600] dark:text-gray-500 dark:hover:text-[#ff6600]",
  pill: "px-2 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-[#ff6600] hover:text-white dark:bg-white/10 dark:text-gray-400 dark:hover:bg-[#ff6600] dark:hover:text-white transition-colors",
};

const HnBadge = ({
  storyId,
  points,
  variant = "inline",
  className = "",
}: HnBadgeProps) => (
  <a
    href={`${HN_ITEM_URL}${storyId}`}
    rel="nofollow noreferrer"
    target="_blank"
    title={`${points} points on Hacker News`}
    aria-label={`${points} points on Hacker News (opens in new tab)`}
    className={`no-underline inline-flex items-center gap-0.5 align-middle text-sm font-mono ${VARIANT_CLASSES[variant]} ${className}`}
  >
    <span aria-hidden="true">▲</span>
    {points}
  </a>
);

export { HnBadge };
