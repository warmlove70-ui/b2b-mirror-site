import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json();
  const password = String(body?.password || "");
  const configured = getAdminPassword();

  if (!configured) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD is not configured." },
      { status: 500 },
    );
  }

  if (password !== configured) {
    return NextResponse.json({ ok: false, error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: configured,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}
