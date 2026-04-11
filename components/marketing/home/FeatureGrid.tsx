import { ShieldCheck, Zap, Receipt, Globe, Cpu, Bell } from "lucide-react";

const FEATURES = [
  {
    title: "Privacy Registry",
    desc: "On-chain identity management via Anchor PDAs. You own your data — Herald cannot modify or delete your record.",
    icon: ShieldCheck,
    accent: "teal",
  },
  {
    title: "Multi-channel Delivery",
    desc: "Email, Telegram, and SMS — whichever channel your users prefer.",
    icon: Bell,
    accent: "purple",
  },
  {
    title: "ZK Receipts",
    desc: "Every delivery writes an immutable ZK-compressed leaf to Solana. Provable at $0.0001 per receipt.",
    icon: Receipt,
    accent: "teal",
  },
  {
    title: "Pay in USDC",
    desc: "Native USDC streaming. No credit cards, no invoices.",
    icon: Zap,
    accent: "amber",
  },
  {
    title: "One API Call",
    desc: "Send your first notification in under 5 minutes. Our SDK handles encryption and on-chain resolution.",
    icon: Cpu,
    accent: "teal",
  },
  {
    title: "Global Scale",
    desc: "Multi-AZ AWS infrastructure with Helius RPC. 99.9% SLA on Growth and Scale tiers.",
    icon: Globe,
    accent: "purple",
  },
];

const accentMap: Record<string, {
  icon: string;
  border: string;
  iconBg: string;
  glow: string;
}> = {
  teal: {
    icon: "text-teal",
    border: "hover:border-teal/40",
    iconBg: "bg-teal/10 border-teal/20",
    glow: "bg-teal/20",
  },
  purple: {
    icon: "text-purple",
    border: "hover:border-purple/40",
    iconBg: "bg-purple/10 border-purple/20",
    glow: "bg-purple/20",
  },
  amber: {
    icon: "text-amber",
    border: "hover:border-amber/40",
    iconBg: "bg-amber/10 border-amber/20",
    glow: "bg-amber/20",
  },
};

export default function FeatureGrid() {
  return (
    <section className="py-28 bg-bg-base relative">
      <div className="container mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
              Infrastructure
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display text-text-primary leading-tight">
              Everything you need to{" "}
              <span className="text-teal">scale trust</span>
            </h2>
          </div>
          <p className="text-text-secondary max-w-xs text-sm leading-relaxed md:text-right">
            Robust, privacy-preserving notification infrastructure built for the next billion DeFi users.
          </p>
        </div>

        {/* ── Grid — 1 col mobile, 2 col tablet, 3 col desktop ───────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const a = accentMap[f.accent];
            return (
              <div
                key={i}
                className={`group relative p-8 rounded-2xl bg-bg-surface border border-border ${a.border} transition-all duration-300 overflow-hidden`}
              >
                {/* Hover glow — top right corner */}
                <div
                  className={`absolute top-0 right-0 w-40 h-40 ${a.glow} blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none rounded-full`}
                />

                {/* Icon container */}
                <div
                  className={`relative w-11 h-11 rounded-xl border ${a.iconBg} flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-5 h-5 ${a.icon}`} />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-text-primary mb-2.5 font-display">
                  {f.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}