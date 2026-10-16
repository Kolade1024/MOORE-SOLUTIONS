import Image from "next/image";
import { MessagesSquare, PackageCheck, Play } from "lucide-react";
import { Container, CtaIcon } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { hero, primaryCta } from "@/content/site";

const BARS = [62, 38, 78, 52, 44];

/**
 * Photo collage, laid out like the design reference. Every position and size is a percentage of
 * the collage (and type uses container units), so it keeps its proportions at any width.
 */
function HeroCollage() {
  const { statCard, card, howLink } = hero;

  return (
    <div className="@container relative mx-auto w-full max-w-[36rem]">
      <div className="relative aspect-[304/335]">
        {/* Main photo */}
        <div className="absolute top-[11.9%] left-[36.8%] h-[65.7%] w-[63.2%] overflow-hidden rounded-[5cqw] bg-mist">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 360px, 64vw"
            className="object-cover object-[55%_center]"
          />
        </div>

        {/* Dark stat card */}
        <div
          aria-hidden="true"
          className="absolute top-[6%] left-0 flex h-[41.8%] w-[32.9%] flex-col rounded-[4.5cqw] bg-night p-[3.6cqw] text-night-ink shadow-[0_24px_50px_-24px_rgb(14_13_18/0.6)]"
        >
          <p className="font-display leading-none font-semibold tracking-[-0.03em]">
            <span className="text-[11cqw]">{statCard.value}</span>
            <span className="ml-[0.8cqw] text-[3.6cqw] font-medium text-night-muted">{statCard.suffix}</span>
          </p>
          <p className="mt-[2cqw] text-[clamp(9px,2.5cqw,13px)] leading-snug text-night-muted">{statCard.caption}</p>
          <div className="mt-auto flex h-[30%] items-end justify-between gap-[1.4cqw]">
            {BARS.map((height, i) => (
              <span key={i} className="relative h-full flex-1 overflow-hidden rounded-full bg-night-line">
                <span
                  className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-accent to-accent-on-night"
                  style={{ height: `${height}%` }}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Small detail photo, overlapping the stat card and main photo */}
        <div className="absolute top-0 left-[21.7%] aspect-square w-[15.5%] overflow-hidden rounded-[3cqw] border-[1cqw] border-canvas bg-mist shadow-[0_12px_30px_-12px_rgb(14_13_18/0.45)]">
          <Image src={hero.detailImage.src} alt={hero.detailImage.alt} fill sizes="96px" className="object-cover" />
        </div>

        {/* Curved pink arrow (decorative) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 60 34"
          fill="none"
          className="absolute top-[0.5%] left-[40%] w-[18%] text-pink"
        >
          <path d="M3 22 C 14 4, 40 2, 55 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M48 17.5 L 56 19 L 54.5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* White "01" card */}
        <div
          aria-hidden="true"
          className="absolute top-[61.2%] left-[14.8%] flex h-[32.2%] w-[35.9%] flex-col justify-between rounded-[4.5cqw] bg-surface p-[3.6cqw] shadow-[0_24px_50px_-20px_rgb(14_13_18/0.3)]"
        >
          <div className="flex items-start justify-between">
            <span className="text-[clamp(9px,2.4cqw,12px)] font-medium text-ink-muted">{card.index}</span>
            <span className="flex size-[11cqw] items-center justify-center rounded-full bg-highlight text-white shadow-[0_8px_20px_-8px_rgb(21_128_61/0.8)]">
              <PackageCheck className="size-[5cqw]" />
            </span>
          </div>
          <p className="font-display text-[5.2cqw] leading-[1.1] font-semibold tracking-[-0.02em] text-ink">{card.title}</p>
        </div>

        {/* Sparkle lines (decorative) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          fill="none"
          className="absolute top-[86%] left-[6%] w-[11%] text-pink"
        >
          <path d="M30 8 L 22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M33 22 L 23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 6 L 17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* "How we work" pill on the photo's bottom-right corner */}
        <a
          href={howLink.href}
          className="absolute top-[67.5%] right-0 flex items-center gap-[2cqw] rounded-full border-[1.2cqw] border-canvas bg-surface py-[1cqw] pr-[4cqw] pl-[1cqw] text-[clamp(11px,3.4cqw,15px)] font-medium whitespace-nowrap text-ink shadow-[0_16px_30px_-16px_rgb(14_13_18/0.4)] transition-colors hover:text-accent"
        >
          <span className="flex size-[9cqw] items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Play className="size-[3.4cqw] translate-x-px fill-current" aria-hidden="true" />
          </span>
          {howLink.label}
        </a>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-start">
          <p className="inline-flex items-center gap-2.5 text-sm text-ink-muted">
            <span className="flex size-7 items-center justify-center rounded-lg bg-pink-soft text-pink">
              <MessagesSquare className="size-3.5" aria-hidden="true" />
            </span>
            <span>
              {hero.badge.before}{" "}
              <span aria-hidden="true">{hero.badge.emoji}</span> {hero.badge.after}
            </span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 max-w-[11ch] text-[3.25rem] leading-[1.02] font-medium tracking-[-0.04em] text-ink sm:text-7xl lg:text-[5.25rem]"
          >
            {hero.headline.before}{" "}
            <span className="relative inline-block">
              {hero.headline.emphasis}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                fill="none"
                className="absolute -bottom-[0.12em] left-[2%] h-[0.16em] w-[96%] text-pink"
              >
                <path d="M2 11 C 60 2, 140 1, 198 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>{" "}
            {hero.headline.after}
          </h1>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild size="lg" className="pr-2">
              <a href={primaryCta.href}>
                {primaryCta.label}
                <CtaIcon />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="bg-blush pr-2 hover:bg-blush-line">
              <a href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
                <CtaIcon />
              </a>
            </Button>
          </div>

          <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink-muted">{hero.subheadline}</p>
        </div>

        <HeroCollage />
      </Container>
    </section>
  );
}
