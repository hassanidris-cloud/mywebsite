import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Velora Studio pricing: transparent, fixed-price website packages. Base package plus add-ons. No surprises—see your estimate and start your project.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: { url: `${SITE_URL}/pricing`, title: "Pricing | Velora Studio", siteName: "Velora Studio" },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
