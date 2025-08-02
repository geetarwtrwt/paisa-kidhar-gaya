// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("🔥 Middleware triggered");

  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  const isPublicPath = path === "/my-account";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/my-account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/my-account", "/my-account/:path*"],
};
