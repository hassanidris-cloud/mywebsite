"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Lock } from "lucide-react"
import { templates, type AccentColor } from "@/data/work"
import { isPromoActive, PROMO_LABEL } from "@/data/template-customization"
import {
  ConceptBadge,
  ConceptExplanationSection,
  CustomizationSection,
} from "@/components/template-attribution"

const accentStyles: Record<AccentColor, { border: string; badgeBg: string; badgeText: string; glow: string }> = {
  warm:    { border: "rgba(232,165,75,0.2)",   badgeBg: "rgba(232,165,75,0.12)",  badgeText: "#e8a54b", glow: "rgba(232,165,75,0.07)"  },
  cool:    { border: "rgba(125,211,252,0.2)",  badgeBg: "rgba(125,211,252,0.12)", badgeText: "#7dd3fc", glow: "rgba(125,211,252,0.07)" },
  rose:    { border: "rgba(249,168,212,0.2)",  badgeBg: "rgba(249,168,212,0.12)", badgeText: "#f9a8d4", glow: "rgba(249,168,212,0.07)" },
  primary: { border: "rgba(124,58,237,0.28)",  badgeBg: "rgba(167,139,250,0.12)", badgeText: "#a78bfa", glow: "rgba(124,58,237,0.09)"  },
  green:   { border: "rgba(52,211,153,0.22)",  badgeBg: "rgba(52,211,153,0.12)",  badgeText: "#34d399", glow: "rgba(52,211,153,0.07)"  },
  orange:  { border: "rgba(251,146,60,0.2)",   badgeBg: "rgba(251,146,60,0.12)",  badgeText: "#fb923c", glow: "rgba(251,146,60,0.07)"  },
}

export default function TemplatesShowcase() {
  return (
    <section
      id="templates"
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,243,239,0.07), transparent)" }}
        aria-hidden
      />
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-signature pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <ConceptBadge
            variant="dark"
            label="Website concepts by Velora Studio"
            className="mb-6"
          />
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em] mb-5"
            style={{ color: "var(--color-primary-accent)" }}
          >
            Ready-Made Templates
          </p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <h2
                className="font-heading font-bold leading-[0.92] tracking-tight"
                style={{ fontSize: "var(--text-section)", color: "var(--color-text-light)", maxWidth: "22ch" }}
              >
                Launch in days, not weeks.
              </h2>
              <p
                className="mt-4 max-w-xl"
                style={{ color: "var(--color-text-muted)", fontSize: "var(--text-body)" }}
              >
                Pre-built, polished templates you can make yours. Customize colors, content, and launch — no starting from scratch.
              </p>
              {isPromoActive() && (
                <p className="mt-3 text-sm font-semibold" style={{ color: "var(--color-primary-accent)" }}>
                  🎉 {PROMO_LABEL}
                </p>
              )}
            </div>
            <Link
              href="/templates"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors shrink-0"
              style={{ color: "var(--color-text-dim)" }}
            >
              All templates
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>

        {/* Single horizontal grid (no categories on homepage) */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {templates.map((tpl, i) => {
            const style = accentStyles[tpl.accent]
            const isLive = tpl.badge === "Live preview"
            return (
              <motion.div
                key={tpl.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl overflow-hidden transition-all duration-300"
                style={{
                  border: `1px solid ${style.border}`,
                  backgroundColor: "var(--color-surface-elevated)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${style.glow}, transparent 70%)` }}
                  aria-hidden
                />
                <div className={`relative h-44 overflow-hidden ${!tpl.previewImage ? `bg-gradient-to-br ${tpl.gradient}` : ""}`}>
                  <div
                    className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1 px-3 py-2 border-b"
                    style={{ backgroundColor: "rgba(0,0,0,0.2)", borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                    <div className="flex-1 mx-1.5 h-3 rounded-full bg-white/8" />
                  </div>
                  {tpl.previewImage ? (
                    <Image
                      src={tpl.previewImage}
                      alt={`${tpl.name} — preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover object-top pt-9"
                      unoptimized
                    />
                  ) : (
                    <div className={`absolute inset-0 pt-9 bg-gradient-to-br ${tpl.gradient} p-4 space-y-2 opacity-70`}>
                      <div className="h-2.5 w-3/4 rounded-full bg-white/25" />
                      <div className="h-2 w-1/2 rounded-full bg-white/15" />
                      <div className="mt-3 h-14 rounded-xl bg-white/10" />
                      <div className="flex gap-2 mt-2">
                        <div className="h-4 w-14 rounded-full bg-white/15" />
                        <div className="h-4 w-10 rounded-full bg-white/10" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-10 right-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full px-2.5 py-1 border backdrop-blur-sm"
                      style={{ backgroundColor: style.badgeBg, borderColor: style.border, color: style.badgeText }}
                    >
                      {!isLive && <Lock className="w-2.5 h-2.5" />}
                      {tpl.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
                    style={{ color: style.badgeText }}
                  >
                    {tpl.category}
                  </p>
                  <h3
                    className="font-heading font-bold text-lg tracking-tight"
                    style={{ color: "var(--color-text-light)" }}
                  >
                    {tpl.name}
                  </h3>
                  <p
                    className="mt-2.5 text-sm leading-relaxed line-clamp-3"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {tpl.summary}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    {isLive ? (
                      <a
                        href={tpl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                        style={{ color: "var(--color-cream)" }}
                      >
                        Preview <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-text-dim)" }}
                      >
                        In progress
                      </span>
                    )}
                    <Link
                      href={`/customize/${tpl.slug}`}
                      className="ml-auto text-xs font-medium transition-colors"
                      style={{ color: "var(--color-text-dim)" }}
                    >
                      Get this →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-sm text-center"
          style={{ color: "var(--color-text-dim)" }}
        >
          Need something unique?{" "}
          <Link
            href="/start-project"
            className="font-medium underline underline-offset-4 transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            We build fully custom websites too.
          </Link>
        </motion.p>

        {/* About this website concept */}
        <ConceptExplanationSection
          variant="dark"
          title="About these website concepts"
          paragraph="Each template is a concept project designed by Velora Studio to show how a modern business website could look and function. The layout, colors, imagery, and content are fully customizable and can be adapted to match any brand or business."
          className="!py-12 md:!py-16"
        />

        {/* Customize for your business */}
        <CustomizationSection
          variant="dark"
          title="Customize a template for your business"
          intro="Every website we build is tailored to the client's brand and needs. These concepts demonstrate design style and layout possibilities — every element can be customized, including:"
          buttonLabel="Request a custom website"
          buttonHref="/start-project"
          className="!pt-0"
        />
      </div>
    </section>
  )
}
