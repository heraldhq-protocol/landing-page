import { Button } from "@/components/ui/button";

export default function UserHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden text-center">
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-40" />
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-text-primary font-display">
          Your wallet is your address.
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
          Receive critical DeFi alerts to your inbox, Telegram, or phone — without sharing your contact info with any protocol. Ever.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-teal text-navy hover:bg-teal/90 font-bold px-8 py-6 h-auto text-lg rounded-xl">
            Register for free →
          </Button>
        </div>
      </div>
    </section>
  );
}
