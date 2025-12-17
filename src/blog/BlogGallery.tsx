import React from "react";

import Link from "next/link";

import { BlogDate } from "blog/BlogDate";

import PseudoIcon from "components/PseudoIcon";

import { PostItems } from "utils/Content";

export type IBlogGalleryProps = {
  posts: PostItems[];
};

const MOST_POPULAR_SLUG = "becoming-the-person-who-does-the-thing";

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <h2 className="fs-2 lg:ml-40 lg:pl-2">
      <PseudoIcon icon="arrow">Latest</PseudoIcon>
    </h2>

    <ul>
      {props.posts.map((post) => {
        const isMostPopular = post.titleSlug === MOST_POPULAR_SLUG;

        return (
          <li key={post.slug} className="flex mb-3">
            <h2 className="relative fs-2 mb-2 mr-2 lg:ml-0 lg:order-1">
              <Link
                href="/[year]/[month]/[day]/[titleSlug]"
                as={`/${post.year}/${post.month}/${post.day}/${post.titleSlug}`}
                className="c_article-head__title"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              {isMostPopular && (
                <span
                  className="hidden sm:flex absolute top-6 -translate-y-full left-full ml-2 lg:-right-5 flex-col items-start"
                  aria-hidden="true"
                >
                  <span className="ml-6 text-base italic font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap mb-1.5 select-none">
                    most read
                  </span>
                  <svg
                    width="84"
                    height="70"
                    viewBox="0 0 84 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-8 text-gray-400 dark:text-gray-600"
                  >
                    <path
                      d="M80.8184 0.307129C77.3184 34.3071 56.8184 65.3071 3.31836 51.3071"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                    <path
                      d="M12.8184 68.3071L3.81836 51.342L18.3184 39.8071"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                  </svg>
                </span>
              )}
            </h2>

            <BlogDate
              date={post.date}
              className="flex-shrink-0 fs-4 mr-2 lg:w-40 lg:text-right ml-auto lg:ml-0"
            />
          </li>
        );
      })}
    </ul>
  </>
);

export { BlogGallery };
