"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-xl !border !border-line !bg-surface !text-ink !shadow-[0_16px_40px_-16px_rgb(29_26_22/0.35)] !font-sans",
          description: "!text-ink-muted",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
