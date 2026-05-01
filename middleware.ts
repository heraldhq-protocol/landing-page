import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOG_HOST = "blog.useherald.xyz";

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  if (hostname === BLOG_HOST || hostname.startsWith("blog.")) {
    if (pathname === "/" || pathname === "/blog") {
      return NextResponse.rewrite(new URL("/blog", request.url));
    }

    if (pathname.startsWith("/blog/")) {
      const slug = pathname.replace(/^\/blog\//, "");
      return NextResponse.rewrite(new URL(`/blog/${slug}`, request.url));
    }

    return NextResponse.rewrite(new URL("/blog", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
