// middleware.ts
import { NextResponse, NextRequest } from "next/server";

// Public sayfalar (herkesin erişebileceği)
const publicPages = ["/", "/login", "/register"];

// Korumalı sayfalar (sadece giriş yapmış kullanıcıların erişebileceği)
const protectedPages = ["/dashboard", "/practice", "/profile", "/settings"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Public sayfalar için kontrol
  if (publicPages.includes(pathname)) {
    // Kullanıcı giriş yapmışsa ve login/register sayfalarına gitmeye çalışıyorsa
    if (token && (pathname === "/login" || pathname === "/register")) {
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
