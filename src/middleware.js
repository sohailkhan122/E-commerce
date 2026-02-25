import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const publicRoutes = ["/", "/login", "/register", "/forget_password"];

  // 🔓 1️⃣ If user is logged in and tries to access auth pages
  if (
    accessToken &&
    ["/login", "/register", "/forget_password"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔓 2️⃣ If route is public → allow
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 🔐 3️⃣ If no token and route is protected → redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 4️⃣ If token exists → validate & check admin
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64").toString()
    );

    // Admin route protection
    if (pathname.startsWith("/admin") && !payload.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (err) {
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