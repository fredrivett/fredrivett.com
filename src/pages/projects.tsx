import React from "react";

import type { GetStaticProps } from "next";

import { Meta } from "layout/Meta";
import {
  type CommitsHeatmap as HeatmapData,
  type EnrichedProject,
  enrichProjects,
  fetchCommitsHeatmap,
} from "lib/projects";
import { Main } from "templates/Main";

import CommitsHeatmap from "components/CommitsHeatmap";
import Container from "components/Container";
import FredHead from "components/FredHead";
import ProjectsTable from "components/ProjectsTable";

interface ProjectsProps {
  projects: EnrichedProject[];
  heatmap: HeatmapData;
}

const Projects = ({ projects, heatmap }: ProjectsProps) => (
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
        <p className="opacity-70 text-sm mb-4">
          Everything I&rsquo;ve built, shipped or explored. Last-update pulled
          from GitHub automatically.
        </p>
        <CommitsHeatmap data={heatmap} />
        <ProjectsTable projects={projects} />
      </div>
    </Container>
  </Main>
);

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const [projects, heatmap] = await Promise.all([
    enrichProjects(),
    fetchCommitsHeatmap(),
  ]);
  return {
    props: { projects, heatmap },
    revalidate: 3600,
  };
};

export default Projects;
