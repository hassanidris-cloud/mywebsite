"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight, LayoutDashboard } from "lucide-react";

type Client = {
  id: string;
  client_id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  created_at: string;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function AdminDashboardPage() {
  const [auth, setAuth] = useState<"checking" | "unauthenticated" | "authenticated">("checking");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [projectCounts, setProjectCounts] = useState<Record<string, number>>({});
  const [projectStatuses, setProjectStatuses] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setAuth("authenticated");
          fetch("/api/admin/clients")
            .then((r) => r.json())
            .then((d: { clients?: Client[]; projectCounts?: Record<string, number>; projectStatuses?: Record<string, string[]> }) => {
              setClients(d.clients ?? []);
              setProjectCounts(d.projectCounts ?? {});
              setProjectStatuses(d.projectStatuses ?? {});
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setAuth("unauthenticated");
          setLoading(false);
        }
      })
      .catch(() => {
        setAuth("unauthenticated");
        setLoading(false);
      });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.ok) {
      setAuth("authenticated");
      const r = await fetch("/api/admin/clients");
      const d = await r.json();
      setClients(d.clients ?? []);
      setProjectCounts(d.projectCounts ?? {});
      setProjectStatuses(d.projectStatuses ?? {});
    } else {
      setLoginError("Invalid password.");
    }
  }

  if (auth === "checking" || loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-white/60">Loading…</p>
      </div>
    );
  }

  if (auth === "unauthenticated") {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-heading text-xl font-semibold text-white mb-4">Admin login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          {loginError && <p className="text-sm text-red-400">{loginError}</p>}
          <button type="submit" className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors">
            Log in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm text-white/50">Clients & projects</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/leads" className="text-sm text-white/60 hover:text-white transition-colors">
              Leads
            </Link>
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-8">
          <Users className="w-5 h-5 text-white/50" />
          <h2 className="font-heading text-lg font-semibold text-white/90">All clients</h2>
          <span className="text-sm text-white/40">({clients.length})</span>
        </div>

        {clients.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center"
          >
            <p className="text-white/50">No clients yet.</p>
            <p className="text-sm text-white/40 mt-1">New project requests will create clients here.</p>
          </motion.div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client, i) => {
              const count = projectCounts[client.id] ?? 0;
              const statuses = projectStatuses[client.id] ?? [];
              const hasInquiry = statuses.includes("inquiry");
              const hasInProgress = statuses.includes("in progress") || statuses.includes("revision");
              const completed = statuses.filter((s) => s === "completed").length;
              return (
                <motion.li
                  key={client.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs font-medium text-indigo-400/90">{client.client_id}</p>
                        <h3 className="font-heading font-semibold text-white mt-1 truncate">{client.name}</h3>
                        <p className="text-sm text-white/50 truncate mt-0.5">{client.email}</p>
                        {client.company && (
                          <p className="text-xs text-white/40 mt-1 truncate">{client.company}</p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0 mt-1" />
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-sm text-white/50">{count} project{count !== 1 ? "s" : ""}</span>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {hasInquiry && (
                          <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            Inquiry
                          </span>
                        )}
                        {hasInProgress && (
                          <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                            Active
                          </span>
                        )}
                        {completed > 0 && (
                          <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {completed} done
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] text-white/30 mt-2">{formatDate(client.created_at)}</p>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
