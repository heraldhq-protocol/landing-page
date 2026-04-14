import { blogSource } from "@/lib/source";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";

// Custom frontmatter fields added via defineDocs schema extension
type BlogData = {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  [key: string]: unknown;
};

export default function BlogIndex() {
  const posts = blogSource.getPages();

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <NavBar />
      
      <main className="container mx-auto px-6 py-24 sm:py-32">
        <header className="max-w-2xl mb-16">
          <p className="text-teal font-bold tracking-[0.2em] uppercase text-xs mb-4">Journal</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] mb-6">
            Insights on <span className="text-teal text-glow">DeFi Privacy</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Thought leadership, technical deep-dives, and product updates from the Herald team.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const data = post.data as unknown as BlogData;
            return (
              <Link 
                key={post.url} 
                href={post.url}
                className="group relative flex flex-col bg-bg-surface border border-bg-border rounded-2xl overflow-hidden hover:border-teal/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,200,150,0.1)]"
              >
                <div className="p-8 flex-1">
                  <div className="flex items-center gap-4 text-xs text-text-muted mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {data.date
                          ? new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Recently'}
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-teal transition-colors">
                    {data.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                    {data.description}
                  </p>
                </div>

                <div className="px-8 py-4 border-t border-bg-border bg-bg-surface/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-teal flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center">
                      <User className="w-3 h-3 text-teal" />
                    </div>
                    <span className="text-[10px] font-mono text-text-muted">{data.author ?? 'Herald'}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
