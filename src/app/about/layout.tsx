import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Velora Studio is a small web studio focused on websites. Fixed scope, one point of contact, 6–8 weeks. We build fast, responsive, conversion-focused sites you own.",
  alternates: { canonical: "https://velorastudio.vercel.app/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
