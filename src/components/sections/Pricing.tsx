"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"

const tiers = [
  {
    name: "Launch",
    price: "£1,500",
    desc: "For smaller businesses that need a clean, high-converting online presence.",
    features: [
      "Up to 5 pages",
      "Premium responsive design",
      "Core SEO setup",
      "Contact / lead form",
      "Basic animations",
      "Launch support"
    ]
  },
  {
    name: "Growth",
    price: "£3,500",
    desc: "For brands ready to level up trust, messaging and lead generation.",
    featured: true,
    features: [
      "Up to 10 pages",
      "Conversion-focused wireframes",
      "Enhanced SEO structure",
      "Custom sections and CMS",
      "Higher-end interactions",
      "Analytics + tracking",
      "Priority revisions"
    ]
  },
  {
    name: "Signature",
    price: "£6,000+",
    desc: "For ambitious companies that want a flagship website experience.",
    features: [
      "Custom strategy workshop",
      "Advanced premium UI system",
      "Complex animations",
      "Custom landing pages",
      "Performance optimisation",
      "Deeper SEO structure",
      "Priority build process"
    ]
  }
]

const addons = [
  "Monthly support retainers",
  "Landing page funnels",
  "Booking / enquiry systems",
  "Copy refinement",
  "SEO content pages",
  "Email capture flows"
]

export default function Pricing() {
  return (
    <section className="bg-neutral-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-fuchsia-300/80">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Premium packages built around growth.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            Clear packages for different stages of business, from fast launches
            to custom flagship builds.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-[2rem] border p-8 ${
                tier.featured
                  ? "border-indigo-400/30 bg-gradient-to-b from-indigo-500/12 to-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {tier.featured && (
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Most popular
                </div>
              )}

              <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
                {tier.price}
              </p>
              <p className="mt-4 min-h-[72px] leading-7 text-white/60">{tier.desc}</p>

              <div className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-white/8 p-1">
                      <Check className="h-3.5 w-3.5 text-indigo-300" />
                    </div>
                    <p className="text-white/75">{feature}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/start-project"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3.5 font-medium transition ${
                  tier.featured
                    ? "bg-white text-neutral-950 hover:scale-[1.01]"
                    : "border border-white/12 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Choose {tier.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
                Add-ons
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Expand your website as you grow.
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-white/60">
                Need more than the base package? We can extend the project with
                growth-focused extras and ongoing support.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {addons.map((addon) => (
                <div
                  key={addon}
                  className="rounded-2xl border border-white/10 bg-neutral-900/60 px-4 py-4 text-white/75"
                >
                  {addon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
