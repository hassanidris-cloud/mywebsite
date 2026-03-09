"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <Section id="contact" className="py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden text-center"
        >
          {/* Gradient + soft glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/30 via-primary-accent/20 to-primary-blue/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_50%,rgba(124,58,237,0.2),transparent_65%)]" />
          <motion.div
            animate={{ opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-dark/50"
          />
          <div className="relative z-10 p-12 md:p-20 border border-white/10 rounded-3xl shadow-glow-strong transition-shadow duration-300">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Launch Your Website?
            </h2>
            <p className="text-white/85 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Let’s build a website that helps your business grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
              <Button href="/start-project" variant="primary" size="lg">
                Start Your Project
              </Button>
              <Button href="/start-project?intent=quote" variant="secondary" size="lg">
                Get a Custom Quote
              </Button>
              <Button
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_COM_URL || "/start-project?intent=call"}
                variant="ghost"
                size="lg"
                className="text-white/90 hover:text-white"
                external={Boolean(process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_COM_URL)}
              >
                Book a Free Strategy Call
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
