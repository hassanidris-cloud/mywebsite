import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark flex flex-col items-center justify-center px-6" role="main">
      <h1 className="font-heading text-6xl sm:text-8xl font-bold text-white/10 mb-4">404</h1>
      <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-2">
        Page not found
      </h2>
      <p className="text-white/60 text-center max-w-sm mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-gradient-to-br from-primary-purple via-primary-accent to-primary-blue px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
