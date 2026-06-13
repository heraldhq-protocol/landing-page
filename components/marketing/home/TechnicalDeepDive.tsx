"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Layers, 
  MessageSquare, 
  Check, 
  ArrowRight,
  Info,
  Settings,
  Lock,
  Eye,
  Sliders,
  ZoomIn,
  X
} from "lucide-react";

const DEEP_DIVES = {
  "key-sealer": {
    badge: "Privacy Registry",
    title: "On-Device Key Sealer",
    tagline: "Cryptographic client-side sealing for user contact information.",
    desc: "Herald's on-device key sealer ensures that sensitive user contact details (emails, phone numbers, Telegram handles) never touch a centralized database. The sealing handshake encrypts user details directly in their browser before recording the cipher on the Solana blockchain.",
    bullets: [
      "No Plaintext Transmission: Contact details are encrypted client-side using the user's wallet signature.",
      "Solana Registry PDAs: Encrypted metadata mappings are written directly to on-chain Program Derived Addresses.",
      "Provably Decoupled: Protocols store only standard wallet public keys, completely eliminating data leakage liabilities."
    ],
    forUsers: "Your email or Telegram handle is fully encrypted before it leaves your device. No protocol, not even Herald, can view or access your plaintext contact details without your authorization.",
    forProtocols: "Call notify() using only the user's wallet address. Herald automatically resolves the on-chain registry record, decrypts the destination inside secure enclaves, and delivers the notification.",
    image: "/images/key-sealer.png",
    alt: "On-device key sealer cryptographic handshake diagram"
  },
  "preview-sandbox": {
    badge: "Developer Tooling",
    title: "Multi-Channel Preview Sandbox",
    tagline: "Design and debug variables routing across multiple delivery layers.",
    desc: "Create notification templates with dynamic variables and preview how they render in real-time across channels. The sandbox ensures variables formatting, Markdown parsing, and layout structures look perfect on both Telegram bubbles and HTML emails.",
    bullets: [
      "Unified Templates: Author alerts once with dynamic placeholders (e.g. {{health_factor}}, {{protocol}}).",
      "Format Parsers: Real-time MarkdownV2 validation for Telegram and responsive CSS rendering for Email.",
      "Category Management: Instantly configure notification preferences, mute settings, and priority routings."
    ],
    forUsers: "Receive clean, legible alerts customized for your preferred platform. Never struggle with unformatted plaintext notifications or broken links.",
    forProtocols: "Verify template aesthetics before going live. Preview inline action buttons (like 'Mute notifications' or 'Repay debt') across all user delivery channels.",
    image: "/images/preview-sandbox.png",
    alt: "Multi-channel preview sandbox visual template parser diagram"
  },
  "topic-router": {
    badge: "Community Engagement",
    title: "Supergroup Topic Router",
    tagline: "Automatic alert sorting for Telegram supergroups.",
    desc: "Herald's Topic Router organizes community broadcasts automatically. Instead of spamming the main channel, notifications are dynamically routed into dedicated sub-threads (topics) based on the alert category (e.g. Governance, DeFi Liquidations, Security).",
    bullets: [
      "Topic Thread Isolation: Route notification payloads to specific thread IDs inside a Telegram Supergroup.",
      "Category Triggers: Automatically match incoming API alerts to predefined community threads.",
      "Anti-Spam Filter: Keeps main chats quiet while ensuring critical protocol alerts remain visible."
    ],
    forUsers: "Mute or subscribe to specific topics inside the community supergroup, receiving only the updates you care about without leaving the main community chat.",
    forProtocols: "Keep your official group organized and clean. Direct high-frequency alerts (like oracle updates or liquidations) to special threads so they don't drown out user conversations.",
    image: "/images/topic-router.png",
    alt: "Supergroup topic router thread routing visualizer diagram"
  }
};

type Tab = keyof typeof DEEP_DIVES;

export default function TechnicalDeepDive() {
  const [activeTab, setActiveTab] = useState<Tab>("key-sealer");
  const [isZoomed, setIsZoomed] = useState(false);

  const current = DEEP_DIVES[activeTab];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-border/30 bg-bg-base">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── Section Header ────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal mb-3">
            Under the Hood
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-text-primary leading-tight tracking-tight mb-5">
            Core Technology & <span className="text-teal">User Flows</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Deep dive into the cryptographic architecture and routing layers powering privacy-first notifications.
          </p>
        </div>

        {/* ── Tab Selectors ─────────────────────────────────────────── */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex flex-wrap sm:flex-nowrap p-1.5 bg-bg-surface border border-border/60 rounded-2xl gap-1 justify-center">
            
            <button
              onClick={() => setActiveTab("key-sealer")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold font-mono tracking-wide transition-all ${
                activeTab === "key-sealer"
                  ? "bg-teal/15 text-teal border border-teal/20 shadow-md shadow-teal/5"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/40"
              }`}
            >
              <ShieldCheck size={16} />
              Key Sealer
            </button>

            <button
              onClick={() => setActiveTab("preview-sandbox")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold font-mono tracking-wide transition-all ${
                activeTab === "preview-sandbox"
                  ? "bg-teal/15 text-teal border border-teal/20 shadow-md shadow-teal/5"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/40"
              }`}
            >
              <Sliders size={16} />
              Preview Sandbox
            </button>

            <button
              onClick={() => setActiveTab("topic-router")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold font-mono tracking-wide transition-all ${
                activeTab === "topic-router"
                  ? "bg-teal/15 text-teal border border-teal/20 shadow-md shadow-teal/5"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/40"
              }`}
            >
              <MessageSquare size={16} />
              Topic Router
            </button>

          </div>
        </div>

        {/* ── Tab Content Container ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto items-center">
          
          {/* Left: Text explanation (width 5/12) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-teal uppercase bg-teal/5 border border-teal/20 px-3 py-1 rounded-full">
                {current.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-text-primary tracking-tight">
              {current.title}
            </h3>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              {current.desc}
            </p>

            {/* Bullets */}
            <div className="space-y-3 pt-2">
              {current.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-teal" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Split Perspective Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/30">
              
              <div className="bg-bg-surface/50 border border-border/40 rounded-2xl p-4 transition-all hover:border-teal/20">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-teal mb-2 flex items-center gap-1.5">
                  <Lock size={12} /> For Users
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {current.forUsers}
                </p>
              </div>

              <div className="bg-bg-surface/50 border border-border/40 rounded-2xl p-4 transition-all hover:border-purple/20">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-purple mb-2 flex items-center gap-1.5">
                  <Settings size={12} className="text-purple" /> For Protocols
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {current.forProtocols}
                </p>
              </div>

            </div>

          </div>

          {/* Right: Excalidraw Diagram rendering (width 7/12 for maximum size) */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-3xl overflow-hidden border border-border/60 bg-[#041224] p-3 sm:p-5 shadow-2xl hover:border-teal/30 hover:shadow-teal/5 transition-all duration-500">
              
              {/* Decorative background visual controls */}
              <div className="absolute top-4 left-4 flex gap-1.5 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-border-hi" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-hi" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-hi" />
              </div>

              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted bg-bg-surface border border-border/50 px-2 py-0.5 rounded-md">
                  Excalidraw Diagram
                </span>
                <button
                  onClick={() => setIsZoomed(true)}
                  className="p-1 rounded bg-teal/10 border border-teal/20 hover:bg-teal/20 text-teal transition-colors"
                  title="Expand diagram"
                  aria-label="Expand diagram"
                >
                  <ZoomIn size={12} />
                </button>
              </div>

              {/* Diagram Image Container - no restrictive aspect ratio height limits */}
              <div 
                onClick={() => setIsZoomed(true)}
                className="relative rounded-2xl overflow-hidden bg-[#040C18] border border-border/40 flex items-center justify-center cursor-zoom-in pt-8 pb-4 px-2 group/img mt-2"
              >
                <img
                  src={current.image}
                  alt={current.alt}
                  className="w-full h-auto max-h-[500px] object-contain select-none transition-all duration-500 group-hover/img:scale-[1.01]"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-bg-surface border border-teal/30 text-teal px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-mono font-bold shadow-lg">
                    <ZoomIn size={14} />
                    Click to Expand Diagram
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ── Premium Fullscreen Lightbox Zoom Overlay ────────────────── */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#040C18]/95 backdrop-blur-md cursor-zoom-out select-none animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close header controls */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-[110]">
            <span className="text-xs font-mono tracking-widest text-text-secondary">
              {current.title} — Technical Flow
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
              className="p-2 rounded-full bg-bg-surface border border-border hover:bg-bg-elevated text-text-primary transition-all shadow-lg cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <X size={20} />
            </button>
          </div>

          {/* Fullscreen Image */}
          <div className="relative max-w-[92vw] max-h-[85vh] flex items-center justify-center p-4">
            <img 
              src={current.image} 
              alt={current.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-border/40 bg-[#040c18] shadow-2xl p-4 sm:p-8 animate-slide-up"
            />
          </div>

          {/* Bottom Hint */}
          <div className="absolute bottom-6 text-xs font-mono text-text-muted">
            Click anywhere to exit fullscreen view
          </div>
        </div>
      )}
    </section>
  );
}
