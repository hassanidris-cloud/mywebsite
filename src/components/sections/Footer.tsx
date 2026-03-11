"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import VeloraLogoHorizontal from "@/components/brand/VeloraLogoHorizontal";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { label: "Twitter", href: process.env.NEXT_PUBLIC_TWITTER_URL || "" },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "" },
  { label: "GitHub", href: process.env.NEXT_PUBLIC_GITHUB_URL || "" },
].filter((item) => item.href);

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-20 md:py-24" role="contentinfo">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-12">
          <div>
            <VeloraLogoHorizontal variant="dark" />
            <p className="mt-3 text-sm text-white/50 max-w-xs">
              Modern web design for startups and growing businesses.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-8">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm text-white/55 hover:text-white transition-colors duration-200 group py-2 min-h-[44px] flex items-center"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-[width] duration-300 ease-out" />
              </Link>
            ))}
          </nav>
          {socialLinks.length > 0 && (
            <div className="flex gap-8">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-sm text-white/55 hover:text-white transition-colors duration-200 group py-2 min-h-[44px] flex items-center"
                  aria-label={item.label}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-[width] duration-300 ease-out" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-white/45">
            © 2026 Velora Studio
          </p>
          <p className="text-sm text-white/45">
            <a href="mailto:hello@velorastudio.com" className="hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-accent focus-visible:outline-offset-2 focus-visible:rounded">
              hello@velorastudio.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
