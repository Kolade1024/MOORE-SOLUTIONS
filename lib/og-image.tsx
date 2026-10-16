import { ImageResponse } from "next/og";
import { hero, siteConfig } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${siteConfig.name}: strategy and technology consulting`;

/** Shared social card used by opengraph-image and twitter-image. TODO: replace with a designed card if wanted. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#0e0d12",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#0e0d12" />
            <path d="M8 22.5V13a4 4 0 0 1 8 0v9.5M16 13a4 4 0 0 1 8 0v9.5" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="24" cy="8.5" r="2" fill="#6b3cf0" />
          </svg>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#6b3cf0" }}>
            Moore<span style={{ color: "#0e0d12" }}>&nbsp;Solutions</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.04, letterSpacing: -2.5, fontWeight: 700, display: "flex", flexWrap: "wrap" }}>
            {[
              ...hero.headline.before.split(" ").map((word) => ({ word, accent: false })),
              { word: hero.headline.emphasis, accent: true },
              ...hero.headline.after.split(" ").map((word) => ({ word, accent: false })),
            ].map(({ word, accent }, i) => (
              <span key={i} style={{ marginRight: 22, color: accent ? "#6b3cf0" : "#0e0d12" }}>
                {word}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 30, color: "#5e5b66" }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
