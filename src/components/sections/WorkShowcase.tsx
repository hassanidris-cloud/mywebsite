"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { websites, type AccentColor } from "@/data/work"

const accentStyles: Record<AccentColor, { border: string; tag: string; glow: string; impact: string }> = {
  warm:    { border: "rgba(232,165,75,0.2)",   tag: "rgba(232,165,75,0.12)", glow: "rgba(232,165,75,0.06)",    impact: "var(--color-warm)" },
  cool:    { border: "rgba(125,211,252,0.2)",   tag: "rgba(125,211,252,0.12)", glow: "rgba(125,211,252,0.06)", impact: "var(--color-cool)" },
  rose:    { border: "rgba(249,168,212,0.2)",   tag: "rgba(249,168,212,0.12)", glow: "rgba(249,168,212,0.06)", impact: "var(--color-rose)" },
  primary: { border: "rgba(124,58,237,0.25)",   tag: "rgba(124,58,237,0.12)", glow: "rgba(124,58,237,0.08)",   impact: "var(--color-primary-accent)" },
  green:   { border: "rgba(52,211,153,0.2)",    tag: "rgba(52,211,153,0.12)", glow: "rgba(52,211,153,0.06)",   impact: "#34d399" },
  orange:  { border: "rgba(251,146,60,0.2)",    tag: "rgba(251,146,60,0.12)", glow: "rgba(251,146,60,0.06)",   impact: "#fb923c" },
}

export default function WorkShowcase() {
  return (
    <section
      id="work"
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,243,239,0.08), transparent)" }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em] mb-5"
            style={{ color: "var(--color-warm)" }}
          >
            Client Work
          </p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="font-heading font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: "var(--text-section)", color: "var(--color-text-light)", maxWidth: "18ch" }}
            >
              Websites we&apos;ve shipped.
            </h2>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-dim)" }}
            >
              View all work
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                style={{ color: "var(--color-text-dim)" }}
              />
            </Link>
          </div>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-6">
          {websites.map((project, i) => {
            const style = accentStyles[project.accent]
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl overflow-hidden transition-all duration-300"
                style={{
                  border: `1px solid ${style.border}`,
                  backgroundColor: "var(--color-surface)",
                  boxShadow: "0 0 0 0 transparent",
                }}
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 80% at 0% 50%, ${style.glow}, transparent 60%)` }}
                  aria-hidden
                />

                <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 p-8 lg:p-10">
                  {/* Left: browser preview card */}
                  <div
                    className="shrink-0 w-full lg:w-[280px] h-48 rounded-2xl overflow-hidden border"
                    style={{ borderColor: "var(--color-border)", background: "var(--color-surface-elevated)" }}
                  >
                    {/* Browser chrome */}
                    <div
                      className="flex items-center gap-1.5 px-3 py-2.5 border-b"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                      <div
                        className="flex-1 mx-2 h-3.5 rounded-full flex items-center px-2"
                        style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                      >
                        <span className="text-[9px] truncate" style={{ color: "rgba(245,243,239,0.25)" }}>
                          {project.url.replace("https://", "")}
                        </span>
                      </div>
                    </div>
                    {/* Site preview image or gradient fallback */}
                    <div className="relative flex-1 h-36 overflow-hidden">
                      {project.previewImage ? (
                        <Image
                          src={project.previewImage}
                          alt={`${project.name} — site preview`}
                          fill
                          sizes="280px"
                          className="object-cover object-top"
                          unoptimized
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} p-4 space-y-2`}>
                          <div className="h-2.5 w-3/4 rounded-full bg-white/20" />
                          <div className="h-2 w-1/2 rounded-full bg-white/12" />
                          <div className="h-2 w-2/3 rounded-full bg-white/12" />
                          <div className="mt-3 h-16 w-full rounded-xl bg-white/8" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: project info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-6 flex-wrap">
                      <div>
                        <span
                          className="inline-flex text-[10px] font-semibold uppercase tracking-[0.2em] border rounded-full px-3 py-1"
                          style={{ backgroundColor: style.tag, borderColor: style.border, color: style.impact }}
                        >
                          {project.tag}
                        </span>
                        <h3
                          className="mt-3 font-heading font-bold tracking-tight"
                          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--color-text-light)" }}
                        >
                          {project.name}
                        </h3>
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link shrink-0 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: "var(--color-text-dim)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--color-cream)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-dim)")}
                      >
                        Visit site
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </div>

                    <p
                      className="mt-4 leading-relaxed max-w-xl"
                      style={{ color: "var(--color-text-muted)", fontSize: "var(--text-body)" }}
                    >
                      {project.summary}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                      <span style={{ color: "var(--color-cream)" }}>{project.impact}</span>
                    </div>
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
