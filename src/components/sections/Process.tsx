"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";

const steps = [
  { num: "01", title: "Brief & scope", description: "We lock scope and price. You get a clear timeline and one contact.", icon: "search" },
  { num: "02", title: "Design", description: "You see designs and give feedback. We iterate until you're happy.", icon: "pencil" },
  { num: "03", title: "Build", description: "We build, you review. No surprises—we stick to what we agreed.", icon: "code" },
  { num: "04", title: "Launch", description: "We go live, hand over the keys. You own everything. We're here for updates.", icon: "rocket" },
];

const icons: Record<string, React.ReactNode> = {
  search: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  pencil: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  code: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  rocket: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

function ProcessStep({
  step,
  index,
  scrollProgress,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const thresholdStart = index * 0.22;
  const thresholdEnd = index * 0.22 + 0.18;
  const active = useTransform(scrollProgress, [thresholdStart, thresholdEnd], [0, 1]);
  const iconScale = useTransform(active, [0, 1], [1, 1.1]);
  const iconOpacity = useTransform(active, [0, 1], [0.85, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ type: "spring", stiffness: 200, damping: 26, delay: index * 0.08 }}
      className="relative text-center"
    >
      <motion.div
        style={{ scale: iconScale, opacity: iconOpacity }}
        whileHover={{ scale: 1.08, rotate: 2 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="inline-flex w-16 h-16 rounded-2xl bg-surface-card border border items-center justify-center text-warm mb-5 relative"
      >
        <motion.span
          className="absolute inset-[-2px] rounded-2xl border-2 border-warm/40 pointer-events-none"
          style={{ opacity: active }}
          aria-hidden
        />
        <span className="relative z-10">{icons[step.icon]}</span>
      </motion.div>
      <p className="text-xs font-semibold text-cream/45 tracking-widest mb-2">{step.num}</p>
      <h3 className="font-heading text-lg font-semibold text-cream mb-1.5">
        {step.title}
      </h3>
      <p className="text-cream/65 text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <Section id="process">
      <Container>
        <Heading
          label="Process"
          title="How we work"
          subtitle="Same team, clear steps, no surprises."
        />
        <div ref={ref} className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, i) => (
              <ProcessStep key={step.title} step={step} index={i} scrollProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
