/**
 * Template customization: base price + section options for the customize flow.
 * Users pick which sections to include; total = base + sum of selected section prices.
 */

import { LIST_BASE_PRICE_EUR } from "@/data/pricing-core";

/** Aligned with custom site foundation list price (see pricing-core.ts). */
export const TEMPLATE_BASE_PRICE_EUR = LIST_BASE_PRICE_EUR;

/** Promo until end of day April 15th (UTC): 20% off full template total. */
const PROMO_END_DATE = new Date("2026-04-15T23:59:59.999Z");
const PROMO_TEMPLATE_DISCOUNT_PERCENT = 20;

export function isPromoActive(): boolean {
  return new Date() <= PROMO_END_DATE;
}

/** Template base price (no discount on base; templates use 20% off total only). */
export function getEffectiveBasePriceEur(): number {
  return TEMPLATE_BASE_PRICE_EUR;
}

/** Subtotal before the 20% template discount (base + add-ons). */
export function getSubtotalFromSelected(selectedIds: string[]): number {
  const base = TEMPLATE_BASE_PRICE_EUR;
  const addons = selectedIds.reduce((sum, id) => {
    const section = getSectionById(id);
    return sum + (section?.price ?? 0);
  }, 0);
  return base + addons;
}

export function getTotalFromSelected(selectedIds: string[]): number {
  const subtotal = getSubtotalFromSelected(selectedIds);
  if (!isPromoActive()) return subtotal;
  return Math.round(subtotal * (1 - PROMO_TEMPLATE_DISCOUNT_PERCENT / 100));
}

export const PROMO_LABEL = `20% off all templates until April 15th`;

export interface TemplateSectionOption {
  id: string;
  label: string;
  description: string;
  /** Price in EUR; 0 = included in base. */
  price: number;
}

/** Sections users can add or customize. Order shown on the customize page. */
export const TEMPLATE_SECTION_OPTIONS: TemplateSectionOption[] = [
  { id: "hero", label: "Hero section", description: "Headline, subheadline, and primary CTA. Included in every template.", price: 0 },
  { id: "about", label: "About section", description: "Your story, mission, or company overview with optional image.", price: 80 },
  { id: "services", label: "Services / offerings", description: "List your services or menu items with titles and short descriptions.", price: 100 },
  { id: "team", label: "Team section", description: "Introduce your team with names, roles, and photos.", price: 90 },
  { id: "testimonials", label: "Testimonials", description: "Customer reviews or quotes to build trust.", price: 70 },
  { id: "faq", label: "FAQ section", description: "Common questions and answers for visitors.", price: 60 },
  { id: "gallery", label: "Image gallery", description: "Photo gallery for products, work, or location.", price: 100 },
  { id: "portfolio", label: "Portfolio / projects", description: "Showcase past work or case studies.", price: 120 },
  { id: "blog", label: "Blog layout", description: "Blog structure to publish articles or updates.", price: 180 },
  { id: "pricing-table", label: "Pricing table", description: "Plans or prices in a clear comparison layout.", price: 90 },
  { id: "contact", label: "Contact section", description: "Contact form and/or details. Included in every template.", price: 0 },
  { id: "seo", label: "Basic SEO setup", description: "Meta tags, structure, and basic search optimization.", price: 120 },
  { id: "maps-social", label: "Maps & social links", description: "Google Maps embed and social profile links.", price: 40 },
  { id: "booking", label: "Booking / Calendly embed", description: "Embed a calendar for appointments or consultations.", price: 80 },
  { id: "extra-polish", label: "Extra design polish", description: "Refined typography, spacing, and custom visuals.", price: 150 },
];

export function getSectionById(id: string): TemplateSectionOption | undefined {
  return TEMPLATE_SECTION_OPTIONS.find((s) => s.id === id);
}
