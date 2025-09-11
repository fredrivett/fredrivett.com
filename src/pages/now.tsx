import React from "react";

import { format } from "date-fns";

import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

import Container from "components/Container";
import FredHead from "components/FredHead";
import SiteCounter from "components/SiteCounter";

const Now = () => (
  <Main meta={<Meta title="/now" description="What I'm up to right now" />}>
    <Container maxWidth="md">
      <div className="mb-4">
        <FredHead title="now" />
        <h1 className="fs-0 mb-1 leading-none">
          What I&apos;m up to right now
        </h1>
        <p className="opacity-50">
          <em>Updated: {format(new Date("2025-07-17"), "do MMMM yyyy")}</em>
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
          First engineer hire at{" "}
          <a href="https://lex.page" rel="nofollow noreferrer" target="_blank">
            Lex
          </a>
          , building the future of writing in the AI era.
        </p>

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

export default Now;
