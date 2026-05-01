import { Metadata } from "next";
import { fetchAllChangelogs, CHANGELOG_REPOS, ChangelogEntry } from "@/lib/github-changelog";
import NavBar from "@/components/marketing/shared/NavBar";
import Footer from "@/components/marketing/shared/Footer";
import { GitBranch, Calendar, ExternalLink, Package } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Changelog | Herald Protocol",
  description:
    "Stay up to date with the latest features, security improvements, and SDK releases from the Herald protocol.",
};

function RepoBadge({
  owner,
  repo,
  url,
}: {
  owner: string;
  repo: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-bg-surface border border-bg-border hover:border-teal/50 hover:bg-teal/5 transition-all group text-[10px] sm:text-xs font-medium"
    >
      <GitBranch className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-text-muted group-hover:text-teal transition-colors" />
      <span className="text-text-secondary group-hover:text-text-primary transition-colors hidden sm:inline">
        {owner}/{repo}
      </span>
      <span className="text-text-secondary group-hover:text-text-primary transition-colors sm:hidden">
        {repo}
      </span>
      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

function ChangeItem({ text }: { text: string }) {
  const rawText = text.trim().replace(/^[-*]\s+/, "");
  const trimmed = rawText.replace(/^\d+\.\s+/, "");
  const isBreaking = trimmed.toLowerCase().startsWith("breaking") || trimmed.toLowerCase().includes("[breaking]");
  const isFeature =
    trimmed.toLowerCase().startsWith("feat") ||
    trimmed.toLowerCase().startsWith("add") ||
    trimmed.toLowerCase().startsWith("new");
  const isFix =
    trimmed.toLowerCase().startsWith("fix") || trimmed.toLowerCase().startsWith("patch") || trimmed.toLowerCase().startsWith("bug");
  const isDocs = trimmed.toLowerCase().startsWith("docs") || trimmed.toLowerCase().startsWith("doc");
  const isRefactor = trimmed.toLowerCase().startsWith("refactor");

  let badgeClass = "bg-bg-elevated text-text-muted";
  let badgeText = "";

  if (isBreaking) {
    badgeClass = "bg-red/15 text-red border border-red/20";
    badgeText = "BREAK";
  } else if (isFeature) {
    badgeClass = "bg-teal/15 text-teal border border-teal/20";
    badgeText = "FEAT";
  } else if (isFix) {
    badgeClass = "bg-amber/15 text-amber border border-amber/20";
    badgeText = "FIX";
  } else if (isDocs) {
    badgeClass = "bg-purple/15 text-purple border border-purple/20";
    badgeText = "DOCS";
  } else if (isRefactor) {
    badgeClass = "bg-blue-500/15 text-blue-400 border border-blue-500/20";
    badgeText = "REF";
  }

  const cleanText = trimmed
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\[breaking\]\s*/i, "")
    .replace(/^\[\w+\]\s*/i, "");

  return (
    <li className="flex items-start gap-2 sm:gap-3 py-1.5 sm:py-2">
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 mt-0.5">
        <div className={`px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-bold tracking-wider ${badgeClass}`}>
          {badgeText}
        </div>
      </div>
      <span className="text-text-secondary text-xs sm:text-sm leading-relaxed">{cleanText}</span>
    </li>
  );
}

function ChangelogSection({ entry }: { entry: ChangelogEntry }) {
  const lines = entry.content.split("\n");
  const listItems: string[] = [];
  const otherContent: string[] = [];
  let inList = false;
  const sectionKeywords = ["features", "bug fixes", "chores", "documentation", "security", "tests", "breaking changes", "deprecated", "performance improvements"];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (sectionKeywords.some((k) => trimmed.toLowerCase().startsWith(`### ${k}`) || trimmed.toLowerCase().startsWith(`## ${k}`))) continue;

    if (
      trimmed.startsWith("-") ||
      trimmed.startsWith("*") ||
      /^\d+\.\s/.test(trimmed)
    ) {
      inList = true;
      listItems.push(trimmed);
    } else if (trimmed) {
      if (inList && listItems.length > 0) {
        inList = false;
      }
      otherContent.push(trimmed);
    }
  }

  return (
    <section className="relative pl-6 sm:pl-16 pr-2 border-l border-bg-border pb-16 sm:pb-24 last:pb-0 last:border-l-transparent">
      <div className="absolute left-[-4px] sm:left-[-5px] top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-teal shadow-[0_0_10px_#00C896]" />

      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-text-muted bg-bg-surface px-2 sm:px-3 py-1 rounded-full border border-bg-border">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>
              {entry.date
                ? new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Unreleased"}
            </span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-bg-border" />
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-text-primary">
            {entry.version}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <RepoBadge
            owner={entry.owner}
            repo={entry.repo}
            url={`https://github.com/${entry.owner}/${entry.repo}`}
          />
        </div>
      </div>

      {listItems.length > 0 && (
        <ul className="space-y-0 mb-4 sm:mb-6">
          {listItems.map((item, idx) => (
            <ChangeItem key={idx} text={item} />
          ))}
        </ul>
      )}

      {otherContent.length > 0 && (
        <div className="space-y-2">
          {otherContent.map((paragraph, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-4xl space-y-16 sm:space-y-24">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative pl-6 sm:pl-16 border-l border-bg-border pb-16 sm:pb-24">
          <div className="absolute left-[-4px] sm:left-[-5px] top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-bg-border animate-pulse" />
          <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-6 w-28 sm:h-7 sm:w-32 bg-bg-surface rounded-full animate-pulse" />
            <div className="h-6 w-20 sm:h-8 sm:w-24 bg-bg-surface rounded animate-pulse" />
          </div>
          <div className="space-y-2 sm:space-y-3">
            {[1, 2, 3, 4].map((j) => (
              <div 
                key={j} 
                className="h-3 sm:h-4 bg-bg-surface rounded animate-pulse" 
                style={{ width: `${60 + Math.random() * 35}%` }} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="max-w-2xl text-center py-16 sm:py-24 px-4">
      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-bg-surface border border-bg-border mb-6">
        <Package className="w-7 h-7 sm:w-8 sm:h-8 text-text-muted" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold font-display mb-3 sm:mb-4">No Updates Available</h2>
      <p className="text-sm sm:text-base text-text-secondary">
        Unable to fetch changelogs. Some repositories may be private or temporarily unavailable.
      </p>
    </div>
  );
}

async function ChangelogContent() {
  const entries = await fetchAllChangelogs();

  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-4xl space-y-16 sm:space-y-24">
      {entries.map((entry, idx) => (
        <ChangelogSection key={`${entry.owner}-${entry.repo}-${entry.version}-${idx}`} entry={entry} />
      ))}
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <NavBar />

      <main className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <header className="max-w-2xl mb-16 sm:mb-24">
          <p className="text-teal font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3 sm:mb-4">
            Evolution
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] mb-4 sm:mb-6">
            Product <span className="text-teal text-glow">Updates</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed mb-6 sm:mb-8">
            Stay up to date with the latest features, security improvements, and SDK releases
            from the Herald protocol.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CHANGELOG_REPOS.map((r) => (
              <RepoBadge
                key={`${r.owner}/${r.repo}`}
                owner={r.owner}
                repo={r.repo}
                url={r.url}
              />
            ))}
          </div>
        </header>

        <Suspense fallback={<LoadingSkeleton />}>
          <ChangelogContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
