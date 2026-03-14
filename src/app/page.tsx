import Hero from "@/components/sections/Hero"
import MarqueeBand from "@/components/sections/MarqueeBand"
import WorkShowcase from "@/components/sections/WorkShowcase"
import TemplatesShowcase from "@/components/sections/TemplatesShowcase"
import FeatureGrid from "@/components/sections/FeatureGrid"
import Results from "@/components/sections/Results"
import PricingTeaser from "@/components/sections/PricingTeaser"
import Testimonials from "@/components/sections/Testimonials"
import CTA from "@/components/sections/CTA"
import { getApprovedReviews } from "@/lib/reviews"

export default async function Home() {
  const reviews = await getApprovedReviews()
  return (
    <main className="relative" id="main-content">
      <Hero />
      <MarqueeBand />
      <WorkShowcase />
      <TemplatesShowcase />
      <Results />
      <FeatureGrid />
      <PricingTeaser />
      <Testimonials reviews={reviews} />
      <CTA />
    </main>
  )
}
