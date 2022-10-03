import React from "react";

import Link from "next/link";

import { BlogDate } from "blog/BlogDate";
import { PostItems } from "utils/Content";

export type IBlogGalleryProps = {
  posts: PostItems[];
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <h2 className="fs-2 lg:ml-40 lg:pl-2 c_pseudo-icon c_pseudo-icon--arrow">
      Latest
    </h2>

    <ul>
      {props.posts.map((post) => (
        <li
          key={post.slug}
          className="c_article-head c_article-head--list-view mb-3 flex"
        >
          <h2 className="fs-2 mb-2 lg:order-1">
            <Link
              href="/[year]/[month]/[day]/[titleSlug]"
              as={`/${post.year}/${post.month}/${post.day}/${post.titleSlug}`}
            >
              <a
                className="c_article-head__title"
                dangerouslySetInnerHTML={{ __html: post.title }}
              ></a>
            </Link>
          </h2>

          <BlogDate
            date={post.date}
            className="flex-shrink-0 fs-3 mr-2 lg:w-40 lg:text-right ml-auto lg:ml-0"
          />
        </li>
      ))}
    </ul>
  </>
);

export { BlogGallery };
