import { NextResponse } from "next/server";
import {
  createCustomDepositCheckout,
  isStripeConfigured,
  type CreateCustomCheckoutParams,
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
  const depositEur = Math.max(0, Number(o?.depositEur) || 0);
  const name = String(o?.name ?? "").trim();
  const email = String(o?.email ?? "").trim();
  const description = String(o?.description ?? "").trim();
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
  if (!description) {
    return NextResponse.json(
      { error: "Project description is required." },
      { status: 400 }
    );
  }
  if (depositEur < 0.5) {
    return NextResponse.json(
      { error: "Minimum deposit is €0.50." },
      { status: 400 }
    );
  }
  const params: CreateCustomCheckoutParams = {
    depositEur,
    name,
    email,
    company: String(o?.company ?? "").trim(),
    budget: String(o?.budget ?? "").trim(),
    timeline: String(o?.timeline ?? "").trim(),
    projectType: String(o?.projectType ?? o?.project_type ?? "").trim(),
    description,
  };
  const result = await createCustomDepositCheckout(params);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ url: result.url });
}
