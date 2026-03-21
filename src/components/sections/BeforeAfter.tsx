"use client"

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { beforeAfterItems, type BeforeAfterItem } from "@/data/before-after"

function MockBefore() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#e8e6e1] text-[#2d2a35] overflow-hidden min-h-full">
      <div className="h-9 shrink-0 flex items-center gap-1.5 px-3 border-b border-black/10 bg-[#dcd9d2]">
        <span className="h-2 w-2 rounded-full bg-red-400/90" />
        <span className="h-2 w-2 rounded-full bg-amber-400/90" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
      </div>
      <div className="flex-1 overflow-hidden p-3 sm:p-4 flex flex-col gap-2">
        <div className="h-10 rounded bg-gradient-to-r from-orange-400 via-pink-500 to-violet-600 opacity-90" />
        <div className="flex flex-wrap gap-1 text-[7px] sm:text-[8px] font-semibold uppercase tracking-tight leading-none">
          {["Home", "About", "Services", "More", "Blog", "Shop", "FAQ", "Contact"].map((t) => (
            <span key={t} className="px-1.5 py-0.5 rounded bg-black/10">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          <span className="text-[8px] px-2 py-1 rounded bg-blue-600 text-white">Click here!!!</span>
          <span className="text-[8px] px-2 py-1 rounded bg-red-600 text-white">Sale</span>
          <span className="text-[8px] px-2 py-1 rounded bg-green-600 text-white">Free quote</span>
        </div>
        <p className="text-[9px] sm:text-[10px] leading-snug text-black/70 line-clamp-4">
          Welcome to our website!!! We have been in business for many years providing quality services to
          customers just like you. Please read all of this text because it is very important information about
          our company history and values and mission statement.
        </p>
        <div className="grid grid-cols-3 gap-1 mt-auto">
          <div className="h-12 rounded bg-black/15" />
          <div className="h-12 rounded bg-black/15" />
          <div className="h-12 rounded bg-black/15" />
        </div>
      </div>
    </div>
  )
}

function MockAfter() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0a0912] text-[#f5f3ef] overflow-hidden min-h-full">
      <div className="h-9 shrink-0 flex items-center gap-1.5 px-3 border-b border-white/[0.08] bg-[#100f18]">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
      </div>
      <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 py-6 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--color-primary-accent)" }}
        />
        <p className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-warm)] mb-2">
          Your brand
        </p>
        <p className="font-heading font-bold text-lg sm:text-2xl leading-tight tracking-tight max-w-[14ch]">
          Clarity that converts.
        </p>
        <p className="mt-2 text-[9px] sm:text-[10px] text-white/55 max-w-[28ch] leading-relaxed">
          One message. One action. Built to earn trust at a glance.
        </p>
        <span
          className="mt-4 inline-flex w-fit text-[9px] font-semibold px-3 py-1.5 rounded-lg text-white"
          style={{ background: "var(--color-primary)" }}
        >
          Start your project
        </span>
      </div>
    </div>
  )
}

function ComparisonSlider({ item }: { item: BeforeAfterItem }) {
  const [pos, setPos] = useState(0.5)
  const dragging = useRef(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - r.left, 0), r.width)
    setPos(x / r.width)
  }, [])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragging.current = true
    trackRef.current?.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    setFromClientX(e.clientX)
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false
    try {
      trackRef.current?.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  const pct = Math.round(pos * 100)
  const pctFrac = Math.max(pos, 0.02)
  const innerWidthPct = 100 / pctFrac

  const hasBeforeImage = Boolean(item.beforeSrc)
  const hasAfterImage = Boolean(item.afterSrc)

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={`Before and after comparison: ${item.title}. Drag to compare.`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 0.05))
          if (e.key === "ArrowRight") setPos((p) => Math.min(1, p + 0.05))
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border cursor-ew-resize select-none touch-none"
        style={{ borderColor: "var(--color-border-strong)" }}
      >
        {/* After (full background) */}
        <div className="absolute inset-0 z-0">
          {hasAfterImage ? (
            <Image
              src={item.afterSrc!}
              alt={item.afterAlt ?? `${item.title} — after redesign`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          ) : (
            <MockAfter />
          )}
        </div>

        {/* Before (clipped from left; inner wider so image/mock aligns with full frame) */}
        <div
          className="absolute inset-y-0 left-0 z-[1] overflow-hidden border-r border-white/25"
          style={{ width: `${pct}%` }}
        >
          <div className="relative h-full" style={{ width: `${innerWidthPct}%` }}>
            {hasBeforeImage ? (
              <Image
                src={item.beforeSrc!}
                alt={item.beforeAlt ?? `${item.title} — before redesign`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            ) : (
              <MockBefore />
            )}
          </div>
        </div>

        {/* Labels */}
        <span
          className="absolute top-3 left-3 z-[2] text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/55 text-white backdrop-blur-sm pointer-events-none"
          style={{ opacity: pct > 12 ? 1 : 0.35 }}
        >
          Before
        </span>
        <span className="absolute top-3 right-3 z-[2] text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/55 text-white backdrop-blur-sm pointer-events-none">
          After
        </span>

        {/* Handle */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 z-[3] w-0 -translate-x-1/2 flex flex-col items-center justify-center"
          style={{ left: `${pct}%` }}
        >
          <div
            className="pointer-events-auto h-14 w-8 rounded-full border-2 shadow-lg flex items-center justify-center bg-[var(--color-surface-elevated)] cursor-ew-resize"
            style={{ borderColor: "var(--color-border-strong)" }}
          >
            <span className="flex gap-0.5" aria-hidden>
              <span className="w-0.5 h-4 rounded-full bg-white/40" />
              <span className="w-0.5 h-4 rounded-full bg-white/40" />
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-[var(--color-text-dim)]">
        Drag the slider — or use ← → keys when focused — to compare.
      </p>
    </div>
  )
}

export default function BeforeAfter() {
  const item = beforeAfterItems[0]!

  return (
    <section
      id="before-after"
      className="relative overflow-hidden px-6 py-24 sm:py-28"
      style={{ backgroundColor: "var(--color-base-elevated)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,243,239,0.08), transparent)" }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <p
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] mb-5"
            style={{ color: "var(--color-cool)" }}
          >
            <Sparkles className="w-4 h-4 opacity-80" aria-hidden />
            Before &amp; after
          </p>
          <h2
            className="font-heading font-bold leading-[0.95] tracking-tight"
            style={{ fontSize: "var(--text-section)", color: "var(--color-text-light)" }}
          >
            See the difference we make.
          </h2>
          <p className="mt-5 text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
            Generic templates and cluttered pages quietly cost you leads. We replace noise with structure,
            hierarchy, and a single clear story — so visitors understand you in seconds, not minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ComparisonSlider item={item} />
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-14 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center sm:text-left"
        >
          {item.highlights.map((h) => (
            <li
              key={h.title}
              className="rounded-2xl border px-5 py-5"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface-card)",
              }}
            >
              <p className="font-heading font-semibold text-[var(--color-text-light)]">{h.title}</p>
              <p className="mt-2 text-sm text-[var(--color-text-dim)] leading-relaxed">{h.body}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
