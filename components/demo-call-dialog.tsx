"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CircleAlert, Pause, Play, Volume2 } from "lucide-react";
import type React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { ProductDemo } from "@/content/products";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function DemoPlayer({ demo }: { demo: ProductDemo }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.error) setHasError(true);
    if (audio.readyState >= 1 && Number.isFinite(audio.duration)) setDuration(audio.duration);
  }, []);

  const play = useCallback(async () => {
    try {
      await audioRef.current?.play();
    } catch {
      setHasError(true);
    }
  }, []);

  const seekTo = (seconds: number, autoplay = false) => {
    const audio = audioRef.current;
    if (!audio || hasError) return;
    audio.currentTime = seconds;
    setCurrentTime(seconds);
    setHasStarted(true);
    if (autoplay && audio.paused) void play();
  };

  const total = duration || demo.transcript.at(-1)!.at + 4;
  const activeIndex = hasStarted
    ? demo.transcript.reduce((active, line, i) => (currentTime >= line.at ? i : active), 0)
    : -1;

  return (
    <div className="flex min-h-0 flex-col">
      <audio
        ref={audioRef}
        src={demo.audioSrc}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => {
          setIsPlaying(true);
          setHasStarted(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />

      <div className="flex items-center gap-4 rounded-2xl bg-night p-4 text-night-ink sm:p-5">
        <button
          type="button"
          onClick={() => (isPlaying ? audioRef.current?.pause() : void play())}
          disabled={hasError}
          aria-label={isPlaying ? "Pause demo call" : "Play demo call"}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPlaying ? <Pause className="size-5 fill-current" aria-hidden="true" /> : <Play className="size-5 translate-x-0.5 fill-current" aria-hidden="true" />}
        </button>
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={total}
            step={0.1}
            value={currentTime}
            disabled={hasError}
            onChange={(e) => seekTo(Number(e.target.value))}
            aria-label="Seek demo call"
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(total)}`}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-night-line accent-accent-on-night disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(to right, var(--color-accent-on-night) ${(currentTime / total) * 100}%, var(--color-night-line) 0)`,
            }}
          />
          <div className="mt-2 flex justify-between text-xs text-night-muted tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span className="flex items-center gap-1.5">
              <Volume2 className="size-3.5" aria-hidden="true" />
              {formatTime(total)}
            </span>
          </div>
        </div>
      </div>

      {hasError ? (
        <p role="status" className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
          <CircleAlert className="size-4 text-accent" aria-hidden="true" />
          The recording isn&apos;t available right now. You can still read the transcript.
        </p>
      ) : null}

      <h3 className="mt-6 text-sm font-semibold text-ink">Transcript</h3>
      <ol className="mt-2 -mx-2 flex max-h-[min(22rem,45dvh)] flex-col gap-0.5 overflow-y-auto px-2 pb-1" tabIndex={0} aria-label="Call transcript">
        {demo.transcript.map((line, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => seekTo(line.at, true)}
              aria-current={i === activeIndex ? "true" : undefined}
              disabled={hasError}
              className={cn(
                "grid w-full grid-cols-[2.75rem_1fr] gap-2 rounded-xl px-3 py-2.5 text-left transition-colors disabled:cursor-default",
                i === activeIndex ? "bg-accent-soft" : "hover:bg-mist",
              )}
            >
              <span className="pt-0.5 text-xs text-ink-muted tabular-nums">{formatTime(line.at)}</span>
              <span className="text-[0.9375rem] leading-relaxed text-ink">
                <span className={cn("mr-1.5 font-semibold", line.speaker === "agent" ? "text-accent" : "text-ink")}>
                  {line.speaker === "agent" ? `${demo.agentName} (AI):` : "Caller:"}
                </span>
                {line.text}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Loaded on demand by DemoCallButton, so Radix Dialog and the player stay out of the initial bundle. */
export function DemoCallDialog({
  demo,
  open,
  onOpenChange,
  returnFocusTo,
}: {
  demo: ProductDemo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-5 sm:p-7"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusTo.current?.focus();
        }}
      >
        <div className="pr-10">
          <DialogTitle>{demo.title}</DialogTitle>
          <DialogDescription className="mt-1.5">{demo.description}</DialogDescription>
        </div>
        <div className="mt-6 flex min-h-0 flex-col">
          <DemoPlayer demo={demo} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
