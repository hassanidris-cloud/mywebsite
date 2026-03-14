import type { Metadata } from "next";
import { templates } from "@/data/work";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);
  const title = template ? `Customize: ${template.name}` : "Customize template";
  return {
    title,
    description:
      "Choose which sections to include and see your estimated total. Then proceed to start your project.",
  };
}

export default function CustomizeLayout({ children }: Props) {
  return children;
}
