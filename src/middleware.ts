// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  // Giriş yapılmamışsa, kullanıcıyı login sayfasına yönlendir
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Token doğrulaması yap
  try {
    verifyJwt(token); // JWT doğrulaması yapılır
    return NextResponse.next(); // Kullanıcı giriş yapmışsa devam eder
  } catch (error) {
    // Eğer token geçersizse, kullanıcıyı login sayfasına yönlendir
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/profile",
    // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
