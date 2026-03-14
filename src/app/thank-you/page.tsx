"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_COM_URL || "";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success";

  return (
    <main className="min-h-screen bg-dark overflow-x-hidden" id="main-content" role="main">
      <Navbar />
      <Section noPadding className="pt-28 pb-16 md:pt-32 md:pb-24">
        <Container className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card padding="large" hover={false} className="text-center">
              {paymentSuccess ? (
                <>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                    We&apos;re on it
                  </h1>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    Your 20% deposit is confirmed. We&apos;ve started working on your project and will send you a preview when it&apos;s ready. You&apos;ll get free tweaks on the preview, then pay the remaining 80% to claim your site. We&apos;ll also email you a confirmation shortly.
                  </p>
                  <Button href="/" variant="primary" size="lg">
                    Back to home
                  </Button>
                </>
              ) : (
                <>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                    Thank you for your inquiry
                  </h1>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    We usually respond within 24 hours. You can also schedule a call below if you&apos;d like to speak sooner.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {CALENDLY_URL ? (
                      <Button href={CALENDLY_URL} variant="primary" size="lg" external>
                        Schedule a call now
                      </Button>
                    ) : (
                      <Button href="/start-project?intent=call" variant="primary" size="lg">
                        Book a strategy call
                      </Button>
                    )}
                    <Button href="/" variant="secondary" size="lg">
                      Back to home
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-dark">
        <Navbar />
        <Section noPadding className="pt-28 pb-16">
          <Container className="max-w-2xl">
            <div className="animate-pulse text-white/50 text-center py-20">Loading…</div>
          </Container>
        </Section>
        <Footer />
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
