"use client";

import Link from "next/link";

const VELORA_URL = "https://velorastudio.design";

export type FloatingConceptBadgeVariant = "dark" | "light";

type Props = {
  variant?: FloatingConceptBadgeVariant;
  /** e.g. "Velora Studio Concept" or "Built by Velora Studio" */
  label?: string;
  /** Corner: "top-right" | "top-left" | "bottom-right" | "bottom-left". Default: top-right */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** If true, badge is a link to Velora Studio. Default: true */
  linkToVelora?: boolean;
  className?: string;
};

const positionClasses = {
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
};

export default function FloatingConceptBadge({
  variant = "dark",
  label = "Velora Studio Concept",
  position = "top-right",
  linkToVelora = true,
  className = "",
}: Props) {
  const isDark = variant === "dark";
  const pos = positionClasses[position];
  const styles = isDark
    ? "border border-white/12 bg-white/5 text-white/80 backdrop-blur-md"
    : "border border-black/8 bg-white/80 text-neutral-600 backdrop-blur-md";

  const content = (
    <span className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium tracking-wide">
      {label}
    </span>
  );

  const wrapperClass = `fixed ${pos} z-40 pointer-events-auto rounded-lg ${styles} ${className}`;

  if (linkToVelora) {
    return (
      <Link
        href={VELORA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
        aria-label={`${label} — visit Velora Studio`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span className={wrapperClass} role="status" aria-label={label}>
      {content}
    </span>
  );
}
