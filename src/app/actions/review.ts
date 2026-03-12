"use server";

import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase-server";

export type ReviewPayload = {
  name: string;
  email?: string;
  review: string;
  role?: string;
};

function trim(s: string | undefined): string {
  return (s ?? "").trim();
}

export async function submitReview(
  payload: ReviewPayload
): Promise<{ ok: boolean; error?: string }> {
  const name = trim(payload.name);
  const review = trim(payload.review);

  if (!name) {
    return { ok: false, error: "Your name is required." };
  }
  if (!review) {
    return { ok: false, error: "Please write your review." };
  }
  if (review.length < 20) {
    return { ok: false, error: "Review should be at least 20 characters." };
  }

  const supabase = getServerSupabase();
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("reviews").insert({
      name,
      email: trim(payload.email) || null,
      review,
      role: trim(payload.role) || null,
      approved: false,
    });

    if (error) {
      console.error("[Velora Reviews] Supabase insert error:", error);
      return { ok: false, error: "Failed to submit review. Please try again." };
    }
  } else if (process.env.NODE_ENV !== "test") {
    console.log("[Velora Reviews]", JSON.stringify({ name, review, role: trim(payload.role) }, null, 2));
  }

  return { ok: true };
}
