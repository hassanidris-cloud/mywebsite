import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "velora_admin";

export async function POST(req: Request) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  if (password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const cookieStore = await cookies();
  const secret = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "authenticated";
  cookieStore.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return NextResponse.json({ ok: true });
}
