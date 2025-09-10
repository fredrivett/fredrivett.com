import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// Helper function to load Google Fonts properly
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text,
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

function getTitleFontSize(title: string): string {
  if (title.length > 50) return "48px";
  if (title.length > 30) return "56px";
  return "64px";
}

function preventOrphans(title: string): string {
  let result = title;

  // Replace last 2 spaces with non-breaking spaces
  for (let i = 0; i < 2; i++) {
    const lastSpaceIndex = result.lastIndexOf(" ");
    if (lastSpaceIndex === -1) break;

    result = `${result.slice(0, lastSpaceIndex)}\u00A0${result.slice(
      lastSpaceIndex + 1,
    )}`;
  }

  return result;
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Fred Rivett";
    const date = searchParams.get("date");

    // Load fonts using the proper Google Fonts API method
    const [playfairFont, robotoMonoFont] = await Promise.all([
      loadGoogleFont("Playfair+Display:wght@700", title),
      loadGoogleFont("Roboto+Mono:wght@400", `${date} fredrivett.com`),
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            background: "#111827", // Your dark background color
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            padding: "80px",
          }}
        >
          {/* Title and Date at bottom */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              marginBottom: "48px",
            }}
          >
            <h1
              style={{
                fontSize: getTitleFontSize(title),
                fontWeight: "bold",
                color: "#ffffff",
                lineHeight: 1.2,
                margin: 0,
                fontFamily: "Playfair Display, serif",
              }}
            >
              {preventOrphans(title)}
            </h1>

            {/* Date beneath title */}
            {date && (
              <div
                style={{
                  fontSize: "28px",
                  color: "#9ca3af",
                  fontFamily: "Roboto Mono, monospace",
                  marginTop: "12px",
                }}
              >
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>

          {/* Avatar and domain together */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px", // gap-4 equivalent
            }}
          >
            {/* Avatar */}
            <img
              src="https://fredrivett.com/assets/images/fredrivett.jpg"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "32px",
              }}
              alt="Fred Rivett"
            />

            {/* Domain */}
            <div
              style={{
                fontSize: "24px",
                color: "#9ca3af",
                fontFamily: "Roboto Mono, monospace",
              }}
            >
              fredrivett.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Playfair Display",
            data: playfairFont,
            weight: 700,
            style: "normal",
          },
          {
            name: "Roboto Mono",
            data: robotoMonoFont,
            weight: 400,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
