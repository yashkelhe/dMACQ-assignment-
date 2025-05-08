// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // if the token present
  const isAuth = !!token;
  // and the Url is this
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isRegisterPage = request.nextUrl.pathname === "/register";

  // and then token is not present then redirect to the
  if (!isAuth && request.nextUrl.pathname.startsWith("/blog")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in then redirect from login/register to blog
  if (isAuth && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL("/blog", request.url));
  }

  return NextResponse.next();
}

// Protect these routes
export const config = {
  matcher: ["/blog/:path*", "/login", "/register"],
};
