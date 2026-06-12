import React, { useMemo } from "react";

import { cn } from "lib/cn";
import {
  STATE_CLASS,
  STATE_LABEL,
  formatLaunched,
  formatRelative,
} from "lib/projectDisplay";
import type { EnrichedProject } from "lib/projects";

interface Props {
  projects: EnrichedProject[];
}

// Most recently worked on first, falling back to the launch date when a
// project has no commit activity (e.g. no repo).
function activityTime(p: EnrichedProject): number {
  if (p.lastUpdate) return new Date(p.lastUpdate).getTime();
  if (p.started) return new Date(`${p.started}-01`).getTime();
  return 0;
}

function sortForList(list: EnrichedProject[]): EnrichedProject[] {
  return [...list].sort((a, b) => activityTime(b) - activityTime(a));
}

const ProjectsList: React.FC<Props> = ({ projects }) => {
  const rows = useMemo(() => sortForList(projects), [projects]);

  if (rows.length === 0) {
    return (
      <p className="py-6 text-center opacity-60 italic">
        No projects match the current filter.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {rows.map((p) => {
        const linkHref =
          p.url ??
          (p.repo ? `https://github.com/fredrivett/${p.repo}` : undefined);

        const launched = formatLaunched(p.started);
        const hasStars = p.stars != null && p.stars > 0;
        const hasVotes = p.phVotes != null && p.phVotes > 0;
        const meta = [
          launched ? `launched ${launched}` : null,
          p.lastUpdate ? `updated ${formatRelative(p.lastUpdate)}` : null,
        ].filter(Boolean);

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
            {(hasStars || hasVotes || meta.length > 0) && (
              <span className="text-xs opacity-50 mt-0.5 tabular-nums">
                {hasStars && (
                  <>
                    <span className="text-base leading-none">★</span> {p.stars}
                    {(hasVotes || meta.length > 0) && " · "}
                  </>
                )}
                {hasVotes && (
                  <>
                    <span
                      className="text-base leading-none"
                      title="Product Hunt upvotes"
                    >
                      ▲
                    </span>{" "}
                    {p.phVotes}
                    {meta.length > 0 && " · "}
                  </>
                )}
                {meta.join(" · ")}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectsList;
