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
      className={`relative rounded-2xl border-0 bg-surface-card backdrop-blur-md shadow-card transition-all duration-300 overflow-hidden ${paddingClass} ${className}`}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: "0 28px 56px -14px rgba(0,0,0,0.4), 0 0 0 1px var(--color-border-strong), 0 0 50px -12px rgba(var(--color-primary-rgb), 0.14)",
              transition: { type: "spring", stiffness: 300, damping: 25 },
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
