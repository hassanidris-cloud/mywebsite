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
          className="text-primary-warm font-semibold text-sm uppercase tracking-[0.2em] mb-3"
        >
          {label}
        </motion.p>
      )}
      <div className={centered ? "inline-block" : ""}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight"
        >
          {title}
        </motion.h2>
        <motion.span
          className={`mt-2 block h-0.5 w-full max-w-16 rounded-full bg-gradient-to-r from-primary-warm to-primary-accent sm:max-w-20 ${centered ? "mx-auto" : ""}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: centered ? "center" : "left" }}
        />
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-3 sm:mt-4 text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
