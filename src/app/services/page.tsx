import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ServicesSection from "./ServicesSection";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Velora Studio services: premium website design and development, responsive builds, SEO-ready structure, conversion-focused pages. One clear package, fixed scope.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: { url: `${SITE_URL}/services`, title: "Services | Velora Studio", siteName: "Velora Studio" },
};

export default function ServicesPage() {
  return (
    <main className="bg-neutral-950 px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            What we do
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            Services that get you a real website.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/65">
            We design and build websites that look premium and perform. One clear package:
            responsive design, homepage, contact form, deployment, and basic optimization.
          </p>
        </div>

        <ServicesSection />
      </section>

      <section className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),linear-gradient(to_bottom_right,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
              Next step
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Ready to get your website?
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Tell us about your project and we&apos;ll get back with a clear quote. Or explore pricing to see the base package and how it works.
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
