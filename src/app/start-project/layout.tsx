import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Your Project | Velora Studio",
  description:
    "Tell us about your website project. We’ll get back within 24 hours. Explore AI-assisted layout ideas for your site.",
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
