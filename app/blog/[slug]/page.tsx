import { blogSource } from "@/lib/source";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";
import { ogUrl } from "@/lib/og";

type BlogData = {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  body: React.ComponentType;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);
  if (!page) return {};

  const data = page.data as unknown as BlogData;
  return {
    title: `${data.title} | Herald Blog`,
    description: data.description ?? "Read the latest from Herald.",
    openGraph: {
      title: data.title,
      description: data.description ?? "Read the latest from Herald.",
      images: [
        {
          url: ogUrl(
            data.title,
            "Herald Blog",
            data.description ?? "Read the latest from Herald."
          ),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | Herald Blog`,
      description: data.description ?? "Read the latest from Herald.",
      images: [
        ogUrl(
          data.title,
          "Herald Blog",
          data.description ?? "Read the latest from Herald."
        ),
      ],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);

  if (!page) notFound();

  const data = page.data as unknown as BlogData;
  const MDX = data.body;

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <NavBar />

      <main className="container mx-auto px-6 py-24 sm:py-32">
        <article className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-teal transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Back to journal
          </Link>

          <header className="mb-16">
            <div className="flex items-center gap-6 text-sm text-text-secondary mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {data.date
                    ? new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : 'Recently'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center">
                  <User className="text-teal" size={16} />
                </div>
                <span className="font-mono text-text-muted">{data.author ?? 'Herald Team'}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-display leading-[1] mb-8">
              {data.title}
            </h1>

            <p className="text-xl sm:text-2xl text-text-secondary italic leading-relaxed border-l-2 border-teal pl-6">
              {data.description}
            </p>
          </header>

          <div className="prose prose-invert prose-teal max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-text-secondary prose-p:leading-relaxed prose-lg">
            <MDX />
          </div>

          <footer className="mt-24 pt-12 border-t border-bg-border flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-text-muted">Share this article</p>
              <button className="p-2 bg-bg-surface border border-bg-border rounded-lg hover:border-teal/30 transition-colors">
                <Share2 className="text-text-secondary" size={16} />
              </button>
            </div>
            <Link 
              href="/for-protocols"
              className="px-6 py-3 bg-teal/10 border border-teal/20 text-teal font-bold rounded-xl hover:bg-teal/20 transition-all flex items-center gap-3"
            >
              Start integrating with Herald
              <ArrowLeft className="rotate-180" size={16} />
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}
