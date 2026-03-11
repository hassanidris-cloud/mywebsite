"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Catches errors in the root layout. Renders a minimal fallback so the user sees something.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Velora Studio] Global error:", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0912", color: "#f5f3ef", fontFamily: "system-ui, sans-serif", padding: "2rem", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>
            We&apos;re sorry. Please try again or go back to the home page.
          </p>
          {isDev && error?.message && (
            <pre style={{ textAlign: "left", fontSize: "0.875rem", color: "#f87171", background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "0.75rem", overflow: "auto", maxHeight: "10rem", marginBottom: "1.5rem" }}>
              {error.message}
            </pre>
          )}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{ padding: "0.75rem 1.5rem", borderRadius: "9999px", fontWeight: 600, background: "linear-gradient(135deg, #7C3AED, #A78BFA)", color: "#f5f3ef", border: "none", cursor: "pointer" }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{ padding: "0.75rem 1.5rem", borderRadius: "9999px", fontWeight: 600, border: "2px solid rgba(245,243,239,0.2)", color: "#f5f3ef", textDecoration: "none" }}
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
