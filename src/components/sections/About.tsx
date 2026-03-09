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
          title="Why Velora Studio"
          subtitle="We exist to help businesses win online."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <p className="text-white/75 text-lg leading-relaxed">
            Velora Studio was founded to help businesses build modern, high-performance websites that actually convert visitors into customers.
          </p>
          <p className="text-white/65 text-base leading-relaxed">
            We combine thoughtful design with clean development to create websites that help brands grow online.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
