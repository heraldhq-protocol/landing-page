"use client";

import { Shield, Lock, Cpu, Globe, ArrowRight } from "lucide-react";

const STEPS = [
  {
    title: "User Registration",
    desc: "A user connects their Solana wallet and provides their email. This email is instantly encrypted in the browser via X25519 before ever leaving the device.",
    details: ["X25519 key derivation", "NaCl box encryption", "Stored as an on-chain PDA"],
    icon: Lock
  },
  {
    title: "Protocol Request",
    desc: "A protocol calls the Herald API with a wallet address and a message. Herald fetches the encrypted contact PDA from the Solana blockchain.",
    details: ["No PII in request", "On-chain identity lookup", "REST or SDK trigger"],
    icon: Globe
  },
  {
    title: "Isolated Decryption",
    desc: "The encrypted data is sent to an AWS Nitro Enclave. This is a cryptographically isolated VM where even root users have no access to the memory.",
    details: ["Isolated RAM & CPU", "Attestation verification", "Transient decryption"],
    icon: Cpu
  },
  {
    title: "Atomic Delivery",
    desc: "Herald delivers the notification via SES, Telegram, or SMS within the enclave. The message is signed and a ZK-receipt is written back to Solana.",
    details: ["Zero-trace delivery", "On-chain ZK receipt", "Memory zeroed instantly"],
    icon: Shield
  }
];

export default function TechnicalArchitecture() {
  return (
    <section className="py-24 bg-bg-base border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex gap-8 md:gap-16">
              
              {/* Step indicator */}
              <div className="hidden md:flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-border-hi bg-bg-surface flex items-center justify-center font-mono text-teal font-bold shadow-2xl shadow-teal/5">
                  0{idx + 1}
                </div>
                {idx !== STEPS.length - 1 && (
                  <div className="flex-1 w-px bg-linear-to-b from-border-hi to-transparent mt-4" />
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 pb-16 border-b border-border/20 last:border-0 last:pb-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-teal/5 border border-teal/20 rounded-lg">
                    <step.icon className="w-6 h-6 text-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary font-display">{step.title}</h3>
                </div>

                <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl">
                  {step.desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3 px-4 py-3 bg-bg-surface border border-border-hi rounded-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                      <span className="text-xs font-mono text-text-muted uppercase tracking-tighter">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
