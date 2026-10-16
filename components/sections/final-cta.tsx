import { Check } from "lucide-react";
import { LazyLeadForm } from "@/components/lazy-lead-form";
import { Container, Eyebrow } from "@/components/section-heading";
import { finalCta } from "@/content/site";

export function FinalCta() {
  return (
    <section id="book" aria-labelledby="book-title" className="bg-blush py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div data-reveal className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start lg:pt-4">
          <Eyebrow>{finalCta.eyebrow}</Eyebrow>
          <h2
            id="book-title"
            className="mt-4 text-[2.375rem] leading-[1.05] font-semibold tracking-[-0.03em] text-ink text-balance sm:text-[3.5rem]"
          >
            {finalCta.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">{finalCta.description}</p>

          <ul className="mt-8 flex flex-col gap-3.5">
            {finalCta.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 text-[0.9375rem] text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-highlight text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <LazyLeadForm />
        </div>
      </Container>
    </section>
  );
}
