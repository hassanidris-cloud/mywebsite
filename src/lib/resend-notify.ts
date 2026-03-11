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
  const html = `
    <h2>New lead from Velora Studio</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company || "—")}</p>
    <p><strong>Budget:</strong> ${escapeHtml(budgetLabel)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(payload.timeline || "—")}</p>
    <p><strong>Project type:</strong> ${escapeHtml(payload.projectType || "—")}</p>
    <p><strong>Description:</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(payload.description)}</pre>
    ${payload.source ? `<p><em>Source: ${escapeHtml(payload.source)}</em></p>` : ""}
  `;
  const { data, error } = await resend.emails.send({
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
