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
          what i&apos;m up to right now
        </h1>
        <p className="opacity-50">
          <em>updated: {format(new Date("2026-04-30"), "do MMMM yyyy")}</em>
        </p>

        <hr />

        <h3 className="mb-2">life</h3>
        <p>
          my wife, Lorna, and i got married in late 2023. our first kid is due
          this summer.
        </p>

        <h3 className="mb-2">where</h3>
        <p>
          we recently travelled the world for 8 months whilst working remotely,
          visiting over a dozen countries across Africa, Asia, Australasia and
          South America. we arrived back in our flat in London in April 2025.
        </p>

        <h3 className="mb-2">work</h3>
        <p>
          senior product engineer at{" "}
          <a
            href="https://gptzero.me"
            rel="nofollow noreferrer"
            target="_blank"
          >
            GPTZero
          </a>
          .
          <br />
          previously founding engineer (and employee #2) at{" "}
          <a
            href="https://www.lex.page"
            rel="nofollow noreferrer"
            target="_blank"
          >
            Lex
          </a>
          .
        </p>

        <h3 id="exploring" className="mb-2">
          exploring
        </h3>
        <ul className="list-disc ml-8">
          <li>
            🏠 your digital home —{" "}
            <a
              href="https://www.abode.fyi"
              rel="nofollow noreferrer"
              target="_blank"
            >
              abode
            </a>
            , a self-organising place for all your digital stuff
          </li>
          <li>
            🗺️ exploring your e2e code flows —{" "}
            <a
              href="https://www.treck.dev"
              rel="nofollow noreferrer"
              target="_blank"
            >
              treck
            </a>
            , docs that automatically sync with your code
          </li>
        </ul>

        <hr />

        <p>
          <small>
            this is a{" "}
            <a
              href="https://nownownow.com/about"
              rel="nofollow noreferrer"
              target="_blank"
            >
              now page
            </a>
            . it&rsquo;s a snapshot of what life looks like for me right now,
            for those who are curious. it is updated periodically, but not on
            any fixed schedule.
          </small>
        </p>

        <SiteCounter className="mt-8" />
      </div>
    </Container>
  </Main>
);

export default Now;
