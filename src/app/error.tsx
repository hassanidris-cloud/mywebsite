"use client";

import { useEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Velora Studio] Error boundary caught:", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center px-4" role="main">
      <Container className="max-w-lg text-center">
        <h1 className="font-heading text-2xl font-bold text-cream mb-2">
          Something went wrong
        </h1>
        <p className="text-cream/70 mb-6">
          We&apos;re sorry. Please try again or go back to the home page.
        </p>
        {isDev && error?.message && (
          <pre className="text-left text-sm text-red-400/90 bg-black/30 p-4 rounded-xl mb-6 overflow-auto max-h-40">
            {error.message}
          </pre>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Go home
          </Button>
        </div>
      </Container>
    </main>
  );
}
