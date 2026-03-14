"use client";

import Link from "next/link";

const VELORA_URL = "https://velorastudio.design";

export type FooterAttributionVariant = "dark" | "light";

type Props = {
  variant?: FooterAttributionVariant;
  /** e.g. "Website concept designed by Velora Studio" */
  text?: string;
  /** If true, "Velora Studio" links to velorastudio.design. Default: true */
  linkToVelora?: boolean;
  className?: string;
};

const defaultText = "Website concept designed by Velora Studio";

export default function FooterAttribution({
  variant = "dark",
  text = defaultText,
  linkToVelora = true,
  className = "",
}: Props) {
  const isDark = variant === "dark";
  const mutedClass = isDark ? "text-white/50" : "text-neutral-500";

  // Split so we can link "Velora Studio" if desired
  const parts = text.split("Velora Studio");
  const before = parts[0]?.trim() ?? "";
  const after = parts[1]?.trim() ?? "";

  return (
    <p className={`text-sm ${mutedClass} ${className}`}>
      {before}
      {before ? " " : ""}
      {linkToVelora ? (
        <>
          <Link
            href={VELORA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-90"
          >
            Velora Studio
          </Link>
          {after ? ` ${after}` : ""}
        </>
      ) : (
        <>Velora Studio{after ? ` ${after}` : ""}</>
      )}
    </p>
  );
}
