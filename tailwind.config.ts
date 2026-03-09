import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand: violet + warm accent (distinctive, not generic purple/blue)
        primary: {
          DEFAULT: "#7C3AED",
          purple: "#7C3AED",
          accent: "#A78BFA",
          blue: "#38BDF8",
          warm: "#F59E0B",   // amber – signature highlight
        },
        // Backgrounds
        dark: "#0B0B0F",
        light: "#F8FAFC",
        // Text
        "text-dark": "#0F172A",
        "text-light": "#FFFFFF",
        // UI
        border: "#E5E7EB",
        "border-muted": "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Syne", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["64px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "section-title": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        subheading: ["22px", { lineHeight: "1.4" }],
        body: ["16px", { lineHeight: "1.6" }],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #7C3AED 0%, #A78BFA 40%, #F59E0B 100%)",
        "gradient-brand-hover": "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 40%, #D97706 100%)",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(124, 58, 237, 0.35)",
        "glow-strong": "0 0 80px -10px rgba(124, 58, 237, 0.45)",
        "button-glow": "0 0 32px -4px rgba(124, 58, 237, 0.5)",
        card: "0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.04)",
        "card-hover": "0 24px 48px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)",
        "nav-bar": "0 1px 0 0 rgba(255,255,255,0.06)",
      },
      transitionDuration: {
        250: "250ms",
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "gradient-shift": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
