/**
 * Velora Studio – modular pricing estimator.
 * Base €750 + add-ons by category. Keyword matching suggests add-ons from project description.
 */

import { isPromoActive } from "@/data/template-customization";

export const BASE_PRICE_EUR = 750;

/** 40% off custom base when promo active (same as template promo until April 15th). */
export function getEffectiveCustomBasePriceEur(): number {
  if (!isPromoActive()) return BASE_PRICE_EUR;
  return Math.round(BASE_PRICE_EUR * 0.6); // 450
}

export const BASE_INCLUDES = [
  "Responsive website",
  "Clean professional design",
  "Homepage or landing page",
  "Contact form",
  "Deployment",
  "Basic optimization",
] as const;

export type AddOnId = string;

export interface PricingAddOn {
  id: AddOnId;
  label: string;
  description?: string;
  price: number;
  category: PricingCategory;
  monthly?: boolean;
}

export type PricingCategory =
  | "pages-design"
  | "content-structure"
  | "marketing-setup"
  | "business-features"
  | "account-features"
  | "optimization-setup"
  | "ongoing";

export const CATEGORY_LABELS: Record<PricingCategory, string> = {
  "pages-design": "Pages & Design",
  "content-structure": "Content & Structure",
  "marketing-setup": "Marketing & Setup",
  "business-features": "Business Features",
  "account-features": "Account Features",
  "optimization-setup": "Optimization & Setup",
  ongoing: "Ongoing",
};

export const CATEGORY_ORDER: PricingCategory[] = [
  "pages-design",
  "content-structure",
  "marketing-setup",
  "business-features",
  "account-features",
  "optimization-setup",
  "ongoing",
];

export const PRICING_ADDONS: PricingAddOn[] = [
  // Pages & Design
  { id: "extra-page", label: "Extra page", description: "A new page such as About, Services, or Contact added to your website.", price: 150, category: "pages-design" },
  { id: "premium-section", label: "Premium custom section", description: "A bespoke section designed to showcase your content in a unique way.", price: 120, category: "pages-design" },
  { id: "image-gallery", label: "Image gallery section", description: "A clean gallery layout to display photos of your products, work, or location.", price: 100, category: "pages-design" },
  { id: "testimonials", label: "Testimonials section", description: "A section displaying customer reviews to help build trust with visitors.", price: 70, category: "pages-design" },
  { id: "faq", label: "FAQ section", description: "A list of common questions and answers to help visitors find information quickly.", price: 60, category: "pages-design" },
  { id: "basic-animations", label: "Basic animations", description: "Subtle motion and transitions that make your site feel modern and polished.", price: 120, category: "pages-design" },
  { id: "extra-polish", label: "Extra design polish", description: "Additional refinement to typography, spacing, and visual details across the site.", price: 150, category: "pages-design" },
  { id: "landing-page-section", label: "Landing page section", description: "A focused section designed to convert visitors, e.g. for a campaign or offer.", price: 120, category: "pages-design" },
  { id: "hero-banner-section", label: "Hero banner section", description: "A prominent top section with headline and visuals to grab attention.", price: 80, category: "pages-design" },
  { id: "image-slider", label: "Image slider/carousel", description: "A rotating display of images so you can show multiple photos in one space.", price: 120, category: "pages-design" },
  { id: "custom-icons-graphics", label: "Custom icons & graphics", description: "Icons and small graphics tailored to your brand and message.", price: 100, category: "pages-design" },
  { id: "additional-layout-styling", label: "Additional layout styling", description: "Custom layout options so your pages look exactly how you want.", price: 120, category: "pages-design" },
  { id: "section-background-effects", label: "Section background effects", description: "Subtle backgrounds or effects to give sections more depth and style.", price: 90, category: "pages-design" },
  // Content & Structure
  { id: "copy-formatting", label: "Copy placement / content formatting", description: "We place and format your text so it reads well and looks professional.", price: 80, category: "content-structure" },
  { id: "blog-layout", label: "Blog layout setup", description: "A blog structure where you can publish articles or updates.", price: 180, category: "content-structure" },
  { id: "portfolio-section", label: "Portfolio/project section", description: "A section to showcase your projects or work with images and descriptions.", price: 120, category: "content-structure" },
  { id: "menu-services", label: "Menu/services section", description: "A clear way to list your services or menu items with descriptions.", price: 100, category: "content-structure" },
  { id: "team-section", label: "Team section", description: "Introduce your team with names, roles, and photos.", price: 90, category: "content-structure" },
  { id: "pricing-table-section", label: "Pricing table section", description: "A table or grid showing your plans or prices so visitors can compare.", price: 90, category: "content-structure" },
  { id: "services-detail-page", label: "Services detail page", description: "Dedicated pages for each service with full description and call-to-action.", price: 150, category: "content-structure" },
  { id: "case-studies-section", label: "Case studies section", description: "Showcase past projects and results to demonstrate what you can do.", price: 120, category: "content-structure" },
  { id: "timeline-process-section", label: "Timeline / process section", description: "Explain your process or timeline in a clear, step-by-step layout.", price: 100, category: "content-structure" },
  // Marketing & Setup
  { id: "basic-seo", label: "Basic SEO setup", description: "Optimizes your website so it can perform better on Google search results.", price: 120, category: "marketing-setup" },
  { id: "google-maps", label: "Google Maps embed", description: "Displays your business location directly on the website.", price: 40, category: "marketing-setup" },
  { id: "social-links", label: "Social media links integration", description: "Links or buttons to your social profiles so visitors can follow you.", price: 40, category: "marketing-setup" },
  { id: "newsletter-form", label: "Newsletter form integration", description: "A form where visitors can subscribe to your email updates.", price: 80, category: "marketing-setup" },
  { id: "multilingual", label: "Multilingual layout setup", description: "Allows your website to support multiple languages.", price: 180, category: "marketing-setup" },
  { id: "domain-email", label: "Domain/email setup help", description: "Guidance or setup for your domain name and professional email.", price: 80, category: "marketing-setup" },
  { id: "google-reviews-embed", label: "Google Reviews embed", description: "Shows your Google reviews on the site to build trust.", price: 80, category: "marketing-setup" },
  { id: "instagram-feed-embed", label: "Instagram feed embed", description: "Displays your Instagram posts directly on your website.", price: 90, category: "marketing-setup" },
  { id: "facebook-page-embed", label: "Facebook page embed", description: "Embeds your Facebook page or feed on the site.", price: 80, category: "marketing-setup" },
  { id: "whatsapp-contact-button", label: "WhatsApp contact button", description: "A button that opens WhatsApp so visitors can message you quickly.", price: 50, category: "marketing-setup" },
  { id: "cta-popup", label: "Call-to-action popup", description: "A popup that prompts visitors to sign up, contact you, or take an action.", price: 120, category: "marketing-setup" },
  { id: "email-contact-form-integration", label: "Email contact form integration", description: "Your contact form sends submissions to your email or a tool you use.", price: 100, category: "marketing-setup" },
  { id: "calendly-booking-embed", label: "Calendly / booking embed", description: "Embed a booking calendar so visitors can schedule a call or appointment directly.", price: 80, category: "marketing-setup" },
  { id: "linkedin-embed", label: "LinkedIn profile or company embed", description: "Show your LinkedIn profile or company page on the site.", price: 50, category: "marketing-setup" },
  { id: "youtube-embed-section", label: "YouTube channel / video section", description: "Embed your YouTube channel or key videos to showcase content.", price: 60, category: "marketing-setup" },
  { id: "analytics-setup", label: "Analytics setup (e.g. GA4)", description: "Google Analytics or similar tracking set up so you can see how visitors use your site.", price: 90, category: "marketing-setup" },
  { id: "schema-markup-rich-snippets", label: "Schema markup / rich snippets", description: "Structured data so search results can show stars, FAQs, or other rich info.", price: 100, category: "marketing-setup" },
  // Business Features
  { id: "event-listing-section", label: "Event listing section", description: "A section to list upcoming events with dates and details.", price: 150, category: "business-features" },
  { id: "faq-search-feature", label: "FAQ search feature", description: "Visitors can search your FAQs to find answers quickly.", price: 120, category: "business-features" },
  { id: "product-showcase-pages", label: "Product showcase pages", description: "Pages to present your products with images, details, and options.", price: 200, category: "business-features" },
  { id: "menu-display-system", label: "Menu display system (restaurants)", description: "A restaurant-style menu that’s easy to update and looks great on any device.", price: 180, category: "business-features" },
  // Account Features
  { id: "login-signup", label: "Login / Sign up system", description: "Allows users to create accounts and sign in to access member features.", price: 250, category: "account-features" },
  { id: "user-profile", label: "User account/profile page", description: "A page where logged-in users can see their account information.", price: 220, category: "account-features" },
  { id: "protected-page", label: "Protected member-only page", description: "A private page only accessible to users who are logged in.", price: 180, category: "account-features" },
  { id: "basic-dashboard", label: "Basic dashboard for signed-in users", description: "A simple dashboard where members can see their content or activity.", price: 300, category: "account-features" },
  { id: "saved-favorites-feature", label: "Saved favorites feature", description: "Lets users save items they like and view them when logged in.", price: 220, category: "account-features" },
  { id: "user-settings-page", label: "User settings page", description: "A page where users can update their password, email, or preferences.", price: 200, category: "account-features" },
  { id: "user-profile-editing", label: "User profile editing", description: "Lets users edit their profile details, e.g. name and photo.", price: 180, category: "account-features" },
  { id: "member-content-library", label: "Member content library", description: "A collection of content (e.g. resources or downloads) for logged-in members only.", price: 250, category: "account-features" },
  // Optimization & Setup
  { id: "mobile-ux-optimization", label: "Mobile UX optimization", description: "Makes your site easier and more pleasant to use on phones and tablets.", price: 120, category: "optimization-setup" },
  { id: "accessibility-improvements", label: "Accessibility improvements", description: "Improves your site so more people can use it, including with assistive technology.", price: 100, category: "optimization-setup" },
  { id: "image-optimization", label: "Image optimization", description: "Images are sized and compressed so pages load faster without losing quality.", price: 80, category: "optimization-setup" },
  { id: "seo-page-structure-improvements", label: "SEO page structure improvements", description: "Improves how your pages are structured for better search visibility.", price: 120, category: "optimization-setup" },
  // Ongoing
  { id: "maintenance", label: "Monthly maintenance", description: "Ongoing updates, security checks, and small changes so your site stays current.", price: 60, category: "ongoing", monthly: true },
];

/** Keyword/phrase → addon ids. Used for simple suggestion from project description. */
export const KEYWORD_TO_ADDON_IDS: Record<string, AddOnId[]> = {
  gallery: ["image-gallery"],
  photos: ["image-gallery"],
  images: ["image-gallery"],
  menu: ["menu-services", "menu-display-system"],
  services: ["menu-services"],
  testimonials: ["testimonials"],
  reviews: ["testimonials", "google-reviews-embed"],
  faq: ["faq"],
  blog: ["blog-layout"],
  articles: ["blog-layout"],
  portfolio: ["portfolio-section"],
  projects: ["portfolio-section"],
  seo: ["basic-seo"],
  google: ["basic-seo", "google-reviews-embed", "google-maps"],
  map: ["google-maps"],
  location: ["google-maps"],
  address: ["google-maps"],
  instagram: ["social-links", "instagram-feed-embed"],
  social: ["social-links"],
  facebook: ["social-links", "facebook-page-embed"],
  newsletter: ["newsletter-form"],
  "email list": ["newsletter-form"],
  languages: ["multilingual"],
  multilingual: ["multilingual"],
  translation: ["multilingual"],
  login: ["login-signup"],
  "sign in": ["login-signup"],
  "sign up": ["login-signup"],
  signup: ["login-signup"],
  register: ["login-signup"],
  account: ["login-signup", "user-profile"],
  profile: ["user-profile"],
  members: ["login-signup", "protected-page"],
  member: ["login-signup", "protected-page"],
  private: ["protected-page"],
  "members area": ["login-signup", "protected-page", "basic-dashboard"],
  dashboard: ["basic-dashboard"],
  portal: ["basic-dashboard"],
  "extra page": ["extra-page"],
  page: ["extra-page"],
  // New feature keywords
  slider: ["image-slider"],
  carousel: ["image-slider"],
  icons: ["custom-icons-graphics"],
  graphics: ["custom-icons-graphics"],
  team: ["team-section"],
  staff: ["team-section"],
  pricing: ["pricing-table-section"],
  whatsapp: ["whatsapp-contact-button"],
  events: ["event-listing-section"],
  favorites: ["saved-favorites-feature"],
  "profile edit": ["user-profile-editing"],
  "profile editing": ["user-profile-editing"],
  settings: ["user-settings-page"],
  landing: ["landing-page-section"],
  hero: ["hero-banner-section"],
  banner: ["hero-banner-section"],
  "case stud": ["case-studies-section"],
  "case studies": ["case-studies-section"],
  timeline: ["timeline-process-section"],
  process: ["timeline-process-section"],
  "contact form": ["email-contact-form-integration"],
  popup: ["cta-popup"],
  "call to action": ["cta-popup"],
  cta: ["cta-popup"],
  restaurant: ["menu-display-system"],
  products: ["product-showcase-pages"],
  "product showcase": ["product-showcase-pages"],
  "content library": ["member-content-library"],
  library: ["member-content-library"],
  mobile: ["mobile-ux-optimization"],
  accessibility: ["accessibility-improvements"],
  "image optim": ["image-optimization"],
  "faq search": ["faq-search-feature"],
};

const addonById = new Map(PRICING_ADDONS.map((a) => [a.id, a]));

export function getAddon(id: AddOnId): PricingAddOn | undefined {
  return addonById.get(id);
}

/**
 * Returns addon ids suggested from the project description using simple keyword matching.
 */
export function getSuggestedAddonIds(description: string): AddOnId[] {
  const normalized = description.toLowerCase().trim();
  if (!normalized) return [];

  const suggested = new Set<AddOnId>();

  for (const [phrase, ids] of Object.entries(KEYWORD_TO_ADDON_IDS)) {
    if (normalized.includes(phrase)) {
      ids.forEach((id) => suggested.add(id));
    }
  }

  return Array.from(suggested);
}

// ---------------------------------------------------------------------------
// Modular pricing (beginner-friendly, €750 base + simple add-ons)
// Used by the pricing section with keyword-based suggestions.
// ---------------------------------------------------------------------------

export const MODULAR_BASE_PRICE_EUR = 750;

export const MODULAR_BASE_INCLUDES = [
  "Responsive website",
  "Clean professional design",
  "Homepage or landing page",
  "Contact form",
  "Deployment",
  "Basic optimization",
] as const;

export type ModularCategoryId =
  | "pages-design"
  | "content-structure"
  | "marketing-setup"
  | "business-features"
  | "account-features"
  | "optimization-setup"
  | "ongoing";

export const MODULAR_CATEGORY_LABELS: Record<ModularCategoryId, string> = {
  "pages-design": "Pages & Design",
  "content-structure": "Content & Structure",
  "marketing-setup": "Marketing & Setup",
  "business-features": "Business Features",
  "account-features": "Account Features",
  "optimization-setup": "Optimization & Setup",
  ongoing: "Ongoing",
};

export const MODULAR_CATEGORY_ORDER: ModularCategoryId[] = [
  "pages-design",
  "content-structure",
  "marketing-setup",
  "business-features",
  "account-features",
  "optimization-setup",
  "ongoing",
];

export interface ModularAddOn {
  id: string;
  label: string;
  description?: string;
  price: number;
  category: ModularCategoryId;
  monthly?: boolean;
}

export const MODULAR_ADDONS: ModularAddOn[] = [
  // Pages & Design
  { id: "extra-page", label: "Extra page", description: "A new page such as About, Services, or Contact added to your website.", price: 150, category: "pages-design" },
  { id: "premium-section", label: "Premium custom section", description: "A bespoke section designed to showcase your content in a unique way.", price: 120, category: "pages-design" },
  { id: "image-gallery", label: "Image gallery section", description: "A clean gallery layout to display photos of your products, work, or location.", price: 100, category: "pages-design" },
  { id: "testimonials", label: "Testimonials section", description: "A section displaying customer reviews to help build trust with visitors.", price: 70, category: "pages-design" },
  { id: "faq", label: "FAQ section", description: "A list of common questions and answers to help visitors find information quickly.", price: 60, category: "pages-design" },
  { id: "basic-animations", label: "Basic animations", description: "Subtle motion and transitions that make your site feel modern and polished.", price: 120, category: "pages-design" },
  { id: "extra-polish", label: "Extra design polish", description: "Additional refinement to typography, spacing, and visual details across the site.", price: 150, category: "pages-design" },
  { id: "landing-page-section", label: "Landing page section", description: "A focused section designed to convert visitors, e.g. for a campaign or offer.", price: 120, category: "pages-design" },
  { id: "hero-banner-section", label: "Hero banner section", description: "A prominent top section with headline and visuals to grab attention.", price: 80, category: "pages-design" },
  { id: "image-slider", label: "Image slider/carousel", description: "A rotating display of images so you can show multiple photos in one space.", price: 120, category: "pages-design" },
  { id: "custom-icons-graphics", label: "Custom icons & graphics", description: "Icons and small graphics tailored to your brand and message.", price: 100, category: "pages-design" },
  { id: "additional-layout-styling", label: "Additional layout styling", description: "Custom layout options so your pages look exactly how you want.", price: 120, category: "pages-design" },
  { id: "section-background-effects", label: "Section background effects", description: "Subtle backgrounds or effects to give sections more depth and style.", price: 90, category: "pages-design" },
  { id: "video-background-section", label: "Video background section", description: "A hero or section with a video background for a cinematic, high-impact look.", price: 100, category: "pages-design" },
  { id: "dark-mode-toggle", label: "Dark mode toggle", description: "Lets visitors switch between light and dark theme for comfort and preference.", price: 80, category: "pages-design" },
  { id: "cookie-consent-banner", label: "Cookie consent banner", description: "A compliant banner for cookie preferences, often required for EU visitors.", price: 60, category: "pages-design" },
  // Content & Structure
  { id: "copy-formatting", label: "Copy placement / content formatting", description: "We place and format your text so it reads well and looks professional.", price: 80, category: "content-structure" },
  { id: "stats-numbers-section", label: "Stats / numbers section", description: "A section highlighting key figures (e.g. clients served, years in business, projects done).", price: 70, category: "content-structure" },
  { id: "before-after-section", label: "Before/after comparison section", description: "Show transformations or comparisons in a clear before/after layout.", price: 110, category: "content-structure" },
  { id: "locations-branches-section", label: "Locations / branches section", description: "List multiple offices or locations with addresses and optional map links.", price: 100, category: "content-structure" },
  { id: "quote-testimonial-slider", label: "Quote / testimonial slider", description: "Rotating quotes or testimonials in a carousel for social proof.", price: 90, category: "content-structure" },
  { id: "blog-layout", label: "Blog layout setup", description: "A blog structure where you can publish articles or updates.", price: 180, category: "content-structure" },
  { id: "portfolio-section", label: "Portfolio/project section", description: "A section to showcase your projects or work with images and descriptions.", price: 120, category: "content-structure" },
  { id: "menu-services", label: "Menu/services section", description: "A clear way to list your services or menu items with descriptions.", price: 100, category: "content-structure" },
  { id: "team-section", label: "Team section", description: "Introduce your team with names, roles, and photos.", price: 90, category: "content-structure" },
  { id: "pricing-table-section", label: "Pricing table section", description: "A table or grid showing your plans or prices so visitors can compare.", price: 90, category: "content-structure" },
  { id: "services-detail-page", label: "Services detail page", description: "Dedicated pages for each service with full description and call-to-action.", price: 150, category: "content-structure" },
  { id: "case-studies-section", label: "Case studies section", description: "Showcase past projects and results to demonstrate what you can do.", price: 120, category: "content-structure" },
  { id: "timeline-process-section", label: "Timeline / process section", description: "Explain your process or timeline in a clear, step-by-step layout.", price: 100, category: "content-structure" },
  // Marketing & Setup
  { id: "basic-seo", label: "Basic SEO setup", description: "Optimizes your website so it can perform better on Google search results.", price: 120, category: "marketing-setup" },
  { id: "google-maps", label: "Google Maps embed", description: "Displays your business location directly on the website.", price: 40, category: "marketing-setup" },
  { id: "social-links", label: "Social media links integration", description: "Links or buttons to your social profiles so visitors can follow you.", price: 40, category: "marketing-setup" },
  { id: "newsletter-form", label: "Newsletter form integration", description: "A form where visitors can subscribe to your email updates.", price: 80, category: "marketing-setup" },
  { id: "multilingual", label: "Multilingual layout setup", description: "Allows your website to support multiple languages.", price: 180, category: "marketing-setup" },
  { id: "domain-email", label: "Domain/email setup help", description: "Guidance or setup for your domain name and professional email.", price: 80, category: "marketing-setup" },
  { id: "google-reviews-embed", label: "Google Reviews embed", description: "Shows your Google reviews on the site to build trust.", price: 80, category: "marketing-setup" },
  { id: "instagram-feed-embed", label: "Instagram feed embed", description: "Displays your Instagram posts directly on your website.", price: 90, category: "marketing-setup" },
  { id: "facebook-page-embed", label: "Facebook page embed", description: "Embeds your Facebook page or feed on the site.", price: 80, category: "marketing-setup" },
  { id: "whatsapp-contact-button", label: "WhatsApp contact button", description: "A button that opens WhatsApp so visitors can message you quickly.", price: 50, category: "marketing-setup" },
  { id: "cta-popup", label: "Call-to-action popup", description: "A popup that prompts visitors to sign up, contact you, or take an action.", price: 120, category: "marketing-setup" },
  { id: "email-contact-form-integration", label: "Email contact form integration", description: "Your contact form sends submissions to your email or a tool you use.", price: 100, category: "marketing-setup" },
  { id: "calendly-booking-embed", label: "Calendly / booking embed", description: "Embed a booking calendar so visitors can schedule a call or appointment directly.", price: 80, category: "marketing-setup" },
  { id: "linkedin-embed", label: "LinkedIn profile or company embed", description: "Show your LinkedIn profile or company page on the site.", price: 50, category: "marketing-setup" },
  { id: "youtube-embed-section", label: "YouTube channel / video section", description: "Embed your YouTube channel or key videos to showcase content.", price: 60, category: "marketing-setup" },
  { id: "analytics-setup", label: "Analytics setup (e.g. GA4)", description: "Google Analytics or similar tracking set up so you can see how visitors use your site.", price: 90, category: "marketing-setup" },
  { id: "schema-markup-rich-snippets", label: "Schema markup / rich snippets", description: "Structured data so search results can show stars, FAQs, or other rich info.", price: 100, category: "marketing-setup" },
  // Business Features
  { id: "event-listing-section", label: "Event listing section", description: "A section to list upcoming events with dates and details.", price: 150, category: "business-features" },
  { id: "faq-search-feature", label: "FAQ search feature", description: "Visitors can search your FAQs to find answers quickly.", price: 120, category: "business-features" },
  { id: "product-showcase-pages", label: "Product showcase pages", description: "Pages to present your products with images, details, and options.", price: 200, category: "business-features" },
  { id: "menu-display-system", label: "Menu display system (restaurants)", description: "A restaurant-style menu that's easy to update and looks great on any device.", price: 180, category: "business-features" },
  { id: "booking-appointment-system", label: "Booking / appointment system", description: "Let visitors book appointments or sessions (e.g. consultations, classes).", price: 200, category: "business-features" },
  { id: "job-listings-section", label: "Job listings section", description: "A section to list open positions with descriptions and apply links.", price: 150, category: "business-features" },
  { id: "resource-download-center", label: "Resource / download center", description: "A page or section for downloads (PDFs, guides, templates) with optional gating.", price: 140, category: "business-features" },
  { id: "comparison-table-section", label: "Comparison table section", description: "A table comparing plans, products, or options so visitors can choose.", price: 90, category: "business-features" },
  // Account Features
  { id: "login-signup", label: "Login / Sign up system", description: "Allows users to create accounts and sign in to access member features.", price: 250, category: "account-features" },
  { id: "user-profile", label: "User account/profile page", description: "A page where logged-in users can see their account information.", price: 220, category: "account-features" },
  { id: "protected-page", label: "Protected member-only page", description: "A private page only accessible to users who are logged in.", price: 180, category: "account-features" },
  { id: "basic-dashboard", label: "Basic dashboard for signed-in users", description: "A simple dashboard where members can see their content or activity.", price: 300, category: "account-features" },
  { id: "saved-favorites-feature", label: "Saved favorites feature", description: "Lets users save items they like and view them when logged in.", price: 220, category: "account-features" },
  { id: "user-settings-page", label: "User settings page", description: "A page where users can update their password, email, or preferences.", price: 200, category: "account-features" },
  { id: "user-profile-editing", label: "User profile editing", description: "Lets users edit their profile details, e.g. name and photo.", price: 180, category: "account-features" },
  { id: "member-content-library", label: "Member content library", description: "A collection of content (e.g. resources or downloads) for logged-in members only.", price: 250, category: "account-features" },
  // Optimization & Setup
  { id: "mobile-ux-optimization", label: "Mobile UX optimization", description: "Makes your site easier and more pleasant to use on phones and tablets.", price: 120, category: "optimization-setup" },
  { id: "accessibility-improvements", label: "Accessibility improvements", description: "Improves your site so more people can use it, including with assistive technology.", price: 100, category: "optimization-setup" },
  { id: "image-optimization", label: "Image optimization", description: "Images are sized and compressed so pages load faster without losing quality.", price: 80, category: "optimization-setup" },
  { id: "seo-page-structure-improvements", label: "SEO page structure improvements", description: "Improves how your pages are structured for better search visibility.", price: 120, category: "optimization-setup" },
  { id: "performance-audit-fixes", label: "Performance audit & fixes", description: "We review load speed and fix issues so your site feels fast and reliable.", price: 150, category: "optimization-setup" },
  { id: "core-web-vitals-optimization", label: "Core Web Vitals optimization", description: "Targeted improvements so your site scores well on speed and usability metrics.", price: 120, category: "optimization-setup" },
  // Ongoing
  { id: "maintenance", label: "Monthly maintenance", description: "Ongoing updates, security checks, and small changes so your site stays current.", price: 60, category: "ongoing", monthly: true },
  { id: "hosting-ssl-monthly", label: "Hosting + SSL (monthly)", description: "We host your site and keep SSL active so it stays secure and online.", price: 25, category: "ongoing", monthly: true },
  { id: "content-updates-retainer", label: "Content updates retainer", description: "A monthly allowance for small text, image, or content changes.", price: 80, category: "ongoing", monthly: true },
];

/** Website type options: common types users can pick for relevant add-on suggestions. */
export const WEBSITE_TYPES = [
  { id: "ecommerce", label: "E-commerce" },
  { id: "business-corporate", label: "Business / Corporate" },
  { id: "portfolio", label: "Portfolio" },
  { id: "blog-news", label: "Blog & News" },
  { id: "educational", label: "Educational (EdTech)" },
  { id: "social-communication", label: "Social / Communication" },
  { id: "landing-page", label: "Landing Page" },
  { id: "directory-listing", label: "Directory & Listing" },
  { id: "forum-community", label: "Forum & Community" },
  { id: "membership-subscription", label: "Membership / Subscription" },
  { id: "event", label: "Event" },
  { id: "personal", label: "Personal" },
  { id: "other", label: "Other" },
] as const;

export type WebsiteTypeId = (typeof WEBSITE_TYPES)[number]["id"];

/** Website type → addon ids to suggest for that type of site. */
export const WEBSITE_TYPE_TO_ADDON_IDS: Record<WebsiteTypeId, string[]> = {
  "ecommerce": ["product-showcase-pages", "testimonials", "newsletter-form", "basic-seo", "image-gallery", "faq", "extra-page", "email-contact-form-integration"],
  "business-corporate": ["services-detail-page", "menu-services", "team-section", "testimonials", "faq", "email-contact-form-integration", "basic-seo", "timeline-process-section", "extra-page", "calendly-booking-embed", "job-listings-section", "stats-numbers-section"],
  "portfolio": ["portfolio-section", "image-gallery", "testimonials", "blog-layout", "basic-animations", "basic-seo", "extra-page"],
  "blog-news": ["blog-layout", "newsletter-form", "basic-seo", "extra-page", "image-gallery", "cta-popup"],
  "educational": ["login-signup", "member-content-library", "protected-page", "user-profile", "faq", "blog-layout", "basic-seo", "extra-page"],
  "social-communication": ["social-links", "newsletter-form", "blog-layout", "user-profile", "basic-seo", "cta-popup"],
  "landing-page": ["landing-page-section", "hero-banner-section", "cta-popup", "basic-seo", "newsletter-form", "email-contact-form-integration", "video-background-section", "schema-markup-rich-snippets"],
  "directory-listing": ["extra-page", "menu-services", "pricing-table-section", "basic-seo", "google-maps", "email-contact-form-integration"],
  "forum-community": ["login-signup", "user-profile", "protected-page", "faq", "newsletter-form", "basic-seo"],
  "membership-subscription": ["login-signup", "user-profile", "protected-page", "basic-dashboard", "member-content-library", "user-settings-page"],
  "event": ["event-listing-section", "image-gallery", "newsletter-form", "social-links", "extra-page", "basic-seo", "email-contact-form-integration"],
  "personal": ["portfolio-section", "blog-layout", "testimonials", "extra-page", "basic-seo", "social-links"],
  "other": [],
};

/** Returns addon ids suggested for a website type. */
export function getSuggestedAddonIdsForWebsiteType(typeId: WebsiteTypeId | null): string[] {
  if (!typeId || typeId === "other") return [];
  return WEBSITE_TYPE_TO_ADDON_IDS[typeId] ?? [];
}

/** Simple keyword → addon ids for suggesting add-ons from project description (no AI). */
export const MODULAR_KEYWORD_TO_ADDON_IDS: Record<string, string[]> = {
  gallery: ["image-gallery"],
  photos: ["image-gallery"],
  menu: ["menu-services", "menu-display-system"],
  services: ["menu-services"],
  restaurant: ["menu-services", "menu-display-system", "image-gallery", "extra-page"],
  bakery: ["menu-services", "image-gallery", "extra-page"],
  testimonials: ["testimonials"],
  reviews: ["testimonials", "google-reviews-embed"],
  faq: ["faq"],
  blog: ["blog-layout"],
  articles: ["blog-layout"],
  portfolio: ["portfolio-section"],
  projects: ["portfolio-section"],
  seo: ["basic-seo"],
  google: ["basic-seo", "google-reviews-embed", "google-maps"],
  map: ["google-maps"],
  maps: ["google-maps"],
  location: ["google-maps"],
  instagram: ["social-links", "instagram-feed-embed"],
  facebook: ["social-links", "facebook-page-embed"],
  social: ["social-links"],
  newsletter: ["newsletter-form"],
  "email list": ["newsletter-form"],
  languages: ["multilingual"],
  multilingual: ["multilingual"],
  translation: ["multilingual"],
  login: ["login-signup"],
  "sign in": ["login-signup"],
  "sign up": ["login-signup"],
  signup: ["login-signup"],
  register: ["login-signup"],
  account: ["login-signup", "user-profile"],
  profile: ["user-profile"],
  members: ["login-signup", "protected-page"],
  "members area": ["login-signup", "protected-page", "basic-dashboard"],
  private: ["protected-page"],
  dashboard: ["basic-dashboard"],
  portal: ["basic-dashboard"],
  "extra page": ["extra-page"],
  page: ["extra-page"],
  // New feature keywords
  slider: ["image-slider"],
  carousel: ["image-slider"],
  icons: ["custom-icons-graphics"],
  graphics: ["custom-icons-graphics"],
  team: ["team-section"],
  staff: ["team-section"],
  pricing: ["pricing-table-section"],
  whatsapp: ["whatsapp-contact-button"],
  events: ["event-listing-section"],
  favorites: ["saved-favorites-feature"],
  "profile edit": ["user-profile-editing"],
  "profile editing": ["user-profile-editing"],
  settings: ["user-settings-page"],
  landing: ["landing-page-section"],
  hero: ["hero-banner-section"],
  banner: ["hero-banner-section"],
  "case stud": ["case-studies-section"],
  "case studies": ["case-studies-section"],
  timeline: ["timeline-process-section"],
  process: ["timeline-process-section"],
  "contact form": ["email-contact-form-integration"],
  popup: ["cta-popup"],
  "call to action": ["cta-popup"],
  cta: ["cta-popup"],
  products: ["product-showcase-pages"],
  "product showcase": ["product-showcase-pages"],
  "content library": ["member-content-library"],
  library: ["member-content-library"],
  mobile: ["mobile-ux-optimization"],
  accessibility: ["accessibility-improvements"],
  "image optim": ["image-optimization"],
  "faq search": ["faq-search-feature"],
  // Natural phrases so description suggests relevant add-ons on its own
  "show our menu": ["menu-services", "menu-display-system"],
  "display menu": ["menu-services", "menu-display-system"],
  "showcase my work": ["portfolio-section", "image-gallery"],
  "show my work": ["portfolio-section", "image-gallery"],
  "sell online": ["product-showcase-pages", "basic-seo"],
  "sell products": ["product-showcase-pages", "newsletter-form"],
  "find us": ["google-maps"],
  "where we are": ["google-maps"],
  "our location": ["google-maps"],
  "get in touch": ["email-contact-form-integration", "whatsapp-contact-button"],
  "contact us": ["email-contact-form-integration"],
  "book ": ["event-listing-section"],
  "appointment": ["event-listing-section"],
  "sign up for": ["newsletter-form"],
  "multiple language": ["multilingual"],
  "two language": ["multilingual"],
  "english and": ["multilingual"],
  "trust": ["testimonials", "google-reviews-embed"],
  "recommendation": ["testimonials"],
  "our team": ["team-section"],
  "meet the team": ["team-section"],
  "how it works": ["timeline-process-section", "faq"],
  "our process": ["timeline-process-section"],
  "what we offer": ["menu-services", "services-detail-page"],
  "our services": ["menu-services", "services-detail-page"],
  "price list": ["pricing-table-section"],
  "our prices": ["pricing-table-section"],
  "promote": ["basic-seo", "social-links"],
  "show photos": ["image-gallery"],
  "show images": ["image-gallery"],
  "picture": ["image-gallery"],
  "client": ["testimonials", "case-studies-section"],
  "customer": ["testimonials"],
  "user account": ["login-signup", "user-profile"],
  "member only": ["login-signup", "protected-page"],
  "log in": ["login-signup"],
  "my account": ["user-profile"],
  "personal brand": ["portfolio-section", "blog-layout", "testimonials"],
  "professional site": ["basic-seo", "testimonials", "extra-polish"],
  "modern look": ["basic-animations", "extra-polish"],
  "look professional": ["extra-polish", "testimonials"],
  // New add-on keywords
  video: ["video-background-section"],
  "video background": ["video-background-section"],
  "dark mode": ["dark-mode-toggle"],
  "light dark": ["dark-mode-toggle"],
  cookie: ["cookie-consent-banner"],
  "cookie consent": ["cookie-consent-banner"],
  gdpr: ["cookie-consent-banner"],
  stats: ["stats-numbers-section"],
  "key figures": ["stats-numbers-section"],
  "before after": ["before-after-section"],
  "before and after": ["before-after-section"],
  comparison: ["before-after-section", "comparison-table-section"],
  branches: ["locations-branches-section"],
  offices: ["locations-branches-section"],
  "multiple locations": ["locations-branches-section"],
  "quote slider": ["quote-testimonial-slider"],
  "testimonial carousel": ["quote-testimonial-slider"],
  calendly: ["calendly-booking-embed"],
  "book a call": ["calendly-booking-embed"],
  "schedule a call": ["calendly-booking-embed"],
  booking: ["calendly-booking-embed", "booking-appointment-system"],
  linkedin: ["linkedin-embed", "social-links"],
  youtube: ["youtube-embed-section"],
  "video embed": ["youtube-embed-section"],
  analytics: ["analytics-setup"],
  "google analytics": ["analytics-setup"],
  ga4: ["analytics-setup"],
  "rich snippets": ["schema-markup-rich-snippets"],
  "schema markup": ["schema-markup-rich-snippets"],
  "structured data": ["schema-markup-rich-snippets"],
  "appointment system": ["booking-appointment-system"],
  "book appointment": ["booking-appointment-system"],
  jobs: ["job-listings-section"],
  "job listings": ["job-listings-section"],
  "open positions": ["job-listings-section"],
  careers: ["job-listings-section"],
  "download center": ["resource-download-center"],
  "resource center": ["resource-download-center"],
  "compare plans": ["comparison-table-section"],
  "compare options": ["comparison-table-section"],
  "performance audit": ["performance-audit-fixes"],
  "speed optimization": ["performance-audit-fixes", "core-web-vitals-optimization"],
  "core web vitals": ["core-web-vitals-optimization"],
  hosting: ["hosting-ssl-monthly"],
  ssl: ["hosting-ssl-monthly"],
  "content updates": ["content-updates-retainer"],
  "monthly updates": ["content-updates-retainer"],
};

const modularAddonById = new Map(MODULAR_ADDONS.map((a) => [a.id, a]));

export function getModularAddon(id: string): ModularAddOn | undefined {
  return modularAddonById.get(id);
}

/** Returns addon ids suggested from description using simple keyword matching only. */
export function getModularSuggestedAddonIds(description: string): string[] {
  const normalized = description.toLowerCase().trim();
  if (!normalized) return [];
  const suggested = new Set<string>();
  for (const [phrase, ids] of Object.entries(MODULAR_KEYWORD_TO_ADDON_IDS)) {
    if (normalized.includes(phrase)) {
      ids.forEach((id) => suggested.add(id));
    }
  }
  return Array.from(suggested);
}
