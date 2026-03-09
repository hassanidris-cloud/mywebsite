"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { subscribeNewsletter } from "@/app/actions/subscribe";

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    setMessage("");
    const result = await subscribeNewsletter(formData);
    setStatus(result.ok ? "success" : "error");
    setMessage(result.ok ? "Thanks. We'll keep you updated." : result.error ?? "Something went wrong.");
    if (result.ok) form.reset();
  }

  return (
    <Section id="newsletter" className="py-16 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
            Stay updated with Velora Studio
          </h2>
          <p className="text-white/60 mb-6">
            Tips and project updates. No spam.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input name="email" type="email" placeholder="you@company.com" required disabled={status === "loading"} className="mb-0" />
            </div>
            <Button type="submit" variant="primary" size="md" className={status === "loading" ? "opacity-80" : ""}>
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
          {message && (
            <p className={"mt-3 text-sm " + (status === "success" ? "text-primary-accent" : "text-red-400")}>
              {message}
            </p>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
