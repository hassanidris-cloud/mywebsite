"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";

const testimonials = [
  {
    quote: "Velora Studio delivered a clean, fast site that our customers actually enjoy using. Conversion went up from day one.",
    author: "Sarah Chen",
    role: "Founder, TechFlow",
    outcome: "40% increase in signups",
  },
  {
    quote: "Professional from start to finish. They understood our brand and built something we’re proud to show off.",
    author: "James Miller",
    role: "Marketing Director, ScaleUp",
    outcome: "Launched on time, on budget",
  },
  {
    quote: "We needed a modern web presence fast. Velora built our landing page in weeks and the quality exceeded expectations.",
    author: "Alex Rivera",
    role: "CEO, LaunchPad",
    outcome: "3× more qualified leads",
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <Heading
          label="Testimonials"
          title="What clients say"
          subtitle="Results and feedback from projects we’ve delivered."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card padding="large" hover>
                <p className="text-white/80 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-heading font-semibold text-white">{t.author}</p>
                <p className="text-sm text-white/50 mb-2">{t.role}</p>
                <p className="text-sm text-primary-accent font-medium">{t.outcome}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
