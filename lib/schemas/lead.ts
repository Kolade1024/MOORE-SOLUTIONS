import * as z from "zod";
import { industries } from "@/content/industries";
import { availableProducts } from "@/content/products";
import { services } from "@/content/services";

/** Shared between the client form and the /api/leads route handler. */

export const INDUSTRY_OPTIONS = [
  ...industries.map((industry) => ({ value: industry.id, label: industry.label })),
  { value: "other", label: "Other" },
];

export const COMPANY_SIZE_OPTIONS = [
  { value: "1", label: "Just me" },
  { value: "2-10", label: "2–10 people" },
  { value: "11-50", label: "11–50 people" },
  { value: "51-200", label: "51–200 people" },
  { value: "200+", label: "More than 200" },
] as const;

export const INTEREST_OPTIONS = [
  ...services.map((service) => ({ value: service.id, label: service.title })),
  ...availableProducts.map((product) => ({ value: product.id, label: product.name })),
];

const INDUSTRY_VALUES = new Set(INDUSTRY_OPTIONS.map((o) => o.value));
const SIZE_VALUES = new Set<string>(COMPANY_SIZE_OPTIONS.map((o) => o.value));
const INTEREST_VALUES = new Set(INTEREST_OPTIONS.map((o) => o.value));

const LIKELY_URL = /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+(:\d+)?(\/\S*)?$/i;

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { error: "Please enter your full name." })
    .max(100, { error: "Please keep your name under 100 characters." }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Please enter a valid work email." }))
    .refine((value) => value.length <= 254, { error: "That email address is too long." }),
  company: z
    .string()
    .trim()
    .min(2, { error: "Please enter your company's name." })
    .max(120, { error: "Please keep the company name under 120 characters." }),
  website: z
    .string()
    .trim()
    .max(200, { error: "Please keep the website address under 200 characters." })
    .refine((value) => value === "" || LIKELY_URL.test(value), {
      error: "Please enter a valid website, e.g. yourcompany.co.uk, or leave it blank.",
    })
    .default(""),
  industry: z
    .string({ error: "Please choose your industry." })
    .refine((value) => INDUSTRY_VALUES.has(value), { error: "Please choose your industry." }),
  companySize: z
    .string({ error: "Please choose your company size." })
    .refine((value) => SIZE_VALUES.has(value), { error: "Please choose your company size." }),
  biggestCost: z
    .string()
    .trim()
    .min(10, { error: "Please tell us a little more (at least 10 characters)." })
    .max(2000, { error: "Please keep this under 2,000 characters." }),
  interests: z
    .array(z.string().refine((value) => INTEREST_VALUES.has(value), { error: "Unknown option." }))
    .max(INTEREST_OPTIONS.length)
    .default([]),
  consent: z.boolean().refine((value) => value, {
    error: "Please confirm we can contact you about your enquiry.",
  }),
  /** Honeypot. Real users never see or fill this in. */
  fax: z.string().max(200).optional(),
});

/** Values as held by the form (before Zod transforms). */
export type LeadFormInput = z.input<typeof leadSchema>;
/** Values after validation, as sent to the API. */
export type LeadFormValues = z.output<typeof leadSchema>;

export type LeadFieldErrors = Partial<Record<keyof LeadFormValues, string[]>>;

export type LeadApiResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: LeadFieldErrors };
