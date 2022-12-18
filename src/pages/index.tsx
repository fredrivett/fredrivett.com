import React from "react";

import { GetStaticProps } from "next";
import Link from "next/link";

import { BlogGallery, IBlogGalleryProps } from "blog/BlogGallery";
import Container from "components/Container";
import { Meta } from "layout/Meta";
import { Main } from "templates/Main";
import { AppConfig } from "utils/AppConfig";
import { getAllPosts } from "utils/Content";

const Index = (props: IBlogGalleryProps) => (
  <Main meta={<Meta title="Hey there" description={AppConfig.description} />}>
    <Container maxWidth="md">
      <div className="mb-4">
        <h2 className="c_pseudo-icon c_pseudo-icon--happy">Hey there</h2>
        <p>
          I&rsquo;m{" "}
          <a
            href="https://twitter.com/fredrivett"
            rel="nofollow noreferrer"
            target="_blank"
          >
            Fred
          </a>{" "}
          and I like to{" "}
          <a
            href="https://www.producthunt.com/@fredrivett"
            rel="nofollow noreferrer"
            target="_blank"
          >
            make stuff
          </a>
          . I also{" "}
          <a
            href="https://github.com/fredrivett"
            rel="nofollow noreferrer"
            target="_blank"
          >
            code
          </a>
          ,{" "}
          <a
            href="https://medium.com/@fredrivett"
            rel="nofollow noreferrer"
            target="_blank"
          >
            write
          </a>{" "}
          and{" "}
          <a
            href="https://unsplash.com/@fredrivett"
            rel="nofollow noreferrer"
            target="_blank"
          >
            take photos
          </a>
          .
        </p>
        <p>Senior Product-focussed Front-end Engineer.</p>
        <p>
          <Link href="/cv">
            <a>
              <strong>
                Available for contract opportunities (from Q3 2023)
              </strong>
            </a>
          </Link>
          .
        </p>
      </div>

      <BlogGallery posts={props.posts} />
    </Container>
  </Main>
);

export const getStaticProps: GetStaticProps<IBlogGalleryProps> = async () => {
  const posts = getAllPosts(["title", "date", "slug"]);

  return {
    props: {
      posts,
    },
  };
};

export default Index;
