import { NextRequest, NextResponse } from "next/server";

import { buildSessionCookie, createSessionToken } from "lib/words-auth";

export async function POST(request: NextRequest) {
  const expected = process.env.WORDS_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "WORDS_PASSWORD is not configured" },
      { status: 500 },
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", buildSessionCookie(token));
  return res;
}
