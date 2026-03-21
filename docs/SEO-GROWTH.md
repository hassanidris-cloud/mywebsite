# SEO growth (beyond the codebase)

Technical SEO in the repo: shared copy in `src/lib/seo.ts`, JSON-LD in `layout.tsx` + `StructuredData.tsx`, FAQ rich results on `/faq`, sitemap, robots, mobile-first viewport.

## What you still do in marketing

1. **Search Console** — Verify the property, submit the sitemap URL, monitor queries, impressions, CTR, and average position.
2. **Titles & snippets** — If impressions are high but CTR is low, test new titles/descriptions in `src/lib/seo.ts` (keep them honest and specific).
3. **Content** — Add blog/case studies/glossary pages for long-tail queries; link them from the homepage and footer.
4. **Backlinks** — Guest posts, directories, partnerships, and shareable projects; quality over quantity.
5. **Keywords** — Use GSC + Keyword Planner; extend `SEO_KEYWORDS` and page-level copy when you target new terms.

## Impressions vs clicks

High impressions with low clicks often means the **snippet** (title + description) doesn’t match intent or isn’t compelling—iterate using real query data from GSC.
