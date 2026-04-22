import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "zeksmart_admin_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public lead submission for website visitors
  if (pathname === "/api/leads" && request.method === "POST") {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin") && pathname !== "/api/leads" && pathname !== "/api/leads/export") {
    return NextResponse.next();
  }

  if (pathname === "/admin/login" || pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  // 使用回退密码（与环境变量一致）
  const password = process.env.ADMIN_PASSWORD || "ZekSmart2026!";
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!password || token !== password) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/leads", "/api/leads/export"],
};
