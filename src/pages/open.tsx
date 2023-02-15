import React from "react";

import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

import Container from "components/Container";
import FredHead from "components/FredHead";
import Spacer from "components/Spacer";
import Project from "pages/open/Project";

const Open = () => (
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
        <h2>Projects</h2>
        <Spacer>
          <Project
            name="volt"
            emoji="⚡️"
            href="https://volt.fyi"
            target="_blank"
          />
          <Project
            name="fredrivett.com"
            emoji="🧔🏻‍♂️"
            href="https://fredrivett.com"
          />
          <Project
            name="Blocks"
            emoji="🔳"
            href="https://apps.apple.com/gb/app/blocks-minimal-habit-tracker/id1550584642"
            target="_blank"
            rel="nofollow noreferrer"
          />
          <Project name="FHL" emoji="🏡" />
          <Project name="writing" emoji="✍🏻" />
        </Spacer>
      </Container>
    </Main>
  </>
);

export default Open;
