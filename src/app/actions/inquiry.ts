"use server";

import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase-server";
import { sendLeadNotification, isResendConfigured } from "@/lib/resend-notify";
import { createCustomDepositCheckout, isStripeConfigured } from "@/lib/stripe-server";

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
  templateSlug?: string;
  templateAddons?: string;
  templateTotal?: string;
};

function getFormString(formData: FormData, key: string): string {
  return (formData.get(key) as string)?.trim() ?? "";
}

/** Budget ≥ $7k → high value lead */
function isHighValueBudget(budget: string): boolean {
  return budget === "7k-15k" || budget === "15k-plus";
}

export async function submitInquiry(formData: FormData): Promise<{ ok: boolean; error?: string; redirect?: string; checkoutUrl?: string }> {
  const name = getFormString(formData, "name");
  const email = getFormString(formData, "email");
  const description = getFormString(formData, "description");
  const depositEurStr = getFormString(formData, "deposit_eur");

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
  const timeline = getFormString(formData, "timeline");
  const projectType = getFormString(formData, "project_type");
  const depositEur = depositEurStr ? Math.max(0, parseInt(depositEurStr, 10)) : 0;

  // If 20% deposit selected and Stripe configured, create checkout and return URL
  if (depositEur > 0 && isStripeConfigured()) {
    const result = await createCustomDepositCheckout({
      depositEur,
      name,
      email,
      company: getFormString(formData, "company"),
      budget,
      timeline,
      projectType,
      description,
    });
    if ("error" in result) {
      return { ok: false, error: result.error };
    }
    return { ok: true, checkoutUrl: result.url };
  }

  const templateSlug = getFormString(formData, "template_slug");
  const templateTotal = getFormString(formData, "template_total");
  const templateAddons = getFormString(formData, "template_addons");
  const descriptionWithTemplate =
    templateSlug && templateTotal
      ? `${description}\n\n[Template: ${templateSlug}. Estimated total: €${templateTotal}${templateAddons ? `. Selected sections: ${templateAddons}` : ""}.]`
      : description;

  const payload: InquiryPayload = {
    name,
    email,
    company: getFormString(formData, "company"),
    website: getFormString(formData, "website"),
    budget,
    timeline,
    projectType,
    description: descriptionWithTemplate,
    source: getFormString(formData, "source") || undefined,
    templateSlug: templateSlug || undefined,
    templateAddons: templateAddons || undefined,
    templateTotal: templateTotal || undefined,
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
    const sent = await sendLeadNotification(payload);
    if (!sent && process.env.NODE_ENV === "production") {
      console.error("[Velora Inquiry] Resend did not send. Check RESEND_API_KEY, INQUIRY_NOTIFY_EMAIL, and Vercel logs.");
    }
  }

  return { ok: true, redirect: "/thank-you" };
}
