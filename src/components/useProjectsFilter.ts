import { useMemo, useState } from "react";

import { PROJECT_STATES, type ProjectState } from "data/projects";
import type { EnrichedProject } from "lib/projects";

// Shared state-filter for the projects list. Lets each page place the
// <ProjectsFilterMenu> in its heading row while keeping the list itself a
// pure presentational component fed the already-filtered projects.
export function useProjectsFilter(projects: EnrichedProject[]) {
  const [visibleStates, setVisibleStates] = useState<Set<ProjectState>>(
    () => new Set(PROJECT_STATES),
  );

  const toggleState = (state: ProjectState) => {
    setVisibleStates((prev) => {
      const next = new Set(prev);
      if (next.has(state)) next.delete(state);
      else next.add(state);
      return next;
    });
  };

  const filtered = useMemo(
    () => projects.filter((p) => visibleStates.has(p.state)),
    [projects, visibleStates],
  );

  return { visibleStates, toggleState, filtered };
}
