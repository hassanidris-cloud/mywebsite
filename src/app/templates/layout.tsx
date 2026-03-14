import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All templates",
  description:
    "Browse all website templates by category. E-commerce, Restaurant & Café, Agency, Technology, and more.",
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
