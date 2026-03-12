"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import { useTilt } from "@/hooks/useTilt";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const services = [
  {
    title: "Website Design",
    description: "Modern websites designed to build trust and increase conversions.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "Web Development",
    description: "Fast, reliable websites built with modern technologies.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "SEO Optimization",
    description: "Optimized for search engines so customers can find you.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Automation & Integrations",
    description: "Smart integrations that help your business scale.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 26 },
  },
};

function ServiceCard({
  title,
  description,
  icon,
  variants,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  variants: typeof item;
}) {
  const reduceMotion = useReducedMotion();
  const { ref, tiltStyle, onMouseMove, onMouseLeave } = useTilt(reduceMotion ? 0 : 6);

  return (
    <motion.div variants={variants} className="h-full [perspective:800px]">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={tiltStyle}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="h-full"
      >
        <Card hover={false} className="h-full border hover:border-primary-accent/25 hover:shadow-card-hover transition-all duration-300 group">
          <div className="flex gap-5">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-purple/30 via-primary-accent/20 to-warm/20 flex items-center justify-center text-primary-accent border border group-hover:border-primary-accent/30 transition-colors duration-300"
            >
              {icon}
            </motion.div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-cream mb-2">
                {title}
              </h3>
              <p className="text-cream/70 text-[15px] leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <Section id="services" variant="surface">
      <Container>
        <Heading
          label="Services"
          title="What We Do"
          subtitle="Clear outcomes. No fluff."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((s) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              description={s.description}
              icon={s.icon}
              variants={item}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
