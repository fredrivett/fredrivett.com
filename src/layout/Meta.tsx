import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { AppConfig } from "utils/AppConfig";
import { addTrailingSlash } from "utils/Url";

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
  post?: {
    image: string | null;
    date: string;
    modified_date: string;
  };
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  const fallbackImage = "/assets/images/posts/fallback.jpg";
  const imagePath =
    props.post &&
    `${AppConfig.url}${router.basePath}${props.post.image ?? fallbackImage}`;
  const title = `${props.title} | ${AppConfig.title}`;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
        <link rel="manifest" href={`${router.basePath}/site.webmanifest`} />
        <link
          rel="mask-icon"
          href={`${router.basePath}//safari-pinned-tab.svg`}
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#bca6c1" />
        <meta name="theme-color" content="#ffffff" />
        <title>{title}</title>
        <meta
          name="description"
          content={
            props.description ? props.description : AppConfig.description
          }
          key="description"
        />
        <meta name="author" content={AppConfig.author} key="author" />
        {props.canonical && (
          <link rel="canonical" href={props.canonical} key="canonical" />
        )}
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:description"
          content={
            props.description ? props.description : AppConfig.description
          }
          key="og:description"
        />
        <meta property="og:locale" content={AppConfig.locale} key="og:locale" />
        <meta
          property="og:site_name"
          content={AppConfig.site_name}
          key="og:site_name"
        />
        {props.post && (
          <>
            <meta property="og:type" content="article" key="og:type" />
            <meta property="og:image" content={imagePath} key="og:image" />
            <meta
              name="twitter:card"
              content="summary_large_image"
              key="twitter:card"
            />
            <meta
              property="article:published_time"
              content={new Date(props.post.date).toISOString()}
              key="article:published_time"
            />
            <meta
              property="article:modified_time"
              content={new Date(props.post.modified_date).toISOString()}
              key="article:modified_time"
            />
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
          {
            "description": "${
              props.description ? props.description : AppConfig.description
            }",
            "author": {
              "@type": "Person",
              "name": "${AppConfig.author}"
            },
            "@type": "BlogPosting",
            "url": "${AppConfig.url}${router.basePath}${addTrailingSlash(
                  router.asPath,
                )}",
            "publisher": {
              "@type": "Organization",
              "logo": {
                "@type": "ImageObject",
                "url": "${AppConfig.url}${
                  router.basePath
                }/assets/images/logo.png"
              },
              "name": "${AppConfig.author}"
            },
            "headline": "${title}",
            "image": ["${imagePath}"],
            "datePublished": "${new Date(props.post.date).toISOString()}",
            "dateModified": "${new Date(
              props.post.modified_date,
            ).toISOString()}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${AppConfig.url}${router.basePath}${addTrailingSlash(
                  router.asPath,
                )}"
            },
            "@context": "http://schema.org"
          }`,
              }}
              key="ldjson"
            />
          </>
        )}
      </Head>
    </>
  );
};

export { Meta };
