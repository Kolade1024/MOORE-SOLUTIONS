/**
 * Industries shown in the "Industries we help" strip and the lead form's industry select.
 * `icon` must be a key of INDUSTRY_ICONS in components/sections/industries.tsx.
 */

export type IndustryIcon = "clinic" | "law" | "accounting" | "agency" | "shop" | "hospitality" | "service" | "property";

export const industries = [
  { id: "clinics", label: "Clinics & healthcare", icon: "clinic" },
  { id: "law", label: "Law firms", icon: "law" },
  { id: "accounting", label: "Accounting firms", icon: "accounting" },
  { id: "agencies", label: "Agencies", icon: "agency" },
  { id: "ecommerce", label: "E-commerce", icon: "shop" },
  { id: "hospitality", label: "Hospitality", icon: "hospitality" },
  { id: "services", label: "Service businesses", icon: "service" },
  { id: "property", label: "Property & lettings", icon: "property" },
] satisfies { id: string; label: string; icon: IndustryIcon }[];
