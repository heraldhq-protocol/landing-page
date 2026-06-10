import { blogSource } from "@/lib/source";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

type BlogData = {
  title: string;
  description?: string;
  date?: string;
};

export default function BlogStrip() {
  const posts = blogSource.getPages().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 border-t border-bg-border/30 bg-bg-surface/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-4">Latest Insights</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display leading-tight">
              Stay ahead in <span className="text-teal">DeFi Privacy.</span>
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="text-sm font-bold text-text-secondary hover:text-teal transition-colors flex items-center gap-2 group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const data = post.data as unknown as BlogData;
            return (
              <Link 
                key={post.url}
                href={post.url}
                className="group border border-bg-border rounded-2xl p-6 hover:border-teal/30 hover:bg-bg-surface/50 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {data.date
                      ? new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Recently'}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-teal transition-colors line-clamp-2">
                  {data.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                  {data.description}
                </p>
                <span className="text-xs font-bold text-text-primary flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
