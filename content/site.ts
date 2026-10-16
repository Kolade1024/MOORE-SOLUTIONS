/**
 * Page copy that isn't a service, product, industry or FAQ lives here.
 * Search the project for "TODO" to find every placeholder that still needs real content.
 */

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

/** Change the tagline here; it is used in the footer, metadata and JSON-LD. */
export const TAGLINE = "More solutions for you";

export const siteConfig = {
  name: "Moore Solutions",
  tagline: TAGLINE,
  description:
    "Moore Solutions is a strategy and technology consulting firm. We find what is costing your business time and money, and fix it, so you earn more, run smoother and scale with confidence.",
  locale: "en_GB",
  // TODO: replace with your real contact email.
  email: "hello@example.com",
  socials: {
    // TODO: replace with your real profile URLs. Placeholders ("#") are left out of JSON-LD.
    linkedin: "#",
    instagram: "#",
  },
  // TODO: link to your real privacy policy page.
  privacyPolicyHref: "#",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export const primaryCta = { label: "Book a free audit", href: "#book" } as const;

// ---------------------------------------------------------------------------
// Hero (built on the mission)
// ---------------------------------------------------------------------------

export const hero = {
  /** Small badge above the headline. The emoji is decorative (hidden from screen readers). */
  badge: { before: "On demand", emoji: "🤝", after: "live support" },
  /** `emphasis` gets the pink underline swoosh. */
  headline: { before: "Fix What's", emphasis: "Costing", after: "Your Business" },
  subheadline: "Strategy and technology that help you earn more, run smoother and scale with confidence.",
  secondaryCta: { label: "See how we help", href: "#services" },
  image: { src: "/images/hero-portrait.jpg", alt: "A smiling business owner working in a bright office" },
  detailImage: { src: "/images/hero-office.jpg", alt: "" },
  statCard: { value: "£0", suffix: "audit", caption: "Find where your time and money leak." },
  card: { index: "01", title: "Simplest fix first" },
  howLink: { label: "How we work", href: "#how-we-work" },
};

// ---------------------------------------------------------------------------
// Problem framing
// ---------------------------------------------------------------------------

export type ProblemIcon = "clock" | "inbox" | "unplug";

export const problem = {
  eyebrow: "Where money leaks",
  title: "Most businesses lose time and money in the same three places.",
  description:
    "None of these show up as a line on your P&L, which is why they're easy to live with. Added up, they cost far more than most owners expect.",
  leaks: [
    {
      icon: "clock",
      title: "Hours lost to manual admin",
      description: "Re-typing data, chasing paperwork and building the same report every week, by hand.",
    },
    {
      icon: "inbox",
      title: "Missed leads and slow follow-up",
      description: "Enquiries that sit unanswered, calls that go to voicemail and quotes that never get chased.",
    },
    {
      icon: "unplug",
      title: "Disconnected tools, no clear numbers",
      description: "Five systems that don't talk to each other, and no single place to see how the business is doing.",
    },
  ] satisfies { icon: ProblemIcon; title: string; description: string }[],
  cta: { label: "Find your leaks", href: "#book" },
  images: {
    main: { src: "/images/problem-team.jpg", alt: "A team gathered around a laptop working through a problem" },
    detail: { src: "/images/problem-paperwork.jpg", alt: "A person signing a stack of paperwork" },
  },
  stickers: { highlight: { value: "60–90", label: "minute free audit" }, card: "Prioritised plan" },
};

// ---------------------------------------------------------------------------
// Services intro (the services themselves live in content/services.ts)
// ---------------------------------------------------------------------------

export const servicesIntro = {
  eyebrow: "What we do",
  title: "How we help your business run better.",
  description:
    "Six ways we fix what's costing you. Most clients start with an audit, then pick only what the plan says is worth doing.",
  ctaLabel: "Discuss this",
};

// ---------------------------------------------------------------------------
// How we work
// ---------------------------------------------------------------------------

export const howWeWork = {
  eyebrow: "How we work",
  title: "Four steps, from first call to lasting results.",
  description:
    "Every plan recommends the simplest fix that works. Sometimes that's new software. Often it's a better process or a tool you already pay for.",
  steps: [
    {
      title: "Audit",
      caption: "Find the leaks",
      description: "A free 60–90 minute session to map how work moves through your business and where it gets stuck.",
      image: { src: "/images/step-audit.jpg", alt: "A consultant talking through findings with a client team around a table" },
    },
    {
      title: "Plan",
      caption: "Simplest fix first",
      description: "A prioritised plan ranked by impact and effort. It may include no new technology at all.",
      image: { src: "/images/step-plan.jpg", alt: "A team planning on a whiteboard in a workshop" },
    },
    {
      title: "Build",
      caption: "Built around you",
      description: "We build, connect and test the changes with your team, in small steps you can see working.",
      image: { src: "/images/step-build.jpg", alt: "A team building software together on laptops" },
    },
    {
      title: "Support & improve",
      caption: "Results we measure",
      description: "We stay with you, measure what changed in time, revenue and costs, and keep improving it.",
      image: { src: "/images/step-support.jpg", alt: "Colleagues reviewing work together at their desks" },
    },
  ],
};

// ---------------------------------------------------------------------------
// Integrity callout band
// ---------------------------------------------------------------------------

export const integrity = {
  eyebrow: "Our promise",
  quote: "We'll tell you what you actually need, even when it's less than you expected to buy.",
  supporting: "If the honest answer is a five-minute settings change, that's the answer you'll get.",
  image: { src: "/images/integrity.jpg", alt: "A person working at a desk in a quiet office" },
  secondary: { label: "Read our values", href: "#values" },
};

// ---------------------------------------------------------------------------
// Products intro (the products themselves live in content/products.ts)
// ---------------------------------------------------------------------------

export const productsIntro = {
  eyebrow: "Products",
  title: "Ready-made tools, built from what we keep fixing.",
  description: "Proven solutions you can switch on quickly, set up around your business and supported by us.",
};

// ---------------------------------------------------------------------------
// Industries intro
// ---------------------------------------------------------------------------

export const industriesIntro = {
  title: "Built for small and mid-sized businesses and professional firms",
};

// ---------------------------------------------------------------------------
// About, founders, mission, values, vision
// ---------------------------------------------------------------------------

export const about = {
  eyebrow: "About us",
  title: "A strategy and technology firm, not an AI agency.",
  mission:
    "We find what is costing a business money and time, and fix it with strategy, technology and AI, so our clients earn more, run smoother and scale with confidence.",
  founders: [
    {
      name: "Eseyin Godspower",
      role: "Co-founder, Strategy",
      initials: "EG",
      photo: "/images/founder-eseyin-godspower.jpg" as string | undefined,
    },
    {
      name: "Kolade Oluwafemi",
      role: "Co-founder, Software Engineer",
      initials: "KO",
      photo: "/images/founder-kolade-oluwafemi-2.jpg" as string | undefined,
    },
  ],
  images: {
    main: { src: "/images/about-team.jpg", alt: "A small team working together in a modern office" },
    detail: { src: "/images/about-detail.jpg", alt: "" },
  },
  stickers: { highlight: { value: "2", label: "co-founders" }, card: "Strategy + technology" },
  valuesTitle: "Our promises to you",
  values: [
    { title: "Tech is a tool", promise: "We'll start with your business problem, never with the technology." },
    { title: "Integrity", promise: "We'll tell you what you actually need, even when it's less than you expected to buy." },
    { title: "Results we can measure", promise: "We'll judge our work by what changes in your revenue, time and costs." },
    { title: "Partnership, not projects", promise: "We'll stay with you and solve problems alongside you as your business grows." },
    { title: "Clear communication", promise: "We'll use plain language, give you regular updates and never spring surprises." },
  ],
  visionLabel: "Our vision",
  vision:
    "To be a leading strategy and technology consulting firm for organisations of every size, from small businesses to governments, while building the people and research that solve problems beyond profit and make the world a better place.",
};

// ---------------------------------------------------------------------------
// Results / case studies
// ---------------------------------------------------------------------------

export type CaseStudy = {
  client: string;
  industry: string;
  /** Measurable outcome, e.g. "12 hours a week of admin removed". Must be real and approved. */
  result: string;
  summary: string;
  quote?: { text: string; name: string; role: string };
};

export const results = {
  eyebrow: "Results",
  title: "What changed for our clients.",
  /**
   * The section is hidden while `items` is empty. Set `showEmptyState: true` to show a
   * "case studies coming soon" card instead.
   */
  showEmptyState: false,
  emptyState: {
    title: "Our first case studies are on their way.",
    description: "We only publish results our clients have signed off, measured in hours, revenue and costs.",
  },
  // TODO: add real, approved case studies here. Never publish invented results, logos or quotes.
  items: [] as CaseStudy[],
};

// ---------------------------------------------------------------------------
// Final CTA and lead form
// ---------------------------------------------------------------------------

export const finalCta = {
  eyebrow: "Free Business Audit",
  title: "Let's find what's costing you, together.",
  description:
    "In 60–90 minutes we'll map where your business is losing time and money and give you a prioritised plan. No jargon, no obligation, no hard sell.",
  outcomes: [
    "A clear picture of where your time and money go",
    "Quick wins you can act on straight away",
    "A plan ranked by impact, which may need no new technology",
  ],
  form: {
    title: "Book your free audit",
    description: "Tell us a little about your business. We'll reply within one working day.",
    submitLabel: "Book my free audit",
    successTitle: "Thank you, we've got your details.",
    successMessage: "We'll be in touch within one working day to arrange your free audit.",
  },
};

export const footer = {
  kicker: "Got a problem costing you time or money?",
  blurb: "Strategy and technology consulting for small and mid-sized businesses across the UK and Europe.",
};
