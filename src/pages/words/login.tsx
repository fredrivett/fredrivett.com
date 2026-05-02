import React, { useState } from "react";

import { useRouter } from "next/router";

import { Meta } from "layout/Meta";
import { cn } from "lib/cn";
import { Main } from "templates/Main";

import Container from "components/Container";

const WordsLogin = () => {
  const router = useRouter();
  const next =
    typeof router.query.next === "string" ? router.query.next : "/words";
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/words/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Login failed");
        setSubmitting(false);
        return;
      }
      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setSubmitting(false);
    }
  };

  return (
    <Main meta={<Meta title="/words/login" description="Sign in to /words" />}>
      <Container maxWidth="md">
        <div className="mb-4 max-w-sm">
          <h1 className="fs-1 mb-6">Sign in</h1>
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="password"
              autoFocus
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "w-full px-3 py-2",
                "bg-transparent border border-gray-200 dark:border-gray-800 rounded",
                "focus:outline-none focus:border-gray-500",
              )}
            />
            <button
              type="submit"
              disabled={submitting || !password}
              className={cn(
                "px-4 py-2 rounded font-medium",
                "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
                "disabled:opacity-40 disabled:cursor-not-allowed",
              )}
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </form>
        </div>
      </Container>
    </Main>
  );
};

export default WordsLogin;
