import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import About from "@/components/sections/About";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import InlineCTA from "@/components/sections/InlineCTA";
import CTA from "@/components/sections/CTA";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark overflow-x-hidden" id="main-content" role="main">
      <Navbar />
      <Hero />
      <Services />
      <InlineCTA />
      <Portfolio />
      <InlineCTA />
      <Process />
      <WhyUs />
      <About />
      <Pricing />
      <Testimonials />
      <CTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
