"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  external = false,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2 focus:ring-offset-dark";

  const variants = {
    primary:
      "bg-gradient-to-br from-primary-purple via-primary-accent to-primary-warm text-white shadow-lg hover:shadow-button-glow active:scale-[0.98]",
    secondary:
      "border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 active:scale-[0.98]",
    ghost:
      "text-white/90 hover:text-white hover:bg-white/5 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm min-h-[44px] min-w-[44px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>(null);
  const [xy, setXy] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant !== "primary" || !ref.current) return;
    const el = ref.current.getBoundingClientRect();
    const x = (e.clientX - el.left - el.width / 2) * 0.12;
    const y = (e.clientY - el.top - el.height / 2) * 0.12;
    setXy({ x: Math.max(-4, Math.min(4, x)), y: Math.max(-4, Math.min(4, y)) });
  };
  const handleMouseLeave = () => setXy({ x: 0, y: 0 });

  const motionProps = {
    animate: variant === "primary" ? { x: xy.x, y: xy.y } : {},
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    ...(variant === "primary" && { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }),
    whileTap: { scale: 0.98 },
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.span ref={ref as React.RefObject<HTMLSpanElement>} {...motionProps}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
