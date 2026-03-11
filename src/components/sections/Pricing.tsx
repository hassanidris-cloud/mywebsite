"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Sparkles } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { submitPricingQuote } from "@/app/actions/pricing-quote";
import {
  MODULAR_ADDONS,
  MODULAR_BASE_INCLUDES,
  MODULAR_BASE_PRICE_EUR,
  MODULAR_CATEGORY_LABELS,
  MODULAR_CATEGORY_ORDER,
  getModularSuggestedAddonIds,
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
  const [isPending, startTransition] = useTransition();

  const suggestedIds = useMemo(
    () => getModularSuggestedAddonIds(description),
    [description]
  );

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
            {/* Project description */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
              <label htmlFor="project-description" className="block text-sm font-medium text-white/90">
                Describe the website you want
              </label>
              <textarea
                id="project-description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="I need a bakery website with menu pages, gallery, and contact form."
                rows={3}
                className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-3 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
              />
              {suggestedIds.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-indigo-300/90">
                    <Sparkles className="h-3.5 w-3.5" />
                    Suggested for you
                  </span>
                  {suggestedIds.map((id) => {
                    const addon = MODULAR_ADDONS.find((a) => a.id === id);
                    if (!addon) return null;
                    const isSelected = selectedIds.has(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleAddon(id)}
                        className={`rounded-full px-3 py-1.5 text-sm transition ${
                          isSelected
                            ? "bg-indigo-500/30 text-indigo-200 ring-1 ring-indigo-400/30"
                            : "bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
                        }`}
                      >
                        {addon.label}
                        {isSelected && " ✓"}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={selectSuggested}
                    className="text-sm text-indigo-300 hover:text-indigo-200"
                  >
                    Add all
                  </button>
                </div>
              )}
            </div>

            {/* Add-ons by category */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white/70">
                Add-on features
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Select what you need. Suggestions above are based on your description.
              </p>
              <div className="mt-5 space-y-5">
                {MODULAR_CATEGORY_ORDER.map((categoryId) => {
                  const addons = addonsByCategory.get(categoryId) ?? [];
                  if (addons.length === 0) return null;
                  const label = MODULAR_CATEGORY_LABELS[categoryId];
                  return (
                    <div key={categoryId}>
                      <h4 className="text-xs font-medium uppercase tracking-wider text-white/60">
                        {label}
                      </h4>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {addons.map((addon) => {
                          const isSelected = selectedIds.has(addon.id);
                          return (
                            <label
                              key={addon.id}
                              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition ${
                                isSelected
                                  ? "border-indigo-400/30 bg-indigo-500/10"
                                  : "border-white/10 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                              }`}
                            >
                              <span className="text-sm text-white/90">{addon.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white/50">
                                  {addon.monthly ? `€${addon.price}/mo` : `€${addon.price}`}
                                </span>
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleAddon(addon.id)}
                                  className="h-4 w-4 rounded border-white/20 bg-neutral-900 text-indigo-500 focus:ring-indigo-400/50"
                                />
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing summary */}
            <motion.div
              key={`${oneTimeTotal}-${monthlyAddons.length > 0}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 shadow-sm"
            >
              <p className="text-sm font-medium uppercase tracking-wider text-white/60">
                Estimated total
              </p>
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-2xl font-semibold text-white">
                  €{oneTimeTotal.toLocaleString()}
                </span>
                {monthlyAddons.length > 0 && (
                  <span className="text-lg text-white/80">
                    + €{monthlyAddons[0].price}/month
                  </span>
                )}
              </div>
              {monthlyAddons.length > 0 && (
                <p className="mt-1 text-xs text-white/50">Monthly maintenance shown separately.</p>
              )}
            </motion.div>

            {/* Quote form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
                <h3 className="text-sm font-medium uppercase tracking-wider text-white/70">
                  Get your custom quote
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  We&apos;ll send you a tailored estimate based on your selection.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="quote-name" className="block text-xs font-medium text-white/70">
                      Name *
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-email" className="block text-xs font-medium text-white/70">
                      Email *
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-company" className="block text-xs font-medium text-white/70">
                      Company
                    </label>
                    <input
                      id="quote-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-indigo-400/40 focus:outline-none focus:ring-1 focus:ring-indigo-400/30"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-white/50">
                Prices shown are starting estimates. Final pricing may vary depending on project
                complexity, content readiness, and revisions.
              </p>

              {error && (
                <p className="rounded-xl bg-red-500/15 px-4 py-2 text-sm text-red-300" role="alert">
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-medium text-neutral-950 shadow-lg shadow-white/10 transition hover:shadow-indigo-500/20 disabled:opacity-70 sm:w-auto sm:min-w-[220px]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Get My Custom Quote"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
