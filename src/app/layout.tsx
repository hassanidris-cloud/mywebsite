import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { LogoColorProvider } from "@/contexts/LogoColorContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#06060a",
};

import { SITE_URL } from "@/lib/site";
import { getSocialSameAs } from "@/lib/social";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_OG_DESCRIPTION,
  SITE_EMAIL,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Velora Studio | Premium Web Design Agency — Websites That Convert",
    template: "%s | Velora Studio",
  },
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: "Velora Studio", url: SITE_URL }],
  creator: "Velora Studio",
  publisher: "Velora Studio",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  },
  openGraph: {
    title: "Velora Studio | Premium Web Design Agency — Websites That Convert",
    description: SEO_OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "Velora Studio",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Velora Studio — Premium Web Design Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Studio | Premium Web Design Agency",
    description: SEO_OG_DESCRIPTION,
    images: ["/og.png"],
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "Velora Studio",
  url: SITE_URL,
  description: SEO_DEFAULT_DESCRIPTION,
  email: SITE_EMAIL,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE_EMAIL,
      url: `${SITE_URL}/contact`,
      availableLanguage: ["English"],
    },
  ],
  knowsAbout: [
    "Web design",
    "Website development",
    "Landing page design",
    "Website redesign",
    "Conversion rate optimization",
    "Responsive design",
    "Mobile-first web design",
  ],
  sameAs: getSocialSameAs(),
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: "Velora Studio",
  alternateName: ["Velora Studio Web Design", "Velora Studio Agency"],
  url: SITE_URL,
  description: SEO_OG_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-US",
  potentialAction: [
    {
      "@type": "ReadAction",
      target: SITE_URL,
    },
    {
      "@type": "ContactAction",
      name: "Start a website project",
      target: `${SITE_URL}/start-project`,
    },
  ],
};

const jsonLdProfessionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#professional-service`,
  name: "Velora Studio — Web design services",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  description: SEO_OG_DESCRIPTION,
  provider: { "@id": `${SITE_URL}#organization` },
  serviceType: [
    "Custom website design",
    "Business website development",
    "Landing page design",
    "Website templates",
  ],
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${sourceSans.variable} min-h-screen bg-neutral-950 text-white font-body antialiased overflow-x-hidden`}>
        <LogoColorProvider>
        {/* Film grain overlay */}
        <div aria-hidden className="noise-overlay" />
        {/* Custom cursor (pointer:fine only) */}
        <CustomCursor />
        {/* Scroll progress bar */}
        <ScrollProgress />
        <Navbar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfessionalService) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-3 focus:bg-primary-purple focus:text-white focus:rounded-full focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:[clip:auto]"
        >
          Skip to main content
        </a>
        {children}
        <Footer />
        <Analytics />
        </LogoColorProvider>
      </body>
    </html>
  );
}
