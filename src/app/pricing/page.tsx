"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const websiteTiers = [
  {
    name: "Starter Website",
    price: "$2,500 – $4,000",
    ideal: "Small businesses, local services, portfolios",
    pages: "3–5 pages",
    frontend: true,
    backend: false,
    database: false,
    cms: false,
    contactForms: "1 form",
    mobile: true,
    seo: "Basic",
    animations: "Light",
    features: ["Responsive design", "Basic SEO", "1 round of revisions", "Contact form"],
    highlighted: false,
  },
  {
    name: "Business Website",
    price: "$5,000 – $8,000",
    ideal: "Startups, consultancies, content-heavy sites",
    pages: "6–10 pages",
    frontend: true,
    backend: "Optional",
    database: "Optional",
    cms: "Optional",
    contactForms: "Multiple",
    mobile: true,
    seo: "Full",
    animations: "Yes",
    features: ["Custom design", "Animations & polish", "SEO optimization", "CMS option", "3 rounds of revisions"],
    highlighted: true,
  },
  {
    name: "Premium Custom",
    price: "$10,000 – $25,000+",
    ideal: "SaaS, e-commerce, custom web apps",
    pages: "10+ or app-style",
    frontend: true,
    backend: true,
    database: true,
    cms: true,
    contactForms: "Full",
    mobile: true,
    seo: "Advanced",
    animations: "Advanced",
    features: ["Full custom build", "Backend & dashboard", "Integrations", "Priority support", "Dedicated lead"],
    highlighted: false,
  },
];

const comparisonRows = [
  { label: "Pages included", starter: "3–5", business: "6–10", premium: "10+ or app" },
  { label: "Frontend development", starter: "✓", business: "✓", premium: "✓" },
  { label: "Backend development", starter: "—", business: "Optional", premium: "✓" },
  { label: "Database integration", starter: "—", business: "Optional", premium: "✓" },
  { label: "CMS / Dashboard", starter: "—", business: "Optional", premium: "✓" },
  { label: "Contact forms", starter: "1", business: "Multiple", premium: "Full" },
  { label: "Mobile responsive", starter: "✓", business: "✓", premium: "✓" },
  { label: "SEO setup", starter: "Basic", business: "Full", premium: "Advanced" },
  { label: "Animations & UI polish", starter: "Light", business: "Yes", premium: "Advanced" },
];

const backendAddons = [
  { feature: "Authentication (login, signup, OAuth)", range: "$1,500 – $3,500" },
  { feature: "Admin dashboard (CRUD, basic analytics)", range: "$2,500 – $5,000" },
  { feature: "Database integration", range: "$1,500 – $4,000" },
  { feature: "API integrations (per integration)", range: "$800 – $2,500" },
  { feature: "Booking / scheduling system", range: "$3,000 – $6,000" },
  { feature: "Payments (Stripe, PayPal, or your preferred provider)", range: "$2,000 – $5,000" },
];

const hostingOptions = [
  { name: "Vercel", use: "Frontend, Next.js, serverless", monthly: "$20 – $150+", yearly: "From ~$240/yr" },
  { name: "Supabase", use: "Database, auth, storage", monthly: "$25 – $100+", yearly: "From ~$300/yr" },
  { name: "AWS", use: "Full control, compliance", monthly: "$50 – $500+", yearly: "From ~$600/yr" },
  { name: "Cloudflare", use: "Edge, D1, Workers", monthly: "$20 – $100+", yearly: "From ~$240/yr" },
];

const maintenancePlans = [
  {
    name: "Basic Maintenance",
    price: "$150 – $250/mo",
    features: ["Bug fixes (up to ~2 hrs/mo)", "Content updates (~1 hr/mo)", "Security updates", "Basic uptime monitoring"],
    highlighted: false,
  },
  {
    name: "Business Maintenance",
    price: "$350 – $550/mo",
    features: ["Bug fixes (up to ~4 hrs/mo)", "Content updates (~2 hrs/mo)", "Security & monitoring", "Small feature updates", "Monthly report"],
    highlighted: true,
  },
  {
    name: "Premium Support",
    price: "$750 – $1,200/mo",
    features: ["Priority bug fixes", "Dedicated capacity", "SLA & performance monitoring", "Dedicated contact", "Proactive security"],
    highlighted: false,
  },
];

const exampleQuotes = [
  { name: "Small business website", total: "~$6,200", detail: "Starter build + hosting + Basic maintenance (year 1)" },
  { name: "Immigration consulting site", total: "~$16,900", detail: "Business + dashboard + hosting + Business maintenance (year 1)" },
  { name: "E-commerce website", total: "~$23,400", detail: "Business/Premium + payments + hosting + Business maintenance (year 1)" },
  { name: "Custom SaaS platform", total: "~$35,200", detail: "Premium build + hosting + Premium support (year 1)" },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-dark overflow-x-hidden" id="main-content" role="main">
      <Navbar />
      <Section noPadding className="pt-24 pb-16 md:pt-28 md:pb-20">
        <Container>
          <Heading
            label="Pricing"
            title="Transparent Pricing for Modern Websites"
            subtitle="Fixed scope. Clear value. From frontend to backend, hosting, and ongoing support. Scale with a plan that fits your business."
          />
        </Container>
      </Section>

      {/* Website tiers */}
      <Section id="website-tiers">
        <Container>
          <h2 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-primary-warm">01</span> Website tiers
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {websiteTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={tier.highlighted ? "lg:-mt-2 lg:mb-2" : ""}
              >
                <Card hover={!tier.highlighted} padding="large" className={tier.highlighted ? "ring-1 ring-primary-accent/30" : ""}>
                  {tier.highlighted && (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary-purple via-primary-warm to-primary-accent z-10" />
                      <div className="absolute top-6 right-6">
                        <Badge variant="popular">Most Popular</Badge>
                      </div>
                    </>
                  )}
                  <p className="text-sm text-white/50 mb-1">{tier.ideal}</p>
                  <h3 className="font-heading text-xl font-semibold text-white mb-1">{tier.name}</h3>
                  <p className="text-2xl font-bold text-white mb-4">{tier.price}</p>
                  <ul className="space-y-2 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="text-sm text-white/80 flex items-center gap-2">
                        <span className="text-primary-accent shrink-0">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/start-project" variant={tier.highlighted ? "primary" : "secondary"} size="md" className="w-full sm:w-auto">
                    Get a quote
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Feature comparison table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white/70 uppercase tracking-wider">Feature</th>
                  <th className="p-4 text-sm font-semibold text-white/70 uppercase tracking-wider">Starter</th>
                  <th className="p-4 text-sm font-semibold text-primary-warm uppercase tracking-wider">Business</th>
                  <th className="p-4 text-sm font-semibold text-white/70 uppercase tracking-wider">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="p-4 text-sm text-white/80">{row.label}</td>
                    <td className="p-4 text-sm text-white/70">{row.starter}</td>
                    <td className="p-4 text-sm text-white/90">{row.business}</td>
                    <td className="p-4 text-sm text-white/70">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Backend add-ons */}
      <Section>
        <Container>
          <h2 className="font-heading text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="text-primary-warm">02</span> Backend add-ons
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mb-8">
            When your project needs more than a static site, we add backend features on top of your chosen tier. Prices scale with complexity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {backendAddons.map((addon, i) => (
              <motion.div
                key={addon.feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <span className="text-sm text-white/90">{addon.feature}</span>
                <span className="text-sm font-semibold text-primary-warm shrink-0">{addon.range}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-white/50 text-sm">
            Example: Business site ($6K) + auth + simple admin + Stripe ≈ $13.5K total. We scope every add-on in your proposal. Payment providers (e.g. Stripe, PayPal) are integrated per project—we work with your region and preferences.
          </p>
        </Container>
      </Section>

      {/* Hosting */}
      <Section>
        <Container>
          <h2 className="font-heading text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="text-primary-warm">03</span> Hosting & infrastructure
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mb-4">
            We build and host on <strong className="text-white/80">Vercel</strong> (your site) and <strong className="text-white/80">Supabase</strong> (database and logins when needed)—industry-standard, fast, and secure so your ongoing hosting stays low and predictable.
          </p>
          <p className="text-white/50 text-sm max-w-2xl mb-8">
            We can manage everything for you. Costs depend on traffic and features; we often bundle the first year or include it in a care plan.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hostingOptions.map((h) => (
              <Card key={h.name} hover padding="default">
                <p className="font-heading font-semibold text-white mb-1">{h.name}</p>
                <p className="text-xs text-white/50 mb-3">{h.use}</p>
                <p className="text-sm text-white/80">{h.monthly}</p>
                <p className="text-xs text-white/50">{h.yearly}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-white/50 text-sm">
            Domain registration typically $12–25/year. We can quote hosting + domain as part of your project or maintenance plan.
          </p>

          {/* Short FAQ */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <h3 className="font-heading text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Quick answers</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-white mb-1">Where is my website hosted?</dt>
                <dd className="text-sm text-white/65">
                  On Vercel—global CDN, automatic HTTPS, and high availability. Your site is fast and stays up.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-white mb-1">Where is my data stored?</dt>
                <dd className="text-sm text-white/65">
                  When your project needs a database or user accounts, we use Supabase—secure, compliant, and you keep full control of your data.
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* Maintenance */}
      <Section>
        <Container>
          <h2 className="font-heading text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="text-primary-warm">04</span> Maintenance plans
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mb-8">
            Keep your site secure, updated, and improving. Package with hosting for a single monthly &quot;Care plan&quot; if you prefer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maintenancePlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card hover={!plan.highlighted} padding="default" className={plan.highlighted ? "ring-1 ring-primary-accent/30" : ""}>
                  {plan.highlighted && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="popular">Recommended</Badge>
                    </div>
                  )}
                  <h3 className="font-heading font-semibold text-white mb-1">{plan.name}</h3>
                  <p className="text-xl font-bold text-white mb-4">{plan.price}</p>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm text-white/75 flex items-start gap-2">
                        <span className="text-primary-accent shrink-0 mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Example quotes */}
      <Section>
        <Container>
          <h2 className="font-heading text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="text-primary-warm">05</span> Example first-year totals
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mb-8">
            Ballpark first-year cost (build + 12 months hosting/maintenance where applicable). Your quote will be fixed-scope and itemized.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exampleQuotes.map((q) => (
              <Card key={q.name} hover padding="default">
                <p className="font-heading font-semibold text-white mb-1">{q.name}</p>
                <p className="text-2xl font-bold text-primary-warm mb-2">{q.total}</p>
                <p className="text-sm text-white/60">{q.detail}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <Card padding="large" hover={false} className="text-center bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-primary-accent/20">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
              Get a fixed-scope quote
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Tell us your goals, pages, and any backend needs. We&apos;ll send a clear proposal with scope and price—no surprise fees.
            </p>
            <Button href="/start-project" variant="primary" size="lg">
              Start your project
            </Button>
          </Card>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
