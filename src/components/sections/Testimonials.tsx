"use client";

import { motion } from "framer-motion";
import { Star, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { submitReview } from "@/app/actions/review";
import type { ReviewRow } from "@/lib/reviews";

type TestimonialsProps = {
  reviews?: ReviewRow[];
};

export default function Testimonials({ reviews = [] }: TestimonialsProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const displayItems = reviews.map((r) => ({
    quote: r.review,
    name: r.name,
    role: r.role ?? undefined,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const form = e.currentTarget;
    const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value?.trim() ?? "";
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value?.trim() ?? "";
    const review = (form.querySelector('[name="review"]') as HTMLTextAreaElement)?.value?.trim() ?? "";
    const role = (form.querySelector('[name="role"]') as HTMLInputElement)?.value?.trim() ?? "";

    startTransition(async () => {
      const result = await submitReview({ name, email: email || undefined, review, role: role || undefined });
      if (result.ok) {
        setSuccess(true);
        form.reset();
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    });
  };

  return (
    <section className="bg-neutral-950 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
            Social proof
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Premium design builds premium perception.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            See what clients say about working with Velora — or share your own experience.
          </p>
        </div>

        {displayItems.length > 0 && (
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {displayItems.map((item, i) => (
              <motion.div
                key={item.name + i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
              >
                <div className="mb-4 flex gap-0.5 text-amber-400/80">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg leading-8 text-white/75">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-8">
                  <p className="font-medium text-white">{item.name}</p>
                  {item.role && <p className="text-sm text-white/50">{item.role}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Write a review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10"
        >
          <h3 className="text-xl font-semibold text-white">Write a review</h3>
          <p className="mt-2 text-white/60">
            Had a great experience? Your review helps others and means a lot.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="review-name" className="block text-sm font-medium text-white/80">
                Your name *
              </label>
              <input
                id="review-name"
                name="name"
                type="text"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                placeholder="e.g. Sarah M."
              />
            </div>
            <div>
              <label htmlFor="review-email" className="block text-sm font-medium text-white/80">
                Email (optional)
              </label>
              <input
                id="review-email"
                name="email"
                type="email"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                placeholder="you@example.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="review-role" className="block text-sm font-medium text-white/80">
                Role or company (optional)
              </label>
              <input
                id="review-role"
                name="role"
                type="text"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                placeholder="e.g. Creative Founder"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="review-text" className="block text-sm font-medium text-white/80">
                Your review *
              </label>
              <textarea
                id="review-text"
                name="review"
                required
                minLength={20}
                rows={4}
                className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                placeholder="Tell others about your experience working with Velora Studio..."
              />
              <p className="mt-1 text-xs text-white/50">At least 20 characters.</p>
            </div>
            {error && (
              <p className="sm:col-span-2 rounded-xl bg-red-500/15 px-4 py-2 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="sm:col-span-2 rounded-xl bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300" role="status">
                Thank you! Your review has been submitted and will appear after approval.
              </p>
            )}
            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-neutral-950 transition disabled:opacity-70"
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
  );
}
