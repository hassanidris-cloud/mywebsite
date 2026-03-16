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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Velora Studio | Premium Web Design Agency — Websites That Convert",
    template: "%s | Velora Studio",
  },
  description:
    "Velora Studio is a premium web design agency. We build modern, high-performance websites for startups and growing businesses. Fixed price, 2–4 weeks. Conversion-focused design. Start your project with Velora Studio.",
  keywords: [
    "Velora Studio",
    "velora studio",
    "web design agency",
    "website design agency",
    "custom website",
    "startup website",
    "business website",
    "high-performance website",
    "premium web design",
    "conversion-focused design",
  ],
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
    title: "Velora Studio | Premium Web Design Agency",
    description:
      "Velora Studio builds modern, high-performance websites for startups and businesses. Fixed price, 2–4 weeks. Conversion-focused design.",
    url: SITE_URL,
    siteName: "Velora Studio",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Velora Studio — Premium Web Design Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Studio | Premium Web Design Agency",
    description: "Velora Studio — modern websites for startups and businesses. Fixed price, 2–4 weeks.",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "Velora Studio",
  url: SITE_URL,
  description:
    "Velora Studio is a premium web design agency. We build modern, high-performance websites for startups and growing businesses. Fixed price, 2–4 weeks.",
  sameAs: [],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: "Velora Studio",
  alternateName: "Velora Studio Web Design",
  url: SITE_URL,
  description:
    "Velora Studio — premium web design agency. Modern websites for startups and businesses. Fixed price, 2–4 weeks.",
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "ReadAction",
    target: SITE_URL,
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
