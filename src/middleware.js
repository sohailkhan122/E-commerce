import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // console.log("🚀 ~ pathname:", pathname);
  const accessToken = request.cookies.get("accessToken")?.value;
  // console.log(accessToken)

  const publicRoutes = ["/", "/login", "/register", "/forget_password"];
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
    pathname.startsWith(route),
  );
  if (isSecureRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    const returnUrlVal = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set("returnUrl", returnUrlVal);
    return NextResponse.redirect(loginUrl);
  }

  // 🔐 Token check + admin check
  if (accessToken) {
    try {
      // ✅ Edge-safe JWT decode (uses atob — available in all edge runtimes)
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));

      // Admin protection
      if (pathname.startsWith("/admin") && !payload.isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (err) {
      const loginUrl = new URL("/login", request.url);
      const returnUrlVal = request.nextUrl.pathname + request.nextUrl.search;
      loginUrl.searchParams.set("returnUrl", returnUrlVal);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};