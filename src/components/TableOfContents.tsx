"use client";

import { useEffect, useState } from "react";

import { ScrollText } from "lucide-react";

import { cn } from "lib/cn";

import { useHeadingId } from "./heading-id-context";

type TableOfContentsProps = {
  className?: string;
};

export function TableOfContents({ className }: TableOfContentsProps) {
  const { headings } = useHeadingId();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Observe headings to highlight the current one
  useEffect(() => {
    if (headings.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  // Find the minimum heading level to use as the base
  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav
      className={cn(
        "text-sm lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto",
        className,
      )}
      aria-label="Table of contents"
    >
      <p className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
        <ScrollText className="inline-block h-4 w-4 mr-1.5 mb-0.5 opacity-50" />
        In this post
      </p>
      <ul className="mb-0 space-y-1.5">
        {headings.map(({ level, text, id }) => (
          <li
            key={id}
            style={{ paddingLeft: `${(level - minLevel) * 0.75}rem` }}
          >
            <a
              href={`#${id}`}
              className={cn(
                "block py-0.5 no-underline transition-colors hover:text-gray-900 dark:hover:text-gray-100",
                activeId === id
                  ? "text-gray-900 dark:text-gray-300 font-medium"
                  : "text-gray-500 dark:text-gray-600",
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function TableOfContentsAside({ className }: TableOfContentsProps) {
  const { headings } = useHeadingId();

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside
      className={cn(
        "-order-1 lg:order-2 mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-md lg:mb-0 lg:p-0 lg:pt-12 lg:bg-transparent lg:dark:bg-transparent lg:rounded-none",
        className,
      )}
    >
      <div className="lg:sticky lg:top-24">
        <TableOfContents />
      </div>
    </aside>
  );
}
