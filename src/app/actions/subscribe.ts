"use server";

import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase-server";

export async function subscribeNewsletter(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const email = (formData.get("email") as string)?.trim();
  if (!email) {
    return { ok: false, error: "Email is required." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const supabase = getServerSupabase();
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("subscribers").upsert({ email }, { onConflict: "email" });
    if (error) {
      if (error.code === "23505") return { ok: true }; // already subscribed
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  }
  return { ok: true };
}
