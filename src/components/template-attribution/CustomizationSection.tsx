"use client";

import Link from "next/link";

const VELORA_START_URL = "https://velorastudio.design/start-project";

const defaultItems = [
  "Colors and branding",
  "Typography",
  "Images and media",
  "Pages and sections",
  "Features and integrations",
];

export type CustomizationSectionVariant = "dark" | "light";

type Props = {
  variant?: CustomizationSectionVariant;
  title?: string;
  intro?: string;
  items?: string[];
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
};

export default function CustomizationSection({
  variant = "dark",
  title = "Customize This Website For Your Business",
  intro = "Every website built by Velora Studio is tailored to the client's brand and needs. This concept demonstrates the design style and layout possibilities, but every element can be customized, including:",
  items = defaultItems,
  buttonLabel = "Request a Custom Website",
  buttonHref = VELORA_START_URL,
  className = "",
}: Props) {
  const isDark = variant === "dark";
  const textMuted = isDark ? "text-white/65" : "text-neutral-600";
  const textTitle = isDark ? "text-white" : "text-neutral-900";
  const cardBg = isDark ? "bg-white/[0.04] border-white/10" : "bg-neutral-50 border-neutral-200";
  const btnPrimary = isDark
    ? "bg-white text-neutral-950 hover:bg-white/90"
    : "bg-neutral-900 text-white hover:bg-neutral-800";

  return (
    <section
      className={`py-16 md:py-24 px-6 ${className}`}
      aria-labelledby="customize-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="customize-heading"
          className={`text-2xl md:text-4xl font-semibold tracking-tight text-center ${textTitle}`}
        >
          {title}
        </h2>
        <p className={`mt-6 text-center text-lg leading-relaxed max-w-2xl mx-auto ${textMuted}`}>
          {intro}
        </p>
        <ul
          className={`mt-10 rounded-2xl border p-8 md:p-10 ${cardBg}`}
          role="list"
        >
          {items.map((item, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 py-2.5 ${textMuted}`}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full opacity-70"
                style={isDark ? { backgroundColor: "var(--color-primary-accent)" } : { backgroundColor: "var(--color-primary)" }}
                aria-hidden
              />
              <span className="text-base md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link
            href={buttonHref}
            {...(buttonHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`inline-flex items-center justify-center rounded-xl px-8 py-4 font-medium transition ${btnPrimary}`}
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
