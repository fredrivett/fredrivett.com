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
    state: "explored",
    repo: "log.limo",
    url: "https://www.log.limo",
  },
  {
    name: "flowlane",
    tagline: "Automated user onboarding flows",
    state: "explored",
    repo: "flowlane",
    url: "https://www.flowlane.ai",
  },
  {
    name: "treck",
    tagline: "Docs that automatically sync with your code",
    state: "building",
    repo: "treck",
    url: "https://www.treck.dev",
  },
  {
    name: "here/now",
    tagline: "A minimal, self-hosted visitor tracking API",
    state: "idle",
    url: "https://www.herenow.fyi",
    started: "2025-09",
  },
  {
    name: "PrivacyShortlist",
    tagline: "The best privacy-focussed products to build & grow your startup",
    state: "idle",
    url: "https://privacyshortlist.com",
    started: "2022-09",
  },
  {
    name: "Blocks",
    tagline: "Minimalist, gesture-based habit app",
    state: "idle",
    url: "https://blocks.fernoon.com",
    started: "2022-01",
  },
  {
    name: "Bluffball",
    tagline: "World Cup phrases to help you fit in",
    state: "killed",
    url: "https://www.producthunt.com/products/bluffball",
    started: "2018-07",
  },
  {
    name: "Stories as a Service",
    tagline: "Add stories to your website with 1 line of code (April fools)",
    state: "killed",
    url: "https://www.producthunt.com/products/stories-as-a-service",
    started: "2017-04",
  },
  {
    name: "Hit Reply Podcast",
    tagline: "Yet Another Startup Podcast?",
    state: "killed",
    url: "https://www.producthunt.com/products/hit-reply",
    started: "2016-10",
  },
  {
    name: "Real Time Users",
    tagline: "Add a real time user counter to your site",
    state: "killed",
    url: "https://www.producthunt.com/products/real-time-users",
    started: "2016-06",
  },
  {
    name: "LearningToLaunch",
    tagline: "Short e-book on how to launch your first side project",
    state: "killed",
    url: "https://www.producthunt.com/products/learning-to-launch",
    started: "2016-03",
  },
  {
    name: "ProductHaunt",
    tagline: "Browse the Product Hunt graveyard",
    state: "killed",
    url: "https://www.producthunt.com/products/product-haunt",
    started: "2016-01",
  },
  {
    name: "MyYear",
    tagline: "Create your own review of your year in minutes",
    state: "killed",
    url: "https://www.producthunt.com/products/my-year",
    started: "2015-12",
  },
  {
    name: "FoundersKit",
    tagline: "$6k of discounts for the best startup tools for only $39",
    state: "sold",
    url: "https://www.producthunt.com/products/founderskit",
    started: "2015-08",
  },
  {
    name: "The Working Lunch",
    tagline: "Daily newsletter with resources for startup founders",
    state: "killed",
    url: "https://www.producthunt.com/products/the-working-lunch",
    started: "2015-08",
  },
  {
    name: "Outstanding Bar",
    tagline: "Minimalist Wordpress plugin",
    state: "killed",
    url: "https://www.producthunt.com/products/outstandingbar",
    started: "2015-03",
  },
  {
    name: "FlashTabs",
    tagline: "Flashcards in your new tab screen",
    state: "idle",
    url: "https://www.producthunt.com/products/flashtabs",
    started: "2015-02",
  },
  {
    name: "HowsItGoin",
    tagline: "Set questions and track your answers over time",
    state: "killed",
    url: "https://www.producthunt.com/products/howsitgoin",
    started: "2015-01",
  },
  {
    name: "AreTheNSAWatchingMe.com",
    tagline: "Yes, yes they are",
    state: "idle",
    url: "https://arethensawatchingme.com",
    started: "2013-12",
  },
];

export const validatedProjects: Project[] = ProjectsSchema.parse(projects);
