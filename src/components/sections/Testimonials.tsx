"use client"

import { motion } from "framer-motion"
import { Star, Loader2, Quote } from "lucide-react"
import { useState, useTransition } from "react"
import { submitReview } from "@/app/actions/review"
import type { ReviewRow } from "@/lib/reviews"

type TestimonialsProps = {
  reviews?: ReviewRow[]
}

export default function Testimonials({ reviews = [] }: TestimonialsProps) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const displayItems = reviews.map((r) => ({
    quote: r.review,
    name: r.name,
    role: r.role ?? undefined,
  }))

  const [featured, ...rest] = displayItems

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const form = e.currentTarget
    const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value?.trim() ?? ""
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value?.trim() ?? ""
    const review = (form.querySelector('[name="review"]') as HTMLTextAreaElement)?.value?.trim() ?? ""
    const role = (form.querySelector('[name="role"]') as HTMLInputElement)?.value?.trim() ?? ""

    startTransition(async () => {
      const result = await submitReview({ name, email: email || undefined, review, role: role || undefined })
      if (result.ok) {
        setSuccess(true)
        form.reset()
      } else {
        setError(result.error ?? "Something went wrong.")
      }
    })
  }

  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,243,239,0.07), transparent)" }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em] mb-4"
            style={{ color: "var(--color-warm)" }}
          >
            Social Proof
          </p>
          <h2
            className="font-heading font-bold leading-[0.92] tracking-tight"
            style={{ fontSize: "var(--text-section)", color: "var(--color-text-light)", maxWidth: "20ch" }}
          >
            Premium design builds premium perception.
          </h2>
        </motion.div>

        {/* Testimonials layout */}
        {displayItems.length > 0 ? (
          <div className="space-y-5">
            {/* Featured large quote */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl p-8 lg:p-12 overflow-hidden"
                style={{
                  border: "1px solid var(--color-border-strong)",
                  backgroundColor: "var(--color-surface-elevated)",
                }}
              >
                {/* Background quote mark */}
                <Quote
                  className="absolute top-6 right-8 w-24 h-24 opacity-[0.04] pointer-events-none"
                  style={{ color: "var(--color-warm)" }}
                  aria-hidden
                />
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="w-4 h-4 fill-current" style={{ color: "var(--color-warm)" }} />
                  ))}
                </div>
                <blockquote
                  className="font-heading font-medium leading-snug mb-8"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--color-text-light)" }}
                >
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <footer>
                  <p className="font-semibold" style={{ color: "var(--color-cream)" }}>{featured.name}</p>
                  {featured.role && (
                    <p className="text-sm mt-0.5" style={{ color: "var(--color-text-dim)" }}>{featured.role}</p>
                  )}
                </footer>
              </motion.div>
            )}

            {/* Smaller grid of remaining */}
            {rest.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((item, i) => (
                  <motion.div
                    key={item.name + i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.1 }}
                    className="rounded-3xl p-7"
                    style={{
                      border: "1px solid var(--color-border)",
                      backgroundColor: "var(--color-surface-elevated)",
                    }}
                  >
                    <div className="flex gap-0.5 mb-4">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className="w-3.5 h-3.5 fill-current" style={{ color: "var(--color-warm)" }} />
                      ))}
                    </div>
                    <blockquote
                      className="leading-relaxed"
                      style={{ fontSize: "var(--text-body)", color: "var(--color-text-muted)" }}
                    >
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <footer className="mt-6">
                      <p className="text-sm font-semibold" style={{ color: "var(--color-cream)" }}>{item.name}</p>
                      {item.role && <p className="text-xs mt-0.5" style={{ color: "var(--color-text-dim)" }}>{item.role}</p>}
                    </footer>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* Write a review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-3xl p-8 md:p-10"
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface-elevated)",
          }}
        >
          <div className="mb-6">
            <h3
              className="font-heading font-bold text-xl"
              style={{ color: "var(--color-text-light)" }}
            >
              Share your experience.
            </h3>
            <p className="mt-1.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Had a great experience? Your review helps others and means a lot.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="review-name" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-muted)" }}>
                Your name *
              </label>
              <input
                id="review-name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: "var(--color-text-light)",
                }}
                placeholder="e.g. Sarah M."
              />
            </div>
            <div>
              <label htmlFor="review-email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-muted)" }}>
                Email (optional)
              </label>
              <input
                id="review-email"
                name="email"
                type="email"
                className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: "var(--color-text-light)",
                }}
                placeholder="you@example.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="review-role" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-muted)" }}>
                Role or company (optional)
              </label>
              <input
                id="review-role"
                name="role"
                type="text"
                className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: "var(--color-text-light)",
                }}
                placeholder="e.g. Creative Founder"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="review-text" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-muted)" }}>
                Your review *
              </label>
              <textarea
                id="review-text"
                name="review"
                required
                minLength={20}
                rows={4}
                className="w-full resize-none rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: "var(--color-text-light)",
                }}
                placeholder="Tell others about your experience working with Velora Studio..."
              />
              <p className="mt-1 text-xs" style={{ color: "var(--color-text-dim)" }}>At least 20 characters.</p>
            </div>

            {error && (
              <p className="sm:col-span-2 rounded-xl bg-red-500/15 px-4 py-2 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="sm:col-span-2 rounded-xl bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300" role="status">
                Thank you! Your review will appear after approval.
              </p>
            )}

            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all disabled:opacity-60"
                style={{ backgroundColor: "var(--color-cream)", color: "var(--color-ink)" }}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit review"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
