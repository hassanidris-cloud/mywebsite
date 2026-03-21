import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { SEO_FAQ_DESCRIPTION, SEO_FAQ_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: SEO_FAQ_TITLE,
  description: SEO_FAQ_DESCRIPTION,
  keywords: [
    "web design FAQ",
    "website project timeline",
    "mobile friendly website",
    "website redesign questions",
    "Velora Studio FAQ",
  ],
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    url: `${SITE_URL}/faq`,
    title: `${SEO_FAQ_TITLE} | Velora Studio`,
    description: SEO_FAQ_DESCRIPTION,
    siteName: "Velora Studio",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Velora Studio FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SEO_FAQ_TITLE} | Velora Studio`,
    description: SEO_FAQ_DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
