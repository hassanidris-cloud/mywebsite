"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "Velora completely changed how our brand felt online. The new site looks premium, explains our offer clearly and gets far better enquiries.",
    name: "Sophie M.",
    role: "Creative Founder"
  },
  {
    quote:
      "The site feels sharper, faster and far more trustworthy. Visitors spend longer on the page and our leads are noticeably better.",
    name: "Daniel R.",
    role: "Consulting Business Owner"
  },
  {
    quote:
      "We wanted something that looked high-end without feeling generic. The final result felt custom, polished and built to sell.",
    name: "Aisha K.",
    role: "Service Brand Director"
  }
]

export default function Testimonials() {
  return (
    <section className="bg-neutral-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
            Social proof
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Premium design builds premium perception.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
            >
              <p className="text-lg leading-8 text-white/75">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-8">
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-sm text-white/50">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
