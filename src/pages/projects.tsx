import React from "react";

import type { GetStaticProps } from "next";

import { Meta } from "layout/Meta";
import { enrichProjects, type EnrichedProject } from "lib/projects";
import { Main } from "templates/Main";

import Container from "components/Container";
import FredHead from "components/FredHead";
import ProjectsTable from "components/ProjectsTable";

interface ProjectsProps {
  projects: EnrichedProject[];
}

const Projects = ({ projects }: ProjectsProps) => (
  <Main
    meta={
      <Meta
        title="Projects"
        description="Everything I've built, shipped or explored."
      />
    }
  >
    <Container maxWidth="lg">
      <div className="mb-4">
        <FredHead title="projects" />
        <h1 className="fs-0 mb-1 leading-none">Projects</h1>
        <p className="opacity-70 text-sm mb-4">
          Everything I&rsquo;ve built, shipped or explored. Last-update pulled
          from GitHub automatically.
        </p>
        <ProjectsTable projects={projects} />
      </div>
    </Container>
  </Main>
);

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => ({
  props: { projects: await enrichProjects() },
  revalidate: 3600,
});

export default Projects;
