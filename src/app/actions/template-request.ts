"use server";

import {
  sendTemplateRequestNotification,
  isResendConfigured,
} from "@/lib/resend-notify";
import {
  TEMPLATE_BASE_PRICE_EUR,
  getSectionById,
} from "@/data/template-customization";
import { templates } from "@/data/work";
import { createTemplateDepositCheckout, isStripeConfigured } from "@/lib/stripe-server";

function getFormString(formData: FormData, key: string): string {
  return (formData.get(key) as string)?.trim() ?? "";
}

export async function submitTemplateRequest(
  formData: FormData
): Promise<{ ok: boolean; error?: string; redirect?: string; checkoutUrl?: string }> {
  const name = getFormString(formData, "name");
  const email = getFormString(formData, "email");
  const templateSlug = getFormString(formData, "template_slug");
  const totalStr = getFormString(formData, "total");
  const addonIdsStr = getFormString(formData, "addon_ids");
  const description = getFormString(formData, "description");

  if (!name || !email) {
    return { ok: false, error: "Name and email are required." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!templateSlug) {
    return { ok: false, error: "Template is missing. Please go back and try again." };
  }

  const template = templates.find((t) => t.slug === templateSlug);
  const templateName = template?.name ?? templateSlug;
  const total = Math.max(0, parseInt(totalStr, 10) || TEMPLATE_BASE_PRICE_EUR);

  const addonIds = addonIdsStr ? addonIdsStr.split(",").filter(Boolean) : [];
  const addons = addonIds
    .map((id) => getSectionById(id))
    .filter((s): s is NonNullable<typeof s> => s != null && s.price > 0)
    .map((s) => ({ label: s.label, price: s.price }));

  const payload = {
    name,
    email,
    company: getFormString(formData, "company"),
    templateName,
    templateSlug,
    basePriceEur: TEMPLATE_BASE_PRICE_EUR,
    addons,
    totalEur: total,
    description: description || "—",
  };

  // If Stripe is configured, create 20% deposit checkout and return URL
  if (isStripeConfigured()) {
    const result = await createTemplateDepositCheckout({
      totalEur: total,
      templateName,
      templateSlug,
      addonIds: addonIdsStr,
      name,
      email,
      company: payload.company,
      description: payload.description,
    });
    if ("error" in result) {
      return { ok: false, error: result.error };
    }
    return { ok: true, checkoutUrl: result.url };
  }

  // Fallback: send email and redirect to thank-you (no payment)
  if (isResendConfigured()) {
    const sent = await sendTemplateRequestNotification(payload);
    if (!sent && process.env.NODE_ENV === "production") {
      return {
        ok: false,
        error: "We couldn't send your request. Please try again or email us directly.",
      };
    }
  } else if (process.env.NODE_ENV !== "test") {
    console.log("[Velora Template Request]", JSON.stringify(payload, null, 2));
  }

  return { ok: true, redirect: "/thank-you" };
}
