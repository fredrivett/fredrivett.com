// TODO: @mapbox/rehype-prism does not have typescript definition
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";
import rehypeStringify from "rehype-stringify";
import gfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(gfm)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypePrism)
    .use(rehypeStringify, {allowDangerousHtml: true})
    .process(markdown);
  return result.toString().replace(/@@baseUrl@@/g, process.env.baseUrl || "");
}
