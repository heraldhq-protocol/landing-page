# Project Learnings

> Managed by `/learn`. Append-only — latest entry wins on conflicts.

## Patterns

### metadata-client-page-pattern
- **Insight:** "use client" pages need a parent layout.tsx for metadata exports. Non-client pages can export `metadata` directly from the page file.
- **Confidence:** 10/10
- **Source:** learn
- **Files:** app/(marketing)/pitch/layout.tsx, app/(marketing)/validation/layout.tsx, app/status/layout.tsx
- **Date:** 2026-05-15

### og-url-helper
- **Insight:** Use `ogUrl()` from `lib/og.ts` for consistent OG image URL generation across all pages. It encodes title, subtitle, and description parameters into `/api/og?title=...&subtitle=...&description=...` format.
- **Confidence:** 10/10
- **Source:** learn
- **Files:** lib/og.ts, app/page.tsx, app/blog/[slug]/page.tsx, app/(marketing)/integrations/page.tsx
- **Date:** 2026-05-15

## Pitfalls

### duplicate-metadata-brace
- **Insight:** When consolidating metadata blocks in Next.js pages, ensure old `};` closing braces are not left behind alongside the new metadata export block.
- **Confidence:** 10/10
- **Source:** learn
- **Files:** app/(marketing)/integrations/page.tsx
- **Date:** 2026-05-15

## Preferences

## Architecture

### metadata-og-twitter-system
- **Insight:** Systematically added metadata, openGraph, and twitter card exports across all marketing pages (home, blog, integrations, pricing, pitch, for-protocols, for-users, unauthorized, status) using the `ogUrl()` helper for dynamic OG images. Blog detail pages use `generateMetadata` for dynamic data. Layouts serve as the metadata export point for "use client" pages.
- **Confidence:** 10/10
- **Source:** learn
- **Files:** app/page.tsx, app/(marketing)/for-protocols/page.tsx, app/(marketing)/for-users/page.tsx, app/unauthorized/page.tsx, app/blog/page.tsx, app/blog/[slug]/page.tsx, app/(marketing)/integrations/page.tsx, app/(marketing)/integrations/[slug]/page.tsx, app/(marketing)/pricing/layout.tsx, app/(marketing)/pitch/layout.tsx, app/(marketing)/validation/layout.tsx, app/status/layout.tsx, lib/og.ts
- **Date:** 2026-05-15

## Tools
