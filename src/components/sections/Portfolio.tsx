"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";

const projects = [
  {
    title: "Grocery Template",
    category: "E-commerce",
    description: "A clean, responsive grocery store template—categories, products, and cart-ready layout.",
    result: "Cart-ready layout for online grocery.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  },
  {
    title: "Gleeb",
    category: "E-commerce",
    description: "Clean online store designed to convert browsers into buyers.",
    result: "Higher engagement and clearer checkout flow.",
    stack: ["React", "CSS", "Vercel"],
    image: "/gleeb-logo.png",
  },
  {
    title: "Portugal Immigration",
    category: "SaaS / Services",
    description: "Visa guidance and document tracking so applicants stay on track.",
    result: "Faster onboarding and fewer support requests.",
    stack: ["Next.js", "Tailwind", "Vercel"],
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80",
  },
];

export default function Portfolio() {
  return (
    <Section id="work">
      <Container>
        <Heading
          label="Work"
          title="Recent Projects"
          subtitle="What we’ve built—and the results that followed."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group h-full"
            >
              <Card className="h-full overflow-hidden p-0 flex flex-col">
                <div className="aspect-video rounded-t-2xl overflow-hidden bg-white/5 relative">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category} project`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover"
                    unoptimized={project.image.startsWith("/")}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs font-medium text-primary-accent uppercase tracking-wider mb-1">
                    {project.category}
                  </p>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  {project.result && (
                    <p className="text-sm font-medium text-primary-accent mb-4">
                      Result: {project.result}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-white/70 border border-white/5"
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
