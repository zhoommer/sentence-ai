// middleware.ts
import { NextResponse, NextRequest } from "next/server";

// Public sayfalar
const publicPages = ["/login", "/register"];
// Korumalı sayfalar
const protectedPages = ["/", "/dashboard", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Public sayfalar (login ve register)
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Korumalı sayfalar için token kontrolü
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Middleware'in çalışacağı path'ler
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
