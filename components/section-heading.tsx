import type { ReactNode } from "react";
import { ArrowUpRight, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[0.8125rem] font-medium",
        tone === "light" ? "text-ink-muted" : "text-night-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-6 items-center justify-center rounded-md",
          tone === "light" ? "bg-accent-soft text-accent" : "bg-night-line text-accent-on-night",
        )}
      >
        <Sparkle className="size-3 fill-current" />
      </span>
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, align = "left", tone = "light", className }: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "text-[2.125rem] leading-[1.08] font-semibold tracking-[-0.025em] text-balance sm:text-5xl",
          tone === "light" ? "text-ink" : "text-night-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-[0.9375rem] leading-relaxed text-pretty sm:text-base",
            tone === "light" ? "text-ink-muted" : "text-night-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

/** The small circled arrow used inside primary pill buttons, as in the design reference. */
export function CtaIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex size-6 items-center justify-center rounded-full border border-current/40", className)}
    >
      <ArrowUpRight className="size-3.5" />
    </span>
  );
}
