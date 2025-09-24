#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("node:path");
const fs = require("node:fs");
const { spawn } = require("node:child_process");
const { once } = require("node:events");

const puppeteer = require("puppeteer");

const repoRoot = path.resolve(__dirname, "..");
const buildDir = path.join(repoRoot, ".next");
const pdfOutputPath = path.join(repoRoot, "public", "cv", "fred-rivett-cv.pdf");
const port = Number(process.env.CV_PDF_PORT || 4311);
const baseUrl = `http://127.0.0.1:${port}`;

function ensureBuildArtifacts() {
  if (!fs.existsSync(buildDir)) {
    throw new Error(
      "Missing .next build output. Run `yarn build` before generating the CV PDF.",
    );
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitForServerReady(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok || response.status === 404) {
        return;
      }
    } catch (error) {
      // swallow and retry until timeout
    }
    await wait(500);
  }
  throw new Error(`Timed out waiting for Next.js server to start at ${url}`);
}

async function generatePdf() {
  ensureBuildArtifacts();

  fs.mkdirSync(path.dirname(pdfOutputPath), { recursive: true });

  const nextBin = require.resolve("next/dist/bin/next");
  const server = spawn(
    process.execPath,
    [nextBin, "start", "-p", String(port), "--hostname", "127.0.0.1"],
    {
      cwd: repoRoot,
      env: { ...process.env, PORT: String(port), NODE_ENV: "production" },
      stdio: "inherit",
    },
  );

  let serverClosed = false;
  const closeServer = () => {
    if (!serverClosed) {
      serverClosed = true;
      server.kill("SIGTERM");
    }
  };

  server.on("exit", () => {
    serverClosed = true;
  });

  try {
    await waitForServerReady(`${baseUrl}/cv`);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
      try {
        window.localStorage.setItem("theme", "light");
      } catch (error) {
        // Ignore storage errors
      }

      const root = document.documentElement;
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      root.setAttribute("data-theme", "light");
    });

    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "light" },
    ]);

    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
    await page.goto(`${baseUrl}/cv`, { waitUntil: "networkidle0" });

    await page.emulateMediaType("print");
    await page.waitForNetworkIdle({ idleTime: 500 });

    await page.evaluate(() => {
      const root = document.documentElement;
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      root.setAttribute("data-theme", "light");
    });

    const dimensions = await page.evaluate(() => {
      const doc = document.documentElement;
      const { body } = document;
      const height = Math.max(
        doc.scrollHeight,
        doc.offsetHeight,
        body ? body.scrollHeight : 0,
        body ? body.offsetHeight : 0,
      );
      const width = Math.max(
        doc.scrollWidth,
        doc.offsetWidth,
        body ? body.scrollWidth : 0,
        body ? body.offsetWidth : 0,
      );

      return {
        height: Math.ceil(height),
        width: Math.ceil(width),
      };
    });

    const pdfHeight = dimensions.height + 64;
    const pdfWidth = dimensions.width;

    await page.pdf({
      path: pdfOutputPath,
      printBackground: true,
      width: `${pdfWidth}px`,
      height: `${pdfHeight}px`,
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
      preferCSSPageSize: false,
      pageRanges: "1",
    });

    await browser.close();

    console.log(
      `Generated CV PDF at ${path.relative(repoRoot, pdfOutputPath)}`,
    );
  } finally {
    closeServer();
    try {
      await once(server, "close");
    } catch (error) {
      // server already closed or could not be awaited; ignore
    }
  }
}

generatePdf().catch((error) => {
  console.error("Failed to generate CV PDF:", error);
  process.exitCode = 1;
});
