import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOG_HOST = "blog.useherald.xyz";
const DOCS_HOST = "docs.useherald.xyz";
const MAIN_HOST = process.env.NODE_ENV === "production"
  ? "https://www.useherald.xyz"
  : "https://localhost:3000";

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  const isBlogSubdomain = hostname === BLOG_HOST || hostname.startsWith("blog.");
  const isDocsSubdomain = hostname === DOCS_HOST || hostname.startsWith("docs.");
  const isProduction = process.env.NODE_ENV === "production";

  // ── docs.useherald.xyz ─────────────────────────────────────────────────────
  if (isProduction && isDocsSubdomain) {
    // Pass through Next.js internals and static assets
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/og") ||
      /\.[^/]+$/.test(pathname)
    ) {
      return NextResponse.next();
    }

    // Root → default docs page
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/docs/quickstart", request.url));
    }

    // Already a /docs/* path — serve directly
    if (pathname.startsWith("/docs")) {
      return NextResponse.next();
    }

    // Bare slug → /docs/<slug>
    // e.g. docs.useherald.xyz/guides/ai-agent-mcp → /docs/guides/ai-agent-mcp
    return NextResponse.rewrite(new URL(`/docs${pathname}`, request.url));
  }

  // ── blog.useherald.xyz ─────────────────────────────────────────────────────
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
