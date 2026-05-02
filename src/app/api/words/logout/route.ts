import { NextResponse } from "next/server";

import { buildClearCookie } from "lib/words-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", buildClearCookie());
  return res;
}
