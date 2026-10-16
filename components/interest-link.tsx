"use client";

import type { ComponentProps } from "react";
import { requestInterest } from "@/lib/interest";

type InterestLinkProps = Omit<ComponentProps<"a">, "href"> & { interest: string };

/** Scrolls to the lead form (a plain anchor, so it works without JS) and pre-selects an interest. */
export function InterestLink({ interest, onClick, ...props }: InterestLinkProps) {
  return (
    <a
      href="#book"
      onClick={(event) => {
        requestInterest(interest);
        onClick?.(event);
      }}
      {...props}
    />
  );
}
