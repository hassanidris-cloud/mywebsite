"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Plus, ChevronRight } from "lucide-react"
import {
  MODULAR_BASE_PRICE_EUR,
  getEffectiveCustomBasePriceEur,
  MODULAR_ADDONS,
  WEBSITE_TYPES,
  getSuggestedAddonIdsForWebsiteType,
  type WebsiteTypeId,
} from "@/data/pricing"
import Button from "@/components/ui/Button"

const POPULAR_TYPE_IDS: WebsiteTypeId[] = [
  "ecommerce",
  "business-corporate",
  "portfolio",
  "landing-page",
  "blog-news",
  "other",
]
const popularTypes = WEBSITE_TYPES.filter((t) => POPULAR_TYPE_IDS.includes(t.id as WebsiteTypeId))

export default function PricingTeaser() {
  const [selectedType, setSelectedType] = useState<WebsiteTypeId | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set())

  const suggestedAddonIds = selectedType
    ? getSuggestedAddonIdsForWebsiteType(selectedType as WebsiteTypeId).slice(0, 6)
    : []
  const suggestedAddons = suggestedAddonIds
    .map((id) => MODULAR_ADDONS.find((a) => a.id === id))
    .filter(Boolean) as typeof MODULAR_ADDONS

  const addonsTotal = Array.from(selectedAddons).reduce((sum, id) => {
    const addon = MODULAR_ADDONS.find((a) => a.id === id)
    return sum + (addon?.price ?? 0)
  }, 0)
  const basePrice = getEffectiveCustomBasePriceEur()
  const total = basePrice + addonsTotal

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleTypeSelect = (id: WebsiteTypeId) => {
    setSelectedType(id)
    setSelectedAddons(new Set())
  }

  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.07), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,243,239,0.07), transparent)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.28em] mb-4"
            style={{ color: "var(--color-primary-accent)" }}
          >
            Transparent Pricing
          </p>
          <h2
            className="font-heading font-bold leading-tight tracking-tight"
            style={{ fontSize: "var(--text-section)", color: "var(--color-text-light)" }}
          >
            Build your estimate.
          </h2>
          <p className="mt-4 mx-auto max-w-lg" style={{ color: "var(--color-text-muted)", fontSize: "var(--text-body)" }}>
            Pick your site type and see which features apply. No surprises, no sales calls to get a number.
          </p>
        </motion.div>

        {/* Wizard card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            border: "1px solid var(--color-border-strong)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          {/* Base row */}
          <div
            className="flex items-center justify-between gap-6 px-8 py-5 border-b"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-elevated)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              <span className="text-sm font-medium" style={{ color: "var(--color-text-light)" }}>
                Base website — fully responsive, custom design, contact form, deployment
              </span>
            </div>
            <span
              className="font-heading font-bold text-xl shrink-0"
              style={{ color: "var(--color-text-light)" }}
            >
              {basePrice < MODULAR_BASE_PRICE_EUR ? (
                <>€<span className="line-through opacity-60">750</span> €{basePrice}</>
              ) : (
                <>€{basePrice}</>
              )}
            </span>
          </div>

          <div className="p-8">
            {/* Step 1: Type selector */}
            <div className="mb-8">
              <p
                className="text-xs font-semibold uppercase tracking-[0.22em] mb-4 flex items-center gap-2"
                style={{ color: "var(--color-text-dim)" }}
              >
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-cream)" }}
                >
                  1
                </span>
                What kind of site do you need?
              </p>
              <div className="flex flex-wrap gap-2.5">
                {popularTypes.map((type) => {
                  const active = selectedType === type.id
                  return (
                    <motion.button
                      key={type.id}
                      onClick={() => handleTypeSelect(type.id as WebsiteTypeId)}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border"
                      style={{
                        backgroundColor: active ? "var(--color-primary)" : "rgba(255,255,255,0.03)",
                        borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                        color: active ? "var(--color-cream)" : "var(--color-text-muted)",
                        boxShadow: active ? "0 0 20px -4px rgba(124,58,237,0.4)" : "none",
                      }}
                    >
                      {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                      {type.label}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Suggested add-ons */}
            <AnimatePresence>
              {selectedType && suggestedAddons.length > 0 && (
                <motion.div
                  key="addons"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="mb-8 pt-8 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.22em] mb-4 flex items-center gap-2"
                      style={{ color: "var(--color-text-dim)" }}
                    >
                      <span
                        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                        style={{ backgroundColor: "var(--color-primary)", color: "var(--color-cream)" }}
                      >
                        2
                      </span>
                      Popular add-ons for this type
                    </p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {suggestedAddons.map((addon) => {
                        const active = selectedAddons.has(addon.id)
                        return (
                          <motion.button
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 rounded-2xl p-4 text-left transition-all duration-200 border group"
                            style={{
                              backgroundColor: active ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)",
                              borderColor: active ? "rgba(124,58,237,0.3)" : "var(--color-border)",
                            }}
                          >
                            <div
                              className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-colors"
                              style={{
                                backgroundColor: active ? "var(--color-primary)" : "rgba(255,255,255,0.05)",
                                border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                              }}
                            >
                              {active
                                ? <Check className="w-3.5 h-3.5" style={{ color: "var(--color-cream)" }} />
                                : <Plus className="w-3.5 h-3.5" style={{ color: "var(--color-text-dim)" }} />
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-light)" }}>
                                {addon.label}
                              </p>
                            </div>
                            <span
                              className="text-sm font-semibold shrink-0"
                              style={{ color: active ? "var(--color-primary-accent)" : "var(--color-text-dim)" }}
                            >
                              +€{addon.price}
                            </span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Total + CTA */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--color-text-dim)" }}>
                  Estimated total
                </p>
                <motion.p
                  key={total}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading font-bold"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--color-text-light)" }}
                >
                  €{total.toLocaleString()}
                </motion.p>
                {addonsTotal > 0 && (
                  <p className="text-xs mt-1" style={{ color: "var(--color-text-dim)" }}>
                    Base €{basePrice}{basePrice < MODULAR_BASE_PRICE_EUR && " (40% off)"} + €{addonsTotal} in add-ons
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/start-project" size="md">
                  Start your project <ArrowRight className="w-4 h-4 ml-1 inline" />
                </Button>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-medium rounded-full px-6 py-3 transition-all border"
                  style={{
                    borderColor: "var(--color-border-strong)",
                    color: "var(--color-text-muted)",
                    backgroundColor: "transparent",
                  }}
                >
                  Full pricing <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
