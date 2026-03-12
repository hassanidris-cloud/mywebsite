"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEO_SRC = "/hero-bg.mp4";

export default function VideoBackground() {
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800, 2000], [0, -80, -200]);
  const scale = useTransform(scrollY, [0, 600, 1200], [1, 1.05, 1.12]);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 z-0 bg-neutral-950"
        aria-hidden
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
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
    </div>
  );
}
