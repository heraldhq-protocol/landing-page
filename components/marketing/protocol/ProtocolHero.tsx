import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PROTOCOL_HERO_CTA, isExternal } from "@/lib/cta-config";

export default function ProtocolHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden text-center">
      <div className="absolute inset-0 -z-10 bg-app-glow opacity-40" />
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-text-primary font-display">
          Send notifications to your users. <br />
          <span className="text-teal">Never touch their data.</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
          One API call. Full compliance. Built-in privacy. Herald handles the email and SMS delivery, while ensuring your database stays clean of sensitive PII.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-teal text-navy hover:bg-teal/90 font-bold px-8 py-6 h-auto text-lg rounded-xl">
            <Link
              href={PROTOCOL_HERO_CTA.href}
              {...(isExternal(PROTOCOL_HERO_CTA.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {PROTOCOL_HERO_CTA.label}
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-border-2 text-text-primary hover:border-teal/40 px-8 py-6 h-auto text-lg rounded-xl bg-card/50 backdrop-blur-sm">
            <Link href="/docs/quickstart">
              View API docs →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
