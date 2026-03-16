import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How Velora Studio builds your website: strategy, structure, design, build, and launch. Clear steps, 2–4 weeks, one point of contact.",
  alternates: { canonical: `${SITE_URL}/process` },
  openGraph: { url: `${SITE_URL}/process`, title: "Our Process | Velora Studio", siteName: "Velora Studio" },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
