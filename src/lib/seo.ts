/**
 * Shared SEO copy — keep titles, descriptions, and keywords aligned across metadata & schema.
 */
import { SITE_URL } from "@/lib/site";
import { LIST_BASE_PRICE_EUR } from "@/data/pricing-core";

export const SITE_EMAIL = "hello@velorastudio.com";

export const SEO_BRAND = "Velora Studio";

/** How people search for the brand (spaces, no spaces, domain) — helps entity + JSON-LD. */
export const SEO_BRAND_KEYWORDS = [
  "Velora Studio",
  "velora studio",
  "Velora Studio design",
  "velora studio design",
  "VeloraStudio",
  "velorastudio",
  "Velorastudio",
  "velorastudio.design",
  "velorastudiodesign",
  "www.velorastudio.design",
  SITE_URL.replace(/^https?:\/\//, ""),
] as const;

/** Default meta description (root & fallbacks). Lead with brand name for branded queries. */
export const SEO_DEFAULT_DESCRIPTION = `Velora Studio — premium web design agency for startups and growing businesses. Custom websites & templates from €${LIST_BASE_PRICE_EUR}, fixed scope, 2–4 weeks. Fast, conversion-focused, mobile-first. Official site ${SITE_URL.replace("https://", "")}.`;

/** Shorter OG/Twitter variant (~155 chars safe). */
export const SEO_OG_DESCRIPTION = `Velora Studio: custom & template websites from €${LIST_BASE_PRICE_EUR}. Fixed price, 2–4 weeks, mobile-first. Premium web design for businesses that need to convert.`;

/** JSON-LD Organization / WebSite alternate names (Google Knowledge Graph signals). */
export const SEO_ORGANIZATION_ALTERNATE_NAMES = [
  "Velora Studio Design",
  "VeloraStudio",
  "Velora Studio Web Design",
  "velorastudio",
  "velorastudio.design",
] as const;

/** Primary + long-tail keywords for meta keywords & content planning. */
export const SEO_KEYWORDS = [
  ...SEO_BRAND_KEYWORDS,
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
