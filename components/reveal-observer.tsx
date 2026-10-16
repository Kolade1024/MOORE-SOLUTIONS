"use client";

import { useEffect } from "react";

/**
 * Fades in every `[data-reveal]` element as it scrolls into view.
 * The `reveal-ready` class is set before first paint by an inline script in app/layout.tsx
 * (and only when motion is allowed), so this component only has to observe.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("reveal-ready")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.setAttribute("data-observed", "");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
