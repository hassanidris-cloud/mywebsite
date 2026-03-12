"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Website design & development",
    desc: "We design and build modern websites with a clear visual hierarchy, strong typography, and a polished experience across all devices.",
    inPractice: ["Custom layout & typography", "Homepage + key pages", "Consistent visual system"],
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-auto" fill="none" aria-hidden>
        {/* Browser chrome */}
        <rect x="10" y="8" width="180" height="104" rx="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
        <circle cx="22" cy="18" r="3" fill="rgba(255,255,255,0.15)" />
        <circle cx="32" cy="18" r="3" fill="rgba(255,255,255,0.1)" />
        <circle cx="42" cy="18" r="3" fill="rgba(255,255,255,0.1)" />
        <rect x="55" y="15" width="90" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
        {/* Content blocks */}
        <rect x="20" y="32" width="100" height="12" rx="2" fill="rgba(99,102,241,0.35)" />
        <rect x="20" y="50" width="160" height="8" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect x="20" y="62" width="140" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="20" y="80" width="60" height="24" rx="4" fill="rgba(99,102,241,0.25)" />
      </svg>
    ),
  },
  {
    title: "Fast, responsive builds",
    desc: "Sites are built with a modern stack for speed and reliability. Your site loads quickly and works smoothly on mobile, tablet, and desktop.",
    inPractice: ["Mobile, tablet & desktop", "Fast load times", "Modern, maintainable code"],
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-auto" fill="none" aria-hidden>
        {/* Desktop */}
        <rect x="20" y="20" width="100" height="60" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="28" y="28" width="84" height="44" rx="2" fill="rgba(99,102,241,0.12)" />
        <rect x="55" y="38" width="30" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x="55" y="48" width="30" height="4" rx="1" fill="rgba(255,255,255,0.12)" />
        <rect x="65" y="72" width="10" height="6" rx="1" fill="rgba(255,255,255,0.15)" />
        {/* Tablet */}
        <rect x="135" y="35" width="45" height="65" rx="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="140" y="42" width="35" height="50" rx="2" fill="rgba(99,102,241,0.1)" />
        <rect x="148" y="52" width="19" height="3" rx="1" fill="rgba(255,255,255,0.15)" />
        {/* Phone */}
        <rect x="188" y="55" width="22" height="42" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="rgba(255,255,255,0.04)" />
        <rect x="191" y="60" width="16" height="32" rx="2" fill="rgba(99,102,241,0.1)" />
        <rect x="194" y="68" width="10" height="2" rx="1" fill="rgba(255,255,255,0.12)" />
      </svg>
    ),
  },
  {
    title: "Messaging & structure",
    desc: "We help shape your message and page flow so visitors understand your offer quickly and know what to do next.",
    inPractice: ["Clear headline & value prop", "Logical section order", "Obvious next step (CTA)"],
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-auto" fill="none" aria-hidden>
        {/* Section blocks = hierarchy */}
        <rect x="20" y="12" width="160" height="22" rx="4" fill="rgba(99,102,241,0.3)" />
        <rect x="24" y="18" width="80" height="4" rx="1" fill="rgba(255,255,255,0.5)" />
        <rect x="24" y="26" width="120" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
        <rect x="20" y="42" width="160" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
        <rect x="24" y="48" width="100" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x="20" y="68" width="160" height="18" rx="4" fill="rgba(255,255,255,0.05)" />
        <rect x="24" y="74" width="90" height="3" rx="1" fill="rgba(255,255,255,0.18)" />
        <rect x="20" y="94" width="80" height="20" rx="4" fill="rgba(99,102,241,0.35)" />
        <rect x="28" y="101" width="36" height="6" rx="2" fill="rgba(255,255,255,0.9)" />
      </svg>
    ),
  },
  {
    title: "Conversion-focused pages",
    desc: "Every section is designed to build trust, reduce friction, and guide visitors toward enquiries and conversions.",
    inPractice: ["Trust signals & social proof", "Low-friction contact", "One clear primary action"],
    visual: (
      <svg viewBox="0 0 200 120" className="w-full h-auto" fill="none" aria-hidden>
        {/* Path: attention → trust → action */}
        <path d="M100 18 L140 50 L140 95 L60 95 L60 50 Z" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="rgba(99,102,241,0.08)" />
        <path d="M78 55 L122 55 L122 88 L78 88 Z" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="rgba(99,102,241,0.12)" />
        <rect x="85" y="92" width="30" height="18" rx="4" fill="rgba(99,102,241,0.4)" />
        <path d="M100 52 L100 88" stroke="rgba(99,102,241,0.4)" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M100 88 L100 92" stroke="rgba(99,102,241,0.5)" strokeWidth="1" />
        <circle cx="100" cy="35" r="4" fill="rgba(255,255,255,0.35)" />
        <circle cx="100" cy="72" r="4" fill="rgba(255,255,255,0.4)" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2">
      {services.map((item, i) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-24px" }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="group rounded-[2rem] border border-white/10 bg-white/[0.04] overflow-hidden transition-colors hover:border-white/15 hover:bg-white/[0.06]"
        >
          {/* Visual preview */}
          <div className="relative h-32 px-6 pt-6 pb-2 flex items-center justify-center bg-gradient-to-b from-white/[0.06] to-transparent">
            <div className="w-full max-w-[220px] mx-auto text-white/90 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-[1.02]">
              {item.visual}
            </div>
          </div>
          <div className="px-8 pb-8">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {item.title}
            </h2>
            <p className="mt-3 leading-7 text-white/65">
              {item.desc}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-indigo-300/80">
              In practice
            </p>
            <ul className="mt-2 space-y-1.5">
              {item.inPractice.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/60" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
