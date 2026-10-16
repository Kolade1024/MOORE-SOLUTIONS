"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";
import type { ProductDemo } from "@/content/products";

const loadDialog = () => import("@/components/demo-call-dialog").then((m) => m.DemoCallDialog);
const DemoCallDialog = dynamic(loadDialog, { ssr: false });

/** "Hear a demo call" trigger. The dialog code is fetched on first hover, focus or click. */
export function DemoCallButton({ demo, className }: { demo: ProductDemo; className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  const prefetch = () => {
    void loadDialog();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
        className={className}
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Play className="size-3 translate-x-px fill-current" aria-hidden="true" />
        </span>
        {demo.label}
      </button>
      {requested ? <DemoCallDialog demo={demo} open={open} onOpenChange={setOpen} returnFocusTo={buttonRef} /> : null}
    </>
  );
}
