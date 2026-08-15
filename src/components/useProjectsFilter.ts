import { useMemo, useState } from "react";

import { isArchivedState } from "data/projects";
import type { EnrichedProject } from "lib/projects";

// Shared archived-filter for the projects list. Lets each page place the
// <ArchivedToggle> in its heading row while keeping the list itself a pure
// presentational component fed the already-filtered projects. Archived
// projects (sold / explored / killed) are hidden by default.
export function useProjectsFilter(projects: EnrichedProject[]) {
  const [showArchived, setShowArchived] = useState(false);

  const archivedCount = useMemo(
    () => projects.filter((p) => isArchivedState(p.state)).length,
    [projects],
  );

  const filtered = useMemo(
    () =>
      showArchived
        ? projects
        : projects.filter((p) => !isArchivedState(p.state)),
    [projects, showArchived],
  );

  return { showArchived, setShowArchived, archivedCount, filtered };
}
