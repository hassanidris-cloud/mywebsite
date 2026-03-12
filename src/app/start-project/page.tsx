"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { submitInquiry } from "@/app/actions/inquiry";

const BUDGET_OPTIONS = [
  { value: "", label: "Select budget range…" },
  { value: "1k-3k", label: "$1k – $3k" },
  { value: "3k-7k", label: "$3k – $7k" },
  { value: "7k-15k", label: "$7k – $15k" },
  { value: "15k-plus", label: "$15k+" },
];

const TIMELINE_OPTIONS = [
  { value: "", label: "Select timeline…" },
  { value: "asap", label: "ASAP" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "2-3-months", label: "2–3 months" },
  { value: "3-plus-months", label: "3+ months" },
];

const PROJECT_TYPE_OPTIONS = [
  { value: "", label: "Select project type…" },
  { value: "website-design", label: "Website Design" },
  { value: "website-development", label: "Website Development" },
  { value: "redesign", label: "Redesign" },
  { value: "landing-page", label: "Landing Page" },
  { value: "custom-project", label: "Custom Project" },
];

function getHeadingByIntent(intent: string | null) {
  switch (intent) {
    case "quote":
      return { title: "Get a Quote", subtitle: "Share your project details and we’ll send you a tailored proposal within 24 hours." };
    case "call":
      return { title: "Book a Call", subtitle: "Pick a time that works and we’ll discuss your project on a short discovery call." };
    default:
      return { title: "Start Your Project", subtitle: "Tell us about your goals and we’ll get back within 24 hours. You can also explore AI-assisted layout ideas below." };
  }
}

function StartProjectForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const intent = searchParams.get("intent"); // "quote" | "call" | null
  const { title, subtitle } = getHeadingByIntent(intent);

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!formRef.current) return;
    setPending(true);
    const formData = new FormData(formRef.current);
    if (intent) formData.set("source", intent);
    const result = await submitInquiry(formData);
    setPending(false);
    if (result.ok && result.redirect) {
      router.push(result.redirect);
      return;
    }
    if (!result.ok) setError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <main className="min-h-screen bg-dark overflow-x-hidden" id="main-content" role="main">
      <Navbar />

      <Section noPadding className="pt-28 pb-16 md:pt-32 md:pb-24">
        <Container className="max-w-2xl">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-cream mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-cream/70 text-base sm:text-lg max-w-xl mx-auto">
              {subtitle}
            </p>
          </motion.header>

            <motion.form
              ref={formRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
            >
              <Card padding="large" hover={false} className="space-y-5 !bg-neutral-900/90 border border-white/10 text-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Name" name="name" placeholder="Your name" required />
                  <Input label="Email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <Input label="Company name" name="company" placeholder="Your company" />
                <Input label="Website (optional)" name="website" type="url" placeholder="https://" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Select label="Budget range" name="budget">
                    {BUDGET_OPTIONS.map((o) => (
                      <option key={o.value || "empty"} value={o.value}>{o.label}</option>
                    ))}
                  </Select>
                  <Select label="Timeline" name="timeline">
                    {TIMELINE_OPTIONS.map((o) => (
                      <option key={o.value || "empty"} value={o.value}>{o.label}</option>
                    ))}
                  </Select>
                </div>
                <Select label="Project type" name="project_type">
                  {PROJECT_TYPE_OPTIONS.map((o) => (
                    <option key={o.value || "empty"} value={o.value}>{o.label}</option>
                  ))}
                </Select>
                <Textarea
                  label="Project description"
                  name="description"
                  rows={6}
                  placeholder="Goals, audience, must-haves, and any design or technical requirements…"
                  className="min-h-[160px]"
                  required
                />
                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}
                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" className={pending ? "opacity-80 pointer-events-none" : ""}>
                    {pending ? "Sending…" : "Submit inquiry"}
                  </Button>
                </div>
              </Card>
            </motion.form>

          {/* AI layout ideas – teaser for future feature */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16"
            aria-labelledby="ai-layout-heading"
          >
            <Card
              padding="large"
              hover={false}
              className="!bg-neutral-900/80 border border-white/10 border-primary-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-accent/20 flex items-center justify-center text-primary-accent" aria-hidden>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 id="ai-layout-heading" className="font-heading text-lg font-semibold text-cream mb-2">
                    AI-assisted website layout ideas (coming soon)
                  </h2>
                  <p className="text-cream/70 text-sm leading-relaxed mb-4">
                    We’re building a tool that helps you explore layout and structure ideas with AI—describe your business and goals, and get suggested page structures, section ideas, and content flow. Great for kicking off a project or clarifying what you want before we start designing.
                  </p>
                  <p className="text-cream/50 text-sm">
                    Interested? Mention “AI layout ideas” in your message above and we’ll prioritise you when we launch it.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}

export default function StartProjectPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-dark overflow-x-hidden" id="main-content" role="main">
        <Navbar />
        <Section noPadding className="pt-28 pb-16 md:pt-32 md:pb-24">
          <Container className="max-w-2xl">
            <div className="animate-pulse text-white/50 text-center py-20">Loading…</div>
          </Container>
        </Section>
        <Footer />
      </main>
    }>
      <StartProjectForm />
    </Suspense>
  );
}
