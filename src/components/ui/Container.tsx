"use client";

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
