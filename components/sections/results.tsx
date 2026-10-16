import { Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/section-heading";
import { primaryCta, results, type CaseStudy } from "@/content/site";

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-night-line bg-night-surface p-6 sm:p-7">
      <p className="text-sm text-night-muted">
        {study.client} · {study.industry}
      </p>
      <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.02em] text-night-ink">{study.result}</h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-night-muted">{study.summary}</p>
      {study.quote ? (
        <figure className="mt-6 border-t border-night-line pt-5">
          <blockquote className="text-[0.9375rem] leading-relaxed text-night-ink">
            <p>&ldquo;{study.quote.text}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-3 text-sm text-night-muted">
            {study.quote.name}, {study.quote.role}
          </figcaption>
        </figure>
      ) : null}
    </article>
  );
}

/** Hidden until real, approved case studies are added to content/site.ts (see `results`). */
export function Results() {
  const { items, showEmptyState, emptyState } = results;
  const isEmpty = items.length === 0;
  if (isEmpty && !showEmptyState) return null;

  return (
    <section aria-labelledby="results-title" className="dark-section bg-night py-20 sm:py-28">
      <Container>
        <SectionHeading id="results-title" tone="dark" align="center" eyebrow={results.eyebrow} title={results.title} />

        {isEmpty ? (
          <div data-reveal className="mx-auto mt-12 flex max-w-2xl flex-col items-center rounded-[1.5rem] border border-dashed border-night-line p-8 text-center sm:p-10">
            <Quote className="size-7 text-accent-on-night" aria-hidden="true" />
            <h3 className="mt-4 text-2xl font-semibold text-night-ink">{emptyState.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-night-muted">{emptyState.description}</p>
            <a href={primaryCta.href} className="mt-6 text-sm font-semibold text-accent-on-night underline-offset-4 hover:underline">
              {primaryCta.label} →
            </a>
          </div>
        ) : (
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((study) => (
              <li key={`${study.client}-${study.result}`} data-reveal>
                <CaseStudyCard study={study} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
