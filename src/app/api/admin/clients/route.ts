import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { requireAdmin } from "@/app/api/admin/auth";

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ clients: [], projectCounts: {} });
  }
  const { data: clients, error: clientsError } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });
  if (clientsError) {
    return NextResponse.json({ clients: [], error: clientsError.message }, { status: 200 });
  }
  const ids = (clients ?? []).map((c: { id: string }) => c.id);
  const projectCounts: Record<string, number> = {};
  const projectStatuses: Record<string, string[]> = {};
  if (ids.length > 0) {
    const { data: projects } = await supabase
      .from("projects")
      .select("client_id, status")
      .in("client_id", ids);
    (projects ?? []).forEach((r: { client_id: string; status: string }) => {
      projectCounts[r.client_id] = (projectCounts[r.client_id] ?? 0) + 1;
      if (!projectStatuses[r.client_id]) projectStatuses[r.client_id] = [];
      projectStatuses[r.client_id].push(r.status);
    });
  }
  return NextResponse.json({ clients: clients ?? [], projectCounts, projectStatuses });
}
