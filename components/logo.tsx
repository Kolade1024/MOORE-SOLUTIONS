import Link from "next/link";
import { cn } from "@/lib/utils";

/** "M" monogram + wordmark. TODO: swap for the final logo files when the brand is ready. */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 rounded-md", className)}>
      <LogoMark tone={tone} className="size-8" />
      <span
        className={cn(
          "font-display text-[1.3125rem] leading-none font-bold tracking-[-0.03em]",
          tone === "light" ? "text-accent" : "text-night-ink",
        )}
      >
        Moore<span className={tone === "light" ? "text-ink" : "text-night-muted"}> Solutions</span>
      </span>
    </Link>
  );
}

/** The "M" mark on its own: two arches with an accent dot. */
export function LogoMark({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("shrink-0", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" className={tone === "light" ? "fill-ink" : "fill-night-ink"} />
      <path
        d="M8 22.5V13a4 4 0 0 1 8 0v9.5M16 13a4 4 0 0 1 8 0v9.5"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        className={tone === "light" ? "stroke-canvas" : "stroke-night"}
      />
      <circle cx="24" cy="8.5" r="2" className={tone === "light" ? "fill-accent" : "fill-accent"} />
    </svg>
  );
}
