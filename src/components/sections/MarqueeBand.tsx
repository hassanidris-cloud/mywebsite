"use client"

import { motion } from "framer-motion"
import { getEffectiveCustomBasePriceEur } from "@/data/pricing"

const getRow1 = () => [
  { text: "Bespoke Design", accent: "warm" as const },
  { text: `€${getEffectiveCustomBasePriceEur()} Starting`, accent: "dim" as const },
  { text: "100% Custom", accent: "purple" as const },
  { text: "2–4 Week Delivery", accent: "dim" as const },
  { text: "Built to Convert", accent: "warm" as const },
  { text: "Premium Quality", accent: "dim" as const },
  { text: "Framer Motion", accent: "purple" as const },
  { text: "Performance First", accent: "dim" as const },
]

const row1 = getRow1()

const row2 = [
  { text: "Next.js 15", accent: "dim" as const },
  { text: "Responsive Design", accent: "warm" as const },
  { text: "TypeScript", accent: "dim" as const },
  { text: "Editorial Layout", accent: "purple" as const },
  { text: "Vercel Deploy", accent: "dim" as const },
  { text: "Custom Animations", accent: "warm" as const },
  { text: "SEO Optimized", accent: "dim" as const },
  { text: "Web Applications", accent: "purple" as const },
]

const colorMap = {
  warm: "var(--color-warm)",
  purple: "var(--color-primary-accent)",
  dim: "var(--color-text-dim)",
}

function Track({
  items,
  reverse = false,
  duration = 36,
}: {
  items: { text: string; accent: "warm" | "purple" | "dim" }[]
  reverse?: boolean
  duration?: number
}) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 px-5">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: colorMap[item.accent] }}
            >
              {item.text}
            </span>
            <span
              aria-hidden
              style={{
                color: "rgba(245,243,239,0.14)",
                fontSize: "7px",
                verticalAlign: "middle",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function MarqueeBand() {
  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        backgroundColor: "var(--color-surface-elevated)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Fade mask – left */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, var(--color-surface-elevated), transparent)",
        }}
      />
      {/* Fade mask – right */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-20 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to left, var(--color-surface-elevated), transparent)",
        }}
      />

      <div className="py-[13px] space-y-[9px]">
        <Track items={row1} duration={42} />
        <div
          aria-hidden
          className="h-px"
          style={{ background: "var(--color-border)" }}
        />
        <Track items={row2} reverse duration={34} />
      </div>
    </div>
  )
}
