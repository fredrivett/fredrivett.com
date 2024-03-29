import React from "react";

import Link from "next/link";

import { BlogDate } from "blog/BlogDate";

import PseudoIcon from "components/PseudoIcon";

import { PostItems } from "utils/Content";

export type IBlogGalleryProps = {
  posts: PostItems[];
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <h2 className="fs-2 lg:ml-40 lg:pl-2">
      <PseudoIcon icon="arrow">Latest</PseudoIcon>
    </h2>

    <ul>
      {props.posts.map((post) => (
        <li key={post.slug} className="flex mb-3">
          <h2 className="fs-2 mb-2 mr-2 lg:ml-0 lg:order-1">
            <Link
              href="/[year]/[month]/[day]/[titleSlug]"
              as={`/${post.year}/${post.month}/${post.day}/${post.titleSlug}`}
              className="c_article-head__title"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </h2>

          <BlogDate
            date={post.date}
            className="flex-shrink-0 fs-4 mr-2 lg:w-40 lg:text-right ml-auto lg:ml-0"
          />
        </li>
      ))}
    </ul>
  </>
);

export { BlogGallery };
