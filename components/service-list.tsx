"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { BarChart3, Check, ChevronDown, Code2, Compass, Handshake, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { InterestLink } from "@/components/interest-link";
import type { Service, ServiceIcon } from "@/content/services";
import { cn } from "@/lib/utils";

export const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  compass: Compass,
  code: Code2,
  workflow: Workflow,
  chart: BarChart3,
  sparkles: Sparkles,
  handshake: Handshake,
};

/**
 * Disclosure list of services. Panels stay in the DOM when collapsed (inert, not removed),
 * so every service remains indexable.
 */
export function ServiceList({ services, ctaLabel }: { services: Service[]; ctaLabel: string }) {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null);
  const baseId = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {services.map((service) => {
        const Icon = SERVICE_ICONS[service.icon];
        const isOpen = openId === service.id;
        const panelId = `${baseId}-${service.id}-panel`;
        const buttonId = `${baseId}-${service.id}-button`;

        return (
          <li key={service.id} id={`service-${service.id}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : service.id)}
                className="group flex w-full items-center gap-4 py-5 text-left"
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                    isOpen ? "bg-accent text-accent-foreground" : "bg-mist text-ink group-hover:bg-accent-soft group-hover:text-accent",
                  )}
                >
                  <Icon className="size-[1.125rem]" aria-hidden="true" />
                </span>
                <span
                  className={cn(
                    "flex-1 font-display text-lg font-semibold tracking-[-0.01em] transition-colors sm:text-xl",
                    isOpen ? "text-accent" : "text-ink group-hover:text-accent",
                  )}
                >
                  {service.title}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn("size-5 shrink-0 text-ink-muted transition-transform duration-300", isOpen && "rotate-180 text-accent")}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="grid gap-5 pb-6 sm:grid-cols-[1fr_11rem] sm:gap-6 sm:pl-14">
                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-muted">{service.summary}</p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-ink">
                          <Check className="mt-0.5 size-4 shrink-0 text-highlight" strokeWidth={2.5} aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <InterestLink
                      interest={service.id}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      {ctaLabel}
                      <span className="sr-only">: {service.title}</span>
                      <span aria-hidden="true">→</span>
                    </InterestLink>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist sm:aspect-auto sm:h-36">
                    <Image src={service.image.src} alt={service.image.alt} fill sizes="(min-width: 640px) 176px, 90vw" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
