import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { requireAdmin } from "@/app/api/admin/auth";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const body = await req.json();
  const { client_id, note } = body;
  if (!client_id || !note?.trim()) {
    return NextResponse.json({ error: "client_id and note are required" }, { status: 400 });
  }
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { data, error } = await supabase
    .from("client_notes")
    .insert({ client_id, note: note.trim() })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ note: data });
}
