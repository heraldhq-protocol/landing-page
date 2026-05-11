import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeFi & Privacy Glossary | Herald",
  description: "Understand the technical terms behind privacy-preserving notifications, ZK-proofs, and secure enclaves in the Herald ecosystem.",
};

const TERMS = [
  {
    term: "ZK Notifications",
    definition: "Notifications that include a zero-knowledge proof (ZK-proof) of delivery. This allows a sender to prove a message was delivered to the correct recipient without revealing the recipient's identity or contact details.",
  },
  {
    term: "Privacy Registry",
    definition: "A specialized Anchor program on the Solana blockchain that stores encrypted contact information (blobs) in Program Derived Addresses (PDAs). Only the owner's wallet and Herald's secure enclave can interact with these records.",
  },
  {
    term: "Nitro Enclave",
    definition: "An isolated compute environment (AWS Nitro) where sensitive data is decrypted in-memory. The enclave has no persistent storage and no external network access, ensuring that decrypted email addresses or phone numbers never leave the secure boundary.",
  },
  {
    term: "PDA (Program Derived Address)",
    definition: "A unique account address on Solana that is derived from a program ID and a set of seeds. Herald uses PDAs to store encrypted user identities, indexed by the user's public key.",
  },
  {
    term: "Zero-PII",
    definition: "An architectural standard where a system never collects, stores, or processes Personally Identifiable Information in a readable form. Herald is a Zero-PII infrastructure provider.",
  },
  {
    term: "Attestation",
    definition: "A cryptographic proof that a specific piece of software is running inside a secure enclave without modification. This allows users to verify that Herald's code is behaving as documented.",
  },
];

export default function GlossaryPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-teal mb-6">
            <BookOpen size={20} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-text-primary mb-6">
            Protocol <span className="text-teal text-glow">Glossary</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            New to privacy-preserving infrastructure? Explore the technical terms and 
            technologies that power the Herald notification layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-20 border-b border-border/30">
          {TERMS.map((term, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-card/40 border border-border/50 hover:border-teal/30 hover:bg-card/60 transition-all duration-300">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-teal rounded-full" />
                {term.term}
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm lg:text-base">
                {term.definition}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic CTA */}
        <div className="mt-20 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
           <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center">
             <Search className="text-teal" size={32} />
           </div>
           <h2 className="text-3xl font-black font-display">Deepen your understanding</h2>
           <p className="text-text-secondary">
             Want to see the math and architecture diagrams behind these terms? 
             Head over to our technical documentation for a full deep dive.
           </p>
           <div className="flex items-center gap-4">
            <Link href="/docs" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-teal hover:bg-white/10 transition-all group">
              Visit Documentation
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
           </div>
        </div>
      </div>
    </main>
  );
}
