import { Container, CtaIcon, SectionHeading } from "@/components/section-heading";
import { ServiceList } from "@/components/service-list";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { primaryCta, servicesIntro } from "@/content/site";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="services-title"
            eyebrow={servicesIntro.eyebrow}
            title={servicesIntro.title}
            description={servicesIntro.description}
          />
          <Button asChild className="mt-8 pr-2" data-reveal>
            <a href={primaryCta.href}>
              {primaryCta.label}
              <CtaIcon />
            </a>
          </Button>
        </div>

        <div data-reveal>
          <ServiceList services={services} ctaLabel={servicesIntro.ctaLabel} />
        </div>
      </Container>
    </section>
  );
}
