import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";

import { BlogDate } from "../../blog/BlogDate";
import { Meta } from "../../layout/Meta";
import { Nav } from "../../navigation/Nav";
import { Main } from "../../templates/Main";
import { getAllPosts, getPostBySlug } from "../../utils/Content";
import { markdownToHtml } from "../../utils/Markdown";

type IPostUrl = {
  slug: string;
};

type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string | null;
  content: string;
};

const DisplayPost = (props: IPostProps) => (
  <>
    <Nav />
    <Main
      className="py-4 md:py-8 lg:py-16 max-w-prose"
      meta={
        <Meta
          title={props.title}
          description={props.description}
          post={{
            image: props.image,
            date: props.date,
            modified_date: props.modified_date,
          }}
        />
      }
    >
      <BlogDate date={props.date} />
      <h1>{props.title}</h1>

      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: props.content }}
        className="c_blog-content"
      />
    </Main>
  </>
);

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
  params,
}) => {
  const post = getPostBySlug(params!.slug, [
    "title",
    "description",
    "date",
    "modified_date",
    "image",
    "content",
    "slug",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      title: post.title,
      description: post.description,
      date: post.date,
      modified_date: post.modified_date ?? post.date,
      image: post.image ?? null,
      content,
    },
  };
};

export default DisplayPost;
