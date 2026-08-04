"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import type { TocEntry } from "@/content/blog/bodies";

/**
 * Sticky in-article navigation. Sits beside the body on large screens and
 * highlights whichever heading the reader is currently level with.
 */
export function TableOfContents({
  items,
  className,
}: {
  items: TocEntry[];
  className?: string;
}) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id ?? "");

  React.useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    // Treat the band just below the sticky header as the "reading line": the
    // last heading above it is the section the reader is actually in.
    const onScroll = () => {
      const line = 140;
      let current: HTMLElement = headings[0]!;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h;
        else break;
      }
      setActiveId(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className={className}>
      <p className="text-eyebrow mb-3">On this page</p>
      <ul className="border-l border-[var(--color-border)]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={cn(
                "block py-1.5 pr-2 text-sm leading-snug -ml-px border-l-2 transition-colors",
                item.level === 3 ? "pl-6" : "pl-4",
                activeId === item.id
                  ? "border-[var(--color-brand)] text-[var(--color-brand)] font-semibold"
                  : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
