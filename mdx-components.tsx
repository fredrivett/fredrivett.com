import type { MDXComponents } from "mdx/types";

import Tweet from "./src/components/Tweet";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Tweet,
    ...components,
  };
}
