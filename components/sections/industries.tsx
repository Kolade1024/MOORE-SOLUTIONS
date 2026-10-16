import {
  Briefcase,
  Building2,
  Calculator,
  Megaphone,
  Scale,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/section-heading";
import { industries, type IndustryIcon } from "@/content/industries";
import { industriesIntro } from "@/content/site";

const INDUSTRY_ICONS: Record<IndustryIcon, LucideIcon> = {
  clinic: Stethoscope,
  law: Scale,
  accounting: Calculator,
  agency: Megaphone,
  shop: ShoppingBag,
  hospitality: UtensilsCrossed,
  service: Briefcase,
  property: Building2,
};

function IndustryRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
      {industries.map((industry) => {
        const Icon = INDUSTRY_ICONS[industry.icon];
        return (
          <li key={industry.id} className="flex items-center gap-2.5 whitespace-nowrap text-ink-muted">
            <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
            <span className="font-display text-xl font-semibold tracking-[-0.02em]">{industry.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** "Industries we help", styled like the logo strip in the design reference. */
export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="border-b border-line py-14 sm:py-16">
      <Container>
        <h2 id="industries-title" className="text-center text-[0.9375rem] font-medium text-ink-muted">
          {industriesIntro.title}
        </h2>
      </Container>
      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
          <IndustryRow />
          <div className="motion-reduce:hidden">
            <IndustryRow hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
