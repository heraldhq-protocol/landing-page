import { Activity, ScrollText, PieChart, ShieldAlert, LineChart, Image } from "lucide-react";

const USE_CASES = [
  { icon: Activity, title: "Liquidation Warnings", desc: "Alert users when their health factor drops below a critical threshold to prevent unwinding." },
  { icon: ScrollText, title: "Governance Reminders", desc: "Notify token holders about active DAO proposals requiring their attention and vote." },
  { icon: PieChart, title: "Position Updates", desc: "Send daily wrap-ups, claimable rewards, and significant lending position changes." },
  { icon: ShieldAlert, title: "Security Alerts", desc: "Instantly broadcast emergency protocol pauses or action-required security updates." },
  { icon: LineChart, title: "Yield Changes", desc: "Notify liquidity providers when vault APYs spike or drop significantly." },
  { icon: Image, title: "NFT Infrastructure", desc: "Send whitelist claim reminders, mint phase transitions, and drop announcements out-of-band." },
];

export default function UseCasesGrid() {
  return (
    <section className="py-32 bg-bg-base">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          
          {/* Sticky Header Side */}
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-5xl font-extrabold font-display leading-tight mb-6">
              Versatile APIs <br />
              <span className="text-text-muted">for any Protocol.</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-sm">
              Reach your users across email, Telegram, and SMS instantly—no matter what you're building on Solana.
            </p>
          </div>

          {/* List without Cards */}
          <div className="border-t border-border-hi flex flex-col">
            {USE_CASES.map((useCase, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col md:flex-row items-start md:items-center py-10 border-b border-border/40 hover:border-teal/50 transition-colors duration-300 gap-6 md:gap-12"
              >
                <div className="p-4 rounded-xl bg-bg-surface group-hover:bg-teal/10 transition-colors shrink-0">
                  <useCase.icon className="w-8 h-8 text-text-muted group-hover:text-teal transition-colors" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-teal transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {useCase.desc}
                  </p>
                </div>
                
                {/* Subtle visual indicator on hover */}
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-20px] group-hover:translate-x-0">
                  <span className="text-teal font-mono text-sm tracking-widest uppercase">Explore →</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
