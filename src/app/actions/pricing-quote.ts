"use server";

import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase-server";

export type PricingQuotePayload = {
  name: string;
  email: string;
  company: string;
  project_description: string;
  selected_features: { id: string; label: string; price: number; monthly?: boolean }[];
  estimated_total: number;
  maintenance_selected: boolean;
};

function trim(s: string): string {
  return (s ?? "").trim();
}

export async function submitPricingQuote(
  payload: PricingQuotePayload
): Promise<{ ok: boolean; error?: string; redirect?: string }> {
  const name = trim(payload.name);
  const email = trim(payload.email);
  const project_description = trim(payload.project_description);

  if (!name || !email) {
    return { ok: false, error: "Name and email are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!project_description) {
    return { ok: false, error: "Project description is required." };
  }

  const supabase = getServerSupabase();
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("pricing_quotes").insert({
      name,
      email,
      company: trim(payload.company) || null,
      project_description,
      selected_features: payload.selected_features,
      estimated_total: payload.estimated_total,
      maintenance_selected: payload.maintenance_selected,
    });

    if (error) {
      console.error("[Velora Pricing Quote] Supabase insert error:", error);
      return { ok: false, error: "Failed to save your quote request. Please try again." };
    }
  } else if (process.env.NODE_ENV !== "test") {
    console.log("[Velora Pricing Quote]", JSON.stringify({ ...payload, name, email, company: trim(payload.company) }, null, 2));
  }

  return { ok: true, redirect: "/thank-you" };
}
