"use client";

import { useState, useEffect } from "react";
import { 
  Database, 
  ShieldCheck, 
  Mail, 
  Wallet, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Server,
  Lock,
  Cpu,
  RefreshCw,
  Info,
  Check
} from "lucide-react";

export default function OldVsNew() {
  const [traditionalState, setTraditionalState] = useState<"idle" | "submitting" | "done">("idle");
  const [heraldState, setHeraldState] = useState<"idle" | "submitting" | "done">("idle");

  const [traditionalEmail, setTraditionalEmail] = useState("user@example.com");

  const runTraditionalSim = () => {
    if (traditionalState !== "idle") return;
    setTraditionalState("submitting");
  };

  const runHeraldSim = () => {
    if (heraldState !== "idle") return;
    setHeraldState("submitting");
  };

  useEffect(() => {
    if (traditionalState === "submitting") {
      const timer = setTimeout(() => setTraditionalState("done"), 2000);
      return () => clearTimeout(timer);
    }
  }, [traditionalState]);

  useEffect(() => {
    if (heraldState === "submitting") {
      const timer = setTimeout(() => setHeraldState("done"), 1600);
      return () => clearTimeout(timer);
    }
  }, [heraldState]);

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-border/30">
      {/* Premium ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal mb-3">
            Interactive Comparison
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-text-primary leading-tight tracking-tight mb-5">
            The Old Way vs. <span className="text-teal">The Herald Way</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            See how Herald eliminates database vulnerabilities. For the protocol, implementation is simplified down to a single wallet connection.
          </p>
        </div>

        {/* ── Interactive Grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* ── Card A: The Old Way (Web2) ─────────────────────────── */}
          <div className="flex flex-col bg-bg-surface/50 border border-border/50 rounded-3xl p-5 sm:p-8 relative overflow-hidden transition-all hover:border-red/30 hover:shadow-2xl hover:shadow-red/5">
            {/* Header Red Line Accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-red/5 via-red/40 to-red/5" />

            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-red/80 font-mono">
                Traditional Web2 Form
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-red/25 bg-red/5 text-red/80">
                Plaintext PII Storage
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary mb-2">
              The Plaintext Trap
            </h3>
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              Users are forced to manually enter private contact details alongside their wallet signature, creating a permanent mapping on your servers.
            </p>

            {/* Simulated Form Container */}
            <div className="bg-bg-elevated/40 border border-border/60 rounded-2xl p-4 sm:p-6 flex-1 flex flex-col justify-between">
              
              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1.5">
                    User Input Required: Email Address
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={traditionalEmail}
                      onChange={(e) => {
                        if (traditionalState === "idle") setTraditionalEmail(e.target.value);
                      }}
                      disabled={traditionalState !== "idle"}
                      className="w-full bg-bg-surface border border-border/80 rounded-xl px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-red/40 disabled:opacity-60 transition-all font-mono"
                    />
                    <Mail size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1.5">
                    Solana Wallet Connect
                  </label>
                  <div className="flex items-center justify-between bg-bg-surface/50 border border-border/80 rounded-xl px-4 py-3 text-xs text-text-muted">
                    <span className="flex items-center gap-2 font-mono">
                      <Wallet size={14} className="text-text-muted" />
                      Phantom Wallet
                    </span>
                    <span className="text-[10px] font-mono text-text-muted uppercase font-bold">Connected</span>
                  </div>
                </div>
              </div>

              {/* Visual Flow Representation */}
              <div className="my-6 py-5 border-t border-b border-border/40 relative">
                <div className="flex items-center justify-between relative px-1 sm:px-3">
                  
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-bg-surface border border-border flex items-center justify-center shadow-lg">
                      <Mail size={18} className="text-text-muted" />
                    </div>
                    <span className="text-[9px] font-mono text-text-muted mt-1.5 uppercase font-bold">PII Data</span>
                  </div>

                  <div className="flex-1 px-4 relative flex items-center justify-center">
                    <div className="h-[2px] w-full bg-border/40 relative">
                      {traditionalState === "submitting" && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 rounded-full bg-red animate-ping-flow" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-bg-surface border border-border flex items-center justify-center relative shadow-lg">
                      {traditionalState === "done" && (
                        <div className="absolute inset-0 bg-red/10 rounded-xl animate-pulse" />
                      )}
                      <Database size={18} className={traditionalState === "done" ? "text-red" : "text-text-muted"} />
                    </div>
                    <span className="text-[9px] font-mono text-text-muted mt-1.5 uppercase font-bold">Your DB</span>
                  </div>

                </div>

                {/* Status Box */}
                <div className="mt-5 min-h-[4rem] flex items-center">
                  {traditionalState === "idle" && (
                    <div className="flex gap-2 items-center justify-center w-full py-2 bg-bg-surface/30 rounded-xl border border-border/40">
                      <Info size={14} className="text-text-muted" />
                      <p className="text-xs text-text-secondary">
                        Simulate the Web2 user register flow
                      </p>
                    </div>
                  )}
                  {traditionalState === "submitting" && (
                    <div className="w-full text-center">
                      <p className="text-xs text-red animate-pulse font-mono">
                        Writing plaintext email + wallet mapping to SQL database...
                      </p>
                    </div>
                  )}
                  {traditionalState === "done" && (
                    <div className="flex gap-3 items-start bg-red/5 border border-red/20 rounded-xl p-3.5 w-full">
                      <AlertTriangle size={18} className="text-red shrink-0 mt-0.5" />
                      <div className="text-xs text-red/90 leading-relaxed font-mono">
                        <strong>PLAIN-TEXT LIABILITY:</strong>
                        <p className="mt-1">
                          Email `{traditionalEmail}` is permanently associated with key `7xR4...` on your database server. Vulnerable to hacks, employee leaks, and spam.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Trigger */}
              <button
                onClick={runTraditionalSim}
                disabled={traditionalState !== "idle"}
                className="w-full bg-bg-surface border border-red/30 hover:border-red hover:bg-red/5 disabled:opacity-50 text-red font-bold rounded-xl py-3 text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {traditionalState === "idle" && (
                  <>
                    Simulate Sign Up Flow
                    <ArrowRight size={14} />
                  </>
                )}
                {traditionalState === "submitting" && "Registering..."}
                {traditionalState === "done" && (
                  <span onClick={(e) => { e.stopPropagation(); setTraditionalState("idle"); }} className="flex items-center gap-2 py-0.5 cursor-pointer">
                    <RefreshCw size={12} /> Reset Simulation
                  </span>
                )}
              </button>

            </div>
          </div>

          {/* ── Card B: The Herald Way (Solana) ───────────────────────── */}
          <div className="flex flex-col bg-bg-surface/50 border border-border/50 rounded-3xl p-5 sm:p-8 relative overflow-hidden transition-all hover:border-teal/30 hover:shadow-2xl hover:shadow-teal/5">
            {/* Header Teal Line Accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-teal/5 via-teal/40 to-teal/5" />

            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal font-mono">
                The Herald Way
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-teal/25 bg-teal/5 text-teal">
                Secure Decoupled Layer
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary mb-2">
              Connect to Subscribe
            </h3>
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              Simplify user onboarding. Users simply click one button to connect. Your backend saves only their standard wallet address — no email database required.
            </p>

            {/* Simulated Widget Box */}
            <div className="bg-bg-elevated/40 border border-border/60 rounded-2xl p-4 sm:p-6 flex-1 flex flex-col justify-between">
              
              {/* Simplified Layout */}
              <div className="space-y-4">
                <div className="border border-dashed border-teal/20 rounded-xl p-4 flex items-center justify-center bg-teal/5 min-h-[5.5rem]">
                  <p className="text-xs text-teal/80 text-center leading-relaxed font-mono">
                     No email forms. No phone inputs. <br />
                     All PII is encrypted on-chain.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1.5">
                    Solana Wallet Connect (via Herald)
                  </label>
                  <button 
                    onClick={runHeraldSim}
                    disabled={heraldState !== "idle"}
                    className="w-full flex items-center justify-between bg-bg-surface hover:bg-bg-surface/75 border border-teal/30 text-teal font-bold rounded-xl px-4 py-3 text-xs transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-bg-surface"
                  >
                    <span className="flex items-center gap-2 font-mono">
                      <Wallet size={14} className="text-teal" />
                      Phantom / Solflare
                    </span>
                    {heraldState === "idle" && (
                      <span className="text-[10px] font-mono text-teal uppercase font-bold flex items-center gap-1">
                        Connect <ArrowRight size={12} />
                      </span>
                    )}
                    {heraldState !== "idle" && (
                      <span className="text-[10px] font-mono text-teal uppercase font-bold">Connected</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Visual Flow Representation */}
              <div className="my-6 py-5 border-t border-b border-border/40 relative">
                <div className="flex items-center justify-between relative px-1 sm:px-3">
                  
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-bg-surface border border-teal/30 flex items-center justify-center shadow-lg">
                      <Wallet size={18} className="text-teal" />
                    </div>
                    <span className="text-[9px] font-mono text-text-muted mt-1.5 uppercase font-bold">User Wallet</span>
                  </div>

                  <div className="flex-1 px-4 relative flex items-center justify-center">
                    <div className="h-[2px] w-full bg-border/40 relative">
                      {heraldState === "submitting" && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 rounded-full bg-teal animate-ping-flow" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-bg-surface border border-teal/30 flex items-center justify-center relative shadow-lg">
                      {heraldState === "done" && (
                        <div className="absolute inset-0 bg-teal/10 rounded-xl animate-pulse" />
                      )}
                      <Cpu size={18} className={heraldState === "done" ? "text-teal" : "text-text-muted"} />
                    </div>
                    <span className="text-[9px] font-mono text-text-muted mt-1.5 uppercase font-bold">Nitro Enclave</span>
                  </div>

                </div>

                {/* Status Box */}
                <div className="mt-5 min-h-[4rem] flex items-center">
                  {heraldState === "idle" && (
                    <div className="flex gap-2 items-center justify-center w-full py-2 bg-bg-surface/30 rounded-xl border border-border/40">
                      <Info size={14} className="text-text-muted" />
                      <p className="text-xs text-text-secondary">
                        Click "Connect" to subscribe securely
                      </p>
                    </div>
                  )}
                  {heraldState === "submitting" && (
                    <div className="w-full text-center">
                      <p className="text-xs text-teal animate-pulse font-mono">
                        Resolving encrypted profile on Solana and sealing channel...
                      </p>
                    </div>
                  )}
                  {heraldState === "done" && (
                    <div className="flex gap-3 items-start bg-teal/5 border border-teal/20 rounded-xl p-3.5 w-full">
                      <CheckCircle2 size={18} className="text-teal shrink-0 mt-0.5" />
                      <div className="text-xs text-text-primary leading-relaxed">
                        <strong className="text-teal font-mono">HERALD PRIVACY CONFIRMED:</strong>
                        <ul className="mt-1 space-y-1 text-text-secondary font-mono">
                          <li className="flex items-center gap-1.5">
                            <Check size={10} className="text-teal" /> Protocol stores ONLY wallet address
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check size={10} className="text-teal" /> Email / Telegram routing handled entirely by Herald
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check size={10} className="text-teal" /> transient enclave decrypts & sends in under 200ms
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Reset Link */}
              <div className="text-center h-[38px] flex items-center justify-center">
                {heraldState === "done" && (
                  <button 
                    onClick={() => setHeraldState("idle")}
                    className="text-[11px] font-mono text-text-muted hover:text-teal transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw size={10} /> Reset Simulation
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
