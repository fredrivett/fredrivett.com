import { jwtVerify, SignJWT } from "jose";

const COOKIE_NAME = "words_session";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

function getSecret(): Uint8Array {
  const secret = process.env.WORDS_SESSION_SECRET;
  if (!secret) {
    throw new Error("WORDS_SESSION_SECRET is not set");
  }
  if (secret.length < 32) {
    throw new Error("WORDS_SESSION_SECRET must be at least 32 chars");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ sub: "owner" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export function buildSessionCookie(token: string): string {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
  ];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function buildClearCookie(): string {
  const parts = [
    `${COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function readSessionCookieFromHeader(
  cookieHeader: string | undefined | null,
): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(/;\s*/)
    .map((c) => {
      const eq = c.indexOf("=");
      return eq === -1
        ? null
        : { name: c.slice(0, eq), value: c.slice(eq + 1) };
    })
    .find((c) => c?.name === COOKIE_NAME);
  return match ? match.value : null;
}

export async function isAuthedFromCookieHeader(
  cookieHeader: string | undefined | null,
): Promise<boolean> {
  const token = readSessionCookieFromHeader(cookieHeader);
  if (!token) return false;
  return verifySessionToken(token);
}

export const WORDS_COOKIE_NAME = COOKIE_NAME;
