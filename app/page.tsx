import { RevealObserver } from "@/components/reveal-observer";
import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Industries } from "@/components/sections/industries";
import { Integrity } from "@/components/sections/integrity";
import { Problem } from "@/components/sections/problem";
import { Products } from "@/components/sections/products";
import { Results } from "@/components/sections/results";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { faqs } from "@/content/faqs";
import { availableProducts } from "@/content/products";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { getSiteUrl } from "@/lib/utils";

function StructuredData() {
  const url = getSiteUrl();
  const sameAs = Object.values(siteConfig.socials).filter((href) => href.startsWith("http"));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${url}/#organization`,
        name: siteConfig.name,
        slogan: siteConfig.tagline,
        description: siteConfig.description,
        url,
        email: siteConfig.email,
        logo: `${url}/icon.svg`,
        image: `${url}/opengraph-image`,
        areaServed: [
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Place", name: "Europe" },
        ],
        knowsLanguage: "en-GB",
        ...(sameAs.length ? { sameAs } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services and products",
          itemListElement: [
            {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
              itemOffered: {
                "@type": "Service",
                name: "Free Business Audit",
                description: "A 60–90 minute session to find where a business is losing time and money, with a prioritised plan.",
              },
            },
            ...services.map((service) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: service.title, description: service.summary },
            })),
            ...availableProducts.map((product) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: product.name, description: product.pitch },
            })),
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: siteConfig.name,
        inLanguage: "en-GB",
        publisher: { "@id": `${url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: faqs.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-sm text-canvas focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Problem />
        <Services />
        <HowWeWork />
        <Integrity />
        <Products />
        <Industries />
        <About />
        <Results />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <StructuredData />
      <RevealObserver />
    </>
  );
}
