import Image from "next/image";
import { ClipboardCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CollageProps = {
  main: { src: string; alt: string };
  detail: { src: string; alt: string };
  highlight: { value: string; label: string };
  card: string;
  cardIcon?: LucideIcon;
  /** Background the collage sits on, so the detail photo's frame blends in. */
  background?: "blush" | "canvas";
};

/** Photo collage with a green stat sticker and a white label card, modelled on the design reference. */
export function Collage({
  main,
  detail,
  highlight,
  card,
  cardIcon: CardIcon = ClipboardCheck,
  background = "blush",
}: CollageProps) {
  return (
    <div data-reveal className="relative mx-auto w-full max-w-[34rem] pt-6 pr-6 sm:pt-8 sm:pr-10">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-mist">
        <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 520px, 90vw" className="object-cover" />
      </div>

      {/* Green sticker (top right) */}
      <div className="absolute top-0 right-0 flex flex-col rounded-2xl bg-highlight px-4 py-3 text-white shadow-[0_20px_40px_-20px_rgb(21_128_61/0.7)] sm:px-5 sm:py-4">
        <span className="font-display text-3xl leading-none font-bold tracking-tight sm:text-4xl">{highlight.value}</span>
        <span className="mt-1 text-xs font-medium sm:text-sm">{highlight.label}</span>
      </div>

      {/* Detail photo (right edge) */}
      <div
        className={cn(
          "absolute top-[38%] -right-1 hidden size-28 overflow-hidden rounded-2xl border-4 shadow-xl sm:block",
          background === "blush" ? "border-blush" : "border-canvas",
        )}
      >
        <Image src={detail.src} alt={detail.alt} fill sizes="112px" className="object-cover" />
      </div>

      {/* White label card (bottom centre) */}
      <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 whitespace-nowrap shadow-[0_20px_40px_-24px_rgb(14_13_18/0.45)]">
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <CardIcon className="size-4.5" aria-hidden="true" />
        </span>
        <span className="text-[0.9375rem] font-semibold text-ink">{card}</span>
      </div>
    </div>
  );
}
