import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Velora Studio",
  description: "Client and project management",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
