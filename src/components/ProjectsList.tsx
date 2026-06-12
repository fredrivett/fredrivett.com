import React, { useMemo } from "react";

import { cn } from "lib/cn";
import {
  STATE_CLASS,
  STATE_LABEL,
  STATE_ORDER,
  formatRelative,
} from "lib/projectDisplay";
import type { EnrichedProject } from "lib/projects";

interface Props {
  projects: EnrichedProject[];
}

function sortForList(list: EnrichedProject[]): EnrichedProject[] {
  return [...list].sort((a, b) => {
    // Active states (building, live) bubble to the top.
    if (STATE_ORDER[a.state] !== STATE_ORDER[b.state]) {
      return STATE_ORDER[a.state] - STATE_ORDER[b.state];
    }
    // Then most recently worked on first.
    const aTime = a.lastUpdate ? new Date(a.lastUpdate).getTime() : 0;
    const bTime = b.lastUpdate ? new Date(b.lastUpdate).getTime() : 0;
    if (aTime !== bTime) return bTime - aTime;
    return (b.started ?? "").localeCompare(a.started ?? "");
  });
}

const ProjectsList: React.FC<Props> = ({ projects }) => {
  const rows = useMemo(() => sortForList(projects), [projects]);

  return (
    <ul className="space-y-4">
      {rows.map((p) => {
        const linkHref =
          p.url ??
          (p.repo ? `https://github.com/fredrivett/${p.repo}` : undefined);
        const updated = formatRelative(p.lastUpdate);

        return (
          <li key={p.name} className="flex flex-col">
            <div className="flex items-baseline justify-between gap-2">
              <span className="fs-4 font-medium">
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
              </span>
              <span
                className={cn(
                  "flex-shrink-0 inline-block px-2 py-0.5 rounded text-xs font-medium",
                  STATE_CLASS[p.state],
                )}
              >
                {STATE_LABEL[p.state]}
              </span>
            </div>
            <span className="text-sm opacity-70">{p.tagline}</span>
            {p.lastUpdate && (
              <span className="text-xs opacity-50 mt-0.5">
                updated {updated}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectsList;
