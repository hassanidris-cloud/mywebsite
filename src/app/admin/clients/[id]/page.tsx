"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  FolderKanban,
  FileText,
  CreditCard,
  StickyNote,
  Plus,
  Pencil,
  Check,
  X,
} from "lucide-react";
import {
  projectTypeLabel,
  projectStatusLabel,
  type ProjectRow,
  type ClientRow,
  type ClientNoteRow,
  type PaymentRow,
} from "@/lib/clients-projects";

type ProjectWithStatus = ProjectRow & { paymentStatus?: string };

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

const STATUS_COLORS: Record<string, string> = {
  inquiry: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  planning: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "in progress": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  revision: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export default function AdminClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [client, setClient] = useState<ClientRow | null>(null);
  const [projects, setProjects] = useState<ProjectWithStatus[]>([]);
  const [files, setFiles] = useState<{ id: string; file_name?: string; file_url?: string }[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [notes, setNotes] = useState<ClientNoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<"checking" | "unauthenticated" | "authenticated">("checking");
  const [editingClient, setEditingClient] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", company: "", phone: "" });
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);

  const [dbUnavailable, setDbUnavailable] = useState(false);

  const load = useCallback(() => {
    if (!id) return;
    setDbUnavailable(false);
    fetch(`/api/admin/clients/${id}`)
      .then((r) => {
        if (r.status === 503) {
          setDbUnavailable(true);
          setLoading(false);
          return;
        }
        return r.json();
      })
      .then((data: {
        client?: ClientRow;
        projects?: ProjectRow[];
        files?: { id: string; file_name?: string; file_url?: string }[];
        payments?: PaymentRow[];
        notes?: ClientNoteRow[];
      } | undefined) => {
        if (data == null) return;
        setClient(data.client ?? null);
        setProjects((data.projects ?? []) as ProjectWithStatus[]);
        setFiles(data.files ?? []);
        setPayments(data.payments ?? []);
        setNotes(data.notes ?? []);
        if (data.client) {
          setEditForm({
            name: data.client.name,
            email: data.client.email,
            company: data.client.company ?? "",
            phone: data.client.phone ?? "",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setAuth("authenticated");
          if (id) load();
        } else {
          setAuth("unauthenticated");
          setLoading(false);
        }
      })
      .catch(() => {
        setAuth("unauthenticated");
        setLoading(false);
      });
  }, [id, load]);

  async function handleSaveClient() {
    if (!id || !client) return;
    setSaving(true);
    const res = await fetch(`/api/admin/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setSaving(false);
    if (res.ok) {
      const data = await res.json();
      setClient(data.client);
      setEditingClient(false);
    }
  }

  async function handleCreateProject() {
    if (!id || !newProjectName.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: id, project_name: newProjectName.trim() }),
    });
    setSaving(false);
    if (res.ok) {
      setNewProjectOpen(false);
      setNewProjectName("");
      load();
    }
  }

  async function handleAddNote() {
    if (!id || !newNote.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: id, note: newNote.trim() }),
    });
    setSaving(false);
    if (res.ok) {
      setNewNote("");
      load();
    }
  }

  if (auth === "unauthenticated") {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Link href="/admin" className="text-indigo-400 hover:underline">Go to admin login</Link>
      </div>
    );
  }

  if (dbUnavailable) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <p className="text-white/80 font-medium">Database not set up yet</p>
          <p className="mt-2 text-sm text-white/50">
            Connect Supabase and run the client/project schema to use the dashboard. Until then, project requests still work and you’ll get emails as usual.
          </p>
          <Link href="/admin" className="mt-6 inline-block text-indigo-400 hover:text-indigo-300 text-sm font-medium">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !client) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-white/60">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Client Details */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <User className="w-5 h-5 text-indigo-400" />
            <h2 className="font-heading font-semibold text-white">Client details</h2>
            {!editingClient ? (
              <button
                type="button"
                onClick={() => setEditingClient(true)}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
            ) : (
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingClient(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveClient}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300"
                >
                  <Check className="w-3.5 h-3.5" /> Save
                </button>
              </div>
            )}
          </div>
          <div className="p-6">
            {editingClient ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="block text-xs font-medium text-white/50 mb-1">Name</span>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-medium text-white/50 mb-1">Email</span>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-medium text-white/50 mb-1">Phone</span>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="block text-xs font-medium text-white/50 mb-1">Company</span>
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => setEditForm((f) => ({ ...f, company: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
              </div>
            ) : (
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-white/50">Client ID</dt>
                  <dd className="font-mono text-sm text-indigo-400 mt-0.5">{client.client_id}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-white/50">Name</dt>
                  <dd className="text-white mt-0.5">{client.name}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-white/50">Email</dt>
                  <dd className="text-white mt-0.5">{client.email}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-white/50">Phone</dt>
                  <dd className="text-white mt-0.5">{client.phone || "—"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-medium text-white/50">Company</dt>
                  <dd className="text-white mt-0.5">{client.company || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-white/50">Added</dt>
                  <dd className="text-white/60 text-sm mt-0.5">{formatDate(client.created_at)}</dd>
                </div>
              </dl>
            )}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <FolderKanban className="w-5 h-5 text-indigo-400" />
            <h2 className="font-heading font-semibold text-white">Projects</h2>
            <button
              type="button"
              onClick={() => setNewProjectOpen(true)}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300"
            >
              <Plus className="w-3.5 h-3.5" /> New project
            </button>
          </div>
          <div className="p-6">
            {newProjectOpen && (
              <div className="mb-6 flex gap-2">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Project name"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleCreateProject}
                  disabled={saving || !newProjectName.trim()}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:opacity-50"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => { setNewProjectOpen(false); setNewProjectName(""); }}
                  className="px-4 py-2 rounded-lg border border-white/20 text-white/80 text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
            {projects.length === 0 ? (
              <p className="text-white/50 text-sm">No projects yet.</p>
            ) : (
              <ul className="space-y-3">
                {projects.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-white">{p.project_name}</p>
                      <p className="text-xs text-white/50 mt-0.5">
                        {projectTypeLabel(p.project_type)} · {formatDate(p.created_at)}
                        {p.deadline && ` · Due ${formatDate(p.deadline)}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {p.price != null && (
                        <span className="text-sm text-white/70">€{p.price}</span>
                      )}
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ${STATUS_COLORS[p.status] ?? "bg-white/10 text-white/70"}`}>
                        {projectStatusLabel(p.status)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>

        {/* Files */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="font-heading font-semibold text-white">Files</h2>
          </div>
          <div className="p-6">
            {files.length === 0 ? (
              <p className="text-white/50 text-sm">No files uploaded yet.</p>
            ) : (
              <ul className="space-y-2">
                {files.map((f, i) => (
                  <li key={f.id ?? i} className="text-sm text-white/80">
                    {f.file_url ? (
                      <a href={f.file_url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                        {f.file_name ?? "File"}
                      </a>
                    ) : (
                      <span>{f.file_name ?? "File"}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>

        {/* Payments */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <CreditCard className="w-5 h-5 text-indigo-400" />
            <h2 className="font-heading font-semibold text-white">Payments</h2>
          </div>
          <div className="p-6">
            {payments.length === 0 ? (
              <p className="text-white/50 text-sm">No payments recorded yet.</p>
            ) : (
              <ul className="space-y-3">
                {payments.map((pay) => (
                  <li key={pay.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <span className="text-white">€{pay.amount} {pay.currency.toUpperCase()}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${pay.status === "paid" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/60"}`}>
                      {pay.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>

        {/* Notes */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <StickyNote className="w-5 h-5 text-indigo-400" />
            <h2 className="font-heading font-semibold text-white">Notes</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex gap-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note…"
                rows={2}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-500 resize-none"
              />
              <button
                type="button"
                onClick={handleAddNote}
                disabled={saving || !newNote.trim()}
                className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:opacity-50 self-end"
              >
                Add
              </button>
            </div>
            {notes.length === 0 ? (
              <p className="text-white/50 text-sm">No notes yet.</p>
            ) : (
              <ul className="space-y-3">
                {notes.map((n) => (
                  <li key={n.id} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80">
                    <p className="whitespace-pre-wrap">{n.note}</p>
                    <p className="text-[10px] text-white/40 mt-2">{formatDate(n.created_at)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
