import React, { useMemo, useState } from "react";

import { formatDistanceToNowStrict, parseISO } from "date-fns";

import { PROJECT_STATES, type ProjectState } from "data/projects";
import { cn } from "lib/cn";
import type { EnrichedProject } from "lib/projects";

import ProjectsFilterMenu from "components/ProjectsFilterMenu";

type SortKey =
  | "name"
  | "tagline"
  | "stars"
  | "started"
  | "lastUpdate"
  | "state";
type SortDir = "asc" | "desc";

const STATE_ORDER: Record<ProjectState, number> = {
  building: 0,
  live: 1,
  idle: 2,
  sold: 3,
  explored: 4,
  killed: 5,
};

const STATE_LABEL: Record<ProjectState, string> = {
  building: "building",
  live: "live",
  idle: "idle",
  sold: "sold",
  explored: "explored",
  killed: "killed",
};

const STATE_CLASS: Record<ProjectState, string> = {
  building: "bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200",
  live: "bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200",
  idle: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  sold: "bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200",
  explored:
    "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-200",
  killed: "bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-200",
};

function compareNullable<T>(
  a: T | null,
  b: T | null,
  cmp: (x: T, y: T) => number,
  dir: SortDir,
): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return dir === "asc" ? cmp(a, b) : cmp(b, a);
}

function sortProjects(
  list: EnrichedProject[],
  key: SortKey,
  dir: SortDir,
): EnrichedProject[] {
  const copy = [...list];
  copy.sort((a, b) => {
    switch (key) {
      case "name":
        return dir === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case "tagline":
        return dir === "asc"
          ? a.tagline.localeCompare(b.tagline)
          : b.tagline.localeCompare(a.tagline);
      case "stars":
        return compareNullable(a.stars, b.stars, (x, y) => x - y, dir);
      case "started":
        return compareNullable(
          a.started,
          b.started,
          (x, y) => x.localeCompare(y),
          dir,
        );
      case "lastUpdate":
        return compareNullable(
          a.lastUpdate,
          b.lastUpdate,
          (x, y) => new Date(x).getTime() - new Date(y).getTime(),
          dir,
        );
      case "state":
        return dir === "asc"
          ? STATE_ORDER[a.state] - STATE_ORDER[b.state]
          : STATE_ORDER[b.state] - STATE_ORDER[a.state];
      default:
        return 0;
    }
  });
  return copy;
}

function formatRelative(iso: string | null): string {
  if (!iso) return "—";
  try {
    return `${formatDistanceToNowStrict(parseISO(iso))} ago`;
  } catch {
    return "—";
  }
}

function formatStars(stars: number | null): string {
  if (stars == null) return "—";
  return stars.toString();
}

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

function formatLaunched(started: string | null): string {
  if (!started) return "";
  const [yearStr, monthStr] = started.split("-");
  const year = Number(yearStr);
  const monthIdx = Number(monthStr) - 1;
  if (!year || monthIdx < 0 || monthIdx > 11) return "";
  return `${MONTH_NAMES[monthIdx]} ${year}`;
}

function SortIndicator({
  active,
  dir,
}: {
  active: boolean;
  dir: SortDir;
}): JSX.Element {
  if (!active) return <span className="opacity-30 ml-1">↕</span>;
  return <span className="ml-1">{dir === "asc" ? "↑" : "↓"}</span>;
}

interface HeaderProps {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey;
  currentDir: SortDir;
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}

const Header: React.FC<HeaderProps> = ({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
  align = "left",
}) => {
  const active = currentKey === sortKey;
  return (
    <th
      scope="col"
      className={cn(
        "py-2 px-3 font-medium text-sm whitespace-nowrap",
        align === "right" ? "text-right" : "text-left",
      )}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="inline-flex items-center gap-1 hover:opacity-70"
      >
        {label}
        <SortIndicator active={active} dir={currentDir} />
      </button>
    </th>
  );
};

interface Props {
  projects: EnrichedProject[];
}

const ProjectsTable: React.FC<Props> = ({ projects }) => {
  const [sortKey, setSortKey] = useState<SortKey>("lastUpdate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [visibleStates, setVisibleStates] = useState<Set<ProjectState>>(
    () => new Set(PROJECT_STATES),
  );

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "name" || key === "tagline" ? "asc" : "desc");
    }
  };

  const toggleState = (state: ProjectState) => {
    setVisibleStates((prev) => {
      const next = new Set(prev);
      if (next.has(state)) next.delete(state);
      else next.add(state);
      return next;
    });
  };

  const rows = useMemo(() => {
    const filtered = projects.filter((p) => visibleStates.has(p.state));
    return sortProjects(filtered, sortKey, sortDir);
  }, [projects, visibleStates, sortKey, sortDir]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-end">
        <ProjectsFilterMenu
          visibleStates={visibleStates}
          onToggle={toggleState}
        />
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0 u_scroll-shadows">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <Header
                label="Name"
                sortKey="name"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
              />
              <Header
                label="Tagline"
                sortKey="tagline"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
              />
              <Header
                label="★"
                sortKey="stars"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                align="right"
              />
              <Header
                label="Launched"
                sortKey="started"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                align="right"
              />
              <Header
                label="Updated"
                sortKey="lastUpdate"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                align="right"
              />
              <Header
                label="State"
                sortKey="state"
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                align="right"
              />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center opacity-60 italic">
                  No projects match the current filter.
                </td>
              </tr>
            )}
            {rows.map((p) => {
              const linkHref =
                p.url ??
                (p.repo
                  ? `https://github.com/fredrivett/${p.repo}`
                  : undefined);
              return (
                <tr
                  key={p.name}
                  className="border-b border-gray-100 dark:border-gray-900"
                >
                  <td className="py-2 px-3 font-medium whitespace-nowrap">
                    {linkHref ? (
                      <a
                        href={linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-70"
                      >
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </td>
                  <td className="py-2 px-3 opacity-80">{p.tagline}</td>
                  <td className="py-2 px-3 text-right tabular-nums">
                    {formatStars(p.stars)}
                  </td>
                  <td className="py-2 px-3 text-right whitespace-nowrap tabular-nums opacity-80">
                    {formatLaunched(p.started)}
                  </td>
                  <td className="py-2 px-3 text-right whitespace-nowrap tabular-nums opacity-80">
                    {formatRelative(p.lastUpdate)}
                  </td>
                  <td className="py-2 px-3 text-right whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-block px-2 py-0.5 rounded text-xs font-medium",
                        STATE_CLASS[p.state],
                      )}
                    >
                      {STATE_LABEL[p.state]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
