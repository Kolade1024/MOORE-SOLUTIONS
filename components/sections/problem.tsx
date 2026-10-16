import { Clock, Inbox, Unplug, type LucideIcon } from "lucide-react";
import { Collage } from "@/components/collage";
import { Container, CtaIcon, SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { problem, type ProblemIcon } from "@/content/site";

const ICONS: Record<ProblemIcon, LucideIcon> = { clock: Clock, inbox: Inbox, unplug: Unplug };

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="bg-blush py-20 sm:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Collage
          main={problem.images.main}
          detail={problem.images.detail}
          highlight={problem.stickers.highlight}
          card={problem.stickers.card}
        />

        <div>
          <SectionHeading id="problem-title" eyebrow={problem.eyebrow} title={problem.title} description={problem.description} />

          <ul className="mt-8 flex flex-col gap-3">
            {problem.leaks.map((leak, i) => {
              const Icon = ICONS[leak.icon];
              return (
                <li
                  key={leak.title}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  className="flex gap-4 rounded-2xl border border-blush-line bg-surface p-4 sm:p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg leading-snug font-semibold text-ink">{leak.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">{leak.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <Button asChild className="mt-8 pr-2" data-reveal>
            <a href={problem.cta.href}>
              {problem.cta.label}
              <CtaIcon />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
