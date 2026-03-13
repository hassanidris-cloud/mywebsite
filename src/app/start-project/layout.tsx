import type { Metadata } from "next";
import { StartProjectStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Start Your Project",
  description:
    "Tell us about your website project. We'll get back within 24 hours. Explore AI-assisted layout ideas for your site.",
  alternates: { canonical: "https://velorastudio.vercel.app/start-project" },
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
