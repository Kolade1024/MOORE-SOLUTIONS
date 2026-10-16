import { DesktopNav } from "@/components/desktop-nav";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { CtaIcon } from "@/components/section-heading";
import { navItems, primaryCta } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70">
      <div className="relative mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Logo />
        <DesktopNav items={navItems} />
        <div className="flex items-center gap-1">
          <a
            href={primaryCta.href}
            className="hidden items-center gap-2 rounded-full border border-line-strong bg-surface py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            {primaryCta.label}
            <CtaIcon />
          </a>
          <MobileNav items={navItems} cta={primaryCta} />
        </div>
      </div>
    </header>
  );
}
