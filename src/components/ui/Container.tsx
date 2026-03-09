"use client";

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
