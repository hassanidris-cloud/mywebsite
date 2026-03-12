"use client";

import { motion } from "framer-motion";

type HeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
};

export default function Heading({
  label,
  title,
  subtitle,
  centered = true,
  className = "",
}: HeadingProps) {
  return (
    <div className={`mb-10 sm:mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-warm font-semibold text-sm uppercase tracking-[0.2em] mb-3"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className={`font-heading text-section-title font-extrabold text-cream tracking-tight leading-tight ${centered ? "inline-block" : ""}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-3 sm:mt-4 text-cream/70 text-base sm:text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
