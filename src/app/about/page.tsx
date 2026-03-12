import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Layout, Shield, Target } from "lucide-react";

const performancePoints = [
  {
    icon: Zap,
    title: "Fast load times",
    desc: "Websites we build are optimized for speed—modern stack, lean assets, and sensible structure so visitors don’t wait.",
  },
  {
    icon: Layout,
    title: "Responsive & reliable",
    desc: "Your site works on phones, tablets, and desktops and stays stable so you can focus on your business, not the tech.",
  },
  {
    icon: Target,
    title: "Built to convert",
    desc: "Clear layout, trust-building sections, and one obvious next step so more visitors turn into leads and customers.",
  },
  {
    icon: Shield,
    title: "You own it",
    desc: "No lock-in. You get the site, clear documentation, and the option to update it yourself or come back to us when you need changes.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-neutral-950 px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            About us
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            A small studio, one focus.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/65">
            We don&apos;t do ads, branding, or apps—we focus on websites so we do them well.
            You get a fixed scope, a single point of contact, and a site that&apos;s fast and straightforward to update. Most projects are live within 6–8 weeks.
          </p>
          <p className="mt-5 max-w-2xl mx-auto text-base leading-8 text-white/55">
            No account managers, no scope creep, no retainer after launch. You own the site. We&apos;re here when you need changes.
          </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            How our websites perform
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            Every site we build is designed to load quickly, work on every device, and help you grow—without ongoing complexity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {performancePoints.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition hover:border-white/15 hover:bg-white/[0.06]"
              >
                <div className="rounded-xl bg-indigo-500/15 p-3 w-fit">
                  <Icon className="h-6 w-6 text-indigo-300" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-white/65">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
              Next step
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Ready to work with us?
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Tell us about your project or explore our process and pricing to see how we work.
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
              href="/process"
              className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
            >
              Our process
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
