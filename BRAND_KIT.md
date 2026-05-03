{% raw %}

# Velora Studio — Brand Kit & Design System

## 1. Brand Identity

### Logos
- **Primary (icon + wordmark):** `VeloraLogoHorizontal` in `src/components/brand/`
- **Icon only:** `VeloraIcon` — use for favicon, app icons, social
- **Variants:** `dark` (white/slate text) and `light` (dark text) for wordmark

### Favicon
- **SVG:** `src/app/icon.svg` (scales to any size)
- **Additional sizes:** Generate 16×16, 32×32, 48×48, 180×180, 512×512 from the SVG (e.g. with [realfavicongenerator.net](https://realfavicongenerator.net)) and place in `app/` or `public/`.

---

## 2. Color System

| Token | Hex | Usage |
|-------|-----|--------|
| Primary Purple | `#7C3AED` | Primary actions, gradient start |
| Accent Purple | `#A78BFA` | Gradient mid, highlights |
| Secondary Blue | `#38BDF8` | Gradient end, links |
| Dark BG | `#0B0B0F` | Page background |
| Light BG | `#F8FAFC` | Light sections (if needed) |
| Text Dark | `#0F172A` | Text on light backgrounds |
| Text Light | `#FFFFFF` | Headings, primary text on dark |
| Border | `#E5E7EB` | Borders on light |
| Border Muted | `rgba(255,255,255,0.08)` | Borders on dark |

**Tailwind:** Use `primary-purple`, `primary-accent`, `primary-blue`, `dark`, `text-dark`, `text-light`, `border`, and `bg-gradient-brand`.

---

## 3. Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Hero | Plus Jakarta Sans | 64px (4rem) | 700 |
| Section titles | Plus Jakarta Sans | 36px | 700 |
| Subheading | Plus Jakarta Sans | 22px | 500–600 |
| Body | Inter | 16px | 400 |

- **Font classes:** `font-heading` (Plus Jakarta Sans), `font-body` (Inter)
- **Scale in Tailwind:** `text-hero`, `text-section-title`, `text-subheading`, `text-body`

---

## 4. UI Components

- **Button:** `src/components/ui/Button.tsx` — variants: `primary` (gradient), `secondary` (outline), `ghost`
- **Card:** `src/components/ui/Card.tsx` — hover lift, border, backdrop blur
- **Input:** `src/components/ui/Input.tsx` — label, dark-theme styling
- **Navbar:** Sticky, backdrop blur, CTA “Start Project”
- **Pricing cards:** In `Pricing.tsx`; highlight middle tier with gradient bar
- **Portfolio cards:** Image, title, stack tags, hover scale
- **Footer:** Logo, nav links, social, copyright

---

## 5. Animations (Framer Motion)

- **Logo:** Subtle float on icon; gradient animation in SVG (optional)
- **Cards:** `whileHover={{ y: -4 }}`, stagger on scroll into view
- **Hero:** Gradient orbs with pulse; CTA buttons with scale on hover/tap
- **Sections:** `whileInView` for fade + slide up; `viewport={{ once: true }}`
- **Scroll:** Smooth scroll; optional parallax on hero

---

## 6. Conversion & Layout

- **Hero:** One clear headline, subheadline, primary CTA “Start Your Project”, secondary “View Our Work”
- **Services:** 4 cards (Design, Development, SEO, Automation)
- **Work:** 3–6 portfolio items with image, title, stack, link
- **Process:** 4 steps — Discovery, Design, Development, Launch
- **Pricing:** 3 tiers ($5K, $10K, $20K+); CTA on each
- **CTA block:** “Ready to Launch Your Website?” + gradient glow + single CTA
- **Footer:** Logo, nav, social, contact, © 2026 Velora Studio

---

## 7. Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 3**
- **Framer Motion**

All components are in `src/components/`; sections in `src/components/sections/`; brand assets in `src/components/brand/`.

{% endraw %}
