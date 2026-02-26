import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // ✅ Public routes ( "/" public hi rahe ga )
  const publicRoutes = ["/", "/login", "/register", "/forget_password"];

  // 🔒 Secure routes
  const secureRoutes = [
    "/wishlist",
    "/cart_page",
    "/check_out",
    "/my_order",
    "/product_details",
    "/admin",
  ];

  // 🔁 Logged-in user auth pages par na ja sake
  if (
    accessToken &&
    ["/login", "/register", "/forget_password"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔓 Public routes allow
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 🔐 Secure routes → login required
  const isSecureRoute = secureRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isSecureRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 Token check + admin check
  if (accessToken) {
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));

      // Admin protection
      if (pathname.startsWith("/admin") && !payload.isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("accessToken");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};