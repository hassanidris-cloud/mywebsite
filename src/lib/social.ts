/**
 * Social profile URLs from env. Used in Footer, Contact page, and JSON-LD (sameAs).
 * Set NEXT_PUBLIC_INSTAGRAM_URL, NEXT_PUBLIC_LINKEDIN_URL, NEXT_PUBLIC_TWITTER_URL, NEXT_PUBLIC_GITHUB_URL in .env
 */
export function getSocialLinks(): { label: string; href: string }[] {
  return [
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "" },
    { label: "X", href: process.env.NEXT_PUBLIC_TWITTER_URL ?? "" },
    { label: "GitHub", href: process.env.NEXT_PUBLIC_GITHUB_URL ?? "" },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href?.trim()));
}

/** URLs for schema.org sameAs (SEO). */
export function getSocialSameAs(): string[] {
  return [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_TWITTER_URL,
    process.env.NEXT_PUBLIC_GITHUB_URL,
  ].filter((u): u is string => Boolean(u?.trim()));
}
