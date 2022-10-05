import React from "react";

import { CvRole } from "components/CvRole";
import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

const Cv = () => (
  <>
    <Main
      className="max-w-prose"
      meta={
        <Meta
          title="/CV"
          description="Senior Product-focussed Front-end Engineer, current go-to toolkit includes React, Vue, React Native, TypeScript, Styled Components & Tailwind."
        />
      }
    >
      <div className="py-6 md:py-8 lg:py-12">
        <span className="fs-2 text-gray-500">/CV</span>
        <h1 className="fs-0">Fred Rivett</h1>
        <p>Senior Product-focussed Front-end Engineer.</p>
        <p>
          Passionate about building sane, maintainable systems with a keen eye
          for design. Fascinated by the challenge of making something great that
          improves users lives. Able to lead across a wide spectrum or narrowly
          focus on code alone.
        </p>
        <p>
          Current go-to toolkit includes React, Vue, React Native, TypeScript,
          Styled Components &amp; Tailwind.
        </p>
        <p>
          <a
            href="https://www.producthunt.com/@fredrivett"
            rel="nofollow noreferrer"
            target="_blank"
          >
            Launched many side projects
          </a>
          ,{" "}
          <a
            href="https://learningtolaunch.co/"
            rel="nofollow noreferrer"
            target="_blank"
          >
            wrote a short book about it
          </a>{" "}
          &amp;{" "}
          <a
            href="https://twitter.com/FredRivett/status/849189123458035714"
            rel="nofollow noreferrer"
            target="_blank"
          >
            accidentally won April Fools Day 2017 (beating Google in the
            process)
          </a>
          .
        </p>
        <p>Available for contract opportunities.</p>

        <hr />

        <ul className="o_bordered-list">
          <li>
            <a
              href="https://www.linkedin.com/in/fredrivett/"
              rel="nofollow noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://stackoverflow.com/users/827129/fredrivett?tab=topactivity"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Stack Overflow
            </a>
          </li>
          <li>
            <a
              href="https://github.com/fredrivett"
              rel="nofollow noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/fredrivett"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.producthunt.com/@fredrivett/made"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Product Hunt
            </a>
          </li>
          <li>
            <a
              href="https://unsplash.com/@fredrivett"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Unsplash
            </a>
          </li>
        </ul>

        <hr />

        <h2 id="experience">Experience</h2>

        <CvRole
          title="Senior Front-end Engineer (Contract)"
          company="Critical Insight Security Ltd"
          dates="August 2022 – September 2022 • 2 mos"
          blurb={[
            "Short-term contract tasked with delivering the front-end for a new client application.",
          ]}
          tags={["React", "TypeScript", "Next.js", "Material UI"]}
        />

        <CvRole
          title="Senior Product Engineer"
          company="NUM"
          links={[{ url: "https://www.num.uk/", text: "Homepage" }]}
          dates="Sep 2019 — July 2022 • 2 yrs 11 mos"
          blurb={[
            "Heading up the product process across half a dozen projects, from designing the UX flow alongside the CEO and architecting technical solutions with the Lead Back-end Engineer, all the way to designing the aesthetic details of the UI and being the sole front-end engineer implementing it all in Vue.",
          ]}
          tags={["Vue", "Vuex", "Nuxt", "Tailwind", "UI/UX"]}
        />

        <CvRole
          title="Founder (Side project)"
          company="Blocks iOS app"
          links={[
            { url: "https://blocks.fernoon.com/", text: "Homepage" },
            {
              url: "https://apps.apple.com/us/app/blocks-minimal-habit-tracker/id1550584642",
              text: "App Store",
            },
          ]}
          dates="Feb 2020 — current • 2 yrs 5 mos"
          blurb={[
            "During lockdown I used my newfound spare time to build an iOS app. I designed the minimalist UI/UX and implemented it all in React Native using Expo.",
          ]}
          tags={["React Native", "Redux", "Expo", "Tailwind", "UI/UX"]}
        />

        <CvRole
          title="Senior Software Engineer"
          company="Octopus Wealth"
          links={[{ url: "https://octopuswealth.com/", text: "Homepage" }]}
          dates="Feb 2019 — Aug 2019 • 7 mos"
          blurb={[
            "Senior Software Engineer and Lead Front-end Dev, training up junior developers, working with React, Redux and TypeScript.",
            "Made redundant when company pivoted and laid off entire tech team.",
          ]}
          tags={["React", "Redux", "TypeScript", "styled-components"]}
        />

        <CvRole
          title="Tech Lead (Contract)"
          company="Founders Factory"
          links={[{ url: "https://foundersfactory.com/", text: "Homepage" }]}
          dates="Jun 2018 — Jan 2019 • 8 mos"
          blurb={[
            "Tech lead and co-creator of The Dot, a mobile news app that develops healthy habits, working with The Guardian as part of the Venture Studio at Founders Factory.",
          ]}
          tags={["React", "Firebase", "Framer", "UI/UX"]}
        />

        <CvRole
          title="Front-end Developer (Contract)"
          company="The People's Operator"
          links={[
            {
              url: "https://en.wikipedia.org/wiki/The_People%27s_Operator",
              text: "Wikipedia",
            },
          ]}
          dates="Feb 2018 — May 2018 • 4 mos"
          blurb={[
            "Responsible for implementing the foundations of a new Vue powered Single Page Application that will be rolled out to replace the existing website.",
          ]}
          tags={["Vue", "Sass", "ITCSS"]}
        />

        <CvRole
          title="Front-end Developer (Contract)"
          company="Tabl"
          links={[{ url: "https://tabl.com/", text: "Homepage" }]}
          dates="Nov 2017 — Apr 2018 • 6 mos"
          blurb={[
            "Part-time contract with Tabl, responsible for refactoring the CSS into a sane, manageable system that can be built on moving forwards.",
          ]}
          tags={["Sass", "ITCSS", "JS"]}
        />

        <CvRole
          title="Front-end Developer (Contract)"
          company="Buildupp"
          links={[{ url: "https://twitter.com/build_upp", text: "Twitter" }]}
          dates="May 2017 — Jan 2018 • 9 mos"
          blurb={[
            "Part-time contracting with Buildupp focussed on leading UI development.",
          ]}
          tags={["Sass", "ITCSS", "JS"]}
        />

        <CvRole
          title="Front-end Developer (Contract)"
          company="Spoke Law (Lawyers On Demand)"
          links={[
            {
              url: "https://www.legalbusiness.co.uk/blogs/lawyers-line-up-to-be-matched-up-as-lod-service-spoke-receives-2400-applications-ahead-of-launch/",
              text: "Press",
            },
          ]}
          dates="Aug 2016 — May 2017 • 10 mos"
          blurb={[
            "Implementing the front-end alongside a strong product focussed team of three (Product Manager, Product Designer, Back-end Engineer).",
          ]}
          tags={["Sass", "ITCSS", "JS"]}
        />

        <CvRole
          title="Front-end Developer"
          company="The People's Operator"
          links={[
            {
              url: "https://en.wikipedia.org/wiki/The_People%27s_Operator",
              text: "Wikipedia",
            },
          ]}
          dates="Mar 2015 — Aug 2016 • 1 yr 6 mos"
          blurb={[
            "Leading the front-end development of our US e-commerce store and community sites, managing two developers, one per project.",
          ]}
          tags={["Sass", "ITCSS", "JS"]}
        />

        <hr />

        <h2 id="side-projects">Side projects</h2>
        <p>
          Side projects are how I got into tech in the first place, hacking away
          in my spare time. Here&apos;s a selection of some of the projects
          I&apos;ve launched:
        </p>
        <ul className="o_naked-list u_indent-0">
          <li>
            2022{" "}
            <a
              href="https://privacyshortlist.com/"
              target="_blank"
              rel="noreferrer"
            >
              PrivacyShortlist — The best privacy-focussed products to build
              &amp; grow your startup
            </a>
          </li>
          <li>
            2022{" "}
            <a
              href="https://blocks.fernoon.com/"
              target="_blank"
              rel="noreferrer"
            >
              Blocks — Minimalist, gesture-based habit app
            </a>
          </li>
          <li>
            2018{" "}
            <a
              href="https://www.producthunt.com/products/bluffball#bluffball"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Bluffball — World Cup phrases to help you fit in
            </a>
          </li>
          <li>
            2017{" "}
            <a
              href="https://www.producthunt.com/products/stories-as-a-service#stories-as-a-service"
              rel="nofollow noreferrer"
              target="_blank"
            >
              [Apr 1] Stories as a Service — Add stories to your website with 1
              line of code
            </a>
          </li>
          <li>
            2016{" "}
            <a
              href="https://www.producthunt.com/products/hit-reply#hit-reply-episode-0-yet-another-startup-podcast"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Hit Reply Podcast — Yet Another Startup Podcast?
            </a>
          </li>
          <li>
            2016{" "}
            <a
              href="https://www.producthunt.com/products/real-time-users#real-time-users"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Real Time Users — Add a real time user counter to your site
            </a>
          </li>
          <li>
            2016{" "}
            <a
              href="https://www.producthunt.com/products/learning-to-launch#learning-to-launch"
              rel="nofollow noreferrer"
              target="_blank"
            >
              LearningToLaunch — Short e-book on how to launch your first side
              project
            </a>
          </li>
          <li>
            2016{" "}
            <a
              href="https://www.producthunt.com/products/product-haunt#product-haunt"
              rel="nofollow noreferrer"
              target="_blank"
            >
              ProductHaunt — Browse the Product Hunt graveyard
            </a>
          </li>
          <li>
            2015{" "}
            <a
              href="https://www.producthunt.com/products/my-year#my-year"
              rel="nofollow noreferrer"
              target="_blank"
            >
              MyYear — Create your own review of your year in minutes
            </a>
          </li>
          <li>
            2015{" "}
            <a
              href="https://www.producthunt.com/products/founderskit#founderskit"
              rel="nofollow noreferrer"
              target="_blank"
            >
              FoundersKit — $6k of discounts for the best startup tools for only
              $39
            </a>
          </li>
          <li>
            2015{" "}
            <a
              href="https://www.producthunt.com/products/the-working-lunch#the-working-lunch"
              rel="nofollow noreferrer"
              target="_blank"
            >
              The Working Lunch — Daily newsletter with resources for startup
              founders
            </a>
          </li>
          <li>
            2015{" "}
            <a
              href="https://www.producthunt.com/products/outstandingbar#outstandingbar"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Outstanding Bar — Minimalist Wordpress plugin
            </a>
          </li>
          <li>
            2015{" "}
            <a
              href="https://www.producthunt.com/products/flashtabs#flashtabs"
              rel="nofollow noreferrer"
              target="_blank"
            >
              FlashTabs — Flashcards in your new tab screen
            </a>
          </li>
          <li>
            2015{" "}
            <a
              href="https://www.producthunt.com/products/howsitgoin#howsitgoin"
              rel="nofollow noreferrer"
              target="_blank"
            >
              HowsItGoin — Set questions and track your answers over time
            </a>
          </li>
        </ul>
        <hr />
        <p>
          Have an interesting opportunity?{" "}
          <a href="mailto:fred@fredrivett.com?subject=Work%20together%3F">
            Reach out and say hi
          </a>
          .
        </p>
      </div>
    </Main>
  </>
);

export default Cv;
