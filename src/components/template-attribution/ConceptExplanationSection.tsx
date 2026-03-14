"use client";

export type ConceptExplanationVariant = "dark" | "light";

type Props = {
  variant?: ConceptExplanationVariant;
  title?: string;
  paragraph?: string;
  className?: string;
};

const defaultTitle = "About This Website Concept";
const defaultParagraph =
  "This website is a concept project designed by Velora Studio to demonstrate how a modern business website could look and function. The layout, colors, imagery, and content are fully customizable and can be adapted to match any brand or business.";

export default function ConceptExplanationSection({
  variant = "dark",
  title = defaultTitle,
  paragraph = defaultParagraph,
  className = "",
}: Props) {
  const isDark = variant === "dark";
  const textMuted = isDark ? "text-white/65" : "text-neutral-600";
  const textTitle = isDark ? "text-white" : "text-neutral-900";
  const borderClass = isDark ? "border-white/10" : "border-neutral-200";

  return (
    <section
      className={`py-16 md:py-24 px-6 ${className}`}
      aria-labelledby="concept-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 opacity-70"
          style={isDark ? { color: "var(--color-primary-accent)" } : { color: "var(--color-primary)" }}
        >
          Concept
        </p>
        <h2
          id="concept-heading"
          className={`text-2xl md:text-3xl font-semibold tracking-tight ${textTitle}`}
        >
          {title}
        </h2>
        <p className={`mt-6 text-lg leading-relaxed ${textMuted}`}>
          {paragraph}
        </p>
        <div className={`mt-10 mx-auto h-px w-24 ${borderClass}`} aria-hidden />
      </div>
    </section>
  );
}
