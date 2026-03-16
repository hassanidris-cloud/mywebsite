import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Websites and templates built by Velora Studio. From e-commerce and hospitality to platforms and agencies—see our recent work.",
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: { url: `${SITE_URL}/work`, title: "Our Work | Velora Studio", siteName: "Velora Studio" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
