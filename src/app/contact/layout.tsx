import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Velora Studio. Email, social links, and project inquiry form. We usually reply within 24 hours.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: { url: `${SITE_URL}/contact`, title: "Contact Velora Studio", siteName: "Velora Studio" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
