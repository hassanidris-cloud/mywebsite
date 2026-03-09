"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    ideal: "Best for small businesses launching their first website.",
    description: "A clear, professional site that gets you online.",
    features: ["3–5 pages", "Responsive design", "Basic SEO", "1 round of revisions"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$5,000",
    ideal: "Best for startups and companies that want a modern, scalable website.",
    description: "Custom design and the tools to grow.",
    features: ["Custom design", "Animations", "SEO optimization", "CMS integration", "3 rounds of revisions"],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$10,000+",
    ideal: "Best for businesses that need a fully custom website with advanced features.",
    description: "Full custom build and priority support.",
    features: ["Full custom build", "Advanced animations", "Integrations", "Priority support", "Dedicated lead"],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <Heading
          label="Pricing"
          title="Transparent Pricing"
          subtitle="Fixed scope. Clear value. Typical range $2.5K–$10K+."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${plan.highlighted ? "md:-mt-2 md:mb-2" : ""}`}
            >
              <Card hover={!plan.highlighted} padding={plan.highlighted ? "large" : "default"} className={plan.highlighted ? "ring-1 ring-primary-accent/30" : ""}>
                {plan.highlighted && (
                  <>
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary-purple via-primary-warm to-primary-accent z-10"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute top-6 right-6">
                      <Badge variant="popular">Most Popular</Badge>
                    </div>
                  </>
                )}
                <div className="mb-6">
                  <p className="text-sm text-white/50 mb-1">{plan.ideal}</p>
                  <h3 className="font-heading text-xl font-semibold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-bold text-white">{plan.price}</p>
                  <p className="text-white/60 text-sm mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-white/80 flex items-center gap-2.5">
                      <span className="text-primary-accent shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href="/start-project"
                  variant={plan.highlighted ? "primary" : "secondary"}
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Start Your Project
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
