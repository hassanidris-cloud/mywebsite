"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { projects } from "@/data/work";

export default function WorkPreview() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-24">
      {/* Decorative top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)]" aria-hidden />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Selected work
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Websites we&apos;ve built.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-white/65">
            From e-commerce and templates to immigration and visa platforms—proof of what we deliver.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/15 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/80">
                {project.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                {project.name}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/65">
                {project.summary}
              </p>
              <p className="mt-3 text-sm font-medium text-indigo-300/90">
                {project.impact}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-neutral-950 transition hover:scale-[1.02]"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
