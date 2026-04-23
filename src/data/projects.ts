import { z } from "zod";

export const PROJECT_STATES = [
  "building",
  "live",
  "idle",
  "sold",
  "explored",
  "killed",
] as const;

export const ProjectStateSchema = z.enum(PROJECT_STATES);
export type ProjectState = z.infer<typeof ProjectStateSchema>;

export const ProjectSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  state: ProjectStateSchema,
  repo: z.string().min(1).optional(),
  url: z.string().url().optional(),
  started: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "started must be in YYYY-MM format")
    .optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectsSchema = z.array(ProjectSchema);

export const projects: Project[] = [
  {
    name: "abode",
    tagline: "A self-organising place for all your digital stuff",
    state: "building",
    repo: "abode",
    url: "https://www.abode.fyi",
  },
  {
    name: "log.limo",
    tagline: "Turn your git log into a changelog",
    state: "building",
    repo: "log.limo",
    url: "https://log.limo",
  },
  {
    name: "flowlane",
    tagline: "Automated user onboarding flows",
    state: "building",
    repo: "flowlane",
    url: "https://flowlane.ai",
  },
];

export const validatedProjects: Project[] = ProjectsSchema.parse(projects);
