import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about working with Velora Studio. Timelines, process, support, and what to expect from a premium website project.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: { url: `${SITE_URL}/faq`, title: "FAQ | Velora Studio", siteName: "Velora Studio" },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
