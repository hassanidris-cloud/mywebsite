"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_COM_URL;

export default function InlineCTA() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 md:py-10"
    >
      <Container>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Button href="/start-project" variant="primary" size="md">
            Start Your Project
          </Button>
          <Button href="/start-project?intent=quote" variant="secondary" size="md">
            Get a Custom Quote
          </Button>
          <Button
            href={calendlyUrl || "/start-project?intent=call"}
            variant="ghost"
            size="md"
            className="text-cream/75 hover:text-cream"
            external={Boolean(calendlyUrl)}
          >
            Book a Free Strategy Call
          </Button>
        </div>
      </Container>
    </motion.div>
  );
}
