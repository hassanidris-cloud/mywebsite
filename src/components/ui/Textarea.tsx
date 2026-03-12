"use client";

export default function Textarea({
  label,
  placeholder,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-cream/80 mb-2">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent/50 transition-all resize-y min-h-[120px]"
        {...props}
      />
    </div>
  );
}
