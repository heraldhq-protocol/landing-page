import { AlertTriangle, LockKeyhole } from "lucide-react";

export default function TheProblem() {
  return (
    <section className="py-32 border-t border-border/30 bg-bg-base relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Storing emails is a <span className="text-text-muted line-through decoration-red/50">liability</span> mistake.
          </h2>
        </div>

        {/* Technical Split View, NO Cards */}
        <div className="flex flex-col md:flex-row border-y border-border-hi/50 max-w-6xl mx-auto">
          
          {/* Legacy Flow (Left) */}
          <div className="flex-1 p-8 md:p-16 border-b md:border-b-0 md:border-r border-border-hi/50 relative group">
            <div className="flex items-center gap-4 mb-10">
              <AlertTriangle className="text-text-muted group-hover:text-red/50 transition-colors" size={24} />
              <h3 className="text-xl font-bold font-mono tracking-tight text-text-muted uppercase">The Legacy Flow</h3>
            </div>
            
            <div className="space-y-12">
              {[
                { title: "PII Mapping", desc: "You write a mapping of public keys to plaintext emails in your database." },
                { title: "Compliance Burden", desc: "You are now fully responsible for GDPR, user deletion requests, and opt-outs." },
                { title: "High-Value Target", desc: "Your database becomes a lucrative target for phishing attacks and exploits." }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-border-hi/30 transition-colors group-hover:border-red/20 opacity-60 group-hover:opacity-100">
                  <h4 className="text-lg font-semibold text-text-primary mb-2 line-through decoration-red/30">{item.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Herald Flow (Right) */}
          <div className="flex-1 p-8 md:p-16 relative group cursor-default">
            {/* Subtle highlight effect */}
            <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <LockKeyhole className="text-text-muted group-hover:text-teal transition-colors" size={24} />
              <h3 className="text-xl font-bold font-mono tracking-tight text-text-primary uppercase">The Protocol Way</h3>
            </div>
            
            <div className="space-y-12 relative z-10">
              {[
                { title: "Zero State", desc: "You only ever handle the user's on-chain public key. No database updates required." },
                { title: "Compliance by Design", desc: "Herald's TEE architecture handles the encryption so you never touch regulated data." },
                { title: "Cryptographic Proof", desc: "Every dispatched message results in a verifiable, zero-knowledge receipt on Solana." }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-border-hi/40 transition-colors group-hover:border-teal">
                  <h4 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-teal transition-colors">{item.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
