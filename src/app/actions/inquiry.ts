"use server";

import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase-server";
import { sendLeadNotification, isResendConfigured } from "@/lib/resend-notify";

export type InquiryPayload = {
  name: string;
  email: string;
  company: string;
  website: string;
  budget: string;
  timeline: string;
  projectType: string;
  description: string;
  source?: string;
};

function getFormString(formData: FormData, key: string): string {
  return (formData.get(key) as string)?.trim() ?? "";
}

/** Budget ≥ $7k → high value lead */
function isHighValueBudget(budget: string): boolean {
  return budget === "7k-15k" || budget === "15k-plus";
}

export async function submitInquiry(formData: FormData): Promise<{ ok: boolean; error?: string; redirect?: string }> {
  const name = getFormString(formData, "name");
  const email = getFormString(formData, "email");
  const description = getFormString(formData, "description");

  if (!name || !email) {
    return { ok: false, error: "Name and email are required." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!description) {
    return { ok: false, error: "Project description is required." };
  }

  const budget = getFormString(formData, "budget");
  const payload: InquiryPayload = {
    name,
    email,
    company: getFormString(formData, "company"),
    website: getFormString(formData, "website"),
    budget,
    timeline: getFormString(formData, "timeline"),
    projectType: getFormString(formData, "project_type"),
    description,
    source: getFormString(formData, "source") || undefined,
  };

  const isHighValue = isHighValueBudget(budget);

  const supabase = getServerSupabase();
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("leads").insert({
      name: payload.name,
      email: payload.email,
      company: payload.company || null,
      website: payload.website || null,
      budget: payload.budget || null,
      timeline: payload.timeline || null,
      project_type: payload.projectType || null,
      description: payload.description,
      source: payload.source || null,
      is_high_value: isHighValue,
    });
    if (error) {
      console.error("[Velora Inquiry] Supabase insert error:", error);
      return { ok: false, error: "Failed to save your inquiry. Please try again." };
    }
  } else if (process.env.NODE_ENV !== "test") {
    console.log("[Velora Inquiry]", JSON.stringify(payload, null, 2));
  }

  if (isResendConfigured()) {
    await sendLeadNotification(payload);
  }

  return { ok: true, redirect: "/thank-you" };
}
