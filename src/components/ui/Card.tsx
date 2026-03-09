"use client";

import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "default",
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "default" | "large";
}) {
  const paddingClass = padding === "large" ? "p-8 md:p-10" : "p-6 md:p-8";
  return (
    <motion.div
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-card transition-shadow duration-250 overflow-hidden ${paddingClass} ${className}`}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)",
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Signature: thin warm accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-warm/50 to-transparent opacity-80" aria-hidden />
      {children}
    </motion.div>
  );
}
