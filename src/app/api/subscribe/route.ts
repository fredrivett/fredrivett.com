/* eslint-disable no-console */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 },
      );
    }

    const publicationUrl = process.env.SUBSTACK_PUBLICATION_URL;
    const originHeader =
      process.env.SUBSTACK_ORIGIN || publicationUrl || undefined;
    const refererHeader = process.env.SUBSTACK_REFERER || originHeader;
    const userAgentHeader =
      process.env.SUBSTACK_USER_AGENT ||
      "Mozilla/5.0 (compatible; fredrivett.com newsletter signup)";

    if (!publicationUrl) {
      console.error("Substack publication URL not configured");
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 500 },
      );
    }

    const endpoint = new URL(
      process.env.SUBSTACK_ENDPOINT_PATH || "/api/v1/free",
      publicationUrl,
    ).toString();
    const includeNoJsParam = endpoint.endsWith("/api/v1/free")
      ? process.env.SUBSTACK_INCLUDE_NOJS !== "false"
      : false;
    const finalEndpoint = includeNoJsParam ? `${endpoint}?nojs=true` : endpoint;

    console.log("Substack subscription endpoint", finalEndpoint);

    const formData = new URLSearchParams({
      email,
    });

    if (process.env.SUBSTACK_REFERRING_DOMAIN) {
      formData.set("referring_domain", process.env.SUBSTACK_REFERRING_DOMAIN);
    }
    if (process.env.SUBSTACK_REFERRING_URL) {
      formData.set("referring_url", process.env.SUBSTACK_REFERRING_URL);
    }
    if (process.env.SUBSTACK_SOURCE) {
      formData.set("source", process.env.SUBSTACK_SOURCE);
    }
    if (process.env.SUBSTACK_PUBLICATION_ID) {
      formData.set("publication_id", process.env.SUBSTACK_PUBLICATION_ID);
    }

    const response = await fetch(finalEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html,application/xhtml+xml,application/json",
        ...(originHeader ? { Origin: originHeader } : {}),
        ...(refererHeader ? { Referer: refererHeader } : {}),
        "User-Agent": userAgentHeader,
      },
      body: formData.toString(),
    });

    const rawBody = await response.text();
    let data: Record<string, unknown> | undefined;
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("json")) {
      try {
        if (rawBody) {
          const parsed = JSON.parse(rawBody);
          data =
            typeof parsed === "object" && parsed !== null
              ? (parsed as Record<string, unknown>)
              : undefined;
        }
      } catch (parseError) {
        console.error("Substack response not JSON", {
          status: response.status,
          parseError,
          rawBody,
        });
      }
    }

    if (!response.ok) {
      console.error("Substack API error (non-200)", {
        status: response.status,
        statusText: response.statusText,
        body: data ?? rawBody,
      });
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 },
      );
    }

    const errors = Array.isArray(data?.errors)
      ? (data?.errors as unknown[])
      : undefined;

    if (errors && errors.length > 0) {
      const firstError = errors[0];
      let message: string | undefined;

      if (typeof firstError === "string") {
        message = firstError;
      } else if (
        firstError &&
        typeof firstError === "object" &&
        "message" in firstError &&
        typeof (firstError as Record<string, unknown>).message === "string"
      ) {
        message = (firstError as Record<string, unknown>).message as string;
      }

      const normalizedMessage = message || "Subscription error";
      const isAlreadySubscribed = /already/i.test(message || "");

      console.error("Substack API reported errors", errors);

      return NextResponse.json(
        {
          error: isAlreadySubscribed
            ? "This email is already subscribed"
            : normalizedMessage,
        },
        { status: isAlreadySubscribed ? 400 : 500 },
      );
    }
    const errorMessage = data?.error as string | undefined;
    if (errorMessage) {
      const isAlreadySubscribed =
        typeof errorMessage === "string" && /already/i.test(errorMessage);
      console.error("Substack API returned error", errorMessage);

      return NextResponse.json(
        {
          error: isAlreadySubscribed
            ? "This email is already subscribed"
            : "Failed to subscribe. Please try again.",
        },
        { status: isAlreadySubscribed ? 400 : 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        subscriber: data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
