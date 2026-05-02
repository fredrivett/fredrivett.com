import { type Project, validatedProjects } from "data/projects";
import { fetchCommitDates, fetchRepoMeta } from "lib/github";

export type EnrichedProject = Omit<Project, "started"> & {
  stars: number | null;
  lastUpdate: string | null;
  started: string | null;
};

export type HeatmapCell = {
  date: string;
  count: number;
  isFuture: boolean;
};

export type CommitsHeatmap = {
  cells: HeatmapCell[];
  total: number;
  weeks: number;
  rows: number;
};

const HEATMAP_WEEKS = 53;
const HEATMAP_ROWS = 7;
const DAY_MS = 86_400_000;

function utcDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function fetchCommitsHeatmap(): Promise<CommitsHeatmap> {
  const repos = validatedProjects
    .map((p) => p.repo)
    .filter((r): r is string => Boolean(r));

  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const todayDow = todayUTC.getUTCDay();
  const endOfWeek = new Date(todayUTC.getTime() + (6 - todayDow) * DAY_MS);
  const totalCells = HEATMAP_WEEKS * HEATMAP_ROWS;
  const start = new Date(endOfWeek.getTime() - (totalCells - 1) * DAY_MS);
  const sinceIso = start.toISOString();

  const counts = new Map<string, number>();
  await Promise.all(
    repos.map(async (repo) => {
      const dates = await fetchCommitDates(repo, sinceIso);
      if (!dates) return;
      dates.forEach((iso) => {
        const key = utcDateKey(new Date(iso));
        counts.set(key, (counts.get(key) ?? 0) + 1);
      });
    }),
  );

  const cells: HeatmapCell[] = [];
  let total = 0;
  for (let i = 0; i < totalCells; i++) {
    const day = new Date(start.getTime() + i * DAY_MS);
    const key = utcDateKey(day);
    const isFuture = day.getTime() > todayUTC.getTime();
    const count = isFuture ? 0 : counts.get(key) ?? 0;
    if (!isFuture) total += count;
    cells.push({ date: key, count, isFuture });
  }

  return { cells, total, weeks: HEATMAP_WEEKS, rows: HEATMAP_ROWS };
}

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
