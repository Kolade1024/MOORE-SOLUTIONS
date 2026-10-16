# Moore Solutions: landing page

Single-page marketing site for Moore Solutions, a strategy and technology consulting firm.
Built with Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v4, TanStack Query v5,
React Hook Form + Zod, shadcn/ui-style primitives on Radix, and lucide-react.

There is no CMS and no database. All copy lives in typed constants in `/content`.

---

## 1. Setup

Requirements: Node.js 20+ (22 or 24 recommended) and npm.

```bash
npm install
cp .env.example .env.local     # then fill in the values (see below)
npm run dev                    # http://localhost:3000
```

| Script          | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Development server (Turbopack)       |
| `npm run build` | Production build                     |
| `npm start`     | Serve the production build           |
| `npm run lint`  | ESLint                               |

Type-check with `npx tsc --noEmit`.

## 2. Environment variables

| Name                   | Required          | Purpose                                                                                                   |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| `N8N_LEAD_WEBHOOK_URL` | Yes in production | n8n Webhook URL that receives each lead.                                                                   |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Public site URL with no trailing slash, e.g. `https://mooresolutions.co.uk`. Used by metadata, sitemap, robots and JSON-LD. |

What happens when `N8N_LEAD_WEBHOOK_URL` is missing:

- **Development:** the API logs the lead to the terminal and returns `200`, so you can test the form without n8n.
- **Production:** the API returns `503` with a friendly message, so leads are never silently lost. Set the variable before going live.

## 3. Connecting the n8n webhook

1. In n8n, create a workflow and add a **Webhook** trigger node.
2. Set **HTTP Method** to `POST`. Leave **Authentication** off, or see the hardening note below.
3. Set **Respond** to "Immediately". The site only checks for a `2xx` response.
4. Add the steps you want after the trigger: send to your CRM, email yourself, post to Slack, add a row to a sheet, and so on.
5. **Activate** the workflow and copy the **Production URL**. The Test URL only works while the editor is listening.
6. Put that URL in `N8N_LEAD_WEBHOOK_URL`, in `.env.local` locally and in your hosting provider's environment settings, then redeploy.

Each submission arrives as JSON in this shape:

```json
{
  "fullName": "Jane Smith",
  "email": "jane@company.co.uk",
  "company": "Smith & Co",
  "website": "smithandco.co.uk",
  "industry": "accounting",
  "companySize": "11-50",
  "biggestCost": "We rebuild the same client report by hand every month…",
  "interests": ["automation-integrations", "data-reporting"],
  "consent": true,
  "submittedAt": "2026-10-16T09:30:00.000Z",
  "source": "moore-solutions-website"
}
```

`industry`, `companySize` and `interests` are the ids from `/content/industries.ts`, `lib/schemas/lead.ts`, `/content/services.ts` and `/content/products.ts`.

**Hardening (optional).** To be sure requests really come from the site, enable Header Auth on the n8n Webhook node. Then send the matching header from `app/api/leads/route.ts` (in the `fetch` call) using a new secret env var.

### How the form works

- `lib/schemas/lead.ts` holds a single Zod schema, used both by the form (via `zodResolver`) and by the API route.
- `hooks/use-submit-lead.ts` wraps a TanStack Query `useMutation` around `lib/api/leads.ts`, which POSTs to `/api/leads`.
- `app/api/leads/route.ts`:
  - Rate-limits to 5 requests per IP per 10 minutes (in memory).
  - Rejects bodies over 10 KB.
  - Re-validates with Zod and returns errors per field.
  - Silently discards honeypot hits (the hidden `fax` field).
  - Forwards the lead to n8n with a 10-second timeout.
- The form bundle is lazy-loaded when the visitor scrolls near it.
- Service and product CTAs ("Discuss this", "Ask about this") scroll to the form and pre-tick the matching "area of interest" (`lib/interest.ts`).

The in-memory rate limiter is per server instance. On serverless hosting, add a firewall rate-limit rule or a shared store (e.g. Redis) if you get spam.

## 4. Editing content

| File                     | Contains                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `content/site.ts`        | Brand (name, **tagline**, email, socials), nav, hero, problem, how we work, integrity band, about (founders, mission, values, vision), results, final CTA, footer |
| `content/services.ts`    | The six services                                                                                 |
| `content/products.ts`    | Products, including the AI Receptionist demo call and transcript                                 |
| `content/industries.ts`  | "Industries we help" strip and the form's industry list                                          |
| `content/faqs.ts`        | FAQ questions and answers                                                                        |

The tagline is the `TAGLINE` constant at the top of `content/site.ts`.

### Add a service

1. Optional: add a photo to `public/images/`, e.g. `service-training.jpg`.
2. Append an object to `services` in `content/services.ts`:

   ```ts
   {
     id: "training",                       // stable id, never rename once live
     title: "Team Training",
     summary: "One sentence on the problem it fixes.",
     points: ["Benefit one", "Benefit two", "Benefit three"],
     icon: "handshake",                    // one of: compass | code | workflow | chart | sparkles | handshake
     image: { src: "/images/service-training.jpg", alt: "Describe the photo" },
   },
   ```

3. That's it. The service appears in the Services section, in the footer, as an "area of interest" in the form, in the API's validation and in the JSON-LD OfferCatalog.

To use a new icon, add it to `ServiceIcon` in `content/services.ts` and to `SERVICE_ICONS` in `components/service-list.tsx`.

### Add a product

Append to `products` in `content/products.ts`:

```ts
{
  id: "follow-up-assistant",
  name: "Follow-up Assistant",
  pitch: "One line on what it does for the client.",
  benefits: ["Benefit one", "Benefit two", "Benefit three"],
  status: "available",                    // or "coming-soon" for a placeholder card
  tag: "Available now",
  image: { src: "/images/product-follow-up.jpg", alt: "Describe the photo" },
  cta: { label: "Ask about this" },
  // demo: { ... }                        // optional; adds a "Hear a demo call" dialog
},
```

Available products are added to the form's interests and the JSON-LD automatically. Coming-soon products only render as cards.

### Show case studies

Add approved entries to `results.items` in `content/site.ts`. The Results section is hidden while the list is empty. Set `results.showEmptyState: true` if you'd rather show a "coming soon" card instead.

## 5. Branding

Colours, fonts and radii are defined once:

- **Colours and radii:** the `:root` block at the top of `app/globals.css`, mapped to Tailwind tokens in `@theme inline` (`bg-accent`, `text-ink`, `bg-blush`, `bg-night`, …).
- **Fonts:** `app/layout.tsx` (Urbanist for headings, Inter for body, via `next/font`).

## 6. Placeholders to replace before launch

Search the code for `TODO` to find all of them.

- [ ] **Contact email:** `siteConfig.email` in `content/site.ts` (currently `hello@example.com`).
- [ ] **LinkedIn and Instagram URLs:** `siteConfig.socials` (currently `#`).
- [ ] **Privacy policy link:** `siteConfig.privacyPolicyHref` (currently `#`). The form's consent text links here.
- [ ] **Demo call audio:** `public/demo-call.mp3` is 48 seconds of silence. Replace it, then update the transcript and timestamps in `content/products.ts`.
- [x] **Co-founders:** Eseyin Godspower and Kolade Oluwafemi, with photos (`public/images/founder-*.jpg`). Optional: add short bios.
- [ ] **Case studies:** `results.items` (the section stays hidden until you add some).
- [ ] **"Coming soon" products:** two placeholder cards in `content/products.ts`.
- [ ] **FAQ answers to confirm:** project timelines and the GDPR/DPA answer in `content/faqs.ts`.
- [ ] **Logo and favicon:** `components/logo.tsx` and `app/icon.svg`.
- [ ] **Social share image (optional):** `lib/og-image.tsx` generates a simple text card.
- [ ] **`NEXT_PUBLIC_SITE_URL` and `N8N_LEAD_WEBHOOK_URL`:** set both in production.

## 7. Images

The photos in `public/images/` are from [Unsplash](https://unsplash.com) and are free to use under the [Unsplash License](https://unsplash.com/license). No attribution is required, but it's appreciated.

| File                        | Unsplash photo ID              |
| --------------------------- | ------------------------------ |
| `hero-portrait.jpg`         | `photo-1556157382-97eda2d62296` |
| `hero-office.jpg`           | `photo-1497215728101-856f4ea42174` |
| `problem-team.jpg`          | `photo-1531482615713-2afd69097998` |
| `problem-paperwork.jpg`     | `photo-1450101499163-c8848c66ca85` |
| `service-strategy.jpg`      | `photo-1552664730-d307ca884978` |
| `service-software.jpg`      | `photo-1517694712202-14dd9538aa97` |
| `service-automation.jpg`    | `photo-1519389950473-47ba0277781c` |
| `service-data.jpg`          | `photo-1551288049-bebda4e38f71` |
| `service-ai.jpg`            | `photo-1486312338219-ce68d2c6f44d` |
| `service-support.jpg`       | `photo-1600880292203-757bb62b4baf` |
| `step-audit.jpg`            | `photo-1542744173-8e7e53415bb0` |
| `step-plan.jpg`             | `photo-1557804506-669a67965ba0` |
| `step-build.jpg`            | `photo-1522071820081-009f0129c71c` |
| `step-support.jpg`          | `photo-1551434678-e076c223a692` |
| `integrity.jpg`             | `photo-1553877522-43269d4ea984` |
| `product-receptionist.jpg`  | `photo-1556740738-b6a63e27c4df` |
| `about-team.jpg`            | `photo-1521737604893-d14cc237f11d` |
| `about-detail.jpg`          | `photo-1556761175-5973dc0f32e7` |

Each one can be viewed at `https://images.unsplash.com/<photo ID>`. The stock photos of people are illustrative only; none of them are labelled as your team.

## 8. Structure

```
app/
  layout.tsx            fonts, metadata, providers, scroll-reveal bootstrap
  page.tsx              section order + JSON-LD (Organization/ProfessionalService, WebSite, FAQPage)
  providers.tsx         QueryClientProvider, Sonner toaster, React Query Devtools (dev only)
  api/leads/route.ts    lead endpoint → n8n
  sitemap.ts, robots.ts, opengraph-image.tsx, twitter-image.tsx, icon.svg
components/
  sections/*            one file per page section (Server Components)
  ui/*                  shadcn/ui-style primitives (button, input, select, accordion, dialog, …)
  *.tsx                 small client islands: nav, service list, carousel, demo dialog, lead form
content/                all copy and data
hooks/use-submit-lead.ts
lib/                    schemas, API fetcher, rate limiter, interest pre-selection, utils
```

## 9. Performance notes

Lighthouse lab results on a local production build:

| Profile                        | Performance | Accessibility | Best Practices | SEO |
| ------------------------------ | ----------- | ------------- | -------------- | --- |
| Desktop                        | 100         | 100           | 100            | 100 |
| Mobile (simulated slow 4G, 4× CPU) | 83–88       | 100           | 100            | 100 |

In a normal Chrome window the page paints its LCP (the hero headline) in about 0.45 s.

The mobile lab score is limited by React hydration and the size of the page under Lighthouse's 4× CPU slowdown. Measure again on the deployed site with PageSpeed Insights.

If you need more mobile headroom, these are the next levers, roughly in order of impact:

1. Shorten the page or move a section (e.g. Industries) to its own page.
2. Replace the Radix FAQ accordion with native `<details>`.
3. Reduce the number of photos near the top of the page.
