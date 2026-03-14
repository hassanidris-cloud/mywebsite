"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,243,239,0.07), transparent)" }}
        aria-hidden
      />
      {/* Ambient halo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(124,58,237,0.08), transparent 65%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden"
          style={{
            border: "1px solid var(--color-border-strong)",
            backgroundColor: "var(--color-cream)",
          }}
        >
          {/* Warm texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 20% 50%, rgba(232,165,75,0.12), transparent 55%), radial-gradient(ellipse 60% 60% at 85% 20%, rgba(124,58,237,0.08), transparent 50%)",
            }}
            aria-hidden
          />
          <div className="bg-grid-signature absolute inset-0 opacity-30 pointer-events-none" aria-hidden />

          <div className="relative px-8 py-16 md:px-16 md:py-20 lg:py-24 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold uppercase tracking-[0.28em] mb-6"
              style={{ color: "rgba(15,23,42,0.45)" }}
            >
              Ready to launch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold leading-[0.9] tracking-tight mx-auto"
              style={{
                fontSize: "var(--text-display)",
                color: "var(--color-ink)",
                maxWidth: "16ch",
              }}
            >
              Let&apos;s build something{" "}
              <em className="not-italic" style={{ color: "var(--color-primary-darker)" }}>
                remarkable.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-6 mx-auto max-w-xl"
              style={{ fontSize: "var(--text-body)", color: "rgba(26,23,36,0.65)", lineHeight: 1.7 }}
            >
              Better first impressions. Stronger trust. More enquiries. Built around your offer, your positioning, and your next stage of growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/start-project"
                className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-bold transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: "var(--color-ink)",
                  color: "var(--color-cream)",
                  boxShadow: "0 12px 32px -8px rgba(10,9,18,0.35)",
                }}
              >
                Start your project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-base font-medium transition-all duration-300"
                style={{
                  borderColor: "rgba(26,23,36,0.2)",
                  color: "var(--color-ink)",
                  backgroundColor: "transparent",
                }}
              >
                View packages
              </Link>
            </motion.div>

            {/* Trust note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-8 text-xs"
              style={{ color: "rgba(26,23,36,0.4)" }}
            >
              No commitment. Free discovery call. Fixed pricing, no hidden fees.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
