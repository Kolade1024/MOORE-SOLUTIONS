/**
 * Services shown in the Services section, the lead form's "areas of interest" and the JSON-LD
 * OfferCatalog. To add a service: append an object below and (optionally) drop an image into
 * /public/images. The `icon` must be a key of SERVICE_ICONS in components/sections/services.tsx.
 */

export type ServiceIcon = "compass" | "code" | "workflow" | "chart" | "sparkles" | "handshake";

export type Service = {
  /** Stable id, used for the lead form interest and the URL-safe anchor. Never rename once live. */
  id: string;
  title: string;
  summary: string;
  points: string[];
  icon: ServiceIcon;
  image: { src: string; alt: string };
};

export const services = [
  {
    id: "audit-strategy",
    title: "Business Audit & Strategy",
    summary:
      "We find where time and money are leaking, redesign the processes behind them and give you a prioritised roadmap.",
    points: ["Process mapping and cost-of-delay analysis", "Quick wins you can act on this month", "A roadmap ranked by impact and effort"],
    icon: "compass",
    image: { src: "/images/service-strategy.jpg", alt: "A team planning a process on a wall of sticky notes" },
  },
  {
    id: "software-web",
    title: "Custom Software & Web Development",
    summary: "Websites, web apps, client portals and internal tools built around how your business actually works.",
    points: ["Fast, accessible websites that win enquiries", "Portals and internal tools your team will use", "Built to grow, with no lock-in"],
    icon: "code",
    image: { src: "/images/service-software.jpg", alt: "A laptop showing source code on a tidy desk" },
  },
  {
    id: "automation-integrations",
    title: "Automation & Integrations",
    summary:
      "We connect your tools and remove repetitive admin: lead handling, invoicing, reporting, onboarding and follow-ups.",
    points: ["Your systems talking to each other", "Less copying and pasting between tools", "Clear alerts when a person needs to step in"],
    icon: "workflow",
    image: { src: "/images/service-automation.jpg", alt: "Several people working together on laptops around one table" },
  },
  {
    id: "data-reporting",
    title: "Data & Reporting",
    summary: "Dashboards and reporting that turn scattered spreadsheets into numbers you can make decisions with.",
    points: ["One source of truth for key figures", "Dashboards built for the questions you ask", "Automated weekly and monthly reports"],
    icon: "chart",
    image: { src: "/images/service-data.jpg", alt: "A dashboard of charts and figures on a laptop screen" },
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    summary: "AI assistants and agents, used only where they genuinely save time or money, and checked by people where it matters.",
    points: ["Assistants that answer, draft and sort", "Grounded in your own documents and rules", "Measured against the time it saves"],
    icon: "sparkles",
    image: { src: "/images/service-ai.jpg", alt: "Close-up of hands typing on a laptop keyboard" },
  },
  {
    id: "support-advisory",
    title: "Ongoing Support & Advisory",
    summary: "A long-term technology partner who knows your business, keeps things running and helps you plan what's next.",
    points: ["Monitoring, fixes and small improvements", "Regular reviews against agreed results", "A straight answer when you need advice"],
    icon: "handshake",
    image: { src: "/images/service-support.jpg", alt: "Two colleagues celebrating with a high five in a bright office" },
  },
] satisfies Service[];
