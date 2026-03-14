import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thanks for getting in touch. Velora Studio will respond to your inquiry within 24 hours.",
  alternates: { canonical: "https://velorastudio.design/thank-you" },
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
