"use client";

import { useState, useRef, useCallback } from "react";

const DEFAULT_MAX_TILT = 8;

/**
 * Returns ref and motion style for a subtle 3D tilt effect based on mouse position.
 * GPU-friendly (transform only). Use with motion.div style={{ ...tiltStyle }}.
 */
export function useTilt(maxTilt = DEFAULT_MAX_TILT) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const centerX = 0.5;
      const centerY = 0.5;
      const rotateY = (x - centerX) * 2 * maxTilt;
      const rotateX = (centerY - y) * 2 * maxTilt;
      setStyle({ rotateX, rotateY });
    },
    [maxTilt]
  );

  const handleLeave = useCallback(() => {
    setStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  return {
    ref,
    tiltStyle: {
      rotateX: style.rotateX,
      rotateY: style.rotateY,
      transformPerspective: 800,
    },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  };
}
