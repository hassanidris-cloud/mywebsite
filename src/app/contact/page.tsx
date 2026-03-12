"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const EMAIL = "hello@velorastudio.com";
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_COM_URL || "";

const socialLinks = [
  { label: "Twitter", href: process.env.NEXT_PUBLIC_TWITTER_URL },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { label: "GitHub", href: process.env.NEXT_PUBLIC_GITHUB_URL },
].filter((item): item is { label: string; href: string } => Boolean(item.href));

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark overflow-x-hidden" id="main-content" role="main">
      <Navbar />
      <Section noPadding className="pt-28 pb-16 md:pt-32 md:pb-24">
        <Container className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Get in touch
            </h1>
            <p className="text-white/65 text-lg mb-10">
              Reach out for project inquiries, quotes, or a quick chat.
            </p>

            <Card padding="large" hover={false} className="space-y-8">
              <div>
                <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-xl font-semibold text-white hover:text-primary-accent transition-colors"
                >
                  {EMAIL}
                </a>
                <p className="text-white/55 text-sm mt-1">
                  We usually reply within 24 hours.
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">Social</p>
                  <ul className="flex flex-wrap gap-4">
                    {socialLinks.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/75 hover:text-white transition-colors font-medium"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-white/[0.08]">
                <p className="text-white/65 text-sm mb-4">
                  Prefer to send a project brief? Use the form below and we'll get back with a tailored proposal.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button href="/start-project" variant="primary" size="md">
                    Start your project
                  </Button>
                  {CALENDLY_URL && (
                    <Button href={CALENDLY_URL} variant="secondary" size="md" external>
                      Book a free call
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
