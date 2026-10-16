import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-lg border border-input bg-surface px-3.5 py-3 text-base text-ink shadow-[0_1px_0_rgb(29_26_22/0.03)] transition-[border-color,box-shadow] outline-none placeholder:text-ink-muted/80 sm:text-[0.9375rem]",
        "focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/15 focus-visible:outline-none",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/15",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
