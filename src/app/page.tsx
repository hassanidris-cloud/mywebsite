import Hero from "@/components/sections/Hero"
import WorkPreview from "@/components/sections/WorkPreview"
import FeatureGrid from "@/components/sections/FeatureGrid"
import Results from "@/components/sections/Results"
import PricingTeaser from "@/components/sections/PricingTeaser"
import Testimonials from "@/components/sections/Testimonials"
import CTA from "@/components/sections/CTA"
import { getApprovedReviews } from "@/lib/reviews"

export default async function Home() {
  const reviews = await getApprovedReviews()
  return (
    <main className="relative">
      <Hero />
        <WorkPreview />
        <FeatureGrid />
        <Results />
        <PricingTeaser />
        <Testimonials reviews={reviews} />
        <CTA />
    </main>
  )
}
