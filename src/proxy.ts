import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/admin-auth";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Only protect /admin routes
  if (path.startsWith("/admin")) {
    // But don't protect the login page itself
    if (path === "/admin/login") {
      return NextResponse.next();
    }

    const sessionToken = req.cookies.get(COOKIE_NAME)?.value;
    const session = await verifySession(sessionToken);

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
