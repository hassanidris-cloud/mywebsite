import Hero from "@/components/sections/Hero"
import MarqueeBand from "@/components/sections/MarqueeBand"
import WorkShowcase from "@/components/sections/WorkShowcase"
import BeforeAfter from "@/components/sections/BeforeAfter"
import TemplatesShowcase from "@/components/sections/TemplatesShowcase"
import FeatureGrid from "@/components/sections/FeatureGrid"
import Results from "@/components/sections/Results"
import PricingTeaser from "@/components/sections/PricingTeaser"
import Testimonials from "@/components/sections/Testimonials"
import CTA from "@/components/sections/CTA"
import { getApprovedReviews } from "@/lib/reviews"
import { HomeStructuredData } from "@/components/StructuredData"

export default async function Home() {
  const reviews = await getApprovedReviews()
  return (
    <main className="relative" id="main-content">
      <HomeStructuredData />
      <Hero />
      <MarqueeBand />
      <WorkShowcase />
      <BeforeAfter />
      <TemplatesShowcase />
      <Results />
      <FeatureGrid />
      <PricingTeaser />
      <Testimonials reviews={reviews} />
      <CTA />
    </main>
  )
}
