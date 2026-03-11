"use client";

export default function Input({
  label,
  type = "text",
  placeholder,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-cream/80 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-cream/5 border border text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all text-base"
        {...props}
      />
    </div>
  );
}
