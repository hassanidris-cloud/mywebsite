"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { LeadRow } from "@/lib/supabase-server";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

function formatBudget(b: string | null) {
  if (!b) return "—";
  const map: Record<string, string> = { "1k-3k": "€1k–€3k", "3k-7k": "€3k–€7k", "7k-15k": "€7k–€15k", "15k-plus": "€15k+" };
  return map[b] ?? b;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<"checking" | "unauthenticated" | "authenticated">("checking");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setAuth("authenticated");
          fetch("/api/admin/leads")
            .then((r) => r.json())
            .then((d) => { setLeads(d.leads ?? []); setLoading(false); })
            .catch(() => setLoading(false));
        } else {
          setAuth("unauthenticated");
          setLoading(false);
        }
      })
      .catch(() => { setAuth("unauthenticated"); setLoading(false); });
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
      const r = await fetch("/api/admin/leads");
      const d = await r.json();
      setLeads(d.leads ?? []);
    } else {
      setLoginError("Invalid password.");
    }
  }

  if (auth === "checking" || loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <p className="text-white/60">Loading…</p>
      </div>
    );
  }

  if (auth === "unauthenticated") {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-heading text-xl font-semibold text-white mb-4">Admin login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-accent"
            required
          />
          {loginError && <p className="text-sm text-red-400">{loginError}</p>}
          <button type="submit" className="w-full px-4 py-3 rounded-full bg-primary-purple text-white font-semibold hover:opacity-90">
            Log in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl font-bold text-white">Leads</h1>
          <Link href="/" className="text-sm text-white/60 hover:text-white">Back to site</Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wider">Budget</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wider">Timeline</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-white/50">No leads yet.</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className={`border-b border-white/5 ${lead.is_high_value ? "bg-primary-purple/10" : ""}`}>
                      <td className="px-4 py-3 text-white font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-white/80">{lead.email}</td>
                      <td className="px-4 py-3 text-white/70">{lead.company || "—"}</td>
                      <td className="px-4 py-3 text-white/70">{formatBudget(lead.budget)}</td>
                      <td className="px-4 py-3 text-white/70">{lead.timeline || "—"}</td>
                      <td className="px-4 py-3 text-white/60 text-sm">{formatDate(lead.created_at)}</td>
                      <td className="px-4 py-3">
                        {lead.is_high_value ? (
                          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-accent/30 text-primary-accent border border-primary-accent/50">
                            High Value Lead
                          </span>
                        ) : (
                          <span className="text-white/40">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
