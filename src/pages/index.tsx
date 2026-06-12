import React from "react";

import { GetStaticProps } from "next";

import { BlogGallery, IBlogGalleryProps } from "blog/BlogGallery";
import { Meta } from "layout/Meta";
import { enrichProjects, type EnrichedProject } from "lib/projects";
import { Main } from "templates/Main";

import Container from "components/Container";
import EmailSubscribe from "components/EmailSubscribe";
import ProjectsList from "components/ProjectsList";
import PseudoIcon from "components/PseudoIcon";
import SiteCounter from "components/SiteCounter";
import Twemoji from "components/Twemoji";

import { AppConfig } from "utils/AppConfig";
import { getAllPosts } from "utils/Content";

type IndexProps = IBlogGalleryProps & {
  projects: EnrichedProject[];
};

const Index = (props: IndexProps) => (
  <Main meta={<Meta title="Hey there" description={AppConfig.description} />}>
    <Container maxWidth="xl">
      <div className="mb-8 max-w-screen-md">
        <h2>
          <PseudoIcon icon="happy">Hey there</PseudoIcon>
        </h2>
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
        <p>Senior Product Engineer.</p>
        <p className="mb-0">
          <em>
            now: Senior Product Engineer @{" "}
            <a
              href="https://gptzero.me"
              rel="nofollow noreferrer"
              target="_blank"
            >
              GPTZero
            </a>
          </em>
        </p>
        <p>
          <em>
            prev: Founding Engineer @{" "}
            <a
              href="https://lex.page"
              rel="nofollow noreferrer"
              target="_blank"
            >
              Lex
            </a>
          </em>
        </p>

        <SiteCounter className="mt-4" />

        <EmailSubscribe className="mt-8" />
      </div>

      <div className="lg:flex lg:gap-12">
        <div className="lg:w-3/5">
          <BlogGallery posts={props.posts} />
        </div>
        <div className="mt-12 lg:mt-0 lg:w-2/5">
          <h2 className="fs-2 mb-4">
            <Twemoji
              emoji="🚀"
              label="Rocket"
              size={24}
              className="inline-block mr-2 align-baseline"
            />
            Projects
          </h2>
          <ProjectsList projects={props.projects} />
        </div>
      </div>
    </Container>
  </Main>
);

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const posts = getAllPosts(["title", "date", "slug"]);
  const projects = await enrichProjects();

  return {
    props: {
      posts,
      projects,
    },
    revalidate: 3600,
  };
};

export default Index;
