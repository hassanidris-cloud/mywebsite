"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";

// Use local images in public/projects/ (e.g. grocery-template.jpg, gleeb.jpg, portugal-immigration.jpg)
// or reliable external URLs. Placeholders below use Unsplash so images always load.
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

export default function Portfolio() {
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
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Card className="overflow-hidden p-0 border border-white/10 bg-white/[0.03] hover:border-white/15 transition-colors">
                {/* Snippet first — clean, full width (velora.studio style) */}
                <div className="aspect-[4/3] relative overflow-hidden bg-white/5">
                      <Image
                        src={project.screenshot}
                        alt={`${project.title} — project preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                </div>
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
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white/60 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
