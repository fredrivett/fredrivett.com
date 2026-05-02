import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/router";

import { cn } from "lib/cn";

import { countWords, WORDS_GOAL, WordVisibility } from "utils/words-shared";

import { WordsToolbar } from "./WordsToolbar";

const DRAFT_KEY = "words.draft.v1";

type DraftShape = {
  body: string;
  title: string;
  visibility: WordVisibility;
};

const DEFAULT_DRAFT: DraftShape = {
  body: "",
  title: "",
  visibility: "public",
};

function loadDraft(): DraftShape {
  if (typeof window === "undefined") return DEFAULT_DRAFT;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return DEFAULT_DRAFT;
    const parsed = JSON.parse(raw);
    return {
      body: typeof parsed.body === "string" ? parsed.body : "",
      title: typeof parsed.title === "string" ? parsed.title : "",
      visibility: parsed.visibility === "private" ? "private" : "public",
    };
  } catch {
    return DEFAULT_DRAFT;
  }
}

function saveDraft(draft: DraftShape) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore quota */
  }
}

function clearDraft() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

const WordsEditor = () => {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState<DraftShape>(DEFAULT_DRAFT);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    slug: string;
    commitUrl: string;
  } | null>(null);

  useEffect(() => {
    setDraft(loadDraft());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return undefined;
    const t = setTimeout(() => saveDraft(draft), 400);
    return () => clearTimeout(t);
  }, [draft, hydrated]);

  const autosize = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.max(el.scrollHeight, 320)}px`;
    }
  }, []);

  useLayoutEffect(() => {
    autosize();
  }, [draft.body, autosize]);

  const wordCount = countWords(draft.body);
  const hitGoal = wordCount >= WORDS_GOAL;

  const onBodyChange = (next: string) => {
    setDraft((d) => ({ ...d, body: next }));
  };

  const wrap = (before: string, after: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const { value } = el;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    const next = `${value.slice(
      0,
      start,
    )}${before}${selected}${after}${value.slice(end)}`;
    onBodyChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const s = start + before.length;
      el.setSelectionRange(s, s + selected.length);
    });
  };

  const insertLink = () => {
    const el = textareaRef.current;
    if (!el) return;
    const { value } = el;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || "text";
    const insert = `[${selected}](url)`;
    const next = `${value.slice(0, start)}${insert}${value.slice(end)}`;
    onBodyChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const urlStart = start + selected.length + 3;
      el.setSelectionRange(urlStart, urlStart + 3);
    });
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const meta = e.metaKey || e.ctrlKey;
    if (!meta) return;
    const key = e.key.toLowerCase();
    if (key === "b") {
      e.preventDefault();
      wrap("**", "**");
    } else if (key === "i") {
      e.preventDefault();
      wrap("_", "_");
    } else if (key === "k") {
      e.preventDefault();
      insertLink();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/words/publish/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: draft.body,
          visibility: draft.visibility,
          title: draft.title || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Publish failed");
        return;
      }
      clearDraft();
      setSuccess({ slug: data.slug, commitUrl: data.commitUrl });
      setDraft(DEFAULT_DRAFT);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <p className="text-lg">
          Pushed. Live in ~60s at{" "}
          <code className="text-sm">/words/{success.slug}</code>.
        </p>
        <p className="text-sm opacity-70">
          <a href={success.commitUrl} target="_blank" rel="noreferrer">
            View commit on GitHub →
          </a>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setSuccess(null);
              setDraft(DEFAULT_DRAFT);
              clearDraft();
            }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded"
          >
            Write another
          </button>
          <button
            type="button"
            onClick={() => router.push("/words")}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded"
          >
            Back to /words
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title (optional)"
        value={draft.title}
        onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
        className={cn(
          "w-full px-3 py-2 text-lg",
          "bg-transparent border-b border-gray-200 dark:border-gray-800",
          "focus:outline-none focus:border-gray-500",
        )}
      />

      <div>
        <WordsToolbar textareaRef={textareaRef} onChange={onBodyChange} />
        <textarea
          ref={textareaRef}
          value={draft.body}
          onChange={(e) => onBodyChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Write at least ${WORDS_GOAL} words…`}
          className={cn(
            "w-full px-3 py-3 text-base leading-relaxed font-mono",
            "bg-transparent border border-gray-200 dark:border-gray-800",
            "focus:outline-none focus:border-gray-500",
            "resize-none overflow-hidden",
          )}
          spellCheck
          autoCapitalize="sentences"
          autoCorrect="on"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span
            className={cn(
              "tabular-nums",
              hitGoal ? "text-green-600 dark:text-green-400" : "opacity-60",
            )}
          >
            {wordCount} / {WORDS_GOAL} words {hitGoal && "✓"}
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.visibility === "private"}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  visibility: e.target.checked ? "private" : "public",
                }))
              }
            />
            <span>Private</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!hitGoal || submitting}
          className={cn(
            "px-4 py-2 rounded font-medium",
            "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        >
          {submitting ? "Publishing…" : "Publish"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
};

export { WordsEditor };
