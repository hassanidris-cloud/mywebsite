"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Loader2, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { submitPricingQuote } from "@/app/actions/pricing-quote";
import type { ModularCategoryId, WebsiteTypeId } from "@/data/pricing";
import {
  MODULAR_ADDONS,
  MODULAR_BASE_INCLUDES,
  MODULAR_BASE_PRICE_EUR,
  MODULAR_CATEGORY_LABELS,
  MODULAR_CATEGORY_ORDER,
  WEBSITE_TYPES,
  getModularSuggestedAddonIds,
  getSuggestedAddonIdsForWebsiteType,
} from "@/data/pricing";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Pricing() {
  const [description, setDescription] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<WebsiteTypeId | null>(null);
  const [openCategories, setOpenCategories] = useState<Set<ModularCategoryId>>(
    () => new Set([MODULAR_CATEGORY_ORDER[0]])
  );
  const [isPending, startTransition] = useTransition();

  const toggleCategory = (categoryId: ModularCategoryId) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const suggestedIds = useMemo(() => {
    const fromDesc = getModularSuggestedAddonIds(description);
    const fromType = getSuggestedAddonIdsForWebsiteType(selectedWebsiteType);
    return Array.from(new Set([...fromType, ...fromDesc]));
  }, [description, selectedWebsiteType]);

  const toggleAddon = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectSuggested = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      suggestedIds.forEach((id) => next.add(id));
      return next;
    });
  };

  const { oneTimeTotal, monthlyAddons, selectedFeaturesForSubmit } = useMemo(() => {
    let oneTime = MODULAR_BASE_PRICE_EUR;
    const monthly: typeof MODULAR_ADDONS = [];
    const features: { id: string; label: string; price: number; monthly?: boolean }[] = [];
    MODULAR_ADDONS.forEach((addon) => {
      if (!selectedIds.has(addon.id)) return;
      if (addon.monthly) {
        monthly.push(addon);
        features.push({ id: addon.id, label: addon.label, price: addon.price, monthly: true });
      } else {
        oneTime += addon.price;
        features.push({ id: addon.id, label: addon.label, price: addon.price });
      }
    });
    return { oneTimeTotal: oneTime, monthlyAddons: monthly, selectedFeaturesForSubmit: features };
  }, [selectedIds]);

  const addonsByCategory = useMemo(() => {
    const map = new Map<string, typeof MODULAR_ADDONS>();
    MODULAR_CATEGORY_ORDER.forEach((cat) => map.set(cat, []));
    MODULAR_ADDONS.forEach((a) => {
      const list = map.get(a.category) ?? [];
      list.push(a);
      map.set(a.category, list);
    });
    return map;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!description.trim()) {
      setError("Please describe the website you want.");
      return;
    }
    startTransition(async () => {
      const result = await submitPricingQuote({
        name,
        email,
        company,
        project_description: description,
        selected_features: selectedFeaturesForSubmit,
        estimated_total: oneTimeTotal,
        maintenance_selected: monthlyAddons.length > 0,
      });
      if (result.ok && result.redirect) {
        window.location.href = result.redirect;
        return;
      }
      setError(result.error ?? "Something went wrong. Please try again.");
    });
  };

  const openQuoteModal = () => {
    setError(null);
    setQuoteModalOpen(true);
  };

  useEffect(() => {
    if (!quoteModalOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuoteModalOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [quoteModalOpen]);

  return (
    <section className="bg-neutral-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Two-column layout: left = intro + base card, right = estimator + form */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left column: title, explanation, base website card */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-10"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-fuchsia-300/80">
                Pricing
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Modular pricing built around your project.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/65">
                Start with a base website at €750, then add only the features you need.
                Describe your project and we&apos;ll suggest relevant add-ons—no AI, just simple matching.
              </p>
            </div>

            <motion.div
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[2rem] border border-indigo-400/20 bg-gradient-to-b from-indigo-500/15 to-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-300/90">
                Foundation for all websites
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Base Website</h3>
              <p className="mt-1 text-4xl font-semibold tracking-tight text-white">
                €{MODULAR_BASE_PRICE_EUR}
              </p>
              <ul className="mt-6 space-y-2">
                {MODULAR_BASE_INCLUDES.map((inc) => (
                  <li key={inc} className="flex items-center gap-3 text-white/75">
                    <span className="rounded-full bg-white/10 p-0.5">
                      <Check className="h-3.5 w-3.5 text-indigo-300" />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right column: description, suggestions, add-ons, summary, form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Website type */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
              <label className="block text-sm font-medium text-white/90">
                What kind of website?
              </label>
              <p className="mt-1 text-sm text-white/50">
                Choose one to see add-ons that fit this type of site.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {WEBSITE_TYPES.map((type) => {
                  const isSelected = selectedWebsiteType === type.id;
                  return (
                    <motion.button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedWebsiteType(isSelected ? null : type.id)}
                      whileTap={{ scale: 0.97 }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-indigo-500/30 text-indigo-200 ring-1 ring-indigo-400/40"
                          : "bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      {type.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Project description */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
              <label htmlFor="project-description" className="block text-sm font-medium text-white/90">
                Describe the website you want
              </label>
              <p className="mt-1 text-sm text-white/50">
                Write in your own words — we’ll suggest relevant add-ons and show you the price for each.
              </p>
              <textarea
                id="project-description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. I need a bakery site with a menu, photo gallery, and a way for customers to find us and get in touch."
                rows={3}
                className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-3 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
              />
              {suggestedIds.length > 0 && (
                <div className="mt-4">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-indigo-300/90">
                    <Sparkles className="h-3.5 w-3.5" />
                    Suggested for you — clear, fixed prices
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    Based on your description and site type. Click to add or remove; prices stay transparent.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestedIds.map((id) => {
                      const addon = MODULAR_ADDONS.find((a) => a.id === id);
                      if (!addon) return null;
                      const isSelected = selectedIds.has(id);
                      const priceLabel = addon.monthly ? `€${addon.price}/mo` : `€${addon.price}`;
                      return (
                        <motion.button
                          key={id}
                          type="button"
                          onClick={() => toggleAddon(id)}
                          whileTap={{ scale: 0.92 }}
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className={`inline-flex items-center gap-2 rounded-full pl-3 pr-2 py-1.5 text-sm transition-colors ${
                            isSelected
                              ? "bg-indigo-500/30 text-indigo-200 ring-1 ring-indigo-400/30"
                              : "bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
                          }`}
                        >
                          <span>{addon.label}</span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${isSelected ? "bg-indigo-400/30 text-indigo-100" : "bg-white/15 text-white/70"}`}>
                            {priceLabel}
                          </span>
                          {isSelected && " ✓"}
                        </motion.button>
                      );
                    })}
                    <motion.button
                      type="button"
                      onClick={selectSuggested}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full border border-dashed border-white/25 px-3 py-1.5 text-sm text-indigo-300 hover:border-indigo-400/40 hover:text-indigo-200"
                    >
                      Add all suggested
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Add-ons by category (collapsible) */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white/70">
                Add-on features
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Select what you need. Tap a category to open or close it.
              </p>
              <div className="mt-4 space-y-1">
                {MODULAR_CATEGORY_ORDER.map((categoryId) => {
                  const addons = addonsByCategory.get(categoryId) ?? [];
                  if (addons.length === 0) return null;
                  const label = MODULAR_CATEGORY_LABELS[categoryId];
                  const isOpen = openCategories.has(categoryId);
                  const selectedInCategory = addons.filter((a) => selectedIds.has(a.id)).length;
                  return (
                    <div
                      key={categoryId}
                      className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                      <button
                        type="button"
                        onClick={() => toggleCategory(categoryId)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="text-sm font-medium text-white/85">{label}</span>
                        <span className="flex items-center gap-2">
                          {selectedInCategory > 0 && (
                            <span className="rounded-full bg-indigo-500/30 px-2 py-0.5 text-xs text-indigo-200">
                              {selectedInCategory}
                            </span>
                          )}
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4 text-white/50" />
                          </motion.span>
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-2 border-t border-white/10 p-3 sm:grid-cols-2">
                              {addons.map((addon) => {
                                const isSelected = selectedIds.has(addon.id);
                                return (
                                  <motion.label
                                    key={addon.id}
                                    htmlFor={`addon-${addon.id}`}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className={`flex cursor-pointer items-start justify-between gap-3 rounded-lg border px-3 py-2.5 transition-colors sm:items-center ${
                                      isSelected
                                        ? "border-indigo-400/30 bg-indigo-500/10"
                                        : "border-white/10 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                                    }`}
                                  >
                                    <div className="min-w-0 flex-1">
                                      <span className="text-sm font-medium text-white/90">{addon.label}</span>
                                      {addon.description && (
                                        <p className="mt-0.5 text-xs leading-snug text-white/55 line-clamp-2">
                                          {addon.description}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2">
                                      <span className="text-xs text-white/50">
                                        {addon.monthly ? `€${addon.price}/mo` : `€${addon.price}`}
                                      </span>
                                      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-white/25 bg-neutral-900/60 focus-within:ring-2 focus-within:ring-indigo-400/40 focus-within:ring-offset-0 focus-within:ring-offset-neutral-950">
                                        <input
                                          id={`addon-${addon.id}`}
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => toggleAddon(addon.id)}
                                          className="sr-only"
                                        />
                                        <motion.span
                                          initial={false}
                                          animate={{
                                            scale: isSelected ? 1 : 0,
                                            opacity: isSelected ? 1 : 0,
                                          }}
                                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                          className="absolute inset-0 flex items-center justify-center rounded-[4px] bg-indigo-500"
                                        >
                                          <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                                        </motion.span>
                                      </span>
                                    </div>
                                  </motion.label>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary card: selected features, total, CTA */}
            <motion.div
              key={`summary-${oneTimeTotal}-${selectedFeaturesForSubmit.length}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-indigo-400/20 bg-gradient-to-b from-indigo-500/10 to-white/[0.03] p-6 shadow-lg shadow-black/20"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-300/90">
                Your website plan
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">
                Summary
              </h3>

              {selectedFeaturesForSubmit.length > 0 ? (
                <ul className="mt-4 max-h-40 space-y-1.5 overflow-y-auto pr-1 text-sm text-white/85">
                  {selectedFeaturesForSubmit.map((f) => (
                    <li key={f.id} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
                      <span>{f.label}</span>
                      <span className="ml-auto text-white/50">
                        {f.monthly ? `€${f.price}/mo` : `€${f.price}`}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-white/50">Base website only — no add-ons selected.</p>
              )}

              <div className="mt-5 flex flex-wrap items-baseline gap-2 border-t border-white/10 pt-5">
                <span className="text-2xl font-semibold text-white">
                  €{oneTimeTotal.toLocaleString()}
                </span>
                {monthlyAddons.length > 0 && (
                  <span className="text-base text-white/80">
                    + €{monthlyAddons[0].price}/month
                  </span>
                )}
                {monthlyAddons.length > 0 && (
                  <span className="w-full text-xs text-white/50">Monthly maintenance</span>
                )}
              </div>

              <p className="mt-5 text-sm text-white/70">
                Your website plan is ready — send it to receive a custom quote.
              </p>
              <p className="mt-1 text-xs text-white/50">
                No commitment — I&apos;ll review your request and send the best option for your business.
              </p>

              <motion.button
                type="button"
                onClick={openQuoteModal}
                disabled={!description.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-neutral-950 shadow-lg shadow-white/15 transition hover:shadow-indigo-500/25 disabled:opacity-50 disabled:hover:scale-100"
              >
                Send My Quote Request
              </motion.button>
              {!description.trim() && (
                <p className="mt-2 text-center text-xs text-white/50">
                  Add a short description of your website above to continue.
                </p>
              )}
            </motion.div>

            {/* Disclaimer (always visible) */}
            <p className="text-xs leading-relaxed text-white/50">
              Prices shown are starting estimates. Final pricing may vary depending on project
              complexity, content readiness, and revisions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quote request modal: pre-filled plan + name/email/company only */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {quoteModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="quote-modal-title"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setQuoteModalOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-neutral-950/95 px-6 py-4 backdrop-blur-sm">
                    <h2 id="quote-modal-title" className="text-lg font-semibold text-white">
                      Send your quote request
                    </h2>
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(false)}
                      className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-0">
                    {/* Pre-filled summary (read-only) */}
                    <div className="border-b border-white/10 px-6 py-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                        Your plan (pre-filled)
                      </p>
                      <p className="mt-2 text-sm text-white/80">
                        <span className="font-medium text-white/90">Project:</span>{" "}
                        {description.trim() || "—"}
                      </p>
                      {selectedFeaturesForSubmit.length > 0 && (
                        <p className="mt-2 text-sm text-white/80">
                          <span className="font-medium text-white/90">Features:</span>{" "}
                          {selectedFeaturesForSubmit.map((f) => f.label).join(", ")}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-white/80">
                        <span className="font-medium text-white/90">Estimated total:</span>{" "}
                        €{oneTimeTotal.toLocaleString()}
                        {monthlyAddons.length > 0 && ` + €${monthlyAddons[0].price}/month`}
                      </p>
                    </div>

                    {/* Contact fields only */}
                    <div className="px-6 py-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                        Your details
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        We&apos;ll use this to send your custom quote.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="modal-quote-name" className="block text-xs font-medium text-white/70">
                            Name *
                          </label>
                          <input
                            id="modal-quote-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="modal-quote-email" className="block text-xs font-medium text-white/70">
                            Email *
                          </label>
                          <input
                            id="modal-quote-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="modal-quote-company" className="block text-xs font-medium text-white/70">
                            Company / business name
                          </label>
                          <input
                            id="modal-quote-company"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="px-6 pb-2">
                        <p className="rounded-xl bg-red-500/15 px-4 py-2 text-sm text-red-300" role="alert">
                          {error}
                        </p>
                      </div>
                    )}

                    <div className="border-t border-white/10 px-6 py-5">
                      <motion.button
                        type="submit"
                        disabled={isPending}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-neutral-950 shadow-lg transition hover:shadow-indigo-500/20 disabled:opacity-70"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          "Send My Quote Request"
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
