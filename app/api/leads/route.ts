import { NextResponse } from "next/server";
import * as z from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { leadSchema, type LeadApiResponse } from "@/lib/schemas/lead";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }; // 5 submissions per IP per 10 minutes
const WEBHOOK_TIMEOUT_MS = 10_000;

function json(body: LeadApiResponse, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

export async function POST(request: Request) {
  const limited = rateLimit(`leads:${getClientIp(request)}`, RATE_LIMIT);
  if (!limited.ok) {
    return json(
      { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "That submission is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Please check the highlighted fields and try again.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { fax, ...lead } = parsed.data;

  // Honeypot filled in: almost certainly a bot. Pretend it worked and drop it.
  if (fax) {
    console.warn("[leads] Honeypot triggered, submission discarded.");
    return json({ ok: true });
  }

  const payload = {
    ...lead,
    submittedAt: new Date().toISOString(),
    source: "moore-solutions-website",
  };

  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.info("[leads] N8N_LEAD_WEBHOOK_URL is not set. Lead payload (dev only):", payload);
      return json({ ok: true });
    }
    console.error("[leads] N8N_LEAD_WEBHOOK_URL is not set. Lead could not be delivered.");
    return json(
      { ok: false, error: "We couldn't send your details just now. Please email us instead." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[leads] n8n webhook responded with ${response.status}.`);
      return json(
        { ok: false, error: "We couldn't send your details just now. Please try again shortly." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[leads] Failed to reach n8n webhook:", error);
    return json(
      { ok: false, error: "We couldn't send your details just now. Please try again shortly." },
      { status: 502 },
    );
  }

  return json({ ok: true });
}
