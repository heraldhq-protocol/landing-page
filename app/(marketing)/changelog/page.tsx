import { changelogSource } from "@/lib/source";
import { Calendar, Tag } from "lucide-react";
import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";

type ChangelogData = {
  title: string;
  description?: string;
  date?: string;
  body: React.ComponentType;
};

export default function ChangelogPage() {
  const entries = changelogSource.getPages().sort((a, b) => {
    const dA = a.data as unknown as ChangelogData;
    const dB = b.data as unknown as ChangelogData;
    return (dB.date ? new Date(dB.date).getTime() : 0) - (dA.date ? new Date(dA.date).getTime() : 0);
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <NavBar />
      
      <main className="container mx-auto px-6 py-24 sm:py-32">
        <header className="max-w-2xl mb-24">
          <p className="text-teal font-bold tracking-[0.2em] uppercase text-xs mb-4">Evolution</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] mb-6">
            Product <span className="text-teal text-glow">Updates</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Stay up to date with the latest features, security improvements, and SDK releases from the Herald protocol.
          </p>
        </header>

        <div className="max-w-4xl space-y-24">
          {entries.map((entry) => {
            const data = entry.data as unknown as ChangelogData;
            const MDX = data.body;
            return (
              <section key={entry.url} className="relative pl-8 sm:pl-16 border-l border-bg-border pb-24 last:pb-0 last:border-l-transparent">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-teal shadow-[0_0_10px_#00C896]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                  <div className="flex items-center gap-2 text-xs font-mono text-text-muted bg-bg-surface px-3 py-1 rounded-full border border-bg-border">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {data.date
                        ? new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : 'Recently'}
                    </span>
                  </div>
                  <Tag className="hidden sm:block w-4 h-4 text-bg-border" />
                  <h2 className="text-2xl sm:text-3xl font-bold font-display">{data.title}</h2>
                </div>

                <div className="prose prose-invert prose-teal max-w-none prose-p:text-text-secondary prose-headings:text-text-primary prose-a:text-teal hover:prose-a:text-teal/80">
                  <MDX />
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
