import { Mail } from "lucide-react";
import { Container, SectionHeading } from "@/components/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/faqs";
import { siteConfig } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-mist py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" eyebrow={faqs.eyebrow} title={faqs.title} />
          <a
            data-reveal
            href={`mailto:${siteConfig.email}`}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 pr-5 transition-colors hover:border-accent"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Mail className="size-4.5" aria-hidden="true" />
            </span>
            <span className="text-sm">
              <span className="block font-semibold text-ink">Another question?</span>
              <span className="text-ink-muted">{siteConfig.email}</span>
            </span>
          </a>
        </div>

        <div data-reveal className="rounded-[1.5rem] border border-line bg-surface px-5 sm:px-8">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.items.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
