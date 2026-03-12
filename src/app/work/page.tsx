import Link from "next/link"
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import { projects } from "@/data/work"

export default function WorkPage() {
  return (
    <main className="bg-neutral-950 px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Selected work
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            Websites we&apos;ve built.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/65">
            From grocery and e-commerce templates to immigration and visa platforms—
            here&apos;s a selection of recent work.
          </p>
        </div>

        <div className="mt-14 grid gap-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
            >
              <div className="grid gap-0 lg:grid-cols-[1.15fr_.85fr]">
                <div className="min-h-[280px] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_26%),linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 md:p-10">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    Case Study 0{index + 1}
                  </div>
                  <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                    {project.name}
                  </h2>
                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-cyan-300/75">
                    {project.category}
                  </p>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                    {project.summary}
                  </p>
                </div>
                <div className="flex flex-col justify-between border-t border-white/10 p-8 lg:border-l lg:border-t-0 md:p-10">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
                      Outcome
                    </p>
                    <p className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                      {project.impact}
                    </p>
                    <p className="mt-5 leading-8 text-white/60">
                      {project.outcome}
                    </p>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                      >
                        View live site
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <Link
                      href="/start-project"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                    >
                      Build something similar
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.14),transparent_28%),linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300/80">
              Your project
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Your website can become your strongest sales asset.
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-white/65">
              Let&apos;s turn your current site into something sharper, clearer
              and significantly more persuasive.
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
