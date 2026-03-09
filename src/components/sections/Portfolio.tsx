"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";

const projects = [
  {
    title: "Grocery Template",
    description: "We built a clean, responsive grocery store template with categories, products, and a cart-ready layout for small businesses.",
    metric: "E-commerce ready",
    stack: ["HTML", "CSS", "JavaScript"],
    siteUrl: "https://bragabazaar.com",
    screenshot: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    title: "Gleeb",
    description: "We designed a conversion-focused online store to turn browsers into buyers with a clear checkout flow.",
    metric: "Higher engagement",
    stack: ["React", "CSS", "Vercel"],
    siteUrl: "https://gleeb.vercel.app",
    screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Portugal Immigration",
    description: "We built visa guidance and document tracking so applicants stay on track and support requests drop.",
    metric: "Faster onboarding",
    stack: ["Next.js", "Tailwind", "Vercel"],
    siteUrl: "https://portugal-immigration-app.vercel.app",
    screenshot: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  },
];

function LivePreviewModal({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop click to close (clicking iframe/content does not close) */}
      <button
        type="button"
        className="absolute inset-0 z-0"
        onClick={onClose}
        aria-label="Close"
      />
      {/* Header: title, open in new tab, close */}
      <div
        className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="truncate font-heading text-lg font-semibold text-white">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
          >
            Open in new tab
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Close preview"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      {/* Live site iframe - users can scroll and interact inside */}
      <motion.div
        className="relative z-10 flex-1 min-h-0"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <iframe
          src={url}
          title={`Live preview: ${title}`}
          className="absolute inset-0 h-full w-full border-0 bg-white"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          allow="fullscreen"
        />
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onLiveView,
}: {
  project: (typeof projects)[0];
  index: number;
  onLiveView: (url: string, title: string) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [24, 0, 0, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.96, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1.08, 1]);

  return (
    <motion.article
      ref={cardRef}
      key={project.title}
      style={{ y, scale }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Card className="overflow-hidden p-0 border border-white/10 bg-white/[0.03] hover:border-white/15 transition-colors">
        <motion.div
          ref={imageRef}
          className="aspect-[4/3] relative overflow-hidden bg-white/5"
          style={{ scale: imageScale }}
        >
          <Image
            src={project.screenshot}
            alt={`${project.title} — project preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </motion.div>
        <div className="p-6 lg:p-7">
          <h3 className="font-heading text-xl font-semibold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            {project.description}
          </p>
          <p className="text-2xl font-bold text-primary-accent tracking-tight mb-4">
            {project.metric}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white/60 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
          <motion.button
            type="button"
            onClick={() => onLiveView(project.siteUrl, project.title)}
            className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Live view →
          </motion.button>
        </div>
      </Card>
    </motion.article>
  );
}

export default function Portfolio() {
  const [livePreview, setLivePreview] = useState<{ url: string; title: string } | null>(null);

  return (
    <Section id="work">
      <Container>
        <Heading
          label="Work"
          title="Our Work"
          subtitle="What we’ve built for founders and businesses—and the outcomes that followed."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onLiveView={(url, title) => setLivePreview({ url, title })}
            />
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {livePreview && (
          <LivePreviewModal
            url={livePreview.url}
            title={livePreview.title}
            onClose={() => setLivePreview(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
