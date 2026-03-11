"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="bg-neutral-950 px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_25%),linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 md:p-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300/80">
              Ready to launch
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Let&apos;s build a website that feels premium and performs like it should.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              Better first impressions. Better trust. Better enquiries. Built
              around your offer, your positioning and your next stage of growth.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-neutral-950 transition hover:scale-[1.02]"
            >
              Start your project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-6 py-3.5 font-medium text-white hover:bg-white/10"
            >
              View packages
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
