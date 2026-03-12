"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "How long does a website project take?",
    answer:
      "Most projects take between 2 and 4 weeks depending on size, content readiness and revision rounds."
  },
  {
    question: "Do you only work with premium or larger businesses?",
    answer:
      "No. We work with businesses at different stages, but the goal is always the same: create a sharper website that improves perception and conversion."
  },
  {
    question: "Can you redesign my current website?",
    answer:
      "Yes. Many projects start with an underperforming or outdated website that needs stronger structure, visuals and messaging."
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Ongoing support, landing pages, updates and growth-focused add-ons can be added after launch."
  },
  {
    question: "Will the website be mobile friendly?",
    answer:
      "Yes. Every page is designed and built to feel polished across mobile, tablet and desktop."
  },
  {
    question: "Can you help with messaging and page structure?",
    answer:
      "Yes. We help shape the content flow, section order and overall messaging layout so the site communicates more clearly."
  }
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const open = openIndex === index
        return (
          <div
            key={faq.question}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04]"
          >
            <button
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-lg font-medium text-white">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-white/60"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 text-white/60 leading-7">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
