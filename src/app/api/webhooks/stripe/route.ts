import { NextResponse } from "next/server";
import Stripe from "stripe";
import { isStripeConfigured } from "@/lib/stripe-server";
import { sendPaymentReceivedNotification, isResendConfigured } from "@/lib/resend-notify";
import type { PaymentReceivedMetadata } from "@/lib/resend-notify";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/** Stripe requires the raw request body for signature verification. Do not parse as JSON. */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!webhookSecret || !isStripeConfigured()) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = Stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.mode === "payment" && session.payment_status === "paid" && session.metadata) {
      const m = session.metadata as Record<string, string>;
      const payload: PaymentReceivedMetadata = {
        type: (m.type as "template" | "custom") || "custom",
        name: m.name || "",
        email: m.email || session.customer_email || "",
        company: m.company || "",
        total: m.total || "0",
        amount_paid: m.amount_paid || "0",
        description: m.description || "",
        template_slug: m.template_slug,
        template_name: m.template_name,
        addon_ids: m.addon_ids,
        budget: m.budget,
        timeline: m.timeline,
        project_type: m.project_type,
      };
      if (isResendConfigured()) {
        await sendPaymentReceivedNotification(payload);
      }
    }
  }
  return NextResponse.json({ received: true });
}
