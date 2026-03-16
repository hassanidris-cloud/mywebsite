import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Velora Studio",
  description:
    "Velora Studio is a premium web design agency. Fixed scope, one point of contact, 2–4 weeks. We build fast, responsive, conversion-focused websites you own.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: { url: `${SITE_URL}/about`, title: "About Velora Studio", siteName: "Velora Studio" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
