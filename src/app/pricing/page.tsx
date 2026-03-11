import Pricing from "@/components/sections/Pricing"
import CTA from "@/components/sections/CTA"

export default function PricingPage() {
  return (
    <main className="bg-neutral-950 pt-24">
      <section className="px-6 pb-8 pt-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
            Velora Pricing
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-6xl">
            Clear packages for modern premium websites.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Whether you need a fast launch, a stronger growth asset or a full
            flagship experience, each package is designed to elevate your
            positioning and improve conversion.
          </p>
        </div>
      </section>

      <Pricing />
      <CTA />
    </main>
  )
}
