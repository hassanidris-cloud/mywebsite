import type { Metadata } from "next";
import { StartProjectStructuredData } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start Your Project",
  description:
    "Start your website project with Velora Studio. Tell us your goals—we'll get back within 24 hours. Fixed price, 2–4 weeks.",
  alternates: { canonical: `${SITE_URL}/start-project` },
  openGraph: { url: `${SITE_URL}/start-project`, title: "Start Your Project | Velora Studio", siteName: "Velora Studio" },
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StartProjectStructuredData />
      {children}
    </>
  );
}
