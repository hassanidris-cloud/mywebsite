import { LIST_BASE_PRICE_EUR } from "@/data/pricing-core";

/** FAQ copy — single source for UI + FAQPage JSON-LD (rich results). */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How long does a website project take?",
    answer:
      "Most projects take between 2 and 4 weeks depending on size, content readiness and revision rounds.",
  },
  {
    question: "Do you only work with premium or larger businesses?",
    answer:
      "No. We work with businesses at different stages, but the goal is always the same: create a sharper website that improves perception and conversion.",
  },
  {
    question: "Can you redesign my current website?",
    answer:
      "Yes. Many projects start with an underperforming or outdated website that needs stronger structure, visuals and messaging.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Ongoing support, landing pages, updates and growth-focused add-ons can be added after launch.",
  },
  {
    question: "Will the website be mobile friendly?",
    answer:
      "Yes. Every page is designed and built to feel polished across mobile, tablet and desktop—important for users and for search (mobile-first indexing).",
  },
  {
    question: "Can you help with messaging and page structure?",
    answer:
      "Yes. We help shape the content flow, section order and overall messaging layout so the site communicates more clearly.",
  },
  {
    question: "How does pricing work?",
    answer:
      `We use transparent modular pricing: a clear foundation price (from €${LIST_BASE_PRICE_EUR}—see our pricing page) plus optional add-ons you choose, so you always know what you’re paying for.`,
  },
];
