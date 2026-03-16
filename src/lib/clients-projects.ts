import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase-server";

export type ClientRow = {
  id: string;
  client_id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectRow = {
  id: string;
  client_id: string;
  project_name: string;
  project_type: string | null;
  description: string | null;
  status: string;
  price: number | null;
  deadline: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectStatus = "inquiry" | "planning" | "in progress" | "revision" | "completed";

export type PaymentRow = {
  id: string;
  project_id: string;
  amount: number;
  currency: string;
  status: string;
  stripe_payment_id: string | null;
  notes: string | null;
  paid_at: string | null;
  created_at: string;
};

export type ClientNoteRow = {
  id: string;
  client_id: string;
  note: string;
  created_at: string;
};

/** Get existing client by email or create new one with next CLxxx ID. */
export async function getOrCreateClient(params: {
  email: string;
  name: string;
  company?: string | null;
  phone?: string | null;
}): Promise<{ client: ClientRow } | { error: string }> {
  const supabase = getServerSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return { error: "Database not configured." };
  }
  const normalizedEmail = params.email.trim().toLowerCase();
  if (!normalizedEmail) return { error: "Email is required." };

  const { data: existing } = await supabase
    .from("clients")
    .select("*")
    .eq("email", normalizedEmail)
    .limit(1)
    .maybeSingle();

  if (existing) {
    const updates: Partial<ClientRow> = {};
    if (params.name?.trim()) updates.name = params.name.trim();
    if (params.company !== undefined) updates.company = params.company?.trim() || null;
    if (params.phone !== undefined) updates.phone = params.phone?.trim() || null;
    updates.updated_at = new Date().toISOString();
    if (Object.keys(updates).length > 1) {
      await supabase.from("clients").update(updates).eq("id", existing.id);
    }
    return { client: { ...existing, ...updates } as ClientRow };
  }

  let nextId: string | null = null;
  const { data: rpcId, error: rpcError } = await supabase.rpc("next_client_id");
  if (!rpcError && rpcId) nextId = rpcId as string;
  if (!nextId) {
    const { data: last } = await supabase.from("clients").select("client_id").order("created_at", { ascending: false }).limit(1).maybeSingle();
    const lastRow = last as { client_id?: string } | null;
    const match = lastRow?.client_id?.match(/^CL(\d+)$/i);
    const num = match ? parseInt(match[1], 10) + 1 : 1;
    nextId = "CL" + String(num).padStart(3, "0");
  }

  const { data: inserted, error } = await supabase
    .from("clients")
    .insert({
      client_id: nextId,
      name: params.name.trim(),
      email: normalizedEmail,
      company: params.company?.trim() || null,
      phone: params.phone?.trim() || null,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  return { client: inserted as ClientRow };
}

/** Create a project linked to a client. */
export async function createProject(params: {
  clientId: string; // uuid of clients.id
  projectName?: string;
  projectType?: string | null;
  description?: string | null;
  status?: ProjectStatus;
  price?: number | null;
  deadline?: string | null;
}): Promise<{ project: ProjectRow } | { error: string }> {
  const supabase = getServerSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return { error: "Database not configured." };
  }
  const { data, error } = await supabase
    .from("projects")
    .insert({
      client_id: params.clientId,
      project_name: params.projectName?.trim() || "New project",
      project_type: params.projectType || null,
      description: params.description?.trim() || null,
      status: params.status || "inquiry",
      price: params.price ?? null,
      deadline: params.deadline || null,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  return { project: data as ProjectRow };
}

/** Map form project_type to display label. */
export function projectTypeLabel(type: string | null): string {
  if (!type) return "—";
  const map: Record<string, string> = {
    "website-design": "Website Design",
    "website-development": "Website Development",
    "redesign": "Redesign",
    "landing-page": "Landing Page",
    "custom-project": "Custom Project",
    "template": "Template",
  };
  return map[type] ?? type;
}

/** Status display label. */
export function projectStatusLabel(status: string): string {
  const map: Record<string, string> = {
    inquiry: "Inquiry",
    planning: "Planning",
    "in progress": "In progress",
    revision: "Revision",
    completed: "Completed",
  };
  return map[status] ?? status;
}
