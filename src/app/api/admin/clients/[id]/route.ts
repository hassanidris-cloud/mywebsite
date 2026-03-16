import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { requireAdmin } from "@/app/api/admin/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const { id } = await params;
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();
  if (clientError || !client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });
  const projectIds = (projects ?? []).map((p: { id: string }) => p.id);
  let files: unknown[] = [];
  let payments: unknown[] = [];
  if (projectIds.length > 0) {
    const [fRes, pRes] = await Promise.all([
      supabase.from("files").select("*").in("project_id", projectIds).order("uploaded_at", { ascending: false }),
      supabase.from("payments").select("*").in("project_id", projectIds).order("created_at", { ascending: false }),
    ]);
    files = fRes.data ?? [];
    payments = pRes.data ?? [];
  }
  const { data: notes } = await supabase
    .from("client_notes")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });
  return NextResponse.json({
    client,
    projects: projects ?? [],
    files,
    payments,
    notes: notes ?? [],
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const { id } = await params;
  const body = await req.json();
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.email !== undefined) updates.email = body.email;
  if (body.company !== undefined) updates.company = body.company;
  if (body.phone !== undefined) updates.phone = body.phone;
  updates.updated_at = new Date().toISOString();
  const { data, error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ client: data });
}
