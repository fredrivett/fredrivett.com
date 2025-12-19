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
          <em>Updated: {format(new Date("2025-12-17"), "do MMMM yyyy")}</em>
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
          Recently finished up my role as Founding Engineer at{" "}
          <a href="https://lex.page" rel="nofollow noreferrer" target="_blank">
            Lex
          </a>
          , now exploring new ideas whilst doing some contract work.
        </p>
        <p>
          Have a contract role or project you think I might be a good fit for?
          Feel free to <a href="mailto:fred@fredrivett.com">get in touch</a>.
        </p>

        <h3 id="exploring" className="mb-2">
          Exploring
        </h3>

        <h4 className="mb-1">📮 Automating communication cruft</h4>
        <p>
          One primary idea I&apos;m exploring is how we automate the cruft
          around building product. A major area of cruft is communicating with
          your users what&apos;s changed. There&apos;s a lot of heavy lifting
          and manual process that goes into keeping users up to date, when
          really you just want to let them know what&apos;s changed.
        </p>
        <p>
          Two ideas I&apos;m exploring in that area are{" "}
          <a href="https://log.limo" rel="nofollow noreferrer" target="_blank">
            log.limo
          </a>{" "}
          (automating git log → changelog) and{" "}
          <a
            href="https://flowlane.ai"
            rel="nofollow noreferrer"
            target="_blank"
          >
            flowlane
          </a>{" "}
          (automated custom user onboarding flows).
        </p>
        <p>
          If you&apos;ve any thoughts or want to chat about either,{" "}
          <a href="mailto:fred@fredrivett.com">feel free to reach out</a>.
        </p>

        <h4 className="mb-1">🏠 Your digital home</h4>
        <p>
          The digital world has so much to explore, from images, to articles, to
          books and films. Organising this coherently can be overwhelming, but
          AI now makes it easy to auto analyse and organise these for us.
        </p>
        <p>
          I&apos;ve huge respect for the variety of existing solutions in this
          space, but none have ever felt quite right for me. What I want:
        </p>
        <ul className="list-disc ml-8">
          <li>
            Self organising, no requirement to structure, find what I want as I
            need it
          </li>
          <li>
            Auto analysis in the background, image colors / content / OCR, book
            page count etc.
          </li>
          <li>
            Allow for grouping and sharing some content automatically, e.g.
            Photos from Sydney 2025, so I can share some of my world
          </li>
          <li>
            Ability to own your data — most folks won&apos;t want to self host,
            but if you&apos;re building your digital home somewhere you
            shouldn&apos;t be locked into paying someone to access it in
            perpetuity, the option to eject onto your own setup is key.
          </li>
        </ul>
        <p>
          I&apos;ve had the urge to build this for years, even started on it a
          couple years back, but it never felt doable to the level I wanted or
          worth the lift. The state of AI tools (engineering and auto analysis)
          have changed that, so I&apos;ve finally given in and started work on{" "}
          <a
            href="https://www.abode.fyi"
            rel="nofollow noreferrer"
            target="_blank"
          >
            abode
          </a>
          .
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
