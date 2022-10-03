import React from "react";

import Link from "next/link";

import { PostItems } from "../utils/Content";
import { BlogDate } from "./BlogDate";

export type IBlogGalleryProps = {
  posts: PostItems[];
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <h2 className="fs-2 lg:ml-40 lg:pl-2 c_pseudo-icon c_pseudo-icon--arrow">
      Latest
    </h2>

    <ul>
      {props.posts.map((elt) => (
        <li
          key={elt.slug}
          className="c_article-head c_article-head--list-view mb-3 flex"
        >
          <h2 className="fs-2 mb-2 lg:order-1">
            <Link href="/posts/[slug]" as={`/posts/${elt.slug}`}>
              <a
                className="c_article-head__title"
                dangerouslySetInnerHTML={{ __html: elt.title }}
              ></a>
            </Link>
          </h2>

          <BlogDate
            date={elt.date}
            className="flex-shrink-0 fs-3 mr-2 lg:w-40 lg:text-right ml-auto lg:ml-0"
          />
        </li>
      ))}
    </ul>
  </>
);

export { BlogGallery };
