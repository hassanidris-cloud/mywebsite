"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, LineChart } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-28 md:pt-36 min-h-[100vh]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.12),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.08),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent,rgba(255,255,255,0.02))]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Premium websites for ambitious brands
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-7xl md:leading-[1.02]"
          >
            We design websites that feel expensive and convert like sales teams.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/70 md:text-xl"
          >
            Velora Studio builds premium, high-performance websites for
            service businesses, personal brands and modern companies that want
            stronger positioning, better trust and more qualified leads.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-col gap-4 sm:flex-row justify-center"
          >
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-neutral-950 transition hover:scale-[1.02]"
            >
              Start your project
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
            >
              Explore pricing
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 grid max-w-2xl mx-auto grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { label: "Avg. launch time", value: "2–4 weeks" },
              { label: "Conversion-focused", value: "Every section" },
              { label: "Built for growth", value: "SEO + speed" }
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <p className="text-sm text-white/50">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/10 to-cyan-400/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-neutral-900/90 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-white/50">Velora Studio Preview</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    Premium Growth Website
                  </h3>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Live-ready
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/50">Conversion uplift</p>
                      <p className="mt-2 text-4xl font-semibold text-white">+38%</p>
                    </div>
                    <div className="rounded-xl bg-indigo-500/15 p-3">
                      <LineChart className="h-5 w-5 text-indigo-300" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    Stronger messaging, cleaner user journey and clearer calls to
                    action built into every page.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-fuchsia-500/15 p-3">
                        <Zap className="h-5 w-5 text-fuchsia-300" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Fast by default</p>
                        <p className="text-sm text-white/50">Modern stack, lighter pages</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-cyan-500/15 p-3">
                        <Sparkles className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Premium UI</p>
                        <p className="text-sm text-white/50">Motion, depth and polish</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-white/60">Launch system</p>
                    <p className="text-sm text-white">Strategy → Design → Build</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
