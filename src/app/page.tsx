import Hero from "@/components/sections/Hero"
import FeatureGrid from "@/components/sections/FeatureGrid"
import Results from "@/components/sections/Results"
import Pricing from "@/components/sections/Pricing"
import Testimonials from "@/components/sections/Testimonials"
import CTA from "@/components/sections/CTA"
import { getApprovedReviews } from "@/lib/reviews"

export default async function Home() {
  const reviews = await getApprovedReviews()
  return (
    <main className="bg-neutral-950">
      <Hero />
      <FeatureGrid />
      <Results />
      <Pricing />
      <Testimonials reviews={reviews} />
      <CTA />
    </main>
  )
}
