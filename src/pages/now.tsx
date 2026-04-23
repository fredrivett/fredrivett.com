import React from "react";

import { format } from "date-fns";
import type { GetStaticProps } from "next";

import { validatedProjects } from "data/projects";
import { Meta } from "layout/Meta";
import { fetchRepoMeta } from "lib/github";
import { Main } from "templates/Main";

import Container from "components/Container";
import FredHead from "components/FredHead";
import ProjectsTable, { type EnrichedProject } from "components/ProjectsTable";
import SiteCounter from "components/SiteCounter";

interface NowProps {
  projects: EnrichedProject[];
}

const Now = ({ projects }: NowProps) => (
  <Main meta={<Meta title="/now" description="What I'm up to right now" />}>
    <Container maxWidth="md">
      <div className="mb-4">
        <FredHead title="now" />
        <h1 className="fs-0 mb-1 leading-none">
          What I&apos;m up to right now
        </h1>
        <p className="opacity-50">
          <em>Updated: {format(new Date("2026-04-12"), "do MMMM yyyy")}</em>
        </p>

        <hr />

        <h3 className="mb-2">Life</h3>
        <p>My wife, Lorna, and I got married in late 2023.</p>

        <h3 className="mb-2">Where</h3>
        <p>
          We recently travelled the world for 8 months whilst working remotely,
          visiting over a dozen countries across Africa, Asia, Australasia and
          South America. We arrived back in our flat in London in April 2025.
        </p>

        <h3 className="mb-2">Work</h3>
        <p>
          Senior Product Engineer at{" "}
          <a
            href="https://gptzero.me"
            rel="nofollow noreferrer"
            target="_blank"
          >
            GPTZero
          </a>
          .
        </p>

        <h3 id="exploring" className="mb-2">
          Exploring
        </h3>
        <ul className="list-disc ml-8">
          <li>
            📮 Automating communication cruft —{" "}
            <a
              href="https://log.limo"
              rel="nofollow noreferrer"
              target="_blank"
            >
              log.limo
            </a>{" "}
            (git log → changelog) and{" "}
            <a
              href="https://flowlane.ai"
              rel="nofollow noreferrer"
              target="_blank"
            >
              flowlane
            </a>{" "}
            (automated user onboarding flows)
          </li>
          <li>
            🏠 Your digital home —{" "}
            <a
              href="https://www.abode.fyi"
              rel="nofollow noreferrer"
              target="_blank"
            >
              abode
            </a>
            , a self-organising place for all your digital stuff
          </li>
        </ul>

        <hr />

        <h3 id="projects" className="mb-2">
          Projects
        </h3>
        <p className="opacity-70 text-sm mb-4">
          Everything I&rsquo;ve shipped, built, or explored. Last-update dates
          pulled from GitHub automatically.
        </p>
        <ProjectsTable projects={projects} />

        <hr />

        <p>
          <small>
            This is a{" "}
            <a
              href="https://nownownow.com/about"
              rel="nofollow noreferrer"
              target="_blank"
            >
              now page
            </a>
            . It&rsquo;s a snapshot of what life looks like for me right now,
            for those who are curious. It is updated periodically, but not on
            any fixed schedule.
          </small>
        </p>

        <SiteCounter className="mt-8" />
      </div>
    </Container>
  </Main>
);

export const getStaticProps: GetStaticProps<NowProps> = async () => {
  const enriched: EnrichedProject[] = await Promise.all(
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
        started: project.started ?? meta.createdAt ?? null,
      };
    }),
  );

  return {
    props: { projects: enriched },
    revalidate: 3600,
  };
};

export default Now;
