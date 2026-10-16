import { Mail } from "lucide-react";
import { Logo } from "@/components/logo";
import { Container, CtaIcon } from "@/components/section-heading";
import { InstagramIcon, LinkedInIcon } from "@/components/social-icons";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { footer, navItems, primaryCta, siteConfig } from "@/content/site";

const linkClass = "text-[0.9375rem] text-night-muted transition-colors hover:text-night-ink";
const headingClass = "font-display text-sm font-semibold text-night-ink";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark-section px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-[90rem] rounded-[2rem] bg-night pt-14 pb-8 sm:rounded-[2.5rem] sm:pt-20">
        <Container>
          <div className="flex flex-col gap-8 border-b border-night-line pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.9375rem] text-night-muted">{footer.kicker}</p>
              <p className="mt-3 font-display text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.035em] text-night-ink sm:text-6xl lg:text-7xl">
                {siteConfig.tagline}.
              </p>
            </div>
            <a
              href={primaryCta.href}
              className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-accent pr-2 pl-6 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover lg:self-auto"
            >
              {primaryCta.label}
              <CtaIcon />
            </a>
          </div>

          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Logo tone="dark" />
              <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-night-muted">{footer.blurb}</p>
            </div>

            <nav aria-label="Footer">
              <h2 className={headingClass}>Company</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className={headingClass}>Services</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {services.map((service) => (
                  <li key={service.id}>
                    <a href={`#service-${service.id}`} className={linkClass}>
                      {service.title}
                    </a>
                  </li>
                ))}
                {products
                  .filter((p) => p.status === "available")
                  .map((product) => (
                    <li key={product.id}>
                      <a href="#products" className={linkClass}>
                        {product.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h2 className={headingClass}>Contact</h2>
              <a href={`mailto:${siteConfig.email}`} className={`mt-4 inline-flex items-center gap-2 ${linkClass}`}>
                <Mail className="size-4" aria-hidden="true" />
                {siteConfig.email}
              </a>
              <ul className="mt-5 flex gap-2">
                <li>
                  <a
                    href={siteConfig.socials.linkedin}
                    aria-label={`${siteConfig.name} on LinkedIn`}
                    className="flex size-10 items-center justify-center rounded-full border border-night-line text-night-ink transition-colors hover:border-accent-on-night hover:text-accent-on-night"
                  >
                    <LinkedInIcon className="size-4" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.socials.instagram}
                    aria-label={`${siteConfig.name} on Instagram`}
                    className="flex size-10 items-center justify-center rounded-full border border-night-line text-night-ink transition-colors hover:border-accent-on-night hover:text-accent-on-night"
                  >
                    <InstagramIcon className="size-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-night-line pt-6 text-sm text-night-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
            <a href={siteConfig.privacyPolicyHref} className="transition-colors hover:text-night-ink">
              Privacy policy
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
