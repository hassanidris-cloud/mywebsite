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
      {/* Dark overlay so content stays readable */}
      <div
        className="absolute inset-0 bg-neutral-950/70"
        aria-hidden
      />
      {/* Subtle gradient for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-transparent to-neutral-950/80"
        aria-hidden
      />
    </div>
  );
}
