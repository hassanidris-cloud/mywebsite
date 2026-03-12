"use client";

import { motion } from "framer-motion";
import {
  LayoutTemplate,
  Rocket,
  Search,
  Smartphone,
  PenSquare,
  BarChart3,
} from "lucide-react";

const items = [
  {
    icon: LayoutTemplate,
    title: "Premium design systems",
    desc: "A cleaner visual identity with stronger hierarchy, spacing, typography and trust-building layouts.",
  },
  {
    icon: Rocket,
    title: "Fast modern builds",
    desc: "Built with a modern stack for speed, responsiveness and a smoother user experience across devices.",
  },
  {
    icon: Search,
    title: "SEO-ready structure",
    desc: "Clear page architecture, semantic content and on-page foundations that support discoverability.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first UX",
    desc: "Designed to feel sharp, fast and intuitive on mobile where most first impressions happen.",
  },
  {
    icon: PenSquare,
    title: "Messaging that sells",
    desc: "Sharper copy layout and section flow that makes your offer easier to understand and trust.",
  },
  {
    icon: BarChart3,
    title: "Built for conversion",
    desc: "Every section has a purpose: attract attention, increase credibility, reduce friction and drive action.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-24">
      {/* Decorative background art */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/8 blur-[100px]" />
        <div className="absolute -right-[15%] top-[40%] h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[80px]" />
        <div className="absolute bottom-[5%] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/5 blur-[90px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[20%] h-2 w-2 rounded-full bg-indigo-400/50"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[25%] left-[15%] h-3 w-3 rounded-full border border-indigo-400/40"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[25%] bottom-[15%] h-4 w-4 rounded-full bg-cyan-400/30"
        />
        {/* Soft arc */}
        <svg
          className="absolute right-0 top-1/2 w-64 -translate-y-1/2 opacity-[0.06]"
          viewBox="0 0 200 400"
          fill="none"
        >
          <path
            d="M0 200 Q100 50 200 200 Q100 350 0 200"
            stroke="url(#featureArc)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="featureArc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <div className="absolute -left-4 top-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl" />
          <p className="relative text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
            Features
          </p>
          <h2 className="relative mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            A premium website should do more than look good.
          </h2>
          <p className="relative mt-5 text-lg leading-8 text-white/65">
            It should position your brand, communicate value instantly and
            guide people toward the next step without friction.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-px rounded-[1.5rem] bg-gradient-to-b from-indigo-400/20 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors group-hover:border-white/15">
                  {/* Card glow */}
                  <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-indigo-400/10 blur-2xl transition-opacity duration-300 group-hover:bg-indigo-400/20" />

                  <motion.div
                    className="relative inline-flex rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 p-3 ring-1 ring-white/5"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon className="h-6 w-6 text-indigo-300 transition-colors group-hover:text-indigo-200" />
                  </motion.div>

                  <h3 className="relative mt-5 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="relative mt-3 leading-7 text-white/60">
                    {item.desc}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-400/0 via-indigo-400/50 to-indigo-400/0"
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 + 0.2 }}
                    style={{ originX: 0 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
