"use client";

import Link from "next/link";
import VeloraIcon from "./VeloraIcon";

export default function VeloraLogoHorizontal({
  variant = "dark",
  showWordmark = true,
  wordmarkInline = false,
  iconSize = 40,
  className = "",
}: {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  /** Show "Velora Studio" on one line instead of stacked */
  wordmarkInline?: boolean;
  iconSize?: number;
  className?: string;
}) {
  const textVelora = variant === "dark" ? "text-cream" : "text-text-dark";
  const textStudio = variant === "dark" ? "text-slate-400" : "text-slate-500";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 no-underline ${className}`}
      aria-label="Velora Studio - Home"
    >
      <VeloraIcon size={iconSize} animated={true} />
      {showWordmark && wordmarkInline && (
        <span className={`font-heading text-lg font-semibold tracking-tight ${textVelora}`}>
          Velora <span className={textStudio}>Studio</span>
        </span>
      )}
      {showWordmark && !wordmarkInline && (
        <span className="flex flex-col leading-tight">
          <span
            className={`font-heading text-xl font-bold tracking-tight ${textVelora}`}
          >
            Velora
          </span>
          <span
            className={`font-body text-xs font-medium tracking-[0.2em] uppercase ${textStudio}`}
          >
            Studio
          </span>
        </span>
      )}
    </Link>
  );
}
