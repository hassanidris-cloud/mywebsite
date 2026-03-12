"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const EMAIL = "hello@velorastudio.com";
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_COM_URL || "";

const socialLinks = [
  { label: "Twitter", href: process.env.NEXT_PUBLIC_TWITTER_URL },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { label: "GitHub", href: process.env.NEXT_PUBLIC_GITHUB_URL },
].filter((item): item is { label: string; href: string } => Boolean(item.href));

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 pb-24 pt-32 text-white overflow-x-hidden" id="main-content" role="main">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Contact
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            Get in touch
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/65">
            Reach out for project inquiries, quotes, or a quick chat. We usually reply within 24 hours.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10"
        >
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/50">Email</p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 block text-xl font-semibold text-white transition hover:text-indigo-300"
              >
                {EMAIL}
              </a>
            </div>

            {socialLinks.length > 0 && (
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/50">Social</p>
                <ul className="mt-3 flex flex-wrap gap-4">
                  {socialLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/75 transition hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-6 border-t border-white/10">
              <p className="text-white/65 text-sm mb-4">
                Prefer to send a project brief? Use the form below and we&apos;ll get back with a tailored proposal.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/start-project"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-neutral-950 transition hover:scale-[1.02]"
                >
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {CALENDLY_URL && (
                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
                  >
                    Book a free call
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
              Next step
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Ready to start your project?
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Tell us about your goals and we&apos;ll get back with a clear quote and next steps.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col justify-center lg:justify-start">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-neutral-950 transition hover:scale-[1.02]"
            >
              Start your project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
