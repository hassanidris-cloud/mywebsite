"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, LineChart } from "lucide-react"

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

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white/90 backdrop-blur-md shadow-lg shadow-black/10"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            Welcome — we&apos;re glad you&apos;re here
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-8 text-5xl font-semibold tracking-tight text-white md:text-7xl md:leading-[1.02]"
          >
            Websites that feel like home for your brand.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/75 md:text-xl"
          >
            We design and build sites that are a joy to use — clear, fast, and built to turn visitors into believers. Let&apos;s create something you&apos;ll love.
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
            custom={4}
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
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/10 to-amber-500/15 blur-3xl" />

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
