"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

/** RGB tuple for interpolation */
type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: RGB): string {
  return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Ease-in-out so transition is smooth at segment boundaries (not linear snap) */
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Palettes match the logo's gradient animation (VeloraIcon.tsx).
 * Stored as hex; we convert to RGB for smooth lerp. Full cycle 3s, 4 phases.
 */
const PALETTE_HEX = [
  { primary: "#7C3AED", accent: "#A78BFA", pale: "#EDE9FE", darker: "#6D28D9", lighter: "#C4B5FD" },
  { primary: "#38BDF8", accent: "#7DD3FC", pale: "#E0F2FE", darker: "#0EA5E9", lighter: "#7DD3FC" },
  { primary: "#0EA5E9", accent: "#38BDF8", pale: "#E0F2FE", darker: "#0284C7", lighter: "#38BDF8" },
  { primary: "#7C3AED", accent: "#A78BFA", pale: "#EDE9FE", darker: "#6D28D9", lighter: "#C4B5FD" },
] as const;

const PALETTES_RGB = PALETTE_HEX.map((p) => ({
  primary: hexToRgb(p.primary),
  accent: hexToRgb(p.accent),
  pale: hexToRgb(p.pale),
  darker: hexToRgb(p.darker),
  lighter: hexToRgb(p.lighter),
}));

const CYCLE_MS = 3000;
const STATE_UPDATE_INTERVAL_MS = 120; // Throttle React state so we don't re-render 60fps

type Phase = 0 | 1 | 2 | 3;

export type Palette = {
  primary: string;
  accent: string;
  pale: string;
  darker: string;
  lighter: string;
  primaryRgb: string;
  accentRgb: string;
};

const LogoColorContext = createContext<{ phase: Phase; palette: Palette } | null>(null);

function applyPaletteToRoot(p: {
  primary: string;
  accent: string;
  pale: string;
  darker: string;
  lighter: string;
  primaryRgb: string;
  accentRgb: string;
}) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--color-primary", p.primary);
  root.style.setProperty("--color-primary-accent", p.accent);
  root.style.setProperty("--color-primary-pale", p.pale);
  root.style.setProperty("--color-primary-darker", p.darker);
  root.style.setProperty("--color-primary-lighter", p.lighter);
  root.style.setProperty("--color-primary-rgb", p.primaryRgb);
  root.style.setProperty("--color-primary-accent-rgb", p.accentRgb);
}

function interpolatedPalette(phase: number, progress: number): Palette {
  const i = Math.min(3, Math.max(0, Math.floor(phase) % 4));
  const j = (i + 1) % 4;
  const t = easeInOut(Number.isFinite(progress) ? progress : 0);
  const a = PALETTES_RGB[i];
  const b = PALETTES_RGB[j];
  if (!a || !b) {
    return {
      primary: PALETTE_HEX[0].primary,
      accent: PALETTE_HEX[0].accent,
      pale: PALETTE_HEX[0].pale,
      darker: PALETTE_HEX[0].darker,
      lighter: PALETTE_HEX[0].lighter,
      primaryRgb: "124, 58, 237",
      accentRgb: "167, 139, 250",
    };
  }
  return {
    primary: rgbToHex(lerpRgb(a.primary, b.primary, t)),
    accent: rgbToHex(lerpRgb(a.accent, b.accent, t)),
    pale: rgbToHex(lerpRgb(a.pale, b.pale, t)),
    darker: rgbToHex(lerpRgb(a.darker, b.darker, t)),
    lighter: rgbToHex(lerpRgb(a.lighter, b.lighter, t)),
    primaryRgb: lerpRgb(a.primary, b.primary, t).map((x) => Math.round(x)).join(", "),
    accentRgb: lerpRgb(a.accent, b.accent, t).map((x) => Math.round(x)).join(", "),
  };
}

export function LogoColorProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState<Palette>(() => ({
    primary: PALETTE_HEX[0].primary,
    accent: PALETTE_HEX[0].accent,
    pale: PALETTE_HEX[0].pale,
    darker: PALETTE_HEX[0].darker,
    lighter: PALETTE_HEX[0].lighter,
    primaryRgb: "124, 58, 237",
    accentRgb: "167, 139, 250",
  }));
  const phaseRef = useRef<Phase>(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const lastStateUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    startRef.current = performance.now();
    lastStateUpdateRef.current = 0;
    const initial = {
      primary: PALETTE_HEX[0].primary,
      accent: PALETTE_HEX[0].accent,
      pale: PALETTE_HEX[0].pale,
      darker: PALETTE_HEX[0].darker,
      lighter: PALETTE_HEX[0].lighter,
      primaryRgb: "124, 58, 237",
      accentRgb: "167, 139, 250",
    };
    applyPaletteToRoot(initial);

    const tick = (now: number) => {
      const elapsed = Number.isFinite(now) ? now - startRef.current : 0;
      const t = Number.isFinite(elapsed) ? (elapsed % CYCLE_MS) / CYCLE_MS : 0;
      const phaseIndex = t * 4;
      const phase = Math.floor(phaseIndex) % 4;
      const progress = phaseIndex - Math.floor(phaseIndex);
      const next = interpolatedPalette(phase, progress);
      phaseRef.current = phase as Phase;
      applyPaletteToRoot(next);
      if (now - lastStateUpdateRef.current >= STATE_UPDATE_INTERVAL_MS) {
        lastStateUpdateRef.current = now;
        setPalette(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    applyPaletteToRoot(palette);
  }, [palette]);

  return (
    <LogoColorContext.Provider value={{ phase: phaseRef.current, palette }}>
      {children}
    </LogoColorContext.Provider>
  );
}

export function useLogoColor() {
  const ctx = useContext(LogoColorContext);
  const fallback: Palette = {
    primary: PALETTE_HEX[0].primary,
    accent: PALETTE_HEX[0].accent,
    pale: PALETTE_HEX[0].pale,
    darker: PALETTE_HEX[0].darker,
    lighter: PALETTE_HEX[0].lighter,
    primaryRgb: "124, 58, 237",
    accentRgb: "167, 139, 250",
  };
  return ctx ?? { phase: 0 as Phase, palette: fallback };
}
