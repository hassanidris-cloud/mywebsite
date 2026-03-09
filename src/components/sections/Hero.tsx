"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const trustStatement = "Trusted by startups and growing brands.";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-28"
      aria-label="Introduction"
    >
      {/* Radial gradient glow – soft purple behind hero text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,rgba(124,58,237,0.22),transparent_55%)]" />
        <motion.div
          animate={{ x: [0, 24, 0], y: [0, -16, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-primary-purple/25 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 12, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 w-[360px] h-[360px] bg-primary-blue/20 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ x: [0, 16, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-primary-accent/12 rounded-full blur-[120px]"
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-8">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Websites That Turn{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="block gradient-text"
            >
              Visitors Into Customers
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Velora Studio designs and builds modern high-performance websites for
            startups and growing businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Button href="/start-project" variant="primary" size="lg">
              Start Your Project
            </Button>
            <Button href="#work" variant="secondary" size="lg">
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

          {/* Trust statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="text-sm text-white/50"
          >
            {trustStatement}
          </motion.p>
        </div>
      </Container>

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
