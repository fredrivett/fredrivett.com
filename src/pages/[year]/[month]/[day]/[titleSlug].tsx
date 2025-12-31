import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { BlogDate } from "blog/BlogDate";
import { Meta } from "layout/Meta";
import { Main } from "templates/Main";

import Container from "components/Container";
import EmailSubscribe from "components/EmailSubscribe";
import { ExternalLink } from "components/ExternalLink";
import { HeadingIdProvider } from "components/heading-id-context";
import { HeadingLink } from "components/HeadingLink";
import { TableOfContents } from "components/TableOfContents";
import Tweet from "components/Tweet";

import { getAllPosts, getPostSlug, getPostBySlug } from "utils/Content";

type IPostUrl = {
  titleSlug: string;
  year: string;
  month: string;
  day: string;
};

type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string | null;
  mdxSource: MDXRemoteSerializeResult;
  tableOfContents: boolean;
};

const DisplayPost = (props: IPostProps) => {
  // Generate dynamic OG image URL
  const ogImageUrl = `/api/og?title=${encodeURIComponent(
    props.title,
  )}&date=${encodeURIComponent(props.date)}`;

  const showToc = props.tableOfContents;

  return (
    <Main
      className="text-lg py-4 md:py-8 lg:py-16"
      meta={
        <Meta
          title={props.title}
          description={props.description}
          post={{
            image: props.image || ogImageUrl,
            date: props.date,
            modified_date: props.modified_date,
          }}
        />
      }
    >
      <HeadingIdProvider>
        <div
          className={
            showToc
              ? "flex flex-col mx-auto px-4 sm:px-8 box-content max-w-prose lg:max-w-6xl lg:grid lg:grid-cols-[1fr_20rem] lg:gap-12"
              : undefined
          }
        >
          <Container maxWidth={showToc ? undefined : "prose"}>
            <div className="flex items-end gap-4 mb-1">
              <BlogDate date={props.date} />
              <div data-herenow></div>
            </div>
            <h1>{props.title}</h1>

            <div className="blog-post">
              <MDXRemote
                {...props.mdxSource}
                components={{
                  EmailSubscribe,
                  Tweet,
                  h1: ({ children }) => (
                    <HeadingLink level={1}>{children}</HeadingLink>
                  ),
                  h2: ({ children }) => (
                    <HeadingLink level={2}>{children}</HeadingLink>
                  ),
                  h3: ({ children }) => (
                    <HeadingLink level={3}>{children}</HeadingLink>
                  ),
                  h4: ({ children }) => (
                    <HeadingLink level={4}>{children}</HeadingLink>
                  ),
                  h5: ({ children }) => (
                    <HeadingLink level={5}>{children}</HeadingLink>
                  ),
                  h6: ({ children }) => (
                    <HeadingLink level={6}>{children}</HeadingLink>
                  ),
                  a: ExternalLink,
                }}
              />
            </div>

            <hr />

            <div className="text-gray-600 dark:text-gray-500">
              <p>
                If you liked this post or have any thoughts, feel free to ping
                me on twitter:
              </p>
              <p>
                <a
                  href="https://twitter.com/fredrivett"
                  rel="norefferer noreferrer"
                  target="_blank"
                  className="inline-flex items-center self-start"
                >
                  <span className="flex mx-1.5">
                    <Image
                      src="/assets/images/fredrivett.jpg"
                      alt="Fred Rivett's face"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </span>
                  @fredrivett
                </a>
              </p>
            </div>

            <EmailSubscribe className="mt-4" />
          </Container>
          {showToc && (
            <aside className="-order-1 lg:order-2 mb-12 p-4 bg-gray-50 dark:bg-gray-900/50 lg:mb-0 lg:p-0 lg:pt-12 lg:bg-transparent lg:dark:bg-transparent lg:rounded-none">
              <div className="lg:sticky lg:top-24">
                <TableOfContents />
              </div>
            </aside>
          )}
        </div>
      </HeadingIdProvider>
    </Main>
  );
};

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(["year", "month", "day", "titleSlug"]);

  return {
    paths: posts.map((post) => ({
      params: {
        year: post.year as string,
        month: post.month as string,
        day: post.day as string,
        titleSlug: post.titleSlug as string,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
  params,
}) => {
  const { year, month, day, titleSlug } = params!;
  const slug = getPostSlug({ year, month, day, titleSlug });
  const post = getPostBySlug(slug, [
    "title",
    "description",
    "date",
    "modified_date",
    "image",
    "content",
    "slug",
    "tableOfContents",
  ]);

  const mdxSource = await serialize((post.content as string) || "", {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
  });

  return {
    props: {
      title: post.title as string,
      description: post.description as string,
      date: post.date as string,
      modified_date: (post.modified_date ?? post.date) as string,
      image: (post.image as string) ?? null,
      mdxSource,
      tableOfContents:
        post.tableOfContents === true || post.tableOfContents === "true",
    },
  };
};

export default DisplayPost;
