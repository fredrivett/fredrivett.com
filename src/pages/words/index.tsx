import React from "react";

import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { Meta } from "layout/Meta";
import { isAuthedFromCookieHeader } from "lib/words-auth";
import { Main } from "templates/Main";

import Container from "components/Container";
import FredHead from "components/FredHead";

import { getAllWordsMeta, getWordsStats } from "utils/Words";
import { WORDS_GOAL, WordEntryMeta, WordsStats } from "utils/words-shared";

type Props = {
  entries: WordEntryMeta[];
  stats: WordsStats;
  authed: boolean;
};

const StatBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="fs-2 leading-none">{value}</div>
    <div className="text-xs uppercase tracking-wide opacity-50 mt-1">
      {label}
    </div>
  </div>
);

const WordsIndex = ({ entries, stats, authed }: Props) => (
  <Main meta={<Meta title="/words" description="Daily writing log" />}>
    <Container maxWidth="md">
      <div className="mb-4">
        <FredHead title="words" />
        <p className="opacity-50 mb-8">
          Daily writing — at least {WORDS_GOAL} words a day, most days.
          {authed && (
            <>
              {" "}
              <Link href="/words/new">Write a new entry →</Link>
            </>
          )}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          <StatBlock
            label="Total words"
            value={stats.totalWords.toLocaleString()}
          />
          <StatBlock label="Entries" value={String(stats.totalEntries)} />
          <StatBlock label="Days written" value={String(stats.daysWritten)} />
          <StatBlock label="Avg / entry" value={String(stats.averageWords)} />
        </div>

        <hr />

        {entries.length === 0 ? (
          <p className="opacity-60 mt-8">No entries yet.</p>
        ) : (
          <ul className="list-none pl-0 mt-6">
            {entries.map((e) => {
              const isPrivate = e.visibility === "private";
              const isHidden = isPrivate && !authed;
              const dateLabel = e.date
                ? format(new Date(`${e.date}T00:00:00Z`), "EEE d MMM yyyy")
                : "";
              const titleNode = isHidden ? (
                <span className="opacity-60">Private entry</span>
              ) : (
                <Link href={`/words/${e.slug}`}>{e.title || dateLabel}</Link>
              );
              return (
                <li
                  key={e.slug}
                  className="py-3 border-b border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-sm opacity-60">
                        {dateLabel} · {e.time}
                      </div>
                      <div className="truncate">
                        {titleNode}
                        {isPrivate && (
                          <span className="ml-2 text-xs uppercase tracking-wide opacity-50">
                            private
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm tabular-nums opacity-70 shrink-0">
                      {e.wordCount} words
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Container>
  </Main>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const authed = await isAuthedFromCookieHeader(req.headers.cookie);
  const all = getAllWordsMeta();
  const stats = getWordsStats(all);
  const entries = authed
    ? all
    : all.map((e) => (e.visibility === "private" ? { ...e, title: null } : e));
  return { props: { entries, stats, authed } };
};

export default WordsIndex;
