import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "velora_admin";

export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
