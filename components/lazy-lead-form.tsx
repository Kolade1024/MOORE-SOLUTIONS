"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function FormPlaceholder() {
  return (
    <div
      data-surface="light"
      role="status"
      aria-busy="true"
      aria-label="Loading the booking form"
      className="min-h-[85.5rem] rounded-3xl border border-line bg-surface p-5 sm:min-h-[56rem] sm:p-8"
    >
      <div className="h-8 w-2/3 animate-pulse rounded-lg bg-mist" />
      <div className="mt-3 h-4 w-5/6 animate-pulse rounded bg-mist" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-11 animate-pulse rounded-lg bg-mist" />
        ))}
        <div className="h-11 animate-pulse rounded-lg bg-mist sm:col-span-2" />
        <div className="h-28 animate-pulse rounded-lg bg-mist sm:col-span-2" />
      </div>
    </div>
  );
}

const LeadForm = dynamic(() => import("@/components/lead-form").then((m) => m.LeadForm), {
  ssr: false,
  loading: FormPlaceholder,
});

/** Loads the form bundle (React Hook Form, Zod, Radix Select) only when it is about to scroll into view. */
export function LazyLeadForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{shouldLoad ? <LeadForm /> : <FormPlaceholder />}</div>;
}
