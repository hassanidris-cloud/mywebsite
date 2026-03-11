"use client";

import { useState, useEffect } from "react";

/**
 * Returns normalized mouse position in a container (0–1 from left/top).
 * Used for cursor-reactive lighting and tilt effects.
 */
export function useMousePosition(containerRef: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setPosition({
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
      });
    };

    const handleLeave = () => setPosition({ x: 0.5, y: 0.5 });

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef]);

  return position;
}
