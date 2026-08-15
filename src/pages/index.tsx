import React from "react";

import { GetStaticProps } from "next";

import { BlogGallery, IBlogGalleryProps } from "blog/BlogGallery";
import { Meta } from "layout/Meta";
import { fetchHnSubmissions, HN_MIN_POINTS, hnPathKey } from "lib/hackernews";
import { enrichProjects, type EnrichedProject } from "lib/projects";
import { Main } from "templates/Main";

import ArchivedToggle from "components/ArchivedToggle";
import Container from "components/Container";
import EmailSubscribe from "components/EmailSubscribe";
import ProjectsList from "components/ProjectsList";
import PseudoIcon from "components/PseudoIcon";
import SiteCounter from "components/SiteCounter";
import { useProjectsFilter } from "components/useProjectsFilter";

import { AppConfig } from "utils/AppConfig";
import { getAllPosts } from "utils/Content";

type IndexProps = IBlogGalleryProps & {
  projects: EnrichedProject[];
};

const Index = (props: IndexProps) => {
  const { showArchived, setShowArchived, archivedCount, filtered } =
    useProjectsFilter(props.projects);

  return (
    <Main meta={<Meta title="Hey there" description={AppConfig.description} />}>
      <Container maxWidth="xl">
        <div className="mb-8 max-w-screen-md">
          <h2>
            <PseudoIcon icon="happy">Hey there</PseudoIcon>
          </h2>
          <p>
            I&rsquo;m{" "}
            <a
              className="inline-flex items-center gap-1.5 align-middle whitespace-nowrap no-underline pl-1 pr-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 transition"
              href="https://twitter.com/fredrivett"
              rel="nofollow noreferrer"
              target="_blank"
            >
              <img
                alt="Photo of me (Fred)"
                src="/assets/images/fredrivett.jpg"
                className="inline-block w-6 h-6 rounded-full"
              />
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
          <p>Senior [Founding/Product/Design/Fullstack] Engineer.</p>
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
          <div className="lg:w-2/5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="fs-2 m-0">Projects</h2>
              <ArchivedToggle
                showArchived={showArchived}
                archivedCount={archivedCount}
                onToggle={setShowArchived}
              />
            </div>
            <ProjectsList projects={filtered} />
          </div>
          <div className="mt-12 lg:mt-0 lg:w-3/5">
            <BlogGallery posts={props.posts} />
          </div>
        </div>
      </Container>
    </Main>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const rawPosts = getAllPosts(["title", "date", "slug"]);
  const [projects, hnSubmissions] = await Promise.all([
    enrichProjects(),
    fetchHnSubmissions(),
  ]);

  const posts = rawPosts.map((post) => {
    const path = `/${post.year}/${post.month}/${post.day}/${post.titleSlug}`;
    const story = hnSubmissions.get(hnPathKey(path));
    if (!story || story.points < HN_MIN_POINTS) return post;
    return { ...post, hnStoryId: story.storyId, hnPoints: story.points };
  });

  return {
    props: {
      posts,
      projects,
    },
    revalidate: 3600,
  };
};

export default Index;
