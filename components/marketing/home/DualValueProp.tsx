"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Shield } from "lucide-react";
import { CheckIcon as Check } from "@/components/ui/check";
import { ArrowRightIcon as ArrowRight } from "@/components/ui/arrow-right";
import AnimatedIcon from "@/components/ui/animated-icon";

const PROTOCOL_POINTS = [
  "One API call — wallet address + message",
  "Zero PII in your database. Ever.",
  "GDPR compliant by architecture, not by policy",
  "ZK receipts — immutable on-chain delivery proof",
];

const USER_POINTS = [
  "Connect any Solana wallet — Phantom, Backpack, Ledger",
  "Your email is encrypted before it leaves your browser",
  "Protocols never learn your contact info",
  "Delete your identity anytime, on-chain",
];

export default function DualValueProp() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-border/30">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-linear-to-br from-bg-base via-bg-surface/20 to-bg-base pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* ── Section label ─────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
            Two audiences. One infrastructure.
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary text-balance">
            Built for protocols.{" "}
            <span className="text-teal">Trusted by users.</span>
          </h2>
        </div>

        {/* ── Dual card grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Protocol card ────────────────────────────────────────── */}
          <div className="group relative p-6 sm:p-8 xl:p-10 rounded-3xl bg-bg-surface border border-border overflow-hidden hover:border-purple/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple/15 transition-all duration-500">
            {/* Purple ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple/8 blur-3xl rounded-full pointer-events-none group-hover:opacity-150 transition-opacity duration-700" />

            {/* Top label */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center">
                <AnimatedIcon icon={Code2} className="text-purple" size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-purple">
                For Protocols
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-text-primary mb-3 leading-tight text-balance">
              Send. <span className="text-purple">Don't store.</span>
            </h3>
            <p className="text-text-secondary mb-8 text-base leading-relaxed max-w-sm">
              Alert your users without ever touching their contact data. Herald
              handles routing, delivery, and compliance.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-10">
              {PROTOCOL_POINTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-purple/15 border border-purple/30 flex items-center justify-center">
                    <Check size={10} className="text-purple" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              asChild
              className="bg-purple hover:bg-purple/90 text-white rounded-xl px-7 h-11 font-bold shadow-[0_0_24px_rgba(124,58,237,0.25)] hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(124,58,237,0.4)] transition-all duration-300 group/btn"
            >
              <Link
                href="https://app.useherald.xyz"
                className="flex items-center gap-2"
              >
                Start integrating
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* Code snippet preview */}
            <div className="mt-8 p-4 rounded-xl bg-bg-elevated border border-border font-mono text-xs text-text-muted leading-relaxed overflow-x-auto">
              <span className="text-purple/70">await</span>{" "}
              <span className="text-teal">herald</span>
              <span className="text-text-secondary">.notify({"{"}</span>
              <br />
              <span className="ml-4 text-text-muted">wallet: </span>
              <span className="text-amber">'7xR4...nQ'</span>
              <span className="text-text-secondary">,</span>
              <br />
              <span className="ml-4 text-text-muted">subject: </span>
              <span className="text-amber">'Liquidation Warning'</span>
              <br />
              <span className="text-text-secondary">{"}"});</span>
            </div>
          </div>

          {/* ── User card ─────────────────────────────────────────────── */}
          <div className="group relative p-6 sm:p-8 xl:p-10 rounded-3xl bg-bg-elevated border border-border overflow-hidden hover:border-teal/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal/15 transition-all duration-500">
            {/* Teal ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/6 blur-3xl rounded-full pointer-events-none group-hover:opacity-150 transition-opacity duration-700" />

            {/* Top label */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center">
                <AnimatedIcon icon={Shield} className="text-teal" size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal">
                For Users
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-text-primary mb-3 leading-tight">
              Your wallet. <span className="text-teal">Your inbox.</span>
            </h3>
            <p className="text-text-secondary mb-8 text-base leading-relaxed max-w-sm">
              Register once. Receive DeFi alerts from any Herald-integrated
              protocol — without sharing your email with anyone.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-10">
              {USER_POINTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-teal/10 border border-teal/25 flex items-center justify-center">
                    <Check size={10} className="text-teal" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              asChild
              variant="outline"
              className="border-teal/40 text-teal hover:bg-teal/8 hover:border-teal/70 rounded-xl px-7 h-11 font-bold hover:-translate-y-1 hover:shadow-lg hover:shadow-teal/10 transition-all duration-300 group/btn"
            >
              <Link
                href="https://notify.useherald.xyz/register"
                className="flex items-center gap-2"
              >
                Register for free
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* Privacy stat row */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { val: "0", label: "PII stored" },
                { val: "90s", label: "to register" },
                { val: "∞", label: "protocols" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl bg-bg-surface border border-border text-center"
                >
                  <div className="font-mono text-lg font-bold text-teal leading-tight">
                    {stat.val}
                  </div>
                  <div className="text-[10px] text-text-muted mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
