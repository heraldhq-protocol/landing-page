import Link from "next/link";
import Image from "next/image";
import { NetworkSolana } from "@web3icons/react";

const LINKS = {
  Product: [
    { name: "For Protocols", href: "/for-protocols" },
    { name: "For Users", href: "/for-users" },
    { name: "Pricing", href: "/pricing" },
    { name: "Changelog", href: "/changelog" },
    { name: "Validation", href: "/validation" },
  ],
  Resources: [
    { name: "Integrations", href: "/integrations" },
    { name: "Documentation", href: "/docs" },
    { name: "Quickstart", href: "/docs/quickstart" },
    { name: "SDK Reference", href: "/docs/sdk/typescript" },
    { name: "Blog", href: "/blog" },
  ],
  Company: [
    { name: "How it works", href: "/how-it-works" },
    { name: "Security", href: "/security" },
    { name: "Status", href: "/status" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/50 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-linear-to-r from-transparent via-teal/30 to-transparent" />

      <div className="container mx-auto px-6 pt-16 pb-8">

        {/* ── Main grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">

          {/* Brand column */}
          <div className="col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <Image width={28} height={28} src={'https://ucshdejvxzanuxlxrano.supabase.co/storage/v1/object/public/herald-public-asset/herald-logo.svg'} alt="Herald Logo" priority/>
              <span className="text-lg font-bold font-display text-text-primary">Herald</span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-6">
              The notification layer for DeFi. Privacy-first, developer-friendly, built on Solana.
            </p>

            {/* Solana badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple/20 bg-purple/5">
              <NetworkSolana variant="branded" size={16} />
              <span className="text-xs font-semibold text-purple font-mono">Built on Solana</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-text-muted mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-teal transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/30">
          <p className="text-xs text-text-muted">
            © 2026 Herald Protocol. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
           
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}