import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Templates",
  description:
    "Browse all Velora Studio website templates by category. E-commerce, Restaurant & Café, Agency, Technology. Customize and launch in 2–4 weeks.",
  alternates: { canonical: `${SITE_URL}/templates` },
  openGraph: { url: `${SITE_URL}/templates`, title: "Website Templates | Velora Studio", siteName: "Velora Studio" },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
