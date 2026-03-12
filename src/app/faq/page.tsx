import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import FAQAccordion from "@/components/sections/FAQAccordion"

export default function FAQPage() {
  return (
    <main className="bg-neutral-950 px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            FAQ
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            Questions about working with Velora Studio.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
            A few of the most common questions about timelines, process, support
            and what to expect from a premium website project.
          </p>
        </div>

        <div className="mt-14">
          <FAQAccordion />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_28%),linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
              Still deciding
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Let&apos;s talk about the right website direction for your brand.
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-white/65">
              Whether you need a redesign, a fresh launch or something more
              premium than your current site, the next step starts here.
            </p>
          </div>
          <Link
            href="/start-project"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-neutral-950 transition hover:scale-[1.02]"
          >
            Start your project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
