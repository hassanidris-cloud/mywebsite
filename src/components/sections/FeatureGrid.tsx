"use client"

import { motion } from "framer-motion"
import {
  LayoutTemplate,
  Rocket,
  BarChart3,
  Sparkles,
} from "lucide-react"

const features = [
  {
    icon: LayoutTemplate,
    eyebrow: "Design",
    title: "Premium design systems — built on our own templates.",
    body: "We design and maintain our own high-quality templates, then tailor them to your brand — strong hierarchy, editorial spacing, and trust-building layouts that put your brand in the right light.",
    stat: { value: "100%", label: "Custom-designed" },
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    iconColor: "var(--color-primary-accent)",
    iconBg: "rgba(124,58,237,0.15)",
    align: "left",
  },
  {
    icon: Rocket,
    eyebrow: "Performance",
    title: "Fast builds that go live in 2–4 weeks.",
    body: "Modern stack, optimised assets, clean code. Your site ships fast, loads faster, and scales as your business grows — without the agency bloat.",
    stat: { value: "2–4w", label: "Avg. delivery" },
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    iconColor: "var(--color-cool)",
    iconBg: "rgba(125,211,252,0.12)",
    align: "right",
  },
  {
    icon: BarChart3,
    eyebrow: "Conversion",
    title: "Every section is built to convert.",
    body: "Attract attention, build credibility, reduce friction, drive action. Every section earns its place by guiding visitors toward your goal — not ours.",
    stat: { value: "+38%", label: "Avg. lead uplift" },
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconColor: "var(--color-warm)",
    iconBg: "rgba(232,165,75,0.12)",
    align: "left",
  },
]

export default function FeatureGrid() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,243,239,0.07), transparent)" }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--color-primary-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--color-primary-accent)" }}>
              Why Velora
            </p>
          </div>
          <h2
            className="font-heading font-bold leading-[0.92] tracking-tight"
            style={{ fontSize: "var(--text-section)", color: "var(--color-text-light)" }}
          >
            A premium website does more than look good.
          </h2>
        </motion.div>

        {/* Alternating feature rows */}
        <div className="space-y-8">
          {features.map((feat, i) => {
            const Icon = feat.icon
            const isRight = feat.align === "right"
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{ ...(isRight ? { backgroundOrigin: "right" } : {}) }}
                  aria-hidden
                />

                <div
                  className={`relative flex flex-col ${isRight ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-0`}
                >
                  {/* Visual panel */}
                  <div
                    className={`w-full lg:w-[360px] xl:w-[420px] shrink-0 flex items-center justify-center p-12 lg:p-16 bg-gradient-to-br ${feat.gradient} min-h-[220px] lg:min-h-[260px] border-b lg:border-b-0 ${isRight ? "lg:border-l" : "lg:border-r"}`}
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative"
                    >
                      {/* Icon container */}
                      <div
                        className="flex items-center justify-center w-24 h-24 rounded-3xl shadow-2xl"
                        style={{ backgroundColor: feat.iconBg, border: `1px solid ${feat.iconBg.replace("0.12", "0.25").replace("0.15", "0.3")}` }}
                      >
                        <Icon className="w-12 h-12" style={{ color: feat.iconColor }} />
                      </div>
                      {/* Stat badge */}
                      <div
                        className="absolute -bottom-4 -right-6 rounded-2xl px-4 py-2 shadow-xl border backdrop-blur-md"
                        style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border-strong)" }}
                      >
                        <p className="font-heading font-bold text-2xl" style={{ color: "var(--color-text-light)" }}>
                          {feat.stat.value}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest" style={{ color: "var(--color-text-dim)" }}>
                          {feat.stat.label}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Text panel */}
                  <div className="flex-1 p-8 lg:p-12 xl:p-16">
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.25em] mb-4"
                      style={{ color: feat.iconColor }}
                    >
                      {feat.eyebrow}
                    </p>
                    <h3
                      className="font-heading font-bold leading-tight tracking-tight"
                      style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", color: "var(--color-text-light)" }}
                    >
                      {feat.title}
                    </h3>
                    <p
                      className="mt-5 leading-relaxed max-w-lg"
                      style={{ color: "var(--color-text-muted)", fontSize: "var(--text-body)" }}
                    >
                      {feat.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
