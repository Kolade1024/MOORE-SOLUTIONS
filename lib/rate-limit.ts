/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Good enough to stop casual spam on a single instance. On serverless platforms each
 * instance keeps its own memory, so for stronger guarantees swap this for a shared
 * store (e.g. Redis) or a platform firewall rule.
 */

type RateLimitOptions = { limit: number; windowMs: number };
type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

const hits = new Map<string, number[]>();
let lastSweep = Date.now();

export function rateLimit(key: string, { limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (now - lastSweep > windowMs) {
    for (const [storedKey, timestamps] of hits) {
      if (timestamps.every((t) => t <= windowStart)) hits.delete(storedKey);
    }
    lastSweep = now;
  }

  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfterSeconds = Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000));
    return { ok: false, retryAfterSeconds };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
