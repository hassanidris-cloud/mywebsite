"use client";

import Link from "next/link";

const VELORA_URL = "https://velorastudio.design";

export type ConceptBadgeVariant = "dark" | "light";

type Props = {
  /** "dark" for dark hero backgrounds, "light" for light backgrounds */
  variant?: ConceptBadgeVariant;
  /** Custom label. Default: "A Velora Studio Website Concept" */
  label?: string;
  /** If true, badge links to Velora Studio. Default: true */
  linkToVelora?: boolean;
  className?: string;
};

export default function ConceptBadge({
  variant = "dark",
  label = "A Velora Studio Website Concept",
  linkToVelora = true,
  className = "",
}: Props) {
  const isDark = variant === "dark";
  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-opacity hover:opacity-90";
  const styles = isDark
    ? "border border-white/15 bg-white/10 text-white/90 backdrop-blur-sm"
    : "border border-black/10 bg-black/5 text-neutral-700 backdrop-blur-sm";

  const content = <span>{label}</span>;

  if (linkToVelora) {
    return (
      <Link
        href={VELORA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
        aria-label={`${label} — visit Velora Studio`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span className={`${base} ${styles} ${className}`} role="status" aria-label={label}>
      {content}
    </span>
  );
}
