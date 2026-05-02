import React from "react";

import { cn } from "lib/cn";
import type { CommitsHeatmap as HeatmapData, HeatmapCell } from "lib/projects";

const MONTHS_SHORT = [
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

const BUCKET_CLASS = [
  "bg-gray-200 dark:bg-gray-800",
  "bg-green-200 dark:bg-green-900",
  "bg-green-400 dark:bg-green-700",
  "bg-green-600 dark:bg-green-500",
  "bg-green-800 dark:bg-green-300",
];

function bucket(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function formatTooltip(cell: HeatmapCell): string {
  if (cell.isFuture) return "";
  const noun = cell.count === 1 ? "commit" : "commits";
  return `${cell.count} ${noun} on ${cell.date}`;
}

interface Props {
  data: HeatmapData;
}

const CommitsHeatmap: React.FC<Props> = ({ data }) => {
  const { cells, total, weeks, rows } = data;

  const monthLabels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  for (let col = 0; col < weeks; col++) {
    const sundayCell = cells[col * rows];
    if (sundayCell) {
      const month = new Date(`${sundayCell.date}T00:00:00Z`).getUTCMonth();
      if (month !== lastMonth) {
        const prev = monthLabels[monthLabels.length - 1];
        if (!prev || col - prev.col >= 3) {
          monthLabels.push({ col, label: MONTHS_SHORT[month] });
        }
        lastMonth = month;
      }
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-sm opacity-70">
          {total.toLocaleString()} commit{total === 1 ? "" : "s"} to these repos
          in the last year
        </h2>
        <div className="hidden sm:flex items-center gap-1 text-xs opacity-60">
          <span>Less</span>
          {BUCKET_CLASS.map((cls, i) => (
            <span
              key={i}
              className={cn("h-[11px] w-[11px] rounded-[2px]", cls)}
            />
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="w-full">
        <div
          className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[2px] mb-1"
          aria-hidden="true"
        >
          {Array.from({ length: weeks }, (_, col) => {
            const label = monthLabels.find((m) => m.col === col)?.label;
            return (
              <span
                key={col}
                className="text-[10px] leading-none opacity-60 h-3 col-span-1 whitespace-nowrap"
              >
                {label ?? ""}
              </span>
            );
          })}
        </div>
        <div
          className="grid grid-cols-[repeat(53,minmax(0,1fr))] grid-flow-col gap-[2px]"
          style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}
          role="img"
          aria-label={`${total} commits to listed repos in the last year`}
        >
          {cells.map((cell) => (
            <div
              key={cell.date}
              title={formatTooltip(cell)}
              className={cn(
                "aspect-square w-full rounded-[2px]",
                cell.isFuture
                  ? "bg-transparent"
                  : BUCKET_CLASS[bucket(cell.count)],
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitsHeatmap;
