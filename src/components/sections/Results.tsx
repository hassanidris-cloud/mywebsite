"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "+38%", label: "Average lift in lead quality" },
  { value: "2–4w", label: "Typical launch timeline" },
  { value: "90+", label: "Performance-focused approach" },
  { value: "24/7", label: "Your website selling for you" }
]

export default function Results() {
  return (
    <section className="bg-neutral-950 px-6 pb-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300/80">
              Results-driven
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Designed to improve clarity, trust and conversion.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              Premium websites are not just aesthetics. They reduce confusion,
              elevate perception and help more visitors become enquiries,
              clients and customers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6"
              >
                <p className="text-3xl font-semibold text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
