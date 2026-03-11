"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const springOvershoot = { type: "spring" as const, stiffness: 260, damping: 24 };
const line1 = "Websites That Turn";
const line2 = "Visitors Into Customers";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-28 bg-grid-signature"
      aria-label="Introduction"
    >
      <div className="accent-corner top-6 left-4 sm:top-10 sm:left-6 md:top-12 md:left-10 pointer-events-none" aria-hidden />
      {/* Single soft gradient – no floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(124,58,237,0.12),transparent_50%)]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-[-0.04em] sm:tracking-[-0.03em] mb-6 sm:mb-8 overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...springOvershoot, delay: 0.2 }}
              className="block"
              style={{ display: "block" }}
            >
              {line1}
            </motion.span>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...springOvershoot, delay: 0.35 }}
              className="block gradient-text"
              style={{ display: "block" }}
            >
              {line2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            We build one thing: sites that get you leads and sales. Fixed scope, one team, usually live in 6–8 weeks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
          >
            <Button href="/start-project" variant="primary" size="lg">
              Start Your Project
            </Button>
            <Button href="/#work" variant="secondary" size="lg">
              View Our Work
            </Button>
            <Button
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_COM_URL || "/start-project?intent=call"}
              variant="ghost"
              size="lg"
              className="text-white/80 hover:text-white"
              external={Boolean(process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_COM_URL)}
            >
              Book a Free Strategy Call
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            className="text-sm text-white/45"
          >
            Fixed price · One point of contact · No long-term contract
          </motion.p>
        </div>
      </Container>

      {/* Signature corner – bottom right */}
      <div className="accent-corner-br bottom-8 right-4 sm:bottom-10 sm:right-6 md:right-10 pointer-events-none" aria-hidden />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border-2 border-white/25 flex items-start justify-center pt-2"
        >
          <span className="w-1.5 h-2 rounded-full bg-white/50 block" />
        </motion.div>
      </motion.div>
    </section>
  );
}
