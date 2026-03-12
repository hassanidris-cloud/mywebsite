"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const items = [
  { title: "Fixed scope & price", detail: "We agree the scope and cost up front. No surprise invoices or scope creep." },
  { title: "One point of contact", detail: "You work with the same small team from brief to launch—no account managers or handoffs." },
  { title: "Usually live in 6–8 weeks", detail: "Landing pages and small sites in weeks, not months. We keep momentum." },
  { title: "No long-term lock-in", detail: "You own the site. No retainer required after launch. We're here if you need updates." },
];

function TickIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setShown((n) => (n < items.length ? n + 1 : n));
    }, 120);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <Section id="why-us" variant="halo">
      <Container>
        <div ref={ref} className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-warm font-semibold text-sm uppercase tracking-[0.2em] mb-4 text-center"
          >
            How we&apos;re different
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }}
            className="font-heading text-2xl sm:text-3xl font-bold text-cream tracking-tight text-center mb-12"
          >
            No agencies. No runaround.
          </motion.h2>
          <ul className="space-y-6">
            {items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="flex gap-4 items-start"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={inView && shown > i ? { scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.1 }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-warm/20 text-warm border border-warm/40 shrink-0 mt-0.5"
                >
                  <TickIcon />
                </motion.span>
                <div>
                  <h3 className="font-heading font-semibold text-cream mb-1">{item.title}</h3>
                  <p className="text-cream/65 text-sm sm:text-base leading-relaxed">{item.detail}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
