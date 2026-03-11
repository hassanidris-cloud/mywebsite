"use client"

import { motion } from "framer-motion"
import {
  LayoutTemplate,
  Rocket,
  Search,
  Smartphone,
  PenSquare,
  BarChart3
} from "lucide-react"

const items = [
  {
    icon: LayoutTemplate,
    title: "Premium design systems",
    desc: "A cleaner visual identity with stronger hierarchy, spacing, typography and trust-building layouts."
  },
  {
    icon: Rocket,
    title: "Fast modern builds",
    desc: "Built with a modern stack for speed, responsiveness and a smoother user experience across devices."
  },
  {
    icon: Search,
    title: "SEO-ready structure",
    desc: "Clear page architecture, semantic content and on-page foundations that support discoverability."
  },
  {
    icon: Smartphone,
    title: "Mobile-first UX",
    desc: "Designed to feel sharp, fast and intuitive on mobile where most first impressions happen."
  },
  {
    icon: PenSquare,
    title: "Messaging that sells",
    desc: "Sharper copy layout and section flow that makes your offer easier to understand and trust."
  },
  {
    icon: BarChart3,
    title: "Built for conversion",
    desc: "Every section has a purpose: attract attention, increase credibility, reduce friction and drive action."
  }
]

export default function FeatureGrid() {
  return (
    <section className="bg-neutral-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
            Features
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            A premium website should do more than look good.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            It should position your brand, communicate value instantly and
            guide people toward the next step without friction.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
              >
                <div className="inline-flex rounded-2xl bg-white/6 p-3">
                  <Icon className="h-6 w-6 text-indigo-300" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-white/60">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
