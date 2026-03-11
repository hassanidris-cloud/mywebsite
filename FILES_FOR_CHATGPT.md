# Velora Studio – Important Files for ChatGPT

Copy everything below this line into ChatGPT when you need help with this project.

---

## Project overview

- **Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Supabase, Vercel
- **Project:** Velora Studio – premium web design agency site with a **modular pricing estimator** (base €750 + add-ons, keyword-based suggestions, quote form → Supabase)

---

## 1. package.json

```json
{
  "name": "velora-studio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.98.0",
    "framer-motion": "^11.11.17",
    "next": "^15.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "resend": "^6.9.3"
  },
  "devDependencies": {
    "@types/node": "^22.9.0",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.15.0",
    "eslint-config-next": "^15.0.3",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3"
  }
}
```

---

## 2. src/data/pricing.ts

```ts
/**
 * Velora Studio – modular pricing estimator.
 * Base €750 + add-ons by category. Keyword matching suggests add-ons from project description.
 */

export const BASE_PRICE_EUR = 750;

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
  price: number;
  category: PricingCategory;
  monthly?: boolean;
}

export type PricingCategory =
  | "pages-design"
  | "content-structure"
  | "marketing-setup"
  | "account-features"
  | "ongoing";

export const CATEGORY_LABELS: Record<PricingCategory, string> = {
  "pages-design": "Pages & Design",
  "content-structure": "Content & Structure",
  "marketing-setup": "Marketing & Setup",
  "account-features": "Account Features (Supabase)",
  ongoing: "Ongoing",
};

export const CATEGORY_ORDER: PricingCategory[] = [
  "pages-design",
  "content-structure",
  "marketing-setup",
  "account-features",
  "ongoing",
];

export const PRICING_ADDONS: PricingAddOn[] = [
  // Pages & Design
  { id: "extra-page", label: "Extra page", price: 150, category: "pages-design" },
  { id: "premium-section", label: "Premium custom section", price: 120, category: "pages-design" },
  { id: "image-gallery", label: "Image gallery section", price: 100, category: "pages-design" },
  { id: "testimonials", label: "Testimonials section", price: 70, category: "pages-design" },
  { id: "faq", label: "FAQ section", price: 60, category: "pages-design" },
  { id: "basic-animations", label: "Basic animations", price: 120, category: "pages-design" },
  { id: "extra-polish", label: "Extra design polish", price: 150, category: "pages-design" },
  // Content & Structure
  { id: "copy-formatting", label: "Copy placement / content formatting", price: 80, category: "content-structure" },
  { id: "blog-layout", label: "Blog layout setup", price: 180, category: "content-structure" },
  { id: "portfolio-section", label: "Portfolio/project section", price: 120, category: "content-structure" },
  { id: "menu-services", label: "Menu/services section", price: 100, category: "content-structure" },
  // Marketing & Setup
  { id: "basic-seo", label: "Basic SEO setup", price: 120, category: "marketing-setup" },
  { id: "google-maps", label: "Google Maps embed", price: 40, category: "marketing-setup" },
  { id: "social-links", label: "Social media links integration", price: 40, category: "marketing-setup" },
  { id: "newsletter-form", label: "Newsletter form integration", price: 80, category: "marketing-setup" },
  { id: "multilingual", label: "Multilingual layout setup", price: 180, category: "marketing-setup" },
  { id: "domain-email", label: "Domain/email setup help", price: 80, category: "marketing-setup" },
  // Account Features (Supabase)
  { id: "login-signup", label: "Login / Sign up system", price: 250, category: "account-features" },
  { id: "user-profile", label: "User account/profile page", price: 220, category: "account-features" },
  { id: "protected-page", label: "Protected member-only page", price: 180, category: "account-features" },
  { id: "basic-dashboard", label: "Basic dashboard for signed-in users", price: 300, category: "account-features" },
  // Ongoing
  { id: "maintenance", label: "Monthly maintenance", price: 60, category: "ongoing", monthly: true },
];

/** Keyword/phrase → addon ids. Used for simple suggestion from project description. */
export const KEYWORD_TO_ADDON_IDS: Record<string, AddOnId[]> = {
  gallery: ["image-gallery"],
  photos: ["image-gallery"],
  images: ["image-gallery"],
  menu: ["menu-services"],
  services: ["menu-services"],
  testimonials: ["testimonials"],
  reviews: ["testimonials"],
  faq: ["faq"],
  blog: ["blog-layout"],
  articles: ["blog-layout"],
  portfolio: ["portfolio-section"],
  projects: ["portfolio-section"],
  seo: ["basic-seo"],
  google: ["basic-seo"],
  map: ["google-maps"],
  location: ["google-maps"],
  address: ["google-maps"],
  instagram: ["social-links"],
  social: ["social-links"],
  facebook: ["social-links"],
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
```

---

## 3. src/app/actions/pricing-quote.ts

```ts
"use server";

import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase-server";

export type PricingQuotePayload = {
  name: string;
  email: string;
  company: string;
  project_description: string;
  selected_features: { id: string; label: string; price: number; monthly?: boolean }[];
  estimated_total: number;
  maintenance_selected: boolean;
};

function trim(s: string): string {
  return (s ?? "").trim();
}

export async function submitPricingQuote(
  payload: PricingQuotePayload
): Promise<{ ok: boolean; error?: string; redirect?: string }> {
  const name = trim(payload.name);
  const email = trim(payload.email);
  const project_description = trim(payload.project_description);

  if (!name || !email) {
    return { ok: false, error: "Name and email are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!project_description) {
    return { ok: false, error: "Project description is required." };
  }

  const supabase = getServerSupabase();
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("pricing_quotes").insert({
      name,
      email,
      company: trim(payload.company) || null,
      project_description,
      selected_features: payload.selected_features,
      estimated_total: payload.estimated_total,
      maintenance_selected: payload.maintenance_selected,
    });

    if (error) {
      console.error("[Velora Pricing Quote] Supabase insert error:", error);
      return { ok: false, error: "Failed to save your quote request. Please try again." };
    }
  } else if (process.env.NODE_ENV !== "test") {
    console.log("[Velora Pricing Quote]", JSON.stringify({ ...payload, name, email, company: trim(payload.company) }, null, 2));
  }

  return { ok: true, redirect: "/thank-you" };
}
```

---

## 4. src/lib/supabase-server.ts

```ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type LeadRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  budget: string | null;
  timeline: string | null;
  project_type: string | null;
  description: string;
  source: string | null;
  is_high_value: boolean;
  created_at: string;
};

function getSupabase() {
  if (!url || !key) return null;
  return createClient(url, key);
}

export function getServerSupabase() {
  return getSupabase();
}

export function isSupabaseConfigured() {
  return Boolean(url && key);
}
```

---

## 5. supabase-schema.sql

```sql
-- Run this in Supabase SQL Editor to create the leads table.
-- Also create a "subscribers" table for the newsletter signup if desired.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  website text,
  budget text,
  timeline text,
  project_type text,
  description text not null,
  source text,
  is_high_value boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Service role can do anything on leads"
  on public.leads for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Newsletter subscribers (for "Stay updated" form)
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

create policy "Service role can do anything on subscribers"
  on public.subscribers for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Pricing estimator quote requests (from "Get My Custom Quote" on pricing section)
create table if not exists public.pricing_quotes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_description text not null,
  selected_features jsonb not null default '[]',
  estimated_total integer not null,
  maintenance_selected boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.pricing_quotes enable row level security;

create policy "Service role can do anything on pricing_quotes"
  on public.pricing_quotes for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
```

---

## 6. src/components/sections/Pricing.tsx

```tsx
"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  BASE_PRICE_EUR,
  BASE_INCLUDES,
  PRICING_ADDONS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getSuggestedAddonIds,
  getAddon,
  type PricingAddOn,
  type AddOnId,
} from "@/data/pricing";
import { submitPricingQuote } from "@/app/actions/pricing-quote";

function formatEur(n: number): string {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export default function Pricing() {
  const router = useRouter();
  const [projectDescription, setProjectDescription] = useState("");
  const [selected, setSelected] = useState<Set<AddOnId>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestedIds = useMemo(
    () => getSuggestedAddonIds(projectDescription),
    [projectDescription]
  );

  const toggle = useCallback((id: AddOnId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const { oneTimeTotal, monthlyTotal, selectedAddOns, monthlyAddOns } = useMemo(() => {
    let oneTime = BASE_PRICE_EUR;
    let monthly = 0;
    const oneTimeList: PricingAddOn[] = [];
    const monthlyList: PricingAddOn[] = [];
    PRICING_ADDONS.forEach((addon) => {
      if (!selected.has(addon.id)) return;
      if (addon.monthly) {
        monthly += addon.price;
        monthlyList.push(addon);
      } else {
        oneTime += addon.price;
        oneTimeList.push(addon);
      }
    });
    return {
      oneTimeTotal: oneTime,
      monthlyTotal: monthly,
      selectedAddOns: oneTimeList,
      monthlyAddOns: monthlyList,
    };
  }, [selected]);

  const addonsByCategory = useMemo(() => {
    const map = new Map<PricingAddOn["category"], PricingAddOn[]>();
    CATEGORY_ORDER.forEach((cat) => map.set(cat, []));
    PRICING_ADDONS.forEach((a) => map.get(a.category)!.push(a));
    return map;
  }, []);

  const selectedFeaturesPayload = useMemo(() => {
    return [...selectedAddOns, ...monthlyAddOns].map((a) => ({
      id: a.id,
      label: a.label,
      price: a.price,
      monthly: a.monthly ?? false,
    }));
  }, [selectedAddOns, monthlyAddOns]);

  async function handleSubmitQuote(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await submitPricingQuote({
      name: formName.trim(),
      email: formEmail.trim(),
      company: formCompany.trim(),
      project_description: projectDescription.trim(),
      selected_features: selectedFeaturesPayload,
      estimated_total: oneTimeTotal,
      maintenance_selected: monthlyTotal > 0,
    });
    setPending(false);
    if (result.ok && result.redirect) {
      router.push(result.redirect);
      return;
    }
    setError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <Section id="pricing" variant="surface" className="relative">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16">
          {/* Left: title, explanation, base website card */}
          <motion.div
            className="lg:col-span-5 flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary-accent font-semibold text-sm uppercase tracking-[0.2em] mb-3">
              Pricing
            </p>
            <h2 className="font-heading text-section-title font-bold text-white tracking-tight mb-4">
              Build your website your way
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Start with a €750 base website, then add only the features you need. Describe your project and we'll suggest relevant add-ons.
            </p>

            {/* Base website card – highlighted */}
            <motion.div
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm p-6 md:p-8 shadow-card mb-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary-purple via-primary-accent to-primary-blue z-10" />
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <span className="font-heading text-lg font-semibold text-white">
                  Base Website
                </span>
                <span className="text-2xl font-bold text-white tabular-nums">
                  {formatEur(BASE_PRICE_EUR)}
                </span>
              </div>
              <p className="text-white/60 text-sm mb-5">
                The foundation for every project. Responsive, professional, and ready to customize.
              </p>
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">
                What's included
              </p>
              <ul className="space-y-2">
                {BASE_INCLUDES.map((item) => (
                  <li key={item} className="text-sm text-white/80 flex items-center gap-2.5">
                    <span className="text-primary-accent shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <p className="text-white/45 text-sm leading-relaxed max-w-sm">
              No hidden fees. You own the site. We keep the process simple and transparent.
            </p>
          </motion.div>

          {/* Right: description input, suggested add-ons, all add-ons, summary, CTA */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-card">
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <label htmlFor="pricing-description" className="block text-sm font-medium text-white/80 mb-2">
                    Describe the website you want
                  </label>
                  <textarea
                    id="pricing-description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="e.g. I need a bakery website with menu pages, gallery, and contact form."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all text-base resize-y min-h-[88px]"
                  />
                </div>

                <AnimatePresence>
                  {suggestedIds.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="text-xs font-semibold text-primary-accent uppercase tracking-wider mb-3">
                        Suggested for you
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {suggestedIds.map((id) => {
                          const addon = getAddon(id);
                          if (!addon) return null;
                          const isSelected = selected.has(id);
                          return (
                            <motion.button
                              key={id}
                              type="button"
                              onClick={() => toggle(id)}
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2 focus:ring-offset-dark ${
                                isSelected
                                  ? "border-primary-accent/50 bg-primary-accent/15 text-white"
                                  : "border-white/20 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className={isSelected ? "opacity-100" : "opacity-60"}>{addon.label}</span>
                              <span className="text-white/50">
                                {addon.monthly ? formatEur(addon.price) + "/mo" : "+" + formatEur(addon.price)}
                              </span>
                              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-primary-accent bg-primary-accent" : "border-white/40"}`}>
                                {isSelected && (
                                  <motion.svg viewBox="0 0 12 10" className="w-2.5 h-2.5 text-white" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }}>
                                    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 5l3 3 7-7" />
                                  </motion.svg>
                                )}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {CATEGORY_ORDER.map((categoryKey, catIndex) => {
                  const addons = addonsByCategory.get(categoryKey)!;
                  return (
                    <motion.div
                      key={categoryKey}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ delay: 0.05 * catIndex, duration: 0.4 }}
                    >
                      <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                        {CATEGORY_LABELS[categoryKey]}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {addons.map((addon, i) => (
                          <AddOnCard key={addon.id} addon={addon} isSelected={selected.has(addon.id)} onToggle={() => toggle(addon.id)} index={i} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 bg-white/[0.02] p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-6">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Estimated total</p>
                    <motion.p className="font-heading text-3xl sm:text-4xl font-bold text-white tabular-nums">
                      <AnimatePresence mode="wait">
                        <motion.span key={oneTimeTotal} initial={{ opacity: 0.7, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}>
                          {formatEur(oneTimeTotal)}
                        </motion.span>
                      </AnimatePresence>
                    </motion.p>
                    {monthlyTotal > 0 && (
                      <motion.p className="mt-2 text-primary-accent/90 text-sm font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        + {formatEur(monthlyTotal)}/month
                      </motion.p>
                    )}
                  </div>
                  <Button type="button" onClick={() => setModalOpen(true)} size="lg" className="w-full sm:w-auto min-w-[200px] shadow-lg hover:shadow-button-glow">
                    Get My Custom Quote
                  </Button>
                </div>
                <p className="text-white/35 text-xs leading-relaxed max-w-xl">
                  Prices shown are starting estimates. Final pricing may vary depending on project complexity, content readiness, and revisions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !pending && setModalOpen(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl border border-white/10 bg-dark shadow-card p-6 md:p-8"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-xl font-semibold text-white mb-2">Get your custom quote</h3>
              <p className="text-white/60 text-sm mb-6">We'll send you a tailored proposal based on your selection.</p>
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <Input label="Name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Your name" required />
                <Input label="Email" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="you@company.com" required />
                <Input label="Company (optional)" value={formCompany} onChange={(e) => setFormCompany(e.target.value)} placeholder="Your company" />
                {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="secondary" onClick={() => !pending && setModalOpen(false)} className="flex-1">Cancel</Button>
                  <Button type="submit" variant="primary" className={"flex-1 " + (pending ? "opacity-80 pointer-events-none" : "")}>
                    {pending ? "Sending…" : "Send quote request"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function AddOnCard({ addon, isSelected, onToggle, index }: { addon: PricingAddOn; isSelected: boolean; onToggle: () => void; index: number }) {
  const priceLabel = addon.monthly ? formatEur(addon.price) + "/mo" : "+" + formatEur(addon.price);
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={`relative w-full text-left rounded-xl border p-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2 focus:ring-offset-dark ${
        isSelected ? "border-primary-accent/50 bg-primary-accent/10" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.02, duration: 0.35 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block font-medium text-white text-sm">{addon.label}</span>
          <span className="text-white/50 text-sm mt-0.5">{priceLabel}</span>
        </div>
        <div className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? "border-primary-accent bg-primary-accent" : "border-white/30"}`}>
          {isSelected && (
            <motion.svg viewBox="0 0 12 10" className="w-2.5 h-2.5 text-white" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }}>
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 5l3 3 7-7" />
            </motion.svg>
          )}
        </div>
      </div>
    </motion.button>
  );
}
```

---

## 7. src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { LogoColorProvider } from "@/contexts/LogoColorContext";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C0B10",
};

const siteUrl = "https://velorastudio.design";

export const metadata: Metadata = { /* ... */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${dmSans.variable} font-sans antialiased overflow-x-hidden`}>
        <LogoColorProvider>
          {/* skip link, ld+json, children, Analytics */}
          {children}
        </LogoColorProvider>
      </body>
    </html>
  );
}
```

---

## 8. src/app/globals.css (excerpt – design tokens)

```css
:root {
  --color-primary: #7C3AED;
  --color-primary-accent: #A78BFA;
  --color-primary-rgb: 124, 58, 237;
  --color-primary-accent-rgb: 167, 139, 250;
  --color-base: #0C0B10;
  --color-surface: #18161E;
  --color-text-light: #FFFFFF;
  --color-text-muted: rgba(255, 255, 255, 0.65);
  --color-border: rgba(255, 255, 255, 0.08);
}
```

---

## 9. tailwind.config.ts (excerpt)

- Colors: primary (purple, accent, warm, etc.), dark, surface.
- Fonts: heading (Syne), body (DM Sans).
- fontSize: hero, section-title, body.
- boxShadow: card, button-glow, etc.
- content: `./src/app/**/*.{js,ts,jsx,tsx,mdx}`, `./src/components/**/*.{js,ts,jsx,tsx,mdx}`.

---

## 10. src/components/ui/Container.tsx

```tsx
export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
```

---

## 11. src/components/ui/Section.tsx

- Props: children, id?, className?, noPadding?, variant? ("default" | "surface" | "elevated" | "halo").
- Uses Framer Motion (scroll-linked y, opacity in view). variant "surface" => `bg-surface/30`.

---

## 12. src/components/ui/Input.tsx

- Props: label?, type, placeholder, className, ...props (spreads to input).
- Styling: rounded-xl, bg-white/5, border-white/10, focus:ring-primary-accent.

---

## 13. src/components/ui/Button.tsx

- Props: children, variant ("primary" | "secondary" | "ghost"), size (sm|md|lg), href?, onClick?, type?, className?, external?.
- Primary: gradient, shadow, hover glow. Rounded-full.

---

## File structure (relevant)

```
velora-studio/
├── package.json
├── tailwind.config.ts
├── supabase-schema.sql
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx              (home: Hero, Services, Pricing, etc.)
│   │   ├── actions/
│   │   │   ├── pricing-quote.ts  (submitPricingQuote → pricing_quotes table)
│   │   │   └── inquiry.ts        (submitInquiry → leads table)
│   │   └── thank-you/page.tsx
│   ├── components/
│   │   ├── sections/
│   │   │   └── Pricing.tsx       (full pricing estimator + modal)
│   │   └── ui/
│   │       ├── Container.tsx
│   │       ├── Section.tsx
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   ├── data/
│   │   └── pricing.ts            (BASE_PRICE_EUR, PRICING_ADDONS, KEYWORD_TO_ADDON_IDS, getSuggestedAddonIds)
│   └── lib/
│       └── supabase-server.ts    (getServerSupabase, isSupabaseConfigured)
```

---

## Env vars needed

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Run the `pricing_quotes` part of `supabase-schema.sql` in Supabase SQL Editor so quote submissions work.
