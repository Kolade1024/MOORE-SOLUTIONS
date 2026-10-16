import Image from "next/image";
import { Check, Hourglass } from "lucide-react";
import { DemoCallButton } from "@/components/demo-call-button";
import { InterestLink } from "@/components/interest-link";
import { Container, CtaIcon, SectionHeading } from "@/components/section-heading";
import { products, type Product } from "@/content/products";
import { productsIntro } from "@/content/site";
import { cn } from "@/lib/utils";

function AvailableProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col">
      {product.image ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-night-surface sm:aspect-[16/11]">
          <Image src={product.image.src} alt={product.image.alt} fill sizes="(min-width: 1024px) 600px, 92vw" className="object-cover" />
          <span className="absolute top-4 left-4 rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-white">{product.tag}</span>
        </div>
      ) : null}
      <div className="mt-6 flex flex-1 flex-col">
        <p className="text-[0.8125rem] text-night-muted">Product</p>
        <h3 className="mt-1 text-3xl font-semibold tracking-[-0.02em] text-night-ink">{product.name}</h3>
        <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-night-muted">{product.pitch}</p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm text-night-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-accent-on-night" strokeWidth={2.5} aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {product.demo ? (
            <DemoCallButton
              demo={product.demo}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-night-line bg-night-surface py-1 pr-5 pl-2 text-[0.9375rem] font-medium text-night-ink transition-colors hover:border-night-muted"
            />
          ) : null}
          {product.cta ? (
            <InterestLink
              interest={product.id}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent pr-2 pl-5 text-[0.9375rem] font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              {product.cta.label}
              <span className="sr-only">: {product.name}</span>
              <CtaIcon />
            </InterestLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ComingSoonCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="flex h-full flex-col">
      <div
        aria-hidden="true"
        className={cn(
          "relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[1.5rem] border border-night-line",
          "bg-[radial-gradient(circle,var(--color-night-line)_1px,transparent_1.5px)] [background-size:16px_16px]",
          index % 2 === 0 ? "bg-night-surface" : "bg-night",
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-2xl border border-night-line bg-night text-accent-on-night">
          <Hourglass className="size-6" />
        </span>
      </div>
      <div className="mt-5">
        <p className="text-[0.8125rem] text-night-muted">{product.tag}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-[-0.01em] text-night-ink">{product.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-night-muted">{product.pitch}</p>
      </div>
    </article>
  );
}

export function Products() {
  const available = products.filter((p) => p.status === "available");
  const comingSoon = products.filter((p) => p.status === "coming-soon");

  return (
    <section id="products" aria-labelledby="products-title" className="dark-section bg-night py-20 sm:py-28">
      <Container>
        <SectionHeading id="products-title" tone="dark" eyebrow={productsIntro.eyebrow} title={productsIntro.title} description={productsIntro.description} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <ul className="flex flex-col gap-12">
            {available.map((product) => (
              <li key={product.id} data-reveal>
                <AvailableProductCard product={product} />
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-10 lg:pt-16">
            {comingSoon.map((product, i) => (
              <li key={product.id} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                <ComingSoonCard product={product} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
