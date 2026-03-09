import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "velora_admin";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD;
  const authenticated = Boolean(expected && token === expected);
  return NextResponse.json({ authenticated });
}
