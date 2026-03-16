import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { requireAdmin } from "@/app/api/admin/auth";

const VALID_STATUS = ["inquiry", "planning", "in progress", "revision", "completed"];

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
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.project_name !== undefined) updates.project_name = body.project_name;
  if (body.project_type !== undefined) updates.project_type = body.project_type;
  if (body.description !== undefined) updates.description = body.description;
  if (body.status !== undefined && VALID_STATUS.includes(body.status)) updates.status = body.status;
  if (body.price !== undefined) updates.price = body.price === "" ? null : Number(body.price);
  if (body.deadline !== undefined) updates.deadline = body.deadline || null;
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ project: data });
}
