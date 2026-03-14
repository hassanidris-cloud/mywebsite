"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Lock } from "lucide-react";
import { getTemplatesByCategory, type AccentColor } from "@/data/work";

const accentStyles: Record<AccentColor, { border: string; badgeBg: string; badgeText: string; glow: string }> = {
  warm:    { border: "rgba(232,165,75,0.2)",   badgeBg: "rgba(232,165,75,0.12)",  badgeText: "#e8a54b", glow: "rgba(232,165,75,0.07)"  },
  cool:    { border: "rgba(125,211,252,0.2)",  badgeBg: "rgba(125,211,252,0.12)", badgeText: "#7dd3fc", glow: "rgba(125,211,252,0.07)" },
  rose:    { border: "rgba(249,168,212,0.2)",  badgeBg: "rgba(249,168,212,0.12)", badgeText: "#f9a8d4", glow: "rgba(249,168,212,0.07)" },
  primary: { border: "rgba(124,58,237,0.28)",  badgeBg: "rgba(167,139,250,0.12)", badgeText: "#a78bfa", glow: "rgba(124,58,237,0.09)"  },
  green:   { border: "rgba(52,211,153,0.22)",  badgeBg: "rgba(52,211,153,0.12)",  badgeText: "#34d399", glow: "rgba(52,211,153,0.07)"  },
  orange:  { border: "rgba(251,146,60,0.2)",   badgeBg: "rgba(251,146,60,0.12)",  badgeText: "#fb923c", glow: "rgba(251,146,60,0.07)"  },
};

export default function AllTemplatesPage() {
  const groups = getTemplatesByCategory();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="border-b border-white/10 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/#templates"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-white">
            All templates
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Browse by category. Each template can be customized with add-ons and your content.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl space-y-16">
          {groups.map(({ category, templates: categoryTemplates }, groupIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.06 }}
            >
              <div className="mb-8">
                <h2
                  className="font-heading font-bold text-xl md:text-2xl tracking-tight"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {category.name}
                </h2>
                {category.description && (
                  <p className="mt-1.5 text-sm max-w-2xl text-white/60">
                    {category.description}
                  </p>
                )}
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {categoryTemplates.map((tpl, i) => {
                  const style = accentStyles[tpl.accent];
                  const isLive = tpl.badge === "Live preview";
                  return (
                    <motion.div
                      key={tpl.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                      className="group relative rounded-3xl overflow-hidden transition-all duration-300"
                      style={{
                        border: `1px solid ${style.border}`,
                        backgroundColor: "var(--color-surface-elevated)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${style.glow}, transparent 70%)` }}
                        aria-hidden
                      />
                      <div className={`relative h-44 overflow-hidden ${!tpl.previewImage ? `bg-gradient-to-br ${tpl.gradient}` : ""}`}>
                        <div
                          className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1 px-3 py-2 border-b"
                          style={{ backgroundColor: "rgba(0,0,0,0.2)", borderColor: "rgba(255,255,255,0.07)" }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                          <div className="flex-1 mx-1.5 h-3 rounded-full bg-white/8" />
                        </div>
                        {tpl.previewImage ? (
                          <Image
                            src={tpl.previewImage}
                            alt={`${tpl.name} — preview`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                            className="object-cover object-top pt-9"
                            unoptimized
                          />
                        ) : (
                          <div className={`absolute inset-0 pt-9 bg-gradient-to-br ${tpl.gradient} p-4 space-y-2 opacity-70`}>
                            <div className="h-2.5 w-3/4 rounded-full bg-white/25" />
                            <div className="h-2 w-1/2 rounded-full bg-white/15" />
                            <div className="mt-3 h-14 rounded-xl bg-white/10" />
                            <div className="flex gap-2 mt-2">
                              <div className="h-4 w-14 rounded-full bg-white/15" />
                              <div className="h-4 w-10 rounded-full bg-white/10" />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-10 right-3">
                          <span
                            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full px-2.5 py-1 border backdrop-blur-sm"
                            style={{ backgroundColor: style.badgeBg, borderColor: style.border, color: style.badgeText }}
                          >
                            {!isLive && <Lock className="w-2.5 h-2.5" />}
                            {tpl.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
                          style={{ color: style.badgeText }}
                        >
                          {tpl.category}
                        </p>
                        <h3 className="font-heading font-bold text-lg tracking-tight text-white">
                          {tpl.name}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed line-clamp-3 text-white/70">
                          {tpl.summary}
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                          {isLive ? (
                            <a
                              href={tpl.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors"
                            >
                              Preview <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-sm font-semibold text-white/50">
                              In progress
                            </span>
                          )}
                          <Link
                            href={`/customize/${tpl.slug}`}
                            className="ml-auto text-xs font-medium text-white/60 hover:text-white transition-colors"
                          >
                            Get this →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
