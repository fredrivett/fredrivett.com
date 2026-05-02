import React from "react";

import { cn } from "lib/cn";

type Action = "bold" | "italic" | "h2" | "link" | "list" | "quote" | "code";

type Props = {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  onChange: (next: string) => void;
};

type Wrap = { before: string; after: string };
type LinePrefix = { prefix: string };

const WRAPS: Partial<Record<Action, Wrap>> = {
  bold: { before: "**", after: "**" },
  italic: { before: "_", after: "_" },
  code: { before: "`", after: "`" },
};

const LINE_PREFIXES: Partial<Record<Action, LinePrefix>> = {
  h2: { prefix: "## " },
  list: { prefix: "- " },
  quote: { prefix: "> " },
};

function applyWrap(
  el: HTMLTextAreaElement,
  before: string,
  after: string,
): { value: string; selStart: number; selEnd: number } {
  const { value } = el;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const selected = value.slice(start, end);
  const next = `${value.slice(
    0,
    start,
  )}${before}${selected}${after}${value.slice(end)}`;
  const newStart = start + before.length;
  const newEnd = newStart + selected.length;
  return { value: next, selStart: newStart, selEnd: newEnd };
}

function applyLinePrefix(
  el: HTMLTextAreaElement,
  prefix: string,
): { value: string; selStart: number; selEnd: number } {
  const { value } = el;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const next = `${value.slice(0, lineStart)}${prefix}${value.slice(lineStart)}`;
  return {
    value: next,
    selStart: start + prefix.length,
    selEnd: end + prefix.length,
  };
}

function applyLink(el: HTMLTextAreaElement): {
  value: string;
  selStart: number;
  selEnd: number;
} {
  const { value } = el;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const selected = value.slice(start, end) || "text";
  const insert = `[${selected}](url)`;
  const next = `${value.slice(0, start)}${insert}${value.slice(end)}`;
  const urlStart = start + selected.length + 3;
  return { value: next, selStart: urlStart, selEnd: urlStart + 3 };
}

const BUTTONS: { action: Action; label: string; title: string }[] = [
  { action: "bold", label: "B", title: "Bold (Cmd/Ctrl+B)" },
  { action: "italic", label: "I", title: "Italic (Cmd/Ctrl+I)" },
  { action: "h2", label: "H", title: "Heading" },
  { action: "link", label: "↗", title: "Link (Cmd/Ctrl+K)" },
  { action: "list", label: "•", title: "List" },
  { action: "quote", label: "❝", title: "Quote" },
  { action: "code", label: "<>", title: "Code" },
];

const WordsToolbar = ({ textareaRef, onChange }: Props) => {
  const apply = (action: Action) => {
    const el = textareaRef.current;
    if (!el) return;

    let next: { value: string; selStart: number; selEnd: number };
    const wrap = WRAPS[action];
    const prefix = LINE_PREFIXES[action];
    if (wrap) {
      next = applyWrap(el, wrap.before, wrap.after);
    } else if (prefix) {
      next = applyLinePrefix(el, prefix.prefix);
    } else if (action === "link") {
      next = applyLink(el);
    } else {
      return;
    }

    onChange(next.value);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(next.selStart, next.selEnd);
    });
  };

  return (
    <div className="flex flex-wrap gap-1 sticky top-0 z-10 bg-white dark:bg-gray-950 py-2 border-b border-gray-200 dark:border-gray-800">
      {BUTTONS.map((b) => (
        <button
          key={b.action}
          type="button"
          title={b.title}
          aria-label={b.title}
          onClick={() => apply(b.action)}
          className={cn(
            "min-w-[2.25rem] h-9 px-2 text-sm font-mono rounded",
            "border border-gray-300 dark:border-gray-700",
            "bg-gray-50 dark:bg-gray-900",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "active:bg-gray-200 dark:active:bg-gray-700",
            "transition-colors",
          )}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
};

export { WordsToolbar };
export type { Action };
