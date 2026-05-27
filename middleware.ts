import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Subdomain routing middleware.
 *
 * docs.useherald.xyz → serves the /docs/* pages of this same Next.js app.
 *
 * Routing rules (when on docs subdomain):
 *   /                        → rewrite → /docs/quickstart
 *   /quickstart              → rewrite → /docs/quickstart
 *   /guides/something        → rewrite → /docs/guides/something
 *   /docs/...                → pass through (already correct)
 *   /_next/*, /api/*, /og/*  → pass through (Next.js internals / assets)
 *   *.ext (static files)     → pass through
 *
 * All other hostnames (useherald.xyz, www.useherald.xyz, …) are untouched.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";

  const isDocsDomain =
    hostname === "docs.useherald.xyz" ||
    hostname.startsWith("docs.useherald.") || // staging / preview variants
    hostname === "docs.localhost"; // local dev: add `docs.localhost` to /etc/hosts

  if (!isDocsDomain) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // ── Pass-throughs ──────────────────────────────────────────────────────────
  // Next.js build output, API routes, OG image route, and any file with an
  // extension (favicon, fonts, images, etc.) must go through as-is.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/og") ||
    /\.[^/]+$/.test(pathname) // has a file extension
  ) {
    return NextResponse.next();
  }

  // ── Root → default docs page ───────────────────────────────────────────────
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/docs/quickstart";
    return NextResponse.rewrite(url);
  }

  // ── Already a /docs path — serve directly ─────────────────────────────────
  if (pathname.startsWith("/docs")) {
    return NextResponse.next();
  }

  // ── Bare slug → /docs/<slug> ───────────────────────────────────────────────
  // e.g. docs.useherald.xyz/guides/ai-agent-mcp → /docs/guides/ai-agent-mcp
  const url = request.nextUrl.clone();
  url.pathname = `/docs${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Run on all paths except Next.js static files and images (handled above
  // inside the function too, but the matcher keeps the edge invocation cheap).
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
