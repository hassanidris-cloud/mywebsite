"use client";

import { useId } from "react";
import { motion } from "framer-motion";

export default function VeloraIcon({
  size = 80,
  animated = true,
  className = "",
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const gradientId = `veloraGrad-${id}`;
  const filterId = `veloraGlow-${id}`;

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA">
            {animated && (
              <animate
                attributeName="stop-color"
                values="#A78BFA;#7DD3FC;#38BDF8;#A78BFA"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="100%" stopColor="#7C3AED">
            {animated && (
              <animate
                attributeName="stop-color"
                values="#7C3AED;#38BDF8;#0EA5E9;#7C3AED"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </stop>
        </linearGradient>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <circle
          cx="40"
          cy="40"
          r="34"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          fill="none"
        >
          {animated && (
            <animate
              attributeName="opacity"
              values="0.9;1;0.9"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <path d="M24 22 L38 56 L44 44 L30 22 Z" fill="#FFFFFF" />
        <path d="M56 22 L44 44 L50 56 L68 22 Z" fill="#EDE9FE" />
        <path d="M38 22 L50 22 L44 34 Z" fill={`url(#${gradientId})`} />
      </g>
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        className="inline-block"
      >
        {icon}
      </motion.div>
    );
  }

  return <span className="inline-block">{icon}</span>;
}
