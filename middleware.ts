import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const isAuth = !!session;

  // Protect interview routes
  if (request.nextUrl.pathname.startsWith("/interview")) {
    if (!isAuth) {
      const redirectUrl = `/sign-in?redirect=${encodeURIComponent(
        request.nextUrl.pathname + request.nextUrl.search
      )}`;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }
  return NextResponse.next();
}
