import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOG_HOST = "blog.useherald.xyz";
const MAIN_HOST = process.env.NODE_ENV === "production"
  ? "https://www.useherald.xyz"
  : "https://localhost:3000";

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  const isBlogSubdomain = hostname === BLOG_HOST || hostname.startsWith("blog.");
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction && isBlogSubdomain) {
    if (pathname === "/" || pathname === "/blog") {
      return NextResponse.rewrite(new URL("/blog", request.url));
    }

    if (pathname.startsWith("/blog/")) {
      const slug = pathname.replace(/^\/blog\//, "");
      return NextResponse.rewrite(new URL(`/blog/${slug}`, request.url));
    }

    return NextResponse.redirect(new URL(pathname, MAIN_HOST));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
