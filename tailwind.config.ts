import type { Config } from "tailwindcss";

/**
 * Velora Studio – editorial creative theme.
 * Smoky dark + cream + signature accent. Handcrafted, premium, memorable.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          purple: "var(--color-primary)",
          accent: "var(--color-primary-accent)",
          pale: "var(--color-primary-pale)",
          darker: "var(--color-primary-darker)",
          lighter: "var(--color-primary-lighter)",
          cool: "var(--color-primary-cool)",
          blue: "#38BDF8",
          warm: "var(--color-warm)",
        },
        warm: "var(--color-warm)",
        cool: "var(--color-cool)",
        rose: "var(--color-rose)",
        dark: "var(--color-base)",
        "dark-elevated": "var(--color-base-elevated)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        "surface-card": "var(--color-surface-card)",
        cream: "var(--color-cream)",
        "cream-muted": "var(--color-cream-muted)",
        ink: "var(--color-ink)",
        light: "var(--color-cream)",
        "text-dark": "var(--color-text-dark)",
        "text-light": "var(--color-text-light)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        "border-muted": "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Syne", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["var(--text-hero)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        display: ["var(--text-display)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "section-title": ["var(--text-section)", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        subheading: ["var(--text-subheading)", { lineHeight: "1.4" }],
        body: ["var(--text-body)", { lineHeight: "1.7" }],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-accent) 45%, var(--color-warm) 100%)",
        "gradient-brand-hover": "linear-gradient(135deg, var(--color-primary-darker) 0%, var(--color-primary) 50%, var(--color-primary-accent) 100%)",
        "gradient-surface": "linear-gradient(180deg, var(--color-surface) 0%, var(--color-base) 100%)",
        "halo-primary": "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(var(--color-primary-rgb), 0.14), transparent 55%)",
        "halo-accent": "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(var(--color-primary-accent-rgb), 0.1), transparent 50%)",
        "halo-soft": "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--color-primary-accent-rgb), 0.07), transparent 60%)",
        "hero-halo-deep": "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(var(--color-primary-rgb), 0.14), transparent 55%)",
        "hero-halo-mid": "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(var(--color-primary-accent-rgb), 0.09), transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(var(--color-primary-rgb), 0.3)",
        "glow-strong": "0 0 80px -10px rgba(var(--color-primary-rgb), 0.4)",
        "glow-accent": "0 0 50px -10px rgba(var(--color-primary-accent-rgb), 0.25)",
        "glow-warm": "0 0 40px -8px rgba(var(--color-warm-rgb), 0.25)",
        "button-glow": "0 0 36px -4px rgba(var(--color-primary-rgb), 0.5)",
        card: "0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(245,243,239,0.04)",
        "card-hover": "0 28px 56px -14px rgba(0,0,0,0.45), 0 0 0 1px rgba(245,243,239,0.06), 0 0 50px -12px rgba(var(--color-primary-rgb), 0.12)",
        "nav-bar": "0 1px 0 0 var(--color-border)",
        "surface-elevated": "0 12px 40px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,243,239,0.04)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.9" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
