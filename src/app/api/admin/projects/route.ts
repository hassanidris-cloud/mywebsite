import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { requireAdmin } from "@/app/api/admin/auth";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const body = await req.json();
  const { client_id, project_name, project_type, description, status, price, deadline } = body;
  if (!client_id) {
    return NextResponse.json({ error: "client_id is required" }, { status: 400 });
  }
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { data, error } = await supabase
    .from("projects")
    .insert({
      client_id,
      project_name: project_name?.trim() || "New project",
      project_type: project_type || null,
      description: description?.trim() || null,
      status: status || "inquiry",
      price: price != null ? Number(price) : null,
      deadline: deadline || null,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ project: data });
}
