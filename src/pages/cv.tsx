import React from "react";

import {
  faLinkedin,
  faGithub,
  faTwitter,
  faProductHunt,
  faUnsplash,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileDown, FileText, Clock } from "lucide-react";

import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

import Container from "components/Container";
import { CvRole } from "components/CvRole";
import FredHead from "components/FredHead";
import SiteCounter from "components/SiteCounter";
import Tag from "components/Tag";
import Testimonial from "components/Testimonial";
import Twemoji from "components/Twemoji";

const getTimeSince = (dateString: string) => {
  const currentDate = new Date();
  const givenDate = new Date(dateString);

  // Calculate total months difference
  const diffYear = currentDate.getFullYear() - givenDate.getFullYear();
  const diffMonths = currentDate.getMonth() - givenDate.getMonth();
  const roundItUp = 1;
  const totalMonths = diffYear * 12 + diffMonths + roundItUp;

  // Convert to years and months
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Format the output
  if (years === 0) return `${months} mos`;
  if (months === 0) {
    return `${years} ${years === 1 ? "yr" : "yrs"}`;
  }
  return `${years} ${years === 1 ? "yr" : "yrs"} ${months} mos`;
};

const role = "Senior [Founding/Design/Product/Frontend] Engineer";
const toolkit =
  "current go-to toolkit includes React, React Native, TypeScript, Jest, styled-components & Tailwind.";

const getGeneratedAt = () => {
  const iso = new Date().toISOString();
  return `${iso.slice(0, 16).replace("T", " ")} UTC`;
};

const Cv = () => {
  const generatedAt = getGeneratedAt();
  const pdfDownloadUrl = "/cv/fred-rivett-cv.pdf";

  return (
    <>
      <Main meta={<Meta title="/cv" description={`${role}, ${toolkit}`} />}>
        <Container>
          <div className="flex flex-wrap -m-6">
            <div className="p-6 lg:w-2/5 print:order-2 print:w-full">
              <h2 className="lg:hidden print:block">
                <Twemoji
                  emoji="💬"
                  label="Speech balloon"
                  size={20}
                  className="inline-block mr-2 align-middle"
                />
                Kind words from colleagues &amp; clients
              </h2>
              <div className="flex flex-col gap-3 border-l-4 border-gray-300 dark:border-gray-800 lg:border-l-0 pl-4 lg:pl-0 mb-8 lg:mb-0">
                <Testimonial
                  cite={
                    <>
                      <img
                        alt="Photo of Nathan Baschez"
                        src="/people/nathan-bashez.jpg"
                        className="inline-block w-6 h-6 mr-2 rounded-full -translate-y-px"
                      />
                      <a
                        href="https://www.linkedin.com/in/dr-philip-jones-4b0a1879/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Nathan Baschez
                      </a>{" "}
                      (Founder & CEO,{" "}
                      <a
                        href="https://lex.page/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Lex
                      </a>
                      )
                    </>
                  }
                >
                  Fred is{" "}
                  <strong>
                    not only an extremely skilled front-end engineer, he’s got a
                    talent for design, good product instincts, and most
                    importantly, he deeply cares.
                  </strong>{" "}
                  He wants to get it right, and{" "}
                  <strong>he works incredibly hard to do so</strong>. I hope I’m
                  lucky enough to be able to work with him again one day soon!
                </Testimonial>
                <Testimonial
                  cite={
                    <>
                      <img
                        alt="Photo of Dr. Philip Jones"
                        src="/people/philip-jones.jpg"
                        className="inline-block w-6 h-6 mr-2 rounded-full -translate-y-px"
                      />
                      <a
                        href="https://www.linkedin.com/in/dr-philip-jones-4b0a1879/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Dr. Philip Jones
                      </a>{" "}
                      (Author,{" "}
                      <a
                        href="https://www.amazon.co.uk/Blueprint-Production-Ready-Web-Applications-TypeScript/dp/1803248505"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        A Blueprint for Production-Ready Web Applications
                      </a>{" "}
                      &amp; VP Technology,{" "}
                      <a
                        href="https://curaleaf.com/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Curaleaf International
                      </a>
                      )
                    </>
                  }
                >
                  Fred is a{" "}
                  <strong>
                    talented engineer with a strong product focus; a pleasure to
                    work with.
                  </strong>
                </Testimonial>
                <Testimonial
                  cite={
                    <>
                      <img
                        alt="Photo of Thayer Prime"
                        src="/people/thayer-prime.jpg"
                        className="inline-block w-6 h-6 mr-2 rounded-full -translate-y-px"
                      />
                      <a
                        href="https://www.linkedin.com/in/thayerprime"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Thayer Prime
                      </a>{" "}
                      (Founder & CEO,{" "}
                      <a
                        href="https://team-prime.com/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Team Prime
                      </a>
                      )
                    </>
                  }
                >
                  <strong>
                    I love working with Fred - he&apos;s a definite go to any
                    time I have a front end contract that needs a safe, grown up
                    pair of hands to really get in and deliver, he&apos;s the
                    guy.
                  </strong>{" "}
                  I know I can match him to any client and they will be grateful
                  having had him on their project. I would recommend him for any
                  gig, but especially those where you just need a really nice
                  personable human to come in, get stuff done, and be really
                  cool to work with.{" "}
                  <strong>
                    If you manage to get him count yourself lucky, he&apos;s
                    often busy due to his excellent reputation. A++ strong
                    recommend from me!
                  </strong>
                </Testimonial>
                <Testimonial
                  cite={
                    <>
                      <img
                        alt="Photo of Raphael Benarrosh"
                        src="/people/raphael-benarrosh.jpg"
                        className="inline-block w-6 h-6 mr-2 rounded-full -translate-y-px"
                      />
                      <a
                        href="https://www.linkedin.com/in/dr-philip-jones-4b0a1879/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Ralph Benarrosh
                      </a>{" "}
                      (Director,{" "}
                      <a
                        href="https://www.blackrock.com/corporate/ai"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        BlackRock Lab for Artificial Intelligence
                      </a>
                      )
                    </>
                  }
                >
                  We hired Fred roughly nine months ago to develop the frontend
                  component of a larger application that we are developing for
                  an internal client. During this time,{" "}
                  <strong>
                    I can say that Fred has exceeded all of our expectations.
                  </strong>
                  <br />
                  <br />
                  This being one of our team’s first projects that contained a
                  major frontend component, Fred helped us establish the
                  standard frontend stack and toolchain for our team, which we
                  still rely upon heavily and are looking to use for other
                  projects. He then built out the entire vision for the product
                  on a very short timeline.
                  <br />
                  <br />
                  His work was done quickly but was very high quality and
                  required minimal oversight in terms of code reviews, which
                  helped us reduce the overall management overhead for the
                  entire effort. In terms of project management, Fred integrated
                  naturally into our team’s agile process and was very
                  meticulous in tracking the work and keeping the tools up to
                  date.
                  <br />
                  <br />
                  Fred has been a pleasure to work with and has worked extremely
                  well with the entire rest of our team. Fred exemplified all of
                  the values that we look for on our team, including competence,
                  meticulousness, humility, and a desire to do things correctly.{" "}
                  <strong>
                    I would love to work with Fred again, and I highly recommend
                    him to anyone looking for an experienced frontend developer.
                  </strong>
                </Testimonial>
                <Testimonial
                  cite={
                    <>
                      <img
                        alt="Photo of Andrew McDonough"
                        src="/people/andrew-mcdonough.jpg"
                        className="inline-block w-6 h-6 mr-2 rounded-full -translate-y-px"
                      />
                      <a
                        href="https://www.linkedin.com/in/andrewmcdonough/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Andrew McDonough
                      </a>{" "}
                      (CTO,{" "}
                      <a
                        href="https://www.captionhub.com/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        CaptionHub
                      </a>
                      )
                    </>
                  }
                >
                  I first met Fred when I hired him as a frontend engineer for
                  TPO.{" "}
                  <strong>
                    It was one of the best recruiting decisions I&apos;ve ever
                    made. I valued Fred&apos;s contributions so highly, that I
                    subsequently hired him to work with me at two other
                    companies.
                  </strong>{" "}
                  He has a very good eye for design and amazing attention to
                  detail. He has a strong product mindset, and having taken a
                  number of his own products to market, has a deep understanding
                  of the full product lifecycle. He is always thinking about
                  what the customer wants and how to deliver the best value.{" "}
                  <strong>
                    Fred is strong technically and always seems to be on the
                    cutting edge of frontend development tools and techniques.
                  </strong>{" "}
                  He has also been able to pick up unfamiliar technologies
                  extremely quickly. For example, on the first project we worked
                  on together, he had never worked with Ruby on Rails, but was
                  able to quickly learn enough to collaborate with the backend
                  engineers, and even write some backend Ruby code himself.{" "}
                  <strong>
                    Fred has strong collaboration skills and is a fantastic team
                    player.
                  </strong>{" "}
                  He always seems to get on with everyone on the team and is
                  happy to work with people across all functions and levels.
                </Testimonial>
                <Testimonial
                  className="print:mb-12" // add some extra space to push next testimonial onto own page
                  cite={
                    <>
                      <img
                        alt="Photo of Tony Walmsley"
                        src="/people/tony-walmsley.jpg"
                        className="inline-block w-6 h-6 mr-2 rounded-full -translate-y-px"
                      />
                      <a
                        href="https://www.linkedin.com/in/tony-walmsley-8540732/"
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        Tony Walmsley
                      </a>{" "}
                      (Senior Software Engineer)
                    </>
                  }
                >
                  <strong>
                    This is the second time I have worked with Fred and I&apos;m
                    hoping there will be a third, and a fourth&hellip;
                  </strong>{" "}
                  As the frontend engineer for our prototype application Fred
                  produced a very clean and functional UI that integrated very
                  smoothly with the REST API that I was developing.{" "}
                  <strong>
                    The end result went beyond our end client&apos;s
                    expectations
                  </strong>
                  , providing a useful business function as well as being a
                  platform for eliciting the &lsquo;real&rsquo; user
                  requirements, and it was put together in only 6 weeks using
                  React and NextJS in TypeScript. Fred works well remotely and
                  independently as well as in-office, and maintained forward
                  momentum throughout the project.{" "}
                  <strong>
                    I seriously doubt our project would have been so successful
                    without his work.
                  </strong>
                </Testimonial>
              </div>
            </div>
            <div className="p-6 lg:w-3/5 print:order-1 print:w-full">
              <div className="relative">
                <FredHead title="cv" />
                <div className="absolute top-0 right-0">
                  <div className="hidden print:block">
                    <div className="text-right space-y-1">
                      <div className="text-xs text-gray-800 bg-gray-200 rounded-full text-sm py-1.5 px-3 flex items-center gap-1.5">
                        <FileText size={14} />
                        PDF Generated from{" "}
                        <a href="https://fredrivett.com/cv" target="_blank">
                          fredrivett.com/cv
                        </a>
                      </div>
                      <div className="text-xs text-gray-600 mr-3 inline-flex items-center gap-1">
                        <Clock size={12} />
                        {generatedAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-semibold print:hidden">
                    <a
                      href={pdfDownloadUrl}
                      className="inline-flex items-center text-base gap-2 rounded-full dark:bg-gray-900 px-5 py-3 dark:text-white border-2 border-gray-200 dark:border-gray-800 transition dark:hover:bg-gray-800 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 bg-gray-100 text-gray-700 hover:bg-gray-200"
                      download="fred-rivett-cv.pdf"
                    >
                      <FileDown className="opacity-60" size={20} />
                      Download as PDF
                    </a>
                  </div>
                </div>
              </div>
              <h1 className="fs-0 mb-0 leading-none">Fred Rivett</h1>
              <p className="fs-4 mb-3 font-semibold text-gray-700 dark:text-gray-500">
                {role}
              </p>
              <p className="mb-3">
                Engineer with a designers eye and product mindset, passionate
                about building products that improve people&apos;s lives.
              </p>
              <p className="mb-3">
                Able to lead across a wide spectrum or narrowly focus on code
                alone.
              </p>
              <p className="mb-6">
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
              <p>
                <Tag>
                  <Twemoji
                    emoji="🇬🇧"
                    label="United Kingdom"
                    size={18}
                    className="inline-block align-[-4px] mr-2"
                  />
                  London <span className="text-gray-500">/</span>{" "}
                  <Twemoji
                    emoji="🌍"
                    label="Globe"
                    size={18}
                    className="inline-block align-[-4px] mr-2"
                  />
                  Remote
                </Tag>
              </p>

              <div className="flex flex-wrap gap-5 mt-8 print:break-inside-avoid-page">
                <a
                  href="https://www.linkedin.com/in/fredrivett/"
                  rel="nofollow noreferrer"
                  target="_blank"
                  title="LinkedIn"
                  className="no-underline w-6 h-6 flex justify-center hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="xl" />
                </a>
                <a
                  href="https://stackoverflow.com/users/827129/fredrivett?tab=topactivity"
                  rel="nofollow noreferrer"
                  target="_blank"
                  title="Stack Overflow"
                  className="no-underline w-6 h-6 flex justify-center hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faStackOverflow} size="xl" />
                </a>
                <a
                  href="https://github.com/fredrivett"
                  rel="nofollow noreferrer"
                  target="_blank"
                  title="GitHub"
                  className="no-underline w-6 h-6 flex justify-center hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faGithub} size="xl" />
                </a>
                <a
                  href="https://twitter.com/fredrivett"
                  rel="nofollow noreferrer"
                  target="_blank"
                  title="Twitter"
                  className="no-underline w-6 h-6 flex justify-center hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faTwitter} size="xl" />
                </a>
                <a
                  href="https://www.producthunt.com/@fredrivett"
                  rel="nofollow noreferrer"
                  target="_blank"
                  title="Product Hunt"
                  className="no-underline w-6 h-6 flex justify-center hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faProductHunt} size="xl" />
                </a>
                <a
                  href="https://unsplash.com/@fredrivett"
                  rel="nofollow noreferrer"
                  target="_blank"
                  title="Unsplash"
                  className="no-underline w-6 h-6 flex justify-center hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faUnsplash} size="xl" />
                </a>
              </div>

              <SiteCounter className="mt-7 print:hidden" />

              <hr />

              <h2 id="experience">
                <Twemoji
                  emoji="👨🏻‍💻"
                  label="Technologist"
                  size={24}
                  className="inline-block mr-2 align-baseline"
                />
                Experience
              </h2>

              <CvRole
                title="Design Engineer (Contract)"
                company="Nolana"
                companyLogoPath="nolana.png"
                links={[
                  {
                    url: "https://nolana.com",
                    text: "Nolana homepage",
                  },
                ]}
                dates={`October 2025 – November 2025 • 5 weeks`}
                blurb={[
                  "Brought in on a short-term contract to help implement a couple new features and tighten up the frontend/UI.",
                ]}
                tags={[
                  "React",
                  "TypeScript",
                  "NextJS",
                  "AI SDK",
                  "Tailwind",
                  "shadcn",
                  "Tanstack Query",
                  "Zod",
                ]}
              />

              <CvRole
                title="Founding Engineer (Contract)"
                company="Lex"
                companyLogoPath="lex.png"
                links={[
                  {
                    url: "https://lex.page",
                    text: "Lex homepage",
                  },
                ]}
                dates={`November 2023 – September 2025 • 1 yr 10 mos`}
                blurb={[
                  "First (and at times only) engineer post $2.75m raise, working across the whole company, from top of funnel to product ideas all the way through to full stack implementation and everything else that goes on at an early stage startup.",
                ]}
                tags={[
                  "React",
                  "TypeScript",
                  "Ruby on Rails",
                  "Zustand",
                  "Jest",
                  "Playwright",
                  "ProseMirror",
                  "tldraw",
                  "stylex",
                ]}
              />

              <CvRole
                title="Senior Frontend Engineer (Contract)"
                company="BlackRock (AI Labs)"
                companyLogoPath="blackrock.png"
                links={[
                  {
                    url: "https://www.blackrock.com/corporate/ai",
                    text: "AI Labs homepage",
                  },
                ]}
                dates={`December 2022 – April 2024 • 1 yr 5 mos`}
                blurb={[
                  "Sole frontend engineer in the BlackRock AI Labs team, responsible for taking wireframes, adding custom UI polish and building out a new internal web app in Next.js & TypeScript with 100% Jest test coverage.",
                  "Initial 6 month contract, extended to 12, and then shifted to a short-term retainer until a new team member could be found.",
                ]}
                tags={[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Jest",
                  "Bootstrap",
                  "Tailwind",
                  "styled-components",
                ]}
              />

              <CvRole
                title="Senior Frontend Engineer (Contract)"
                company="Critical Insight Security Ltd"
                dates="August 2022 – September 2022 • 2 mos"
                blurb={[
                  "Short-term contract tasked with delivering the frontend for a new client application. Completed build from start to finish in 6 weeks.",
                ]}
                tags={["React", "TypeScript", "Next.js", "Material UI"]}
              />

              <CvRole
                title="Senior Product Engineer"
                company="NUM"
                companyLogoPath="num.jpg"
                links={[{ url: "https://www.num.uk/", text: "Homepage" }]}
                dates="Sep 2019 — July 2022 • 2 yrs 11 mos"
                blurb={[
                  "Heading up the product process across half a dozen projects, from designing the UX flow alongside the CEO and architecting technical solutions with the Lead Backend Engineer, all the way to designing the aesthetic details of the UI and being the sole frontend engineer implementing it all in Vue.",
                ]}
                tags={["Vue", "Vuex", "Nuxt", "Tailwind", "UI/UX"]}
              />

              <CvRole
                title="Founder (Side project)"
                company="Blocks iOS app"
                companyLogoPath="blocks.png"
                links={[
                  {
                    url: "https://apps.apple.com/us/app/blocks-minimal-habit-tracker/id1550584642",
                    text: "App Store",
                  },
                ]}
                dates={`Feb 2020 — current • ${getTimeSince("2020/02/01")}`}
                blurb={[
                  "During lockdown I used my newfound spare time to build an iOS app. Designed the minimalist UI/UX and implemented it all in React Native using Expo.",
                ]}
                tags={["React Native", "Redux", "Expo", "Tailwind", "UI/UX"]}
              />

              <CvRole
                title="Senior Software Engineer"
                company="Octopus Wealth (now: Nova)"
                companyLogoPath="octopus-wealth.png"
                links={[
                  { url: "https://octopuswealth.com/", text: "Homepage" },
                ]}
                dates="Feb 2019 — Aug 2019 • 7 mos"
                blurb={[
                  "Senior Software Engineer and Lead Frontend Dev, training up junior developers, working with React, Redux and TypeScript.",
                  "Made redundant when company pivoted and laid off entire tech team.",
                ]}
                tags={["React", "Redux", "TypeScript", "styled-components"]}
              />

              <CvRole
                title="Tech Lead (Contract)"
                company="Founders Factory"
                companyLogoPath="founders-factory.jpg"
                links={[
                  { url: "https://foundersfactory.com/", text: "Homepage" },
                ]}
                dates="Jun 2018 — Jan 2019 • 8 mos"
                blurb={[
                  "Tech lead and co-founder of The Dot, a mobile news app that aimed to build a habit loop by enabling users to predict the news, working with The Guardian as part of the Venture Studio at Founders Factory.",
                ]}
                tags={["React", "Firebase", "Framer", "UI/UX", "Product"]}
              />

              <CvRole
                title="Frontend Engineer (Contract)"
                company="The People's Operator"
                companyLogoPath="tpo.jpeg"
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
                title="Frontend Engineer (Contract)"
                company="Tabl"
                companyLogoPath="tabl.jpeg"
                links={[{ url: "https://tabl.com/", text: "Homepage" }]}
                dates="Nov 2017 — Apr 2018 • 6 mos"
                blurb={[
                  "Part-time contract with Tabl, responsible for refactoring the CSS into a sane, manageable system that can be built on moving forwards.",
                ]}
                tags={["Sass", "ITCSS", "JS"]}
              />

              <CvRole
                title="Frontend Engineer (Contract)"
                company="Buildupp"
                companyLogoPath="buildupp.jpeg"
                links={[
                  { url: "https://twitter.com/build_upp", text: "Twitter" },
                ]}
                dates="May 2017 — Jan 2018 • 9 mos"
                blurb={[
                  "Part-time contract with Buildupp focussed on leading UI development.",
                ]}
                tags={["Sass", "ITCSS", "JS"]}
              />

              <CvRole
                title="Frontend Engineer (Contract)"
                company="Spoke Law (Lawyers On Demand)"
                companyLogoPath="spoke.png"
                links={[
                  {
                    url: "https://www.legalbusiness.co.uk/blogs/lawyers-line-up-to-be-matched-up-as-lod-service-spoke-receives-2400-applications-ahead-of-launch/",
                    text: "Press",
                  },
                ]}
                dates="Aug 2016 — May 2017 • 10 mos"
                blurb={[
                  "Implementing the frontend alongside a strong product focussed team of three (Product Manager, Product Designer, Backend Engineer).",
                ]}
                tags={["Sass", "ITCSS", "JS"]}
              />

              <CvRole
                title="Frontend Engineer"
                company="The People's Operator"
                companyLogoPath="tpo.jpeg"
                links={[
                  {
                    url: "https://en.wikipedia.org/wiki/The_People%27s_Operator",
                    text: "Wikipedia",
                  },
                ]}
                dates="Mar 2015 — Aug 2016 • 1 yr 6 mos"
                blurb={[
                  "Leading the frontend development of our US e-commerce store and community sites, managing two engineers, one per project.",
                ]}
                tags={["Sass", "ITCSS", "JS"]}
              />

              <hr />

              <h2 id="side-projects">
                <Twemoji
                  emoji="🎨"
                  label="Palette"
                  size={24}
                  className="inline-block mr-2 align-baseline"
                />
                Side projects
              </h2>
              <p>
                Side projects are how I got into tech in the first place,
                hacking away in my spare time. Here&apos;s a selection of some
                of the projects I&apos;ve launched:
              </p>
              <ul className="o_naked-list u_indent-0">
                <li>
                  2025{" "}
                  <a href="https://log.limo" target="_blank" rel="noreferrer">
                    <strong>log.limo</strong> (early access) — git log —&gt;
                    changelog
                  </a>
                </li>
                <li>
                  2025{" "}
                  <a
                    href="https://flowlane.ai"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>Flowlane</strong> (early access) — The smart
                    autopilot for your SaaS email flows
                  </a>
                </li>
                <li>
                  2025{" "}
                  <a
                    href="https://herenow.fyi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>here/now</strong> — A minimal, self-hosted visitor
                    tracking API that shows both <em>total visitor count</em>{" "}
                    and <em>real-time visitor counts</em> per webpage.
                  </a>
                </li>
                <li>
                  2022{" "}
                  <a
                    href="https://privacyshortlist.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>PrivacyShortlist</strong> — The best
                    privacy-focussed products to build &amp; grow your startup
                  </a>
                </li>
                <li>
                  2022{" "}
                  <a
                    href="https://blocks.fernoon.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>Blocks</strong> — Minimalist, gesture-based habit
                    app
                  </a>
                </li>
                <li>
                  2018{" "}
                  <a
                    href="https://www.producthunt.com/products/bluffball#bluffball"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>Bluffball</strong> — World Cup phrases to help you
                    fit in
                  </a>
                </li>
                <li>
                  2017{" "}
                  <a
                    href="https://www.producthunt.com/products/stories-as-a-service#stories-as-a-service"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>Stories as a Service</strong> — Add stories to your
                    website with 1 line of code (April fools)
                  </a>
                </li>
                <li>
                  2016{" "}
                  <a
                    href="https://www.producthunt.com/products/hit-reply#hit-reply-episode-0-yet-another-startup-podcast"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>Hit Reply Podcast</strong> — Yet Another Startup
                    Podcast?
                  </a>
                </li>
                <li>
                  2016{" "}
                  <a
                    href="https://www.producthunt.com/products/real-time-users#real-time-users"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>Real Time Users</strong> — Add a real time user
                    counter to your site
                  </a>
                </li>
                <li>
                  2016{" "}
                  <a
                    href="https://www.producthunt.com/products/learning-to-launch#learning-to-launch"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>LearningToLaunch</strong> — Short e-book on how to
                    launch your first side project
                  </a>
                </li>
                <li>
                  2016{" "}
                  <a
                    href="https://www.producthunt.com/products/product-haunt#product-haunt"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>ProductHaunt</strong> — Browse the Product Hunt
                    graveyard
                  </a>
                </li>
                <li>
                  2015{" "}
                  <a
                    href="https://www.producthunt.com/products/my-year#my-year"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>MyYear</strong> — Create your own review of your
                    year in minutes
                  </a>
                </li>
                <li>
                  2015{" "}
                  <a
                    href="https://www.producthunt.com/products/founderskit#founderskit"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>FoundersKit</strong> — $6k of discounts for the best
                    startup tools for only $39
                  </a>
                </li>
                <li>
                  2015{" "}
                  <a
                    href="https://www.producthunt.com/products/the-working-lunch#the-working-lunch"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>The Working Lunch</strong> — Daily newsletter with
                    resources for startup founders
                  </a>
                </li>
                <li>
                  2015{" "}
                  <a
                    href="https://www.producthunt.com/products/outstandingbar#outstandingbar"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>Outstanding Bar</strong> — Minimalist Wordpress
                    plugin
                  </a>
                </li>
                <li>
                  2015{" "}
                  <a
                    href="https://www.producthunt.com/products/flashtabs#flashtabs"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>FlashTabs</strong> — Flashcards in your new tab
                    screen
                  </a>
                </li>
                <li>
                  2015{" "}
                  <a
                    href="https://www.producthunt.com/products/howsitgoin#howsitgoin"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>HowsItGoin</strong> — Set questions and track your
                    answers over time
                  </a>
                </li>
                <li>
                  2013{" "}
                  <a
                    href="https://arethensawatchingme.com/"
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <strong>AreTheNSAWatchingMe.com</strong> – Yes, yes they are
                  </a>
                </li>
              </ul>
              <hr />
              <p>
                <Twemoji
                  emoji="👋🏼"
                  label="Waving hand"
                  size={18}
                  className="inline-block align-[-3px] mr-2"
                />
                Have an interesting opportunity?{" "}
                <a href="mailto:fred@fredrivett.com?subject=Work%20together%3F">
                  Reach out and say hi
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Main>
    </>
  );
};

export default Cv;
