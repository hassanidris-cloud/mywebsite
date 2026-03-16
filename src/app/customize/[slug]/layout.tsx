import type { Metadata } from "next";
import { templates } from "@/data/work";
import { SITE_URL } from "@/lib/site";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);
  const title = template ? `Customize: ${template.name}` : "Customize template";
  return {
    title,
    description:
      "Customize this Velora Studio template. Choose sections, see your estimate, and start your project. Fixed price, 2–4 weeks.",
    alternates: { canonical: `${SITE_URL}/customize/${slug}` },
    openGraph: { url: `${SITE_URL}/customize/${slug}`, title: `${title} | Velora Studio`, siteName: "Velora Studio" },
  };
}

export default function CustomizeLayout({ children }: Props) {
  return children;
}
