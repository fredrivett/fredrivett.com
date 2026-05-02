import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

import { isAuthedFromCookieHeader } from "lib/words-auth";

import {
  buildFrontmatter,
  buildWordSlug,
  countWords,
  WORDS_GOAL,
  WordVisibility,
} from "utils/words-shared";

const REPO_OWNER = "fredrivett";
const REPO_NAME = "fredrivett.com";
const REPO_BRANCH = "main";

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const authed = await isAuthedFromCookieHeader(cookieHeader);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.WORDS_GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "WORDS_GITHUB_TOKEN is not configured" },
      { status: 500 },
    );
  }

  let body: { body?: string; visibility?: string; title?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const text = String(body.body ?? "").trim();
  if (!text) {
    return NextResponse.json({ error: "Body is required" }, { status: 400 });
  }

  const wordCount = countWords(text);
  if (wordCount < WORDS_GOAL) {
    return NextResponse.json(
      { error: `Need at least ${WORDS_GOAL} words (got ${wordCount})` },
      { status: 400 },
    );
  }

  const visibility: WordVisibility =
    body.visibility === "private" ? "private" : "public";
  const title = body.title ? String(body.title).trim() || null : null;

  const now = new Date();
  const slug = buildWordSlug(now);
  const date = slug.slice(0, 10);
  const time = `${slug.slice(11, 13)}:${slug.slice(13, 15)}`;
  const path = `_words/${slug}.mdx`;

  const frontmatter = buildFrontmatter({
    date,
    time,
    wordCount,
    visibility,
    title,
  });
  const fileContents = `${frontmatter}${text}\n`;

  const octokit = new Octokit({ auth: token });
  const message = `words: ${date} ${time}${title ? ` — ${title}` : ""}`;

  try {
    const { data } = await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message,
      content: Buffer.from(fileContents, "utf8").toString("base64"),
      branch: REPO_BRANCH,
    });

    return NextResponse.json({
      ok: true,
      slug,
      commitUrl: data.commit.html_url,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `GitHub commit failed: ${msg}` },
      { status: 500 },
    );
  }
}
