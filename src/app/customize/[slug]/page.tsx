"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { templates } from "@/data/work";
import {
  TEMPLATE_BASE_PRICE_EUR,
  TEMPLATE_SECTION_OPTIONS,
  getTotalFromSelected,
  getSubtotalFromSelected,
  getSectionById,
  isPromoActive,
  getEffectiveBasePriceEur,
  PROMO_LABEL,
} from "@/data/template-customization";
import { submitTemplateRequest } from "@/app/actions/template-request";

export default function CustomizeTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const slug = typeof params.slug === "string" ? params.slug : null;
  const template = useMemo(
    () => (slug ? templates.find((t) => t.slug === slug) : null),
    [slug]
  );

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    const included = new Set(
      TEMPLATE_SECTION_OPTIONS.filter((s) => s.price === 0).map((s) => s.id)
    );
    return included;
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(
    () => getTotalFromSelected(Array.from(selectedIds)),
    [selectedIds]
  );
  const subtotal = useMemo(
    () => getSubtotalFromSelected(Array.from(selectedIds)),
    [selectedIds]
  );

  const toggle = (id: string) => {
    const section = TEMPLATE_SECTION_OPTIONS.find((s) => s.id === id);
    if (section?.price === 0) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!formRef.current || !slug) return;
    setPending(true);
    const formData = new FormData(formRef.current);
    formData.set("template_slug", slug);
    formData.set("template_name", template?.name ?? slug);
    formData.set("total", String(total));
    const addonIds = Array.from(selectedIds).filter(
      (id) => getSectionById(id)?.price !== 0
    );
    formData.set("addon_ids", addonIds.join(","));
    const result = await submitTemplateRequest(formData);
    setPending(false);
    if (result.ok && result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
      return;
    }
    if (result.ok && result.redirect) {
      router.push(result.redirect);
      return;
    }
    setError(result.error ?? "Something went wrong. Please try again.");
  }

  if (!slug || !template) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-32 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-semibold">Template not found</h1>
          <p className="mt-4 text-white/65">
            We couldn&apos;t find that template.{" "}
            <Link href="/#templates" className="text-indigo-300 underline">
              View all templates
            </Link>
          </p>
        </div>
      </main>
    );
  }

  const selectedList = TEMPLATE_SECTION_OPTIONS.filter((s) =>
    selectedIds.has(s.id)
  );
  const addonsTotal = selectedList.reduce((sum, s) => sum + s.price, 0);
  const promoActive = isPromoActive();
  const effectiveBase = getEffectiveBasePriceEur();
  const show20Off = promoActive && subtotal > 0 && total < subtotal;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Promo banner */}
      {promoActive && (
        <div className="bg-indigo-500/15 border-b border-indigo-400/30 px-6 py-3 text-center">
          <p className="text-sm font-semibold text-indigo-200">
            🎉 {PROMO_LABEL}
          </p>
        </div>
      )}
      {/* Header */}
      <section className="border-b border-white/10 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#templates"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            ← Back to templates
          </Link>
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex-1">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--color-primary-accent)" }}
              >
                Customize template
              </p>
              <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-white">
                {template.name}
              </h1>
              <p className="mt-4 text-lg text-white/70 max-w-xl">
                {template.summary}
              </p>
            </div>
            {template.previewImage && (
              <div className="relative w-full md:w-72 aspect-video rounded-2xl overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={template.previewImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 288px"
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sections to customize */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-white mb-2">
            Choose sections to include
          </h2>
          <p className="text-white/60 mb-10">
            Tick the sections you want. Included sections are part of the base
            price; others add to your total.
          </p>

          <ul className="space-y-3">
            {TEMPLATE_SECTION_OPTIONS.map((section) => {
              const isSelected = selectedIds.has(section.id);
              const isIncluded = section.price === 0;
              return (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-5 transition-colors ${
                    isSelected
                      ? "border-indigo-500/40 bg-white/[0.04]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  } ${isIncluded ? "opacity-90" : "cursor-pointer"}`}
                  onClick={() => !isIncluded && toggle(section.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-500/20 text-indigo-300"
                          : "border-white/30 bg-transparent"
                      }`}
                      aria-hidden
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-white">
                          {section.label}
                        </span>
                        {isIncluded && (
                          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                            Included
                          </span>
                        )}
                        {!isIncluded && (
                          <span className="text-sm font-semibold text-indigo-300">
                            +€{section.price}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-white/60">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Describe your changes + contact form */}
      <section className="px-6 py-12 md:py-16 border-t border-white/10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-white mb-2">
            Describe your changes
          </h2>
          <p className="text-white/60 mb-8">
            Tell us how you&apos;d like to customize this template — branding, content, or any specific requests. We&apos;ll get back within 24 hours.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-6">
              <label className="block">
                <span className="block text-sm font-medium text-white/80 mb-2">
                  Your message
                </span>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="E.g. I’d like to use our brand colors, add a team section, and focus the copy on B2B consulting…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-y min-h-[120px]"
                  required
                />
              </label>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-sm font-medium text-white/80 mb-2">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </label>
              </div>
              <label className="block">
                <span className="block text-sm font-medium text-white/80 mb-2">
                  Company <span className="text-white/50">(optional)</span>
                </span>
                <input
                  type="text"
                  name="company"
                  placeholder="Your company"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {/* Total + Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-6">
              <div>
                <p className="text-sm text-white/60">Estimated total</p>
                <p className="text-3xl font-bold text-white">
                  €{total}
                  <span className="text-lg font-normal text-white/60 ml-1">
                    one-time
                  </span>
                </p>
                {addonsTotal > 0 && (
                  <p className="mt-1 text-sm text-white/50">
                    {promoActive ? (
                      <>
                        Base <span className="line-through text-white/40">€{TEMPLATE_BASE_PRICE_EUR}</span> €{effectiveBase} + €{addonsTotal} add-ons
                      </>
                    ) : (
                      <>Base €{TEMPLATE_BASE_PRICE_EUR} + €{addonsTotal} add-ons</>
                    )}
                  </p>
                )}
                {promoActive && addonsTotal === 0 && (
                  <p className="mt-1 text-sm text-white/50">
                    Base <span className="line-through text-white/40">€{TEMPLATE_BASE_PRICE_EUR}</span> €{effectiveBase} (40% off)
                  </p>
                )}
                {show20Off && (
                  <p className="mt-1 text-sm text-indigo-300/90">
                    20% off template: €{subtotal} → €{total}
                  </p>
                )}
                <p className="mt-2 text-xs text-white/50">
                  Pay 20% (€{Math.round(total * 0.2)}) now to start. After preview, free tweaks then 80% to claim your site.
                </p>
              </div>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-neutral-950 transition hover:bg-white/90 hover:scale-[1.02] shrink-0 disabled:opacity-70 disabled:pointer-events-none"
              >
                {pending ? "Redirecting to payment…" : "Pay 20% to start"}
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
