"use client";

import { useCallback, useEffect, useState } from "react";

import { ScrollText } from "lucide-react";

import { cn } from "lib/cn";

import { HeadingItem } from "utils/Content";

type TableOfContentsProps = {
  headings: HeadingItem[];
  className?: string;
};

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Observe headings to highlight the current one
  useEffect(() => {
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

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        window.history.pushState(null, "", `#${id}`);
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  if (headings.length === 0) {
    return null;
  }

  // Find the minimum heading level to use as the base
  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav className={cn("text-sm", className)} aria-label="Table of contents">
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
              onClick={(e) => handleClick(e, id)}
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
