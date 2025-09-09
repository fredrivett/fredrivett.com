import React from "react";

import { format } from "date-fns";
import { LibrarySquare } from "lucide-react";

import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

import Container from "components/Container";
import FredHead from "components/FredHead";
import Tooltip from "components/Tooltip";

interface ShelfItem {
  title: string;
  by: string;
  url?: string;
  description?: string;
  copies?: number;
}

interface ShelfSection {
  title: string;
  emoji: string;
  items: ShelfItem[];
}

const sections: Record<string, ShelfSection> = {
  books: {
    title: "Books",
    emoji: "📚",
    items: [
      {
        title: "Falling Upward",
        by: "Richard Rohr",
        description:
          "A remarkable book about the two halves of life. Marmite, if it's for you, it's for you. It was for me.",
        url: "https://literal.club/fredrivett/book/falling-upward-x7mqz",
        copies: 3,
      },
      {
        title: "When Breath Becomes Air",
        by: "Paul Kalanithi",
        description:
          "A beautifully touching book, written as only a gifted author, dying, could.",
        url: "https://literal.club/fredrivett/book/when-breath-becomes-air-md8wf",
        copies: 2,
      },
      {
        title: "Ready Player One",
        by: "Ernest Cline",
        description:
          "A gripping story of the ultimate computer game, recommended by someone who doesn't like fiction or sci-fi.",
        url: "https://literal.club/fredrivett/book/ernest-cline-ready-player-one-jbunr",
        copies: 2,
      },
      {
        title: "Deep Work",
        by: "Cal Newport",
        description:
          "A foundational book on getting meaningful work done without the wastage of performance theatre.",
        url: "https://literal.club/fredrivett/book/cal-newport-deep-work-0dq3b",
        copies: 2,
      },
      {
        title: "The Power of Habit",
        by: "Charles Duhigg",
        description:
          "A wonderfully easy, insightful read on how habits are built. Changed my life.",
        url: "https://literal.club/fredrivett/book/charles-duhiggthe-power-of-habit-kmimy",
        copies: 2,
      },
      {
        title: "Why Greatness Cannot Be Planned",
        by: "Kenneth O. Stanley",
        description:
          "An averagely written book with a formative message, life is as much discovery as creation.",
        url: "https://literal.club/fredrivett/book/why-greatness-cannot-be-planned-jiyqf",
        copies: 1,
      },
    ],
  },
  articles: {
    title: "Articles",
    emoji: "📝",
    items: [
      {
        title: "What if you tried hard?",
        by: "Aaron Francis",
        description:
          "This one's living rent free in my head. Am I trying hard enough?",
        url: "https://aaronfrancis.com/2024/what-if-you-tried-hard-dac139a5",
        copies: 1,
      },
    ],
  },
  quotes: {
    title: "Quotes",
    emoji: "💬",
    items: [
      {
        title: "People like us do things like this",
        by: "Seth Godin",
        url: "https://seths.blog/2013/07/people-like-us-do-stuff-like-this/",
        copies: 3,
      },
      {
        title:
          "Every action you take is a vote for the type of person you wish to become",
        by: "James Clear",
        url: "https://jamesclear.com/quotes/every-action-you-take-is-a-vote-for-the-type-of-person-you-wish-to-become",
        copies: 3,
      },
      {
        title: "May your choices reflect your hopes, not your fears",
        by: "Nelson Mandela",
        copies: 3,
      },
    ],
  },
  podcasts: {
    title: "Podcasts",
    emoji: "🎙️",
    items: [
      {
        title: "Introduction to VIEW",
        by: "The Art of Accomplishment",
        description:
          "A wonderfully insightful episode into the mindset that sells without selling.",
        url: "https://open.spotify.com/episode/6Vk6v45W46usIh0QUTOh88?si=cc2bb167ade7458e",
        copies: 2,
      },
      {
        title: "Unedited: Joel Houston",
        by: "Joel Houston",
        description:
          "A raw chat about harder times in life, put me onto Richard Rohr's Falling Upward.",
        url: "https://relevantmagazine.com/podcast/episode-15-hillsong-uniteds-joel-houston/",
        copies: 1,
      },
    ],
  },
};

const Shelf = () => (
  <Main
    meta={
      <Meta
        title="/shelf"
        description="Books, articles, movies and other things that have shaped me or I highly recommend"
      />
    }
  >
    <Container maxWidth="md">
      <div className="mb-8 md:mb-12 lg:mb-16">
        <FredHead title="shelf" />
        <h1 className="fs-0 mb-1 leading-none">My shelf</h1>
        <p className="mb-4">
          If I could only have a few things to regularly return to and lend to
          friends, these would be on it. Some of the threads of my tapestry.
        </p>
        <p className="opacity-50">
          <em>Updated: {format(new Date("2025-09-09"), "do MMMM yyyy")}</em>
        </p>
        <p className="vertical-center bg-blue-100 dark:bg-blue-900/20 rounded-md px-4 py-3 text-blue-600 dark:text-blue-400 text-sm inline-block">
          <LibrarySquare size={18} className="inline-flex -mt-0.5 opacity-80" />{" "}
          <em>
            &mdash; how many copies are on my shelf (how highly I recommend it,
            ~michelin stars)
          </em>
        </p>
      </div>
    </Container>

    <div className="px-6 md:px-10 lg:px-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 lg:gap-12/20">
        {Object.entries(sections).map(([key, section]) => (
          <div key={key}>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className="text-2xl">{section.emoji}</span>
              {section.title}
            </h2>

            <div className="space-y-4 lg:space-y-6">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-800 pb-4 lg:pb-6 [&>*:last-child]:mb-0 last:border-b-0"
                >
                  <h3 className="inline-block text-lg font-medium mb-1.5">
                    {(() => {
                      const titleContent =
                        section.title === "Quotes" ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `&ldquo;${item.title}&rdquo;`,
                            }}
                          />
                        ) : (
                          item.title
                        );

                      return item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="nofollow noreferrer"
                        >
                          {titleContent}
                        </a>
                      ) : (
                        titleContent
                      );
                    })()}{" "}
                    {item.copies && (
                      <Tooltip
                        content={(() => {
                          if (item.copies === 3) return "Foundational";
                          if (item.copies === 2) return "Highly recommended";
                          return "Recommended";
                        })()}
                        className="inline-flex items-center gap-0.5 cursor-help"
                      >
                        {Array.from({ length: item.copies }, (_, i) => (
                          <LibrarySquare
                            key={i}
                            size={14}
                            className="text-blue-500 opacity-50"
                          />
                        ))}
                      </Tooltip>
                    )}
                  </h3>

                  {item.by && (
                    <p className="text-xs opacity-75 mb-2">&mdash; {item.by}</p>
                  )}

                  {item.description && (
                    <p className="text-sm">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Container maxWidth="md">
        <hr className="my-8 md:mt-16 lg:mt-24" />
        <p className="text-sm opacity-75">
          This is a curated list that I update from time to time. If you have
          recommendations,{" "}
          <a href="mailto:fred@fredrivett.com?subject=Shelf%20recommendation">
            drop me a line
          </a>
          .
        </p>
      </Container>
    </div>
  </Main>
);

export default Shelf;
