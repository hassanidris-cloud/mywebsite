# Template attribution components

Reusable components for Velora Studio **portfolio template** sites. They make it clear that a site is a concept/template designed by Velora Studio and that everything is customizable.

Use these in template projects (e.g. IT Solutions & Consulting, or any demo at `*.vercel.app`) so visitors see elegant attribution without watermarks or loud banners.

## Components

| Component | Purpose |
|-----------|--------|
| **ConceptBadge** | Small pill/badge near the hero: e.g. "A Velora Studio Website Concept" |
| **ConceptExplanationSection** | Section "About This Website Concept" with short explanation |
| **CustomizationSection** | "Customize This Website For Your Business" + bullet list + CTA button |
| **FooterAttribution** | Footer line: e.g. "Website concept designed by Velora Studio" |
| **FloatingConceptBadge** | Optional corner badge: e.g. "Velora Studio Concept" |

## Usage

```tsx
import {
  ConceptBadge,
  ConceptExplanationSection,
  CustomizationSection,
  FooterAttribution,
  FloatingConceptBadge,
} from "@/components/template-attribution";

// In your template layout or page:

// 1. Near hero
<ConceptBadge variant="light" label="A Velora Studio Website Concept" />

// 2. Section below hero or before footer
<ConceptExplanationSection variant="light" />

// 3. Customization + CTA
<CustomizationSection variant="light" buttonLabel="Start Your Website" />

// 4. In footer
<FooterAttribution variant="light" text="Template design by Velora Studio — velorastudio.design" />

// 5. Optional floating badge
<FloatingConceptBadge variant="light" label="Built by Velora Studio" position="top-right" />
```

## Variants

- **`variant="dark"`** — For dark backgrounds (e.g. dark hero/footer). Uses light text and subtle borders.
- **`variant="light"`** — For light backgrounds. Uses dark text and neutral borders.

Use the variant that matches the section background where the component is placed.

## Reuse across templates

Copy the `template-attribution` folder into each template codebase, or keep it in a shared package. All components accept optional props (title, label, paragraph, buttonLabel, etc.) so you can tailor copy per template while keeping the same structure.
