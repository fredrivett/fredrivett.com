import React, { FunctionComponent } from "react";

import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

import Container from "components/Container";
import FredHead from "components/FredHead";
import Spacer from "components/Spacer";
import Project from "pages/open/Project";

import { toggleApi } from "utils/TogglApi";

interface TimeEntry {
  duration: number;
  pid: number;
}

interface Props {
  projectsWithTimeEntries: {
    seconds: number;
    id: number;
    emoji: string;
    name: string;
    href?: string;
    target?: "_blank";
    rel?: string;
  }[];
}

const Open: FunctionComponent<Props> = ({ projectsWithTimeEntries }) => (
  <>
    <Main
      meta={
        <Meta
          title="/open"
          description="Open metrics on fred rivett's side projects"
        />
      }
    >
      <Container>
        <div className="last-mb-0">
          <div className="flex items-center mb-4">
            <FredHead title="open" />
          </div>
          <p>
            👋🏻 Hey, I&apos;m{" "}
            <a
              href="https://twitter.com/fredrivett"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Fred
            </a>
            , and welcome to my /open page, where I share info on the side
            projects I&apos;m working on.
          </p>
          <p>
            🚧 This page is a WIP, so please bare with me whilst it evolves.
          </p>
          <p>
            🤔 Thoughts on what I should add?{" "}
            <a
              href="https://twitter.com/fredrivett"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Let me know
            </a>
            .
          </p>
        </div>
        <hr />
        <h2>
          Side projects{" "}
          <span className="text-gray-600 dark:text-gray-700 fs-4">
            (time tracked this year)
          </span>
        </h2>
        <Spacer>
          {projectsWithTimeEntries.map((project) => (
            <Project key={project.id} {...project} />
          ))}
        </Spacer>
      </Container>
    </Main>
  </>
);

export const getServerSideProps = async (): Promise<{ props: Props }> => {
  const projects = [
    {
      id: 186257340,
      emoji: "🧔🏻‍♂️",
      name: "fredrivett.com",
      href: "https://fredrivett.com",
    },
    {
      id: 166317913,
      emoji: "🔳",
      name: "Blocks",
      href: "https://apps.apple.com/gb/app/blocks-minimal-habit-tracker/id1550584642",
      target: "_blank",
      rel: "nofollow noreferrer",
    },
    {
      id: 189770943,
      emoji: "🏡",
      name: "FHL", // "Haven Holiday Lets",
    },
    {
      id: 186126917,
      emoji: "⚡️",
      name: "volt.fyi",
      href: "https://volt.fyi",
      target: "_blank",
    },
    {
      id: 8545161,
      emoji: "✍🏻",
      name: "writing",
    },
  ] as const;

  const timeEntries: TimeEntry[] = await toggleApi("me/time_entries", "GET");

  const projectsWithTimeEntries = projects.map((project) => {
    return {
      ...project,
      seconds: timeEntries
        .filter((timeEntry) => {
          const isForProject = timeEntry.pid === project.id;
          // for some reason we have some negative time entries in the API
          // response so we need to filter those out here, it might be due to
          // ongoing time entries
          const isNotNegative = timeEntry.duration > 0;
          return isForProject && isNotNegative;
        })
        .reduce((acc, timeEntry) => {
          return acc + timeEntry.duration;
        }, 0),
    };
  });

  return {
    props: {
      projectsWithTimeEntries,
    },
  };
};

export default Open;
