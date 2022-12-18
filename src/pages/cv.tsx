import React from "react";

import Container from "components/Container";
import { CvRole } from "components/CvRole";
import Tag from "components/Tag";
import Testimonial from "components/Testimonial";
import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

const Cv = () => (
  <>
    <Main
      meta={
        <Meta
          title="/CV"
          description="Senior Product-focussed Front-end Engineer, current go-to toolkit includes React, Vue, React Native, TypeScript, Styled Components & Tailwind."
        />
      }
    >
      <Container>
        <div className="flex flex-wrap -m-6">
          <div className="p-6 lg:w-2/5">
            <h2 className="lg:hidden">
              💬 Kind words from colleagues &amp; clients
            </h2>
            <div className="flex flex-col border-l-4 border-gray-300 lg:border-l-0 pl-4 lg:pl-0 last-mb-0 mb-8 lg:mb-0">
              <Testimonial
                cite={
                  <>
                    <img
                      alt="Photo of Dr. Philip Jones"
                      src="/people/philip-jones.jpg"
                      className="inline-block w-6 h-6 mr-1 rounded-full"
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
                      alt="Photo of Andrew McDonough"
                      src="/people/andrew-mcdonough.jpg"
                      className="inline-block w-6 h-6 mr-1 rounded-full"
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
                I first met Fred when I hired him as a front-end developer for
                TPO.{" "}
                <strong>
                  It was one of the best recruiting decisions I&apos;ve ever
                  made. I valued Fred&apos;s contributions so highly, that I
                  subsequently hired him to work with me at two other companies.
                </strong>{" "}
                He has a very good eye for design and amazing attention to
                detail. He has a strong product mindset, and having taken a
                number of his own products to market, has a deep understanding
                of the full product lifecycle. He is always thinking about what
                the customer wants and how to deliver the best value.{" "}
                <strong>
                  Fred is strong technically and always seems to be on the
                  cutting edge of front-end development tools and techniques.
                </strong>{" "}
                He has also been able to pick up unfamiliar technologies
                extremely quickly. For example, on the first project we worked
                on together, he had never worked with Ruby on Rails, but was
                able to quickly learn enough to collaborate with the backend
                developers, and even write some backend Ruby code himself.{" "}
                <strong>
                  Fred has strong collaboration skills and is a fantastic team
                  player.
                </strong>{" "}
                He always seems to get on with everyone on the team and is happy
                to work with people across all functions and levels.
              </Testimonial>
              <Testimonial
                className="print:mb-12" // add some extra space to push next testimonial onto own page
                cite={
                  <>
                    <img
                      alt="Photo of Tony Walmsley"
                      src="/people/tony-walmsley.jpg"
                      className="inline-block w-6 h-6 mr-1 rounded-full"
                    />
                    <a
                      href="https://www.linkedin.com/in/tony-walmsley-8540732/"
                      target="_blank"
                      rel="nofollow noreferrer"
                    >
                      Tony Walmsley
                    </a>{" "}
                    (Experienced Software Engineer)
                  </>
                }
              >
                <strong>
                  This is the second time I have worked with Fred and I&apos;m
                  hoping there will be a third, and a fourth&hellip;
                </strong>{" "}
                As the front-end developer for our prototype application Fred
                produced a very clean and functional UI that integrated very
                smoothly with the REST API that I was developing.{" "}
                <strong>
                  The end result went beyond our end client&apos;s expectations
                </strong>
                , providing a useful business function as well as being a
                platform for eliciting the &lsquo;real&rsquo; user requirements,
                and it was put together in only 6 weeks using React and NextJS
                in TypeScript. Fred works well remotely and independently as
                well as in-office, and maintained forward momentum throughout
                the project.{" "}
                <strong>
                  I seriously doubt our project would have been so successful
                  without his work.
                </strong>
              </Testimonial>
              <Testimonial
                cite={
                  <>
                    <img
                      alt="Photo of Thayer Prime"
                      src="/people/thayer-prime.jpg"
                      className="inline-block w-6 h-6 mr-1 rounded-full"
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
                  I love working with Fred - he&apos;s a definite go to any time
                  I have a front end contract that needs a safe, grown up pair
                  of hands to really get in and deliver, he&apos;s the guy.
                </strong>{" "}
                I know I can match him to any client and they will be grateful
                having had him on their project. I would recommend him for any
                gig, but especially those where you just need a really nice
                personable human to come in, get stuff done, and be really cool
                to work with.{" "}
                <strong>
                  If you manage to get him count yourself lucky, he&apos;s often
                  busy due to his excellent reputation. A++ strong recommend
                  from me!
                </strong>
              </Testimonial>
            </div>
          </div>
          <div className="p-6 lg:w-3/5">
            <div className="flex items-center mb-2">
              <img
                alt="Photo of Dr. Philip Jones"
                src="/assets/images/fredrivett.jpg"
                className="inline-block w-14 h-14 mr-1 rounded-full"
              />
              <span className="fs-2 text-gray-500">/CV</span>
            </div>
            <h1 className="fs-0 mb-2 leading-none">Fred Rivett</h1>
            <p className="fs-4">Senior Product-focussed Front-end Engineer.</p>
            <p>
              Passionate about building sane, maintainable systems with a keen
              eye for design. Fascinated by the challenge of making something
              great that improves users lives. Able to lead across a wide
              spectrum or narrowly focus on code alone.
            </p>
            <p>
              Current go-to toolkit includes React, Vue, React Native,
              TypeScript, Styled Components &amp; Tailwind.
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
            <p>
              <strong className="inline-block bg-yellow-100 text-yellow-600 px-3 py-2 lg:px-4 rounded-xl md:rounded-full">
                Available for contract opportunities (from&nbsp;Q3&nbsp;2023)
              </strong>
            </p>
            <p>
              <Tag>🇬🇧 London / 🌍 Remote</Tag>
            </p>

            <hr />

            <ul className="o_bordered-list print:break-inside-avoid-page">
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

            <h2 id="experience">👨🏻‍💻 Experience</h2>

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

            <h2 id="side-projects">🎨 Side projects</h2>
            <p>
              Side projects are how I got into tech in the first place, hacking
              away in my spare time. Here&apos;s a selection of some of the
              projects I&apos;ve launched:
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
                  [Apr 1] Stories as a Service — Add stories to your website
                  with 1 line of code
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
                  LearningToLaunch — Short e-book on how to launch your first
                  side project
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
                  FoundersKit — $6k of discounts for the best startup tools for
                  only $39
                </a>
              </li>
              <li>
                2015{" "}
                <a
                  href="https://www.producthunt.com/products/the-working-lunch#the-working-lunch"
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  The Working Lunch — Daily newsletter with resources for
                  startup founders
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
              <li>
                2013{" "}
                <a
                  href="https://arethensawatchingme.com/"
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  AreTheNSAWatchingMe.com – Yes, yes they are
                </a>
              </li>
            </ul>
            <hr />
            <p>
              👋🏼 Have an interesting opportunity?{" "}
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

export default Cv;
