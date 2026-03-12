import Hero from "@/components/sections/Hero"
import WorkPreview from "@/components/sections/WorkPreview"
import FeatureGrid from "@/components/sections/FeatureGrid"
import Results from "@/components/sections/Results"
import PricingTeaser from "@/components/sections/PricingTeaser"
import Testimonials from "@/components/sections/Testimonials"
import CTA from "@/components/sections/CTA"
import VideoBackground from "@/components/VideoBackground"
import { getApprovedReviews } from "@/lib/reviews"

export default async function Home() {
  const reviews = await getApprovedReviews()
  return (
    <>
      <VideoBackground />
      <main className="relative z-10">
        <Hero />
        <WorkPreview />
        <FeatureGrid />
        <Results />
        <PricingTeaser />
        <Testimonials reviews={reviews} />
        <CTA />
      </main>
    </>
  )
}
