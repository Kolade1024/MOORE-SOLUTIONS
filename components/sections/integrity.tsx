import Image from "next/image";
import { Quote } from "lucide-react";
import { Container, CtaIcon, Eyebrow } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { integrity, primaryCta } from "@/content/site";

export function Integrity() {
  return (
    <section aria-labelledby="integrity-title" className="dark-section py-16 sm:py-24">
      <Container>
        <div data-reveal className="relative isolate overflow-hidden rounded-[2rem] bg-night">
          <Image
            src={integrity.image.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="-z-10 object-cover object-[30%_center] opacity-70"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/80 to-night/20 lg:bg-gradient-to-l lg:from-night lg:via-night/85 lg:to-transparent" />

          <div className="flex min-h-[32rem] flex-col justify-end p-6 sm:p-10 lg:ml-auto lg:max-w-[38rem] lg:justify-center lg:p-14">
            <Eyebrow tone="dark">{integrity.eyebrow}</Eyebrow>
            <Quote className="mt-6 size-8 text-accent-on-night" aria-hidden="true" />
            <h2
              id="integrity-title"
              className="mt-3 text-[1.875rem] leading-[1.12] font-semibold tracking-[-0.025em] text-night-ink text-balance sm:text-[2.75rem]"
            >
              {integrity.quote}
            </h2>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-night-muted">{integrity.supporting}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="pr-2">
                <a href={primaryCta.href}>
                  {primaryCta.label}
                  <CtaIcon />
                </a>
              </Button>
              <a
                href={integrity.secondary.href}
                className="inline-flex h-11 items-center rounded-full border border-night-line bg-night/40 px-5 text-[0.9375rem] font-medium text-night-ink backdrop-blur transition-colors hover:border-night-muted"
              >
                {integrity.secondary.label}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
