import { Resend } from "resend";
import type { InquiryPayload } from "@/app/actions/inquiry";

const resendApiKey = process.env.RESEND_API_KEY;
const inquiryToEmail = process.env.INQUIRY_NOTIFY_EMAIL;
const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Velora Studio <onboarding@resend.dev>";

export function isResendConfigured() {
  return Boolean(resendApiKey && inquiryToEmail);
}

export async function sendLeadNotification(payload: InquiryPayload): Promise<boolean> {
  if (!resendApiKey || !inquiryToEmail) return false;
  const resend = new Resend(resendApiKey);
  const budgetLabel = payload.budget ? formatBudget(payload.budget) : "Not specified";
  const templateBlock =
    payload.templateSlug && payload.templateTotal
      ? `<p><strong>Template:</strong> ${escapeHtml(payload.templateSlug)} | <strong>Est. total:</strong> €${escapeHtml(payload.templateTotal)}${payload.templateAddons ? ` | <strong>Sections:</strong> ${escapeHtml(payload.templateAddons)}` : ""}</p>`
      : "";
  const html = `
    <h2>New lead from Velora Studio</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company || "—")}</p>
    <p><strong>Budget:</strong> ${escapeHtml(budgetLabel)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(payload.timeline || "—")}</p>
    <p><strong>Project type:</strong> ${escapeHtml(payload.projectType || "—")}</p>
    ${templateBlock}
    <p><strong>Description:</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(payload.description)}</pre>
    ${payload.source ? `<p><em>Source: ${escapeHtml(payload.source)}</em></p>` : ""}
  `;
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: inquiryToEmail,
    subject: `[Velora] New lead: ${payload.name}`,
    html,
  });
  if (error) {
    console.error("[Velora Resend] Failed to send inquiry email:", error);
    return false;
  }
  return true;
}

function formatBudget(value: string): string {
  const map: Record<string, string> = {
    "1k-3k": "$1k – $3k",
    "3k-7k": "$3k – $7k",
    "7k-15k": "$7k – $15k",
    "15k-plus": "$15k+",
  };
  return map[value] ?? value;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Template request (from /customize/[slug]) ─────────────────────────────
export type TemplateRequestPayload = {
  name: string;
  email: string;
  company: string;
  templateName: string;
  templateSlug: string;
  basePriceEur: number;
  addons: { label: string; price: number }[];
  totalEur: number;
  description: string;
};

export async function sendTemplateRequestNotification(
  payload: TemplateRequestPayload
): Promise<boolean> {
  if (!resendApiKey || !inquiryToEmail) return false;
  const resend = new Resend(resendApiKey);
  const addonsRows =
    payload.addons.length > 0
      ? payload.addons
          .map(
            (a) =>
              `<tr><td>${escapeHtml(a.label)}</td><td style="text-align:right">€${a.price}</td></tr>`
          )
          .join("")
      : "<tr><td colspan=\"2\">None</td></tr>";
  const html = `
    <h2>Template request from Velora Studio</h2>
    <p><strong>Template:</strong> ${escapeHtml(payload.templateName)} (${escapeHtml(payload.templateSlug)})</p>
    <p><strong>Base price:</strong> €${payload.basePriceEur}</p>
    <table style="border-collapse:collapse;margin:12px 0;">
      <thead><tr><th style="text-align:left;border-bottom:1px solid #ddd;">Add-on</th><th style="text-align:right;border-bottom:1px solid #ddd;">Price</th></tr></thead>
      <tbody>${addonsRows}</tbody>
    </table>
    <p><strong>Total:</strong> €${payload.totalEur}</p>
    <hr style="margin:16px 0;border:none;border-top:1px solid #eee;" />
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company || "—")}</p>
    <p><strong>Describe your changes:</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif;background:#f5f5f5;padding:12px;border-radius:6px;">${escapeHtml(payload.description)}</pre>
  `;
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: inquiryToEmail,
    subject: `[Velora] Template request: ${payload.templateName} — ${payload.name}`,
    html,
  });
  if (error) {
    console.error("[Velora Resend] Template request email failed:", error);
    return false;
  }
  return true;
}

// ─── Payment received (20% deposit – from Stripe webhook) ───────────────────
export type PaymentReceivedMetadata = {
  type: "template" | "custom";
  name: string;
  email: string;
  company: string;
  total: string;
  amount_paid: string;
  description: string;
  template_slug?: string;
  template_name?: string;
  addon_ids?: string;
  budget?: string;
  timeline?: string;
  project_type?: string;
};

export async function sendPaymentReceivedNotification(
  payload: PaymentReceivedMetadata
): Promise<boolean> {
  if (!resendApiKey || !inquiryToEmail) return false;
  const resend = new Resend(resendApiKey);
  const isTemplate = payload.type === "template";
  const titleBlock = `
    <p><strong>20% deposit paid.</strong> Project is ready to start.</p>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company || "—")}</p>
    <p><strong>Total project:</strong> €${escapeHtml(payload.total)}</p>
    <p><strong>Amount paid (20%):</strong> €${escapeHtml(payload.amount_paid)}</p>
  `;
  const templateBlock = isTemplate && payload.template_name
    ? `<p><strong>Template:</strong> ${escapeHtml(payload.template_name)} (${escapeHtml(payload.template_slug || "")})</p>
       ${payload.addon_ids ? `<p><strong>Add-ons:</strong> ${escapeHtml(payload.addon_ids)}</p>` : ""}`
    : "";
  const customBlock = !isTemplate
    ? `<p><strong>Budget:</strong> ${escapeHtml(payload.budget || "—")}</p>
       <p><strong>Timeline:</strong> ${escapeHtml(payload.timeline || "—")}</p>
       <p><strong>Project type:</strong> ${escapeHtml(payload.project_type || "—")}</p>`
    : "";
  const html = `
    <h2>Payment received – 20% deposit – Velora Studio</h2>
    ${titleBlock}
    ${templateBlock}
    ${customBlock}
    <p><strong>Description / changes:</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif;background:#f5f5f5;padding:12px;border-radius:6px;">${escapeHtml(payload.description || "—")}</pre>
    <p style="margin-top:16px;color:#666;">Next: Start building. When the site is ready, send preview and collect remaining 80%.</p>
  `;
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: inquiryToEmail,
    subject: `[Velora] Payment received – ${payload.name} – ${isTemplate ? payload.template_name : "Custom"}`,
    html,
  });
  if (error) {
    console.error("[Velora Resend] Payment received email failed:", error);
    return false;
  }
  return true;
}
