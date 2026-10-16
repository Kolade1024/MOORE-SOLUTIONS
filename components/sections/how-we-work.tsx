import { Container, CtaIcon, SectionHeading } from "@/components/section-heading";
import { StepsCarousel } from "@/components/steps-carousel";
import { Button } from "@/components/ui/button";
import { howWeWork, primaryCta } from "@/content/site";

export function HowWeWork() {
  return (
    <section id="how-we-work" aria-labelledby="how-title" className="overflow-x-clip bg-blush py-20 sm:py-28">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="how-title" eyebrow={howWeWork.eyebrow} title={howWeWork.title} />
        <div data-reveal className="max-w-sm lg:pb-2">
          <p className="text-[0.9375rem] leading-relaxed text-ink-muted">{howWeWork.description}</p>
          <Button asChild size="sm" className="mt-5 pr-1.5">
            <a href={primaryCta.href}>
              {primaryCta.label}
              <CtaIcon className="size-6" />
            </a>
          </Button>
        </div>
      </Container>

      <div className="mt-12" data-reveal>
        <StepsCarousel steps={howWeWork.steps} />
      </div>
    </section>
  );
}
