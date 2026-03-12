"use client";

export default function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "popular";
  className?: string;
}) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";
  const variants = {
    default: "bg-cream/10 text-cream/90 border border",
    popular: "bg-gradient-to-r from-primary-purple/30 to-primary-blue/30 text-cream border border-primary-accent/30",
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
