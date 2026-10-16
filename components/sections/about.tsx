import Image from "next/image";
import { Users } from "lucide-react";
import { Collage } from "@/components/collage";
import { Container, Eyebrow, SectionHeading } from "@/components/section-heading";
import { about } from "@/content/site";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="lg:order-2">
            <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />
            <p data-reveal className="mt-6 text-lg leading-relaxed text-ink text-pretty">
              {about.mission}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.founders.map((founder) => (
                <li key={founder.role} data-reveal className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5">
                  {founder.photo ? (
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-mist">
                      <Image src={founder.photo} alt="" fill sizes="64px" className="object-cover object-[50%_28%]" />
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-lg font-bold text-accent"
                    >
                      {founder.initials}
                    </span>
                  )}
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-ink">{founder.name}</span>
                    <span className="block text-sm text-ink-muted">{founder.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:order-1">
            <Collage
              main={about.images.main}
              detail={about.images.detail}
              highlight={about.stickers.highlight}
              card={about.stickers.card}
              cardIcon={Users}
              background="canvas"
            />
          </div>
        </div>

        {/* Values, written as promises */}
        <div id="values" className="mt-24 scroll-mt-28 sm:mt-32">
          <div data-reveal className="flex flex-col items-start gap-4">
            <Eyebrow>Our values</Eyebrow>
            <h3 className="text-3xl leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-4xl">{about.valuesTitle}</h3>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {about.values.map((value, i) => {
              const featured = value.title === "Integrity";
              return (
                <li
                  key={value.title}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  className={cn(
                    "flex flex-col rounded-[1.5rem] p-6 sm:p-7",
                    i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                    i === about.values.length - 1 && "sm:col-span-2 lg:col-span-3",
                    featured ? "bg-accent text-accent-foreground" : "border border-line bg-mist text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-sm font-semibold",
                      featured ? "bg-white/15 text-white" : "bg-surface text-accent",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-8 text-xl font-semibold tracking-[-0.01em]">{value.title}</h4>
                  <p className={cn("mt-2 text-[0.9375rem] leading-relaxed", featured ? "text-white/90" : "text-ink-muted")}>
                    {value.promise}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Vision as the closing statement */}
        <figure data-reveal className="mx-auto mt-24 max-w-4xl text-center sm:mt-32">
          <figcaption className="text-sm font-semibold text-accent">{about.visionLabel}</figcaption>
          <blockquote className="mt-4 font-display text-2xl leading-snug font-semibold tracking-[-0.02em] text-ink text-balance sm:text-[2.125rem]">
            <p>{about.vision}</p>
          </blockquote>
        </figure>
      </Container>
    </section>
  );
}
