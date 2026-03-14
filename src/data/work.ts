export type AccentColor = "warm" | "cool" | "rose" | "primary" | "green" | "orange";

// ─── Original projects array (used by /work page) ────────────────────────────
export const projects = [
  {
    name: "Grocery Store Template",
    category: "E-commerce Template",
    summary:
      "A clean, responsive grocery store template with categories, products, and a cart-ready layout built for small businesses and local stores.",
    impact: "E-commerce ready",
    outcome: "Template ready for product listings, categories, and checkout.",
    url: "https://bragabazaar.com",
    previewImage: "/grocery-store-preview.png",
  },
  {
    name: "Portugal Immigration",
    category: "Immigration & Visa Platform",
    summary:
      "Visa guidance and document tracking for applicants, helping people stay on track with their immigration process and reducing support requests.",
    impact: "Faster onboarding",
    outcome: "Applicants can track documents and follow visa steps in one place.",
    url: "https://portugal-immigration-app.vercel.app",
    previewImage: "/portugal-immigration-preview.png",
  },
] as const;

// ─── Real client websites (for WorkShowcase) ─────────────────────────────────
export interface Website {
  name: string;
  category: string;
  tag: string;
  summary: string;
  impact: string;
  url: string;
  accent: AccentColor;
  gradient: string;
  /** Preview image or logo URL for the project card (site screenshot or brand asset). */
  previewImage?: string;
}

export const websites: Website[] = [
  {
    name: "Portugal Immigration",
    category: "Gov-Tech Platform",
    tag: "Web Application",
    summary:
      "Visa guidance and document tracking for applicants, helping people stay on track with their immigration journey and reducing support requests with a clean step-by-step interface.",
    impact: "Faster applicant onboarding & reduced friction",
    url: "https://portugal-immigration-app.vercel.app",
    accent: "cool",
    gradient: "from-sky-500/40 via-cyan-400/20 to-indigo-500/10",
    previewImage: "/portugal-immigration-preview.png",
  },
];

// ─── Template categories (group templates on the homepage) ─────────────────────
export interface TemplateCategory {
  id: string;
  name: string;
  /** Optional short description for the category section */
  description?: string;
}

export const templateCategories: TemplateCategory[] = [
  { id: "e-commerce", name: "E-commerce", description: "Online stores, product catalogs, and cart-ready layouts." },
  { id: "hospitality", name: "Restaurant & Café", description: "Menus, reservations, and warm hospitality branding." },
  { id: "agency", name: "Agency / Studio", description: "Portfolios, case studies, and bold creative presence." },
  { id: "technology", name: "Technology", description: "IT, consulting, and B2B service showcases." },
];

// ─── Ready-made templates (for TemplatesShowcase) ─────────────────────────────
export interface Template {
  /** URL-friendly id for /customize/[slug] */
  slug: string;
  name: string;
  /** Category id from templateCategories (for grouping). Kept for badge display. */
  categoryId: string;
  /** Display label for this template's type (e.g. "E-commerce", "Hospitality") */
  category: string;
  summary: string;
  url: string;
  accent: AccentColor;
  gradient: string;
  badge: string;
  /** Preview image or logo URL for the template card. */
  previewImage?: string;
}

export const templates: Template[] = [
  // E-commerce
  {
    slug: "grocery-store",
    name: "Grocery Store",
    categoryId: "e-commerce",
    category: "E-commerce",
    summary:
      "A clean, responsive grocery store layout with categories, products, and a cart-ready flow. Perfect for local businesses going online.",
    url: "https://bragabazaar.com",
    accent: "green",
    gradient: "from-emerald-500/40 via-green-400/20 to-teal-500/10",
    badge: "Live preview",
    previewImage: "/grocery-store-preview.png",
  },
  // Hospitality (Restaurant & Café)
  {
    slug: "restaurant-cafe",
    name: "Restaurant & Café",
    categoryId: "hospitality",
    category: "Hospitality",
    summary:
      "A warm, appetising template for restaurants and cafés with menu display, gallery, opening hours, and a reservation flow.",
    url: "https://restaurant-cafe-template.vercel.app/",
    accent: "orange",
    gradient: "from-orange-500/40 via-amber-400/20 to-red-500/10",
    badge: "Live preview",
    previewImage: "/restaurant-cafe-preview.png",
  },
  // Agency / Studio
  {
    slug: "creative-agency",
    name: "Creative Agency",
    categoryId: "agency",
    category: "Agency / Studio",
    summary:
      "A bold, cinematic template for agencies and studios. Includes a work portfolio section, team grid, and a statement hero.",
    url: "#",
    accent: "primary",
    gradient: "from-violet-500/40 via-purple-400/20 to-fuchsia-500/10",
    badge: "Coming soon",
    previewImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
  },
  // Technology
  {
    slug: "it-solutions",
    name: "IT Solutions & Consulting",
    categoryId: "technology",
    category: "Technology",
    summary:
      "A clean, confident IT services and consulting template with clear value proposition, services grid, industries, process, and a strong contact call-to-action.",
    url: "https://velorastudio.vercel.app/",
    accent: "cool",
    gradient: "from-sky-500/40 via-cyan-400/20 to-indigo-500/10",
    badge: "Live preview",
    previewImage: "/it-solutions-preview.png",
  },
];

/** Get templates grouped by category (order follows templateCategories). */
export function getTemplatesByCategory(): { category: TemplateCategory; templates: Template[] }[] {
  return templateCategories
    .map((category) => ({
      category,
      templates: templates.filter((t) => t.categoryId === category.id),
    }))
    .filter((group) => group.templates.length > 0);
}
