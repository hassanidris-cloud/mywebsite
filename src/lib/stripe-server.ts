import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;
const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export function isStripeConfigured(): boolean {
  return Boolean(secret);
}

function getStripe(): Stripe {
  if (!secret) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(secret);
}

/** Stripe metadata values must be strings and ≤500 chars. */
function truncate(s: string, max = 500): string {
  return s.length <= max ? s : s.slice(0, max - 3) + "...";
}

export type CreateTemplateCheckoutParams = {
  totalEur: number;
  templateName: string;
  templateSlug: string;
  addonIds: string;
  name: string;
  email: string;
  company: string;
  description: string;
};

export async function createTemplateDepositCheckout(
  params: CreateTemplateCheckoutParams
): Promise<{ url: string } | { error: string }> {
  if (!isStripeConfigured()) return { error: "Payments are not configured." };
  const amountEur = Math.round(params.totalEur * 0.2 * 100) / 100;
  const amountCents = Math.round(amountEur * 100);
  if (amountCents < 50) return { error: "Minimum deposit is €0.50." };

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: amountCents,
          product_data: {
            name: `20% deposit – ${params.templateName}`,
            description: "Start your website project. Remaining 80% due when the site is ready and you're happy with the preview.",
            images: undefined,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "template",
      name: params.name,
      email: params.email,
      company: truncate(params.company || ""),
      total: String(params.totalEur),
      amount_paid: String(amountEur),
      description: truncate(params.description),
      template_slug: params.templateSlug,
      template_name: params.templateName,
      addon_ids: truncate(params.addonIds, 200),
    },
    success_url: `${baseUrl}/thank-you?payment=success`,
    cancel_url: `${baseUrl}/customize/${params.templateSlug}?cancelled=1`,
    customer_email: params.email,
  });

  if (!session.url) return { error: "Could not create checkout session." };
  return { url: session.url };
}

export type CreateCustomCheckoutParams = {
  depositEur: number;
  name: string;
  email: string;
  company: string;
  budget: string;
  timeline: string;
  projectType: string;
  description: string;
};

export async function createCustomDepositCheckout(
  params: CreateCustomCheckoutParams
): Promise<{ url: string } | { error: string }> {
  if (!isStripeConfigured()) return { error: "Payments are not configured." };
  const amountCents = Math.round(params.depositEur * 100);
  if (amountCents < 50) return { error: "Minimum deposit is €0.50." };

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: amountCents,
          product_data: {
            name: "20% deposit – Custom website",
            description: "Start your custom website project. Remaining 80% due when the site is ready.",
            images: undefined,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "custom",
      name: params.name,
      email: params.email,
      company: truncate(params.company || ""),
      total: String(params.depositEur * 5),
      amount_paid: String(params.depositEur),
      description: truncate(params.description),
      budget: params.budget,
      timeline: params.timeline,
      project_type: params.projectType,
    },
    success_url: `${baseUrl}/thank-you?payment=success`,
    cancel_url: `${baseUrl}/start-project?cancelled=1`,
    customer_email: params.email,
  });

  if (!session.url) return { error: "Could not create checkout session." };
  return { url: session.url };
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  return Stripe.webhooks.constructEvent(payload, signature, secret);
}
