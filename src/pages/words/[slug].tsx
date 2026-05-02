import React from "react";

import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import remarkGfm from "remark-gfm";

import { Meta } from "layout/Meta";
import { isAuthedFromCookieHeader } from "lib/words-auth";
import { Main } from "templates/Main";

import Container from "components/Container";
import { ExternalLink } from "components/ExternalLink";

import { getWordBySlug } from "utils/Words";
import { WordVisibility } from "utils/words-shared";

type Props = {
  slug: string;
  date: string;
  time: string;
  wordCount: number;
  visibility: WordVisibility;
  title: string | null;
  mdxSource: MDXRemoteSerializeResult;
};

const WordPage = (props: Props) => {
  const dateLabel = props.date
    ? format(new Date(`${props.date}T00:00:00Z`), "EEEE d MMMM yyyy")
    : "";
  const headingTitle = props.title || dateLabel;
  const metaTitle = props.title
    ? `${props.title} · /words`
    : `/words/${props.slug}`;

  return (
    <Main
      className="text-lg py-4 md:py-8 lg:py-16"
      meta={<Meta title={metaTitle} description="A daily writing entry" />}
    >
      <Container maxWidth="prose">
        <p className="mb-2">
          <Link href="/words">← Words</Link>
        </p>
        <div className="text-sm opacity-60 mb-1">
          {dateLabel} · {props.time} · {props.wordCount} words
          {props.visibility === "private" && (
            <span className="ml-2 uppercase tracking-wide">private</span>
          )}
        </div>
        <h1 className="mb-6">{headingTitle}</h1>
        <div className="blog-post c_blog-content">
          <MDXRemote {...props.mdxSource} components={{ a: ExternalLink }} />
        </div>
      </Container>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  req,
  res,
}) => {
  const slug = String(params?.slug ?? "");
  const entry = getWordBySlug(slug);
  if (!entry) {
    return { notFound: true };
  }

  if (entry.visibility === "private") {
    const authed = await isAuthedFromCookieHeader(req.headers.cookie);
    if (!authed) {
      return { notFound: true };
    }
    res.setHeader("Cache-Control", "no-store");
  }

  const mdxSource = await serialize(entry.content, {
    mdxOptions: { remarkPlugins: [remarkGfm] },
  });

  return {
    props: {
      slug: entry.slug,
      date: entry.date,
      time: entry.time,
      wordCount: entry.wordCount,
      visibility: entry.visibility,
      title: entry.title,
      mdxSource,
    },
  };
};

export default WordPage;
