"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SectionVariant = "default" | "surface" | "elevated" | "halo";

const variantClasses: Record<SectionVariant, string> = {
  default: "relative",
  surface: "bg-surface/50 relative",
  elevated: "bg-surface-elevated/40 relative",
  halo: "relative before:absolute before:inset-0 before:bg-halo-soft before:pointer-events-none before:opacity-80",
};

export default function Section({
  children,
  id,
  className = "",
  noPadding = false,
  variant = "default",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  noPadding?: boolean;
  variant?: SectionVariant;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduceMotion ? [0, 0, 0, 0] : [14, 0, 0, -10]
  );

  const baseClass = noPadding ? className : `py-16 sm:py-20 md:py-28 ${variantClasses[variant]} ${className}`;

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={baseClass}
    >
      {children}
    </motion.section>
  );
}
