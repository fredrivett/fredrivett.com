import { readFileSync, readdirSync } from "fs";
import { join } from "path";

import { describe, it, expect } from "vitest";

describe("EmailSubscribe Component in Blog Posts", () => {
  const postsDir = join(process.cwd(), "_posts");
  const postFiles = readdirSync(postsDir).filter((file) =>
    file.endsWith(".mdx"),
  );

  it("should have EmailSubscribe component in all blog posts", () => {
    const missingPosts: string[] = [];

    postFiles.forEach((file) => {
      const filePath = join(postsDir, file);
      const content = readFileSync(filePath, "utf8");

      const hasEmailSubscribe =
        content.includes("<EmailSubscribe") ||
        content.includes("<EmailSubscribe>");

      if (!hasEmailSubscribe) {
        missingPosts.push(file);
      }
    });

    if (missingPosts.length > 0) {
      console.log(`\nPosts missing EmailSubscribe component:`);
      missingPosts.forEach((post) => console.log(`- ${post}`));
    }

    expect(missingPosts.length).toBe(0);
    expect(postFiles.length).toBeGreaterThan(0);
  });

  it("should find all blog post files", () => {
    expect(postFiles.length).toBeGreaterThan(0);
    console.log(`\nFound ${postFiles.length} blog post files`);
  });
});
