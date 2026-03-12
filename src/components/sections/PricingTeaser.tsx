"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MODULAR_BASE_PRICE_EUR } from "@/data/pricing";

export default function PricingTeaser() {
  return (
    <section className="bg-neutral-950 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_0_50px_-15px_rgba(99,102,241,0.12)] md:p-10"
      >
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
          Pricing
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Transparent pricing that grows with you.
        </h2>
        <p className="mt-5 text-lg leading-8 text-white/65">
          Base website from €{MODULAR_BASE_PRICE_EUR}. Add only what you need—no surprises.
          See full packages and get a quote on the pricing page.
        </p>
        <Link
          href="/pricing"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-neutral-950 transition hover:scale-[1.02]"
        >
          View full pricing
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
