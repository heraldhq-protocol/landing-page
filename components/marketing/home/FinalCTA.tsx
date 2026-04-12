import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="py-24 border-t border-border/30 relative overflow-hidden bg-navy">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-app-glow opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-text-primary font-display">
          Ready to join the privacy-first layer?
        </h2>
        
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
          Start sending notifications to your users safely in 5 minutes, or register your wallet to take control of your alerts.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-teal text-navy hover:bg-teal/90 font-bold px-8 py-6 h-auto text-lg rounded-xl transition-all hover:scale-105 duration-300">
            Start building →
          </Button>
          <Button variant="outline" size="lg" className="border-border-2 text-text-primary hover:border-teal/40 px-8 py-6 h-auto text-lg rounded-xl bg-card/50 backdrop-blur-sm transition-all hover:scale-105 duration-300">
            Register your wallet →
          </Button>
        </div>
      </div>
    </section>
  );
}
