import React from "react";

import { LibrarySquare, ExternalLink } from "lucide-react";
import Link from "next/link";

import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

import Container from "components/Container";
import FredHead from "components/FredHead";
import SiteCounter from "components/SiteCounter";

const ShelfAbout = () => (
  <Main
    meta={
      <Meta
        title="About /shelf pages"
        description="What is a /shelf page and how to create one on your website"
      />
    }
  >
    <Container maxWidth="md">
      <div className="mb-8 md:mb-12 lg:mb-16">
        <FredHead title="shelf-page" after={<SiteCounter />} />
        <h1 className="fs-0 mb-4 leading-none">What is a /shelf page?</h1>

        <div className="space-y-6 text-base leading-relaxed">
          <p>
            A <strong>/shelf page</strong> is a curated collection of books,
            articles, quotes, podcasts, and other media that have significantly
            shaped your thinking or that you highly recommend to others.
          </p>

          <p>
            Think of it as your personal lending library—the items you&apos;d
            want to share with friends, return to regularly, or that represent
            important threads in the tapestry of your intellectual and personal
            development.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <LibrarySquare
                className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Why create a /shelf page?
                </h3>
                <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1 mb-0">
                  <li>
                    • Share your most impactful recommendations with others
                  </li>
                  <li>• Create a personal reference of meaningful content</li>
                  <li>
                    • Help friends discover things that might resonate with them
                  </li>
                  <li>
                    • Document what has influenced your thinking over time
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            How to create your own /shelf page
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Choose your format</h3>
              <p className="text-sm opacity-80 ml-4">
                Organize by category (books, articles, podcasts) or by theme.
                Consider adding ratings or &quot;number of copies&quot; as a
                recommendation strength indicator.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Be selective</h3>
              <p className="text-sm opacity-80 ml-4">
                Don&apos;t list everything you&apos;ve consumed—focus on what
                you&apos;d actually lend to friends or return to yourself.
                Quality over quantity.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Add context</h3>
              <p className="text-sm opacity-80 ml-4">
                Brief descriptions help visitors understand why each item
                matters to you and whether it might resonate with them.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">
                4. Include links when possible
              </h3>
              <p className="text-sm opacity-80 ml-4">
                Link to where people can find the content—bookstores, articles,
                podcast episodes, or your reading tracker.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">5. Keep it updated</h3>
              <p className="text-sm opacity-80 ml-4">
                Include a last updated date. Your shelf should evolve as you
                discover new meaningful content.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            Example /shelf pages
          </h2>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="space-y-3">
              <div>
                <Link
                  href="/shelf"
                  className="inline-flex items-center gap-1 font-medium"
                >
                  fredrivett.com/shelf <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>

          <hr />

          <h2 className="text-lg font-semibold mb-3">Share your /shelf page</h2>
          <p className="text-sm opacity-75">
            Created your own /shelf page?{" "}
            <a href="mailto:fred@fredrivett.com?subject=My%20/shelf%20page">
              Send me the link
            </a>{" "}
            and I&apos;ll consider featuring it here as an example for others.
          </p>

          <div className="text-xs opacity-50 pt-4">
            <p>
              Inspired by Derek Sivers&apos;{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="nofollow noreferrer"
              >
                /now pages movement
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Container>
  </Main>
);

export default ShelfAbout;
