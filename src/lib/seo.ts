/**
 * Shared SEO copy — keep titles, descriptions, and keywords aligned across metadata & schema.
 */
import { LIST_BASE_PRICE_EUR } from "@/data/pricing-core";

export const SITE_EMAIL = "hello@velorastudio.com";

export const SEO_BRAND = "Velora Studio";

/** Default meta description (root & fallbacks). Tuned for intent: agency + pricing + speed. */
export const SEO_DEFAULT_DESCRIPTION = `Premium web design agency for startups and growing businesses. Custom websites & templates from €${LIST_BASE_PRICE_EUR}, fixed scope, 2–4 weeks. Fast, conversion-focused, mobile-first. Get a transparent quote—no surprises.`;

/** Shorter OG/Twitter variant (~155 chars safe). */
export const SEO_OG_DESCRIPTION = `Custom & template websites from €${LIST_BASE_PRICE_EUR}. Fixed price, 2–4 weeks, mobile-first. Premium web design for businesses that need to convert.`;

/** Primary + long-tail keywords for meta keywords & content planning. */
export const SEO_KEYWORDS = [
  "Velora Studio",
  "velora studio",
  "web design agency",
  "website design agency",
  "custom website design",
  "custom website for small business",
  "business website design",
  "startup website design",
  "landing page design agency",
  "website redesign agency",
  "premium web design",
  "conversion-focused website",
  "responsive web design",
  "mobile-first website",
  "fixed price web design",
  "website design Europe",
  "Next.js website agency",
  "professional website design",
  "SME website design",
] as const;

export const SEO_FAQ_DESCRIPTION =
  "FAQ: timelines, pricing, mobile-friendly builds, redesigns, messaging help & support. Velora Studio web design agency.";

export const SEO_FAQ_TITLE = "Web Design FAQ";
