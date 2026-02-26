import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const publicRoutes = ["/", "/login", "/register", "/forget_password"];

  // 🔓 1️⃣ Logged-in user trying auth pages
  if (
    accessToken &&
    ["/login", "/register", "/forget_password"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔓 2️⃣ Public routes allowed
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 🔐 3️⃣ Protected route without token
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 4️⃣ Token exists → decode & admin check
  try {
    const base64Payload = accessToken.split(".")[1];
    const payload = JSON.parse(atob(base64Payload)); // ✅ Buffer removed

    // 🔒 Admin route protection
    if (pathname.startsWith("/admin") && !payload.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // ❌ Invalid / expired token
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("accessToken");
    return res;
  }
}

export const config = {
  matcher: [
    "/wishlist/:path*",
    "/admin/:path*",
    "/product_details/:path*",
    "/cart_page/:path*",
    "/check_out/:path*",
    "/my_order/:path*",
    "/login",
    "/register",
    "/forget_password",
  ],
};