import type { Metadata, Viewport } from "next";
import { Inter, Urbanist } from "next/font/google";
import { Providers } from "@/app/providers";
import { siteConfig } from "@/content/site";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

// Variable font: one file covers every weight used.
const heading = Urbanist({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Enables scroll-reveal before first paint (so turning it on later doesn't restyle the whole page).
 * Skipped for prefers-reduced-motion. If JS never hydrates, CSS reveals everything after 4s.
 */
const revealScript = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window)document.documentElement.classList.add("reveal-ready")}catch(e){}`;

const title = `${siteConfig.name} | Strategy and technology consulting`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "strategy consulting",
    "technology consulting",
    "business audit",
    "process improvement",
    "automation",
    "custom software",
    "small business",
    "UK",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
