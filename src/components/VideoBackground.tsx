"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEO_SRC = "/hero-bg.mp4";

type Props = { contained?: boolean };

export default function VideoBackground({ contained = false }: Props) {
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800, 2000], [0, -80, -200]);
  const scale = useTransform(scrollY, [0, 600, 1200], [1, 1.05, 1.12]);

  useEffect(() => setMounted(true), []);

  const positionClass = contained ? "absolute inset-0" : "fixed inset-0";

  if (!mounted) {
    return (
      <div
        className={`${positionClass} z-0 bg-neutral-950`}
        aria-hidden
      />
    );
  }

  return (
    <div className={`${positionClass} z-0 overflow-hidden pointer-events-none`} aria-hidden>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover min-h-[100%] min-w-[100%]"
          src={VIDEO_SRC}
        />
      </motion.div>
      {/* Warm, soft overlay — readable and welcoming */}
      <div
        className="absolute inset-0 bg-neutral-950/60"
        aria-hidden
      />
      {/* Mesmerizing gradient: soft violet → warm amber at bottom */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-transparent to-amber-950/30"
        aria-hidden
      />
      {/* Depth: darker at edges, lighter in center */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_0%,rgba(10,10,20,0.4)_100%)]"
        aria-hidden
      />
      {/* Subtle film grain for texture and beauty */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
        aria-hidden
      />
    </div>
  );
}
