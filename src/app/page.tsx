import Hero from "@/components/sections/Hero"
import FeatureGrid from "@/components/sections/FeatureGrid"
import Results from "@/components/sections/Results"
import Pricing from "@/components/sections/Pricing"
import Testimonials from "@/components/sections/Testimonials"
import CTA from "@/components/sections/CTA"

export default function Home() {
  return (
    <main className="bg-neutral-950">
      <Hero />
      <FeatureGrid />
      <Results />
      <Pricing />
      <Testimonials />
      <CTA />
    </main>
  )
}
