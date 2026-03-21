"use client"

import { useRef, useEffect, useMemo } from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { getEffectiveCustomBasePriceEur } from "@/data/pricing"

interface StatItem {
  countTo?: number
  prefix?: string
  suffix?: string
  display?: string
  label: string
  note: string
  color: string
}

function useResultsStats(): StatItem[] {
  const startingPrice = getEffectiveCustomBasePriceEur()
  return useMemo(
    () => [
      {
        prefix: "+",
        countTo: 38,
        suffix: "%",
        label: "Average uplift in lead quality",
        note: "Across client projects",
        color: "var(--color-warm)",
      },
      {
        display: "2–4w",
        label: "Typical launch timeline",
        note: "Strategy to live",
        color: "var(--color-cool)",
      },
      {
        prefix: "",
        countTo: 90,
        suffix: "+",
        label: "Lighthouse performance score",
        note: "Fast by default",
        color: "var(--color-primary-accent)",
      },
      {
        prefix: "€",
        countTo: startingPrice,
        suffix: "",
        label: "Starting price — no surprises",
        note: "Fully transparent pricing",
        color: "var(--color-rose)",
      },
    ],
    [startingPrice]
  )
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: "-60px" })
  const count = useMotionValue(0)
  const displayVal = useTransform(
    count,
    (v) => `${stat.prefix ?? ""}${Math.round(v)}${stat.suffix ?? ""}`
  )

  useEffect(() => {
    if (!inView || stat.countTo == null) return
    const controls = animate(count, stat.countTo, {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [inView, count, stat.countTo])

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 py-12 text-center relative"
      >
        {/* Hover accent glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${stat.color}18, transparent 70%)`,
          }}
        />

        {/* Value */}
        <p
          className="font-heading font-bold tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)", color: stat.color }}
        >
          {stat.countTo != null ? (
            <motion.span>{displayVal}</motion.span>
          ) : (
            <motion.span
              whileInView={{ scale: [0.88, 1.03, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {stat.display}
            </motion.span>
          )}
        </p>

        <p
          className="mt-3 text-sm font-medium leading-snug"
          style={{ color: "var(--color-text-light)" }}
        >
          {stat.label}
        </p>
        <p
          className="mt-1.5 text-xs uppercase tracking-widest"
          style={{ color: "var(--color-text-dim)" }}
        >
          {stat.note}
        </p>
      </motion.div>
    </div>
  )
}

export default function Results() {
  const stats = useResultsStats()
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-elevated)" }}
    >
      {/* Top/bottom separators */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(245,243,239,0.08), transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(245,243,239,0.08), transparent)",
        }}
      />

      {/* Ambient glow center */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.06), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0"
          style={{ borderColor: "var(--color-border)" }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
