/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const remarkGfm = require("remark-gfm");
const rehypeHighlight = require("rehype-highlight");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

const baseUrl = "";

module.exports = withMDX(
  withBundleAnalyzer({
    poweredByHeader: false,
    trailingSlash: true,
    basePath: baseUrl,
    env: {
      baseUrl,
    },
    compiler: {
      // Use SWC for styled-components so we can remove Babel
      styledComponents: true,
    },
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    transpilePackages: ["react-tweet"],
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    images: {
      // fixes build error (see commit message for details)
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "pbs.twimg.com",
          pathname: "/**",
        },
      ],
    },
  }),
);
