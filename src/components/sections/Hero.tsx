"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowDown } from "lucide-react"
import { websites, templates } from "@/data/work"
import Button from "@/components/ui/Button"
import VideoBackground from "@/components/VideoBackground"
import { getEffectiveCustomBasePriceEur } from "@/data/pricing"

// ── Rotating headline words ────────────────────────────────────────────────
const WORDS = ["websites", "experiences", "stories", "platforms", "products"]

// ── Preview cards for the floating mosaic ─────────────────────────────────
const previewCards = [
  { name: websites[0].name, category: websites[0].category, gradient: websites[0].gradient, url: websites[0].url, previewImage: websites[0].previewImage, x: "5%",  top: "2%",  rotate: -2.5, delay: 0.55, parallaxSpeed: 0.4 },
  { name: templates[0].name, category: templates[0].category, gradient: templates[0].gradient, url: templates[0].url, previewImage: templates[0].previewImage, x: "42%", top: "10%", rotate: 2.8,  delay: 0.7,  parallaxSpeed: 0.7 },
  { name: templates[1].name, category: templates[1].category, gradient: templates[1].gradient, url: "#templates",    previewImage: templates[1].previewImage, x: "18%", top: "56%", rotate: -1.5, delay: 0.85, parallaxSpeed: 0.55 },
  { name: templates[2].name, category: templates[2].category, gradient: templates[2].gradient, url: "#templates",    previewImage: templates[2].previewImage, x: "54%", top: "62%", rotate: 3.2,  delay: 1.0,  parallaxSpeed: 0.65 },
]

// ── Shared easing ──────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const textY   = useTransform(scrollYProgress, [0, 1], [0, -80])

  // ── Word rotation ──────────────────────────────────────────────────────
  const [wordIndex, setWordIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setWordIndex((i) => (i + 1) % WORDS.length)
      }, 2800)
    }, 2000) // wait for initial reveal to complete

    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center pt-24 pb-20"
    >
      {/* ── Background: video (with overlay) + subtle mesh ────────────── */}
      <VideoBackground contained />
      <div
        className="absolute inset-0 bg-mesh bg-grid-animated pointer-events-none opacity-40"
        aria-hidden
      />
      <div className="bg-orbs absolute inset-0 pointer-events-none" aria-hidden />

      {/* Extra bottom-left halo */}
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
        }}
      />

      {/* ── Decorative "V" monogram ───────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          right: "-6%",
          top: "50%",
          transform: "translateY(-52%)",
          fontSize: "min(60vw, 720px)",
          fontFamily: "var(--font-heading), sans-serif",
          fontWeight: 800,
          color: "rgba(124,58,237,0.028)",
          lineHeight: 1,
          letterSpacing: "-0.06em",
          zIndex: 0,
        }}
      >
        V
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-20 items-center">

        {/* ── Vertical editorial label ─────────────────────────────────── */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute left-0 top-1/2 hidden xl:block pointer-events-none select-none"
          style={{
            writingMode: "vertical-rl",
            transform: "translateY(-50%) rotate(180deg)",
            fontSize: "10px",
            letterSpacing: "0.38em",
            color: "var(--color-text-dim)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            opacity: 0.55,
          }}
        >
          Est. 2024 · Velora Studio
        </motion.div>

        {/* ── Left: text content ──────────────────────────────────────── */}
        <motion.div
          style={{ opacity, y: textY }}
          initial="hidden"
          animate="show"
          className="z-10 max-w-2xl"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.28em] mb-6"
            style={{ color: "var(--color-warm)" }}
          >
            Velora Studio · Web Design
          </motion.p>

          {/* ── Headline with split-word reveal ── */}
          <h1
            className="font-heading font-bold tracking-tight"
            style={{ fontSize: "var(--text-hero)", lineHeight: "0.92" }}
          >
            {/* Line 0: brand in H1 for branded search (Velora Studio, velorastudio, etc.) */}
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
                style={{
                  display: "block",
                  fontSize: "clamp(1.75rem, 4.2vw, 3rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--color-cream)",
                }}
              >
                Velora Studio
              </motion.span>
            </span>

            {/* Line 1: "We build" */}
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.36, ease: EASE }}
                style={{ display: "block", color: "var(--color-text-light)" }}
              >
                We build
              </motion.span>
            </span>

            {/* Line 2: rotating gradient word */}
            <span
              style={{
                display: "block",
                overflow: "hidden",
                paddingBottom: "0.1em",
                minHeight: "1.05em",
              }}
            >
              <AnimatePresence mode="wait" initial>
                <motion.span
                  key={WORDS[wordIndex]}
                  className="gradient-text"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: wordIndex === 0 ? 0.9 : 0.55, delay: wordIndex === 0 ? 0.49 : 0, ease: EASE }}
                  style={{ display: "block" }}
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>

            {/* Line 3: "that feel" */}
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
                style={{ display: "block", color: "var(--color-text-light)" }}
              >
                that feel
              </motion.span>
            </span>

            {/* Line 4: "different." */}
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
                style={{ display: "block", color: "var(--color-text-light)" }}
              >
                different.
              </motion.span>
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.06, ease: EASE }}
            className="mt-8 max-w-md leading-relaxed"
            style={{ fontSize: "var(--text-body)", color: "var(--color-text-muted)" }}
          >
            Premium, conversion-focused design.{" "}
            <span style={{ color: "var(--color-cream)", fontWeight: 600 }}>Starting from €{getEffectiveCustomBasePriceEur()}</span>
            {" "}— built around your brand, your audience, and your growth goals.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="/start-project" size="lg">
              Start your project <ArrowRight className="w-4 h-4 ml-1.5 inline" />
            </Button>
            <Button href="#work" variant="secondary" size="lg">
              See our work
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4"
          >
            {[
              { value: "2–4w",  label: "Avg. delivery" },
              { value: `€${getEffectiveCustomBasePriceEur()}`,  label: "Starting from" },
              { value: "100%",  label: "Custom design" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="font-heading font-bold text-2xl"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs uppercase tracking-widest mt-0.5"
                  style={{ color: "var(--color-text-dim)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-14 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" style={{ color: "var(--color-text-dim)" }} />
            </motion.div>
            <span
              className="text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--color-text-dim)" }}
            >
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right: floating card mosaic ─────────────────────────────── */}
        <div className="relative h-[560px] hidden lg:block">
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl blur-3xl -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(124,58,237,0.07), transparent)",
            }}
          />

          {previewCards.map((card, i) => (
            <ParallaxCard key={card.name} card={card} scrollY={scrollYProgress} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Floating parallax card ─────────────────────────────────────────────────
function ParallaxCard({
  card,
  scrollY,
  index,
}: {
  card: (typeof previewCards)[number]
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"]
  index: number
}) {
  const yRange = useTransform(
    scrollY,
    [0, 1],
    [0, -(60 + index * 20) * card.parallaxSpeed]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        left: card.x,
        top: card.top,
        width: 220,
        rotate: card.rotate,
        y: yRange,
      }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
    >
      <Link
        href={card.url}
        className="block rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-1.5 px-3 py-2.5 border-b"
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="w-2 h-2 rounded-full bg-red-400/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
          <div className="w-2 h-2 rounded-full bg-green-400/60" />
          <div
            className="flex-1 mx-2 h-3 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <div
              className="h-full w-3/4 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            />
          </div>
        </div>

        {/* Preview image or gradient fallback */}
        <div className={`h-36 relative overflow-hidden ${!card.previewImage ? `bg-gradient-to-br ${card.gradient}` : ""}`}>
          {card.previewImage ? (
            <Image
              src={card.previewImage}
              alt={`${card.name} — preview`}
              fill
              sizes="220px"
              className="object-cover object-top"
              unoptimized={card.previewImage.startsWith("http")}
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} p-3 space-y-2 opacity-60`}>
              <div className="h-2 w-3/4 rounded-full bg-white/20" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/12" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/12" />
              <div className="mt-3 h-14 w-full rounded-xl bg-white/8" />
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="px-4 py-3">
          <p
            className="text-[9px] uppercase tracking-[0.22em]"
            style={{ color: "var(--color-text-dim)" }}
          >
            {card.category}
          </p>
          <p
            className="text-xs font-semibold mt-0.5"
            style={{ color: "var(--color-text-light)" }}
          >
            {card.name}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
