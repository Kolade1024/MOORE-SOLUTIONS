"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  caption: string;
  description: string;
  image: { src: string; alt: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

// Shared by the slide and the peeks so both use the same (already cached) image files.
const SLIDE_SIZES = "(min-width: 1024px) 768px, 92vw";

/**
 * Centre-focus carousel, modelled on the design reference: the active step is shown large in the
 * middle with the previous and next steps peeking in from the edges (wide screens only).
 * Arrow keys, swipe, the side buttons and the step tabs all change the step.
 */
export function StepsCarousel({ steps }: { steps: Step[] }) {
  const [index, setIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const count = steps.length;

  const goTo = (next: number) => setIndex(((next % count) + count) % count);
  const go = (delta: number) => goTo(index + delta);

  const active = steps[index]!;
  const prev = steps[(index - 1 + count) % count]!;
  const next = steps[(index + 1) % count]!;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="How we work, step by step"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
    >
      <div className="grid items-center gap-5 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,48rem)_1fr] lg:gap-14 lg:px-0">
        {/* Previous step peek */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => go(-1)}
          className="relative hidden h-[78%] overflow-hidden rounded-[1.5rem] bg-mist opacity-80 transition-opacity hover:opacity-100 lg:block"
        >
          <Image src={prev.image.src} alt="" fill sizes={SLIDE_SIZES} className="object-cover" />
        </button>

        {/* Active step */}
        <div className="relative">
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`Step ${index + 1} of ${count}: ${active.title}`}
            className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-[1.75rem] bg-mist select-none sm:aspect-[16/10]"
            onPointerDown={(event) => {
              pointerStartX.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (pointerStartX.current === null) return;
              const dx = event.clientX - pointerStartX.current;
              pointerStartX.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }}
          >
            {/* All step photos are stacked and cross-faded, so they're already loaded when you move on. */}
            {steps.map((step, i) => (
              <Image
                key={step.image.src}
                src={step.image.src}
                alt={i === index ? step.image.alt : ""}
                aria-hidden={i === index ? undefined : true}
                fill
                sizes={SLIDE_SIZES}
                draggable={false}
                className={cn(
                  "object-cover transition-opacity duration-500 ease-out",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent p-5 pt-20 sm:p-6">
              <p className="inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-white">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-semibold">
                  {pad(index + 1)}
                </span>
                {active.caption}
              </p>
            </div>
          </div>

          {/* Side controls (overlapping the card edges on wide screens) */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous step"
            className="absolute top-1/2 -left-6 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-blush-line bg-surface ring-4 ring-blush text-ink shadow-[0_12px_30px_-12px_rgb(14_13_18/0.35)] transition-colors hover:border-accent hover:text-accent lg:flex"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next step"
            className="absolute top-1/2 -right-6 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-accent ring-4 ring-blush text-accent-foreground shadow-[0_12px_30px_-12px_rgb(107_60_240/0.7)] transition-colors hover:bg-accent-hover lg:flex"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Next step peek */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => go(1)}
          className="relative hidden h-[78%] overflow-hidden rounded-[1.5rem] bg-mist opacity-80 transition-opacity hover:opacity-100 lg:block"
        >
          <Image src={next.image.src} alt="" fill sizes={SLIDE_SIZES} className="object-cover" />
        </button>
      </div>

      {/* Stepper + details, aligned under the active card */}
      <div className="mt-8 grid px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,48rem)_1fr] lg:px-0">
        <div className="lg:col-start-2">
          <ol className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === index ? "step" : undefined}
                  className="group block w-full text-left"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block h-1 rounded-full transition-colors duration-300",
                      i === index ? "bg-accent" : i < index ? "bg-accent/35" : "bg-blush-line group-hover:bg-accent/25",
                    )}
                  />
                  <span className="mt-3 block text-xs text-ink-muted tabular-nums">{pad(i + 1)}</span>
                  <span
                    className={cn(
                      "mt-0.5 block text-[0.8125rem] leading-snug font-medium transition-colors sm:text-sm",
                      i === index ? "text-accent" : "text-ink-muted group-hover:text-ink",
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-7 flex items-start justify-between gap-6">
            <div aria-live="polite" className="max-w-lg">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">
                <span className="sr-only">Step {index + 1}: </span>
                {active.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{active.description}</p>
            </div>

            {/* Compact controls on small screens */}
            <div className="flex shrink-0 gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous step"
                className="flex size-11 items-center justify-center rounded-full border border-blush-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next step"
                className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
