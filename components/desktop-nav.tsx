"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/content/site";
import { cn } from "@/lib/utils";

/** Desktop anchor nav that highlights the section currently in view. */
export function DesktopNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(`#${entry.target.id}`, entry.intersectionRatio);
          else visible.delete(`#${entry.target.id}`);
        }
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(best ? best[0] : null);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block rounded-full px-4 py-1.5 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "text-ink-muted hover:bg-mist hover:text-ink",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
