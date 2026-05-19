"use client";

import { Gift, ClipboardCheck } from "lucide-react";
import { CheckIcon as Check } from "@/components/ui/check";

const OFFER_ITEMS = [
  {
    title: "Free Growth tier",
    desc: "$99/mo value — full access for 6 months, not just sandbox",
  },
  {
    title: "Direct founder access",
    desc: "Monthly 30-min call. Your feature requests go to the top of the roadmap.",
  },
  {
    title: "Co-marketing",
    desc: "Case study + joint tweet from @useheraldmail tagging your protocol.",
  },
  {
    title: "Design Partner badge",
    desc: '"Herald Design Partner" badge for your site and ours — signals technical leadership.',
  },
];

const ASK_ITEMS = [
  {
    title: "Integrate within 2 weeks",
    desc: "Deploy Herald in your staging environment and start testing.",
  },
  {
    title: "Onboarding call",
    desc: "Share your integration experience in a 30-min call with our team.",
  },
  {
    title: "One public post",
    desc: "1 tweet or post about using Herald, tagged @useheraldmail.",
  },
  {
    title: "Monthly feedback",
    desc: "A 2-question survey each month. Takes 2 minutes.",
  },
  {
    title: "Case study participation",
    desc: "Permission to publish a case study with your protocol's name and results.",
  },
];

export default function DesignPartnerOffer() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 bg-linear-to-br from-bg-base via-bg-surface/20 to-bg-base pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
            The Design Partner Program
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary text-balance">
            What you get.{" "}
            <span className="text-teal">What we ask.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── What You Get card ──────────────────────────────────────── */}
          <div
            className="group relative p-6 sm:p-8 xl:p-10 rounded-3xl bg-bg-surface border border-border overflow-hidden motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-2xl transition-all duration-300 ease-out hover:border-teal/50 motion-safe:hover:shadow-teal/15"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/8 blur-3xl rounded-full pointer-events-none motion-safe:group-hover:opacity-150 transition-opacity duration-300" />

            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center">
                <Gift size={16} className="text-teal" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal">
                What You Get
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary mb-3 leading-tight">
              Free access.{" "}
              <span className="text-teal">Direct influence.</span>
            </h3>
            <p className="text-text-secondary mb-8 text-base leading-relaxed max-w-sm">
              Real value, not sandbox access. You get the full Growth tier and a
              seat at our roadmap table.
            </p>

            <ul className="space-y-4">
              {OFFER_ITEMS.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-teal/10 border border-teal/25 flex items-center justify-center">
                    <Check size={11} className="text-teal" />
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary">
                      {item.title}
                    </span>
                    <span className="block text-text-muted leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── What We Ask card ──────────────────────────────────────── */}
          <div
            className="group relative p-6 sm:p-8 xl:p-10 rounded-3xl bg-bg-elevated border border-border overflow-hidden motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-2xl transition-all duration-300 ease-out hover:border-amber/50 motion-safe:hover:shadow-amber/15"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/6 blur-3xl rounded-full pointer-events-none motion-safe:group-hover:opacity-150 transition-opacity duration-300" />

            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center">
                <ClipboardCheck size={16} className="text-amber" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                What We Ask
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary mb-3 leading-tight">
              A few hours.{" "}
              <span className="text-amber">Huge impact.</span>
            </h3>
            <p className="text-text-secondary mb-8 text-base leading-relaxed max-w-sm">
              Your honest feedback helps us build something every protocol needs.
              Here&apos;s what we need from you:
            </p>

            <ul className="space-y-4">
              {ASK_ITEMS.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-amber/10 border border-amber/25 flex items-center justify-center">
                    <Check size={11} className="text-amber" />
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary">
                      {item.title}
                    </span>
                    <span className="block text-text-muted leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Scarcity / trust row ─────────────────────────────────── */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-teal/15 bg-teal/5 text-sm text-teal font-medium">
            <span className="w-2 h-2 rounded-full bg-teal motion-safe:animate-pulse" />
            Limited spots — apply below
          </div>
        </div>
      </div>
    </section>
  );
}
