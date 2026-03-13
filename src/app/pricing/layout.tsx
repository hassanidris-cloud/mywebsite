import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for modern websites: Starter, Business, and Premium tiers. Backend add-ons, hosting, and maintenance plans. Fixed scope, clear value.",
  alternates: { canonical: "https://velorastudio.vercel.app/pricing" },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
