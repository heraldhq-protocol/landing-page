import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function DualValueProp() {
  return (
    <section className="py-24 border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column A: Protocols */}
          <div className="p-8 md:p-12 rounded-3xl bg-card border border-border/50 hover:glow-dot transition-all">
            <span className="text-xs font-bold uppercase tracking-widest text-herald-purple mb-4 block">For Protocols</span>
            <h3 className="text-3xl font-bold mb-6 text-text-primary">Send. Don't Store.</h3>
            <ul className="space-y-4 mb-10">
              {["One API call integration", "Zero PII stored in your DB", "Built-in GDPR compliance"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text-secondary">
                  <Check className="text-teal w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
            <Button className="w-full py-6 text-lg bg-herald-purple hover:bg-herald-purple/90 text-white rounded-xl">
              Integrate as Protocol →
            </Button>
          </div>

          {/* Column B: Users */}
          <div className="p-8 md:p-12 rounded-3xl bg-navy-2 border border-border/50 relative overflow-hidden">
             {/* Subtle Teal Glow for the User side to match brand identity */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 blur-3xl -z-10" />
            
            <span className="text-xs font-bold uppercase tracking-widest text-teal mb-4 block">For Users</span>
            <h3 className="text-3xl font-bold mb-6 text-text-primary">Your Wallet. Your Inbox.</h3>
            <ul className="space-y-4 mb-10">
              {["Connect any Solana wallet", "End-to-end encryption", "Own your own notification data"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text-secondary">
                  <Check className="text-teal w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full py-6 text-lg border-teal/50 text-teal hover:bg-teal/5 rounded-xl">
              Register Your Wallet →
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}