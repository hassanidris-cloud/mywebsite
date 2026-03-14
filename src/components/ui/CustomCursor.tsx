"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicking, setClicking] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 }
  const ringX = useSpring(rawX, springConfig)
  const ringY = useSpring(rawY, springConfig)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      const target = e.target as HTMLElement
      setHovered(
        !!target.closest("a, button, [role='button'], label, input, textarea, select, summary")
      )
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [rawX, rawY])

  if (!mounted) return null

  const RING = 36
  const DOT = 5

  return (
    <>
      {/* Outer ring – spring-lagged */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: RING,
          height: RING,
          x: ringX,
          y: ringY,
          marginLeft: -RING / 2,
          marginTop: -RING / 2,
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "50%",
          border: `1.5px solid rgba(167,139,250,${hovered ? 0.95 : 0.6})`,
          backgroundColor: hovered ? "rgba(167,139,250,0.07)" : "transparent",
          boxShadow: hovered
            ? "0 0 24px rgba(167,139,250,0.25), inset 0 0 12px rgba(167,139,250,0.05)"
            : "none",
        }}
        animate={{
          scale: clicking ? 0.72 : hovered ? 1.65 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />

      {/* Inner dot – instant */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: DOT,
          height: DOT,
          x: rawX,
          y: rawY,
          marginLeft: -DOT / 2,
          marginTop: -DOT / 2,
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "50%",
          backgroundColor: "rgba(167,139,250,0.95)",
          boxShadow: "0 0 10px rgba(167,139,250,0.6)",
        }}
        animate={{
          scale: hovered ? 0 : clicking ? 3 : 1,
          opacity: clicking ? 0.25 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  )
}
