"use client";

export default function Select({
  label,
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-cream/80 mb-2">
          {label}
        </label>
      )}
      <select
        className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent/50 transition-all [&>option]:bg-neutral-900 [&>option]:text-white text-base"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
