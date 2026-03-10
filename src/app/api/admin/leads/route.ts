import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSupabase } from "@/lib/supabase-server";
import type { LeadRow } from "@/lib/supabase-server";

const ADMIN_COOKIE = "velora_admin";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ leads: [] });
  }
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ leads: [], error: error.message }, { status: 200 });
  }
  return NextResponse.json({ leads: (data as LeadRow[]) ?? [] });
}
