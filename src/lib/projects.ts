import { type Project, validatedProjects } from "data/projects";
import { fetchRepoMeta } from "lib/github";

export type EnrichedProject = Omit<Project, "started"> & {
  stars: number | null;
  lastUpdate: string | null;
  started: string | null;
};

export async function enrichProjects(): Promise<EnrichedProject[]> {
  return Promise.all(
    validatedProjects.map(async (project) => {
      if (!project.repo) {
        return {
          ...project,
          stars: null,
          lastUpdate: null,
          started: project.started ?? null,
        };
      }
      const meta = await fetchRepoMeta(project.repo);
      return {
        ...project,
        stars: meta.stars,
        lastUpdate: meta.lastCommit,
        started: project.started ?? null,
      };
    }),
  );
}
