"use client";

import { motion } from "framer-motion";

export default function Section({
  children,
  id,
  className = "",
  noPadding = false,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={noPadding ? className : `py-14 sm:py-20 md:py-24 border-t border-white/[0.04] ${className}`}
    >
      {children}
    </motion.section>
  );
}
