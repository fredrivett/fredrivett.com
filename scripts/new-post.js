#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get title from command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: npm run new-post "Your Post Title"');
  process.exit(1);
}

const title = args.join(" ");

// Generate filename
const today = new Date();
const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
const slug = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, "") // Remove special chars
  .replace(/\s+/g, "-") // Replace spaces with hyphens
  .replace(/-+/g, "-") // Replace multiple hyphens with single
  .trim("-"); // Remove leading/trailing hyphens

const filename = `${dateStr}-${slug}.md`;
const filepath = path.join(__dirname, "..", "_posts", filename);

// Create frontmatter template
const frontmatter = `---
title: "${title}"
description: ""
date: "${dateStr}"
---

Your post content goes here...
`;

// Check if file already exists
if (fs.existsSync(filepath)) {
  console.error(`Error: File ${filename} already exists!`);
  process.exit(1);
}

// Write the file
fs.writeFileSync(filepath, frontmatter);

console.log(`Created new blog post: _posts/${filename}`);
console.log(`Edit the file to add your content and update the description.`);
