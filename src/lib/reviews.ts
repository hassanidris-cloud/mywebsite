import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase-server";

export type ReviewRow = {
  id: string;
  name: string;
  review: string;
  role: string | null;
  created_at: string;
};

export async function getApprovedReviews(): Promise<ReviewRow[]> {
  const supabase = getServerSupabase();
  if (!isSupabaseConfigured() || !supabase) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, review, role, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("[Velora Reviews] Fetch error:", error);
    return [];
  }
  return (data ?? []) as ReviewRow[];
}
