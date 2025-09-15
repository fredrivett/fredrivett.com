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

    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiKey || !formId) {
      console.error("ConvertKit API key or form ID not configured");
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          email,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("ConvertKit API error:", errorData);

      if (
        response.status === 400 &&
        errorData.message?.includes("already subscribed")
      ) {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 },
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        subscriber: data.subscription,
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
