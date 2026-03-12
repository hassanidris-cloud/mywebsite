"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, LineChart } from "lucide-react"
import VideoBackground from "@/components/VideoBackground"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-28 md:pt-36 min-h-[100vh]">
      <VideoBackground contained />
      {/* Mesmerizing ambient orbs — slow, soft movement */}
      <motion.div
        className="absolute -z-10 h-[600px] w-[600px] rounded-full bg-indigo-500/20 blur-[120px]"
        style={{ left: "10%", top: "20%" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -z-10 h-[500px] w-[500px] rounded-full bg-fuchsia-500/15 blur-[100px]"
        style={{ right: "5%", top: "40%" }}
        animate={{ x: [0, -25, 0], y: [0, 15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -z-10 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[90px]"
        style={{ left: "50%", bottom: "10%", transform: "translateX(-50%)" }}
        animate={{ y: [0, 25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.06),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent,rgba(255,255,255,0.03))]" />

      {/* Decorative curve under headline area */}
      <svg className="absolute left-1/2 top-[42%] -z-10 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 opacity-30" viewBox="0 0 400 80" fill="none" aria-hidden>
        <defs>
          <linearGradient id="heroCurve" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="rgba(167,139,250,0.4)" />
            <stop offset="50%" stopColor="rgba(251,191,36,0.35)" />
            <stop offset="80%" stopColor="rgba(167,139,250,0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M0 40 Q100 10 200 40 T400 40" stroke="url(#heroCurve)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>

      {/* Floating particles — gentle art */}
      {[
        { x: "15%", y: "25%", size: 2, delay: 0, dur: 8 },
        { x: "88%", y: "30%", size: 1.5, delay: 1, dur: 10 },
        { x: "72%", y: "75%", size: 2.5, delay: 2, dur: 9 },
        { x: "8%", y: "70%", size: 1, delay: 0.5, dur: 11 },
        { x: "50%", y: "15%", size: 1.5, delay: 1.5, dur: 7 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute -z-10 rounded-full bg-white/20"
          style={{ left: p.x, top: p.y, width: p.size * 4, height: p.size * 4 }}
          animate={{
            y: [0, -15, 0],
            x: [0, 8, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          aria-hidden
        />
      ))}

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mt-8 text-5xl font-semibold tracking-tight text-white md:text-7xl md:leading-[1.02] drop-shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
          >
            Websites that feel like home for your brand.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/75 md:text-xl"
          >
            We design and build sites that are a joy to use — clear, fast, and built to turn visitors into believers. Let&apos;s create something you&apos;ll love.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-10 flex flex-col gap-4 sm:flex-row justify-center"
          >
            <Link
              href="/start-project"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-neutral-950 shadow-lg shadow-white/10 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-white/15"
            >
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-medium text-white/90 transition hover:bg-white/10 hover:border-white/30"
            >
              Explore pricing
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-14 grid max-w-2xl mx-auto grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { label: "Friendly timeline", value: "2–4 weeks" },
              { label: "Built for you", value: "Every detail" },
              { label: "Grow with you", value: "SEO + speed" }
            ].map((item) => (
              <motion.div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md"
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <p className="text-sm text-white/55">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[2.25rem] bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/15 to-cyan-500/20 blur-3xl opacity-90" />
          <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" aria-hidden />

          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/20 bg-white/[0.08] p-[1px] shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-[2rem] border border-white/10 bg-neutral-900/95 p-6">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 ring-1 ring-white/10">
                    <LineChart className="h-5 w-5 text-white/90" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/40">Preview</p>
                    <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-white">
                      Premium Growth Website
                    </h3>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3 py-1.5 text-xs font-medium text-emerald-300 shadow-[0_0_20px_-5px_rgba(52,211,153,0.3)]">
                  Live-ready
                </span>
              </div>

              <div className="mt-6 grid gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-white/5 to-fuchsia-500/5 p-5 ring-1 ring-white/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-white/45">Conversion uplift</p>
                      <p className="mt-2 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                        +38%
                      </p>
                    </div>
                    <div className="rounded-xl bg-indigo-500/20 p-3 ring-1 ring-indigo-400/20">
                      <LineChart className="h-5 w-5 text-indigo-300" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/55">
                    Stronger messaging, cleaner user journey and clearer calls to action built into every page.
                  </p>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/15 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-fuchsia-500/20 p-2.5 ring-1 ring-fuchsia-400/20 transition group-hover:bg-fuchsia-500/25">
                        <Zap className="h-5 w-5 text-fuchsia-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Fast by default</p>
                        <p className="text-xs text-white/50">Modern stack, lighter pages</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/15 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-cyan-500/20 p-2.5 ring-1 ring-cyan-400/20 transition group-hover:bg-cyan-500/25">
                        <Sparkles className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Premium UI</p>
                        <p className="text-xs text-white/50">Motion, depth and polish</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/60">Launch system</p>
                    <p className="text-xs font-medium text-white/80">Strategy → Design → Build</p>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 shadow-[0_0_12px_-2px_rgba(167,139,250,0.5)]"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
