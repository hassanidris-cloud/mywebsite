import { NextResponse } from "next/server";
import {
  createTemplateDepositCheckout,
  isStripeConfigured,
  type CreateTemplateCheckoutParams,
} from "@/lib/stripe-server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Payments are not configured." },
      { status: 503 }
    );
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }
  const o = body as Record<string, unknown>;
  const totalEur = Number(o?.totalEur) || 0;
  const templateName = String(o?.templateName ?? "").trim();
  const templateSlug = String(o?.templateSlug ?? "").trim();
  const name = String(o?.name ?? "").trim();
  const email = String(o?.email ?? "").trim();
  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (!templateSlug) {
    return NextResponse.json(
      { error: "Template slug is required." },
      { status: 400 }
    );
  }
  const params: CreateTemplateCheckoutParams = {
    totalEur: Math.max(0, totalEur),
    templateName: templateName || templateSlug,
    templateSlug,
    addonIds: String(o?.addonIds ?? ""),
    name,
    email,
    company: String(o?.company ?? "").trim(),
    description: String(o?.description ?? "").trim(),
  };
  const result = await createTemplateDepositCheckout(params);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ url: result.url });
}
