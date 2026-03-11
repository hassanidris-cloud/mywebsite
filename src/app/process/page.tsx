import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Strategy",
    desc: "We define your offer, audience, goals and positioning so the website has a clear job to do."
  },
  {
    number: "02",
    title: "Structure",
    desc: "We shape page flow, messaging hierarchy and section order to reduce friction and improve clarity."
  },
  {
    number: "03",
    title: "Design",
    desc: "We craft a premium visual system with stronger typography, spacing, depth and motion."
  },
  {
    number: "04",
    title: "Build",
    desc: "Your website is developed with speed, responsiveness and a polished user experience in mind."
  },
  {
    number: "05",
    title: "Refine",
    desc: "We improve details, tighten the experience and align the final result to your brand direction."
  },
  {
    number: "06",
    title: "Launch",
    desc: "Once ready, the site goes live as a sharper, more valuable asset for your business."
  }
]

export default function ProcessPage() {
  return (
    <main className="bg-neutral-950 px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Our process
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            A premium website process built around clarity and growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Good websites do not happen by accident. A clear process creates a
            stronger result, smoother collaboration and a more intentional final
            product.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
            >
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300/80">
                {step.number}
              </div>
              <h2 className="mt-4 text-2xl font-semibold">{step.title}</h2>
              <p className="mt-4 leading-7 text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300/80">
              Why it works
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Better structure leads to better performance.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              When messaging, design and development are connected from the
              beginning, the final website feels sharper, more trustworthy and
              much easier for visitors to act on.
            </p>
          </div>
          <div className="space-y-4">
            {[
              "Clearer user journey",
              "Stronger trust signals",
              "Higher-end brand perception",
              "More intentional page structure",
              "Better conversion opportunities",
              "Smoother launch process"
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-4 text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
              Ready to begin
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Let&apos;s turn your next website into a serious business asset.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              Strategy first. Premium execution. Better outcomes.
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
