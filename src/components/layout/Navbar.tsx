"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { useState } from "react"
import VeloraLogoHorizontal from "@/components/brand/VeloraLogoHorizontal"

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-neutral-950/75 px-5 py-3 backdrop-blur-xl">
        <VeloraLogoHorizontal variant="dark" showWordmark={true} wordmarkInline={true} iconSize={32} className="shrink-0" />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/start-project"
            className="inline-flex items-center rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-950 transition hover:scale-[1.02]"
          >
            Start Project
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-neutral-950/95 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-white/75 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/start-project"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-medium text-neutral-950"
            >
              Start Project
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  )
}
