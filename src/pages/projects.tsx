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
import ProjectsFilterMenu from "components/ProjectsFilterMenu";
import ProjectsList from "components/ProjectsList";
import { useProjectsFilter } from "components/useProjectsFilter";

interface ProjectsProps {
  projects: EnrichedProject[];
  heatmap: HeatmapData;
}

const Projects = ({ projects, heatmap }: ProjectsProps) => {
  const { visibleStates, toggleState, filtered } = useProjectsFilter(projects);

  return (
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
          <div className="flex items-center justify-between gap-4">
            <FredHead title="projects" />
            <ProjectsFilterMenu
              visibleStates={visibleStates}
              onToggle={toggleState}
            />
          </div>
          <p className="opacity-70 text-sm mb-4">
            Everything I&rsquo;ve built, shipped or explored. Last-update pulled
            from GitHub automatically.
          </p>
          <CommitsHeatmap data={heatmap} />
          <ProjectsList projects={filtered} />
        </div>
      </Container>
    </Main>
  );
};

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
