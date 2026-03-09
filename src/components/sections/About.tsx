"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";

export default function About() {
  return (
    <Section id="about">
      <Container>
        <Heading
          label="About"
          title="A small studio, one focus"
          subtitle="We don't do ads, branding, or apps—we focus on websites so we do them well."
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-2xl mx-auto text-center space-y-5"
        >
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Velora Studio is a small web studio. You get a fixed scope, a single point of contact, and a site that's fast and straightforward to update. Most projects are live within 6–8 weeks.
          </p>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            No account managers, no scope creep, no retainer after launch. You own the site. We're here when you need changes.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
