/**
 * Before / after comparison (homepage section).
 *
 * Set `beforeSrc` and/or `afterSrc` to files under `/public` (path starts with `/before-after/...`).
 * Missing side uses the built-in mock until you add the image.
 */
export interface BeforeAfterItem {
  title: string
  /** e.g. `/before-after/acme-before.png` — requires same aspect as after */
  beforeSrc?: string
  afterSrc?: string
  beforeAlt?: string
  afterAlt?: string
  highlights: { title: string; body: string }[]
}

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    title: "WinIT — enterprise software services",
    beforeSrc: "/before-after/client-before.png",
    beforeAlt: "Software services company website — before redesign",
    afterSrc: "/before-after/client-after.png",
    afterAlt: "WinIT enterprise software services — after redesign",
    highlights: [
      {
        title: "One story, one action",
        body: "We strip competing messages so visitors know exactly what to do next — book, buy, or get in touch.",
      },
      {
        title: "Trust at first scroll",
        body: "Typography, spacing, and structure signal quality before anyone reads a full paragraph.",
      },
      {
        title: "Built to perform",
        body: "Fast loads and clean markup support SEO and ads — so traffic actually turns into leads.",
      },
    ],
  },
]
