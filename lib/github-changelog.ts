export interface ChangelogEntry {
  repo: string;
  owner: string;
  version?: string;
  date?: string;
  content: string;
}

export interface ChangelogRepo {
  owner: string;
  repo: string;
  url: string;
  description: string;
}

export const CHANGELOG_REPOS: ChangelogRepo[] = [
  {
    owner: "heraldhq-protocol",
    repo: "herald-sdk-ts",
    url: "https://github.com/heraldhq-protocol/herald-sdk-ts",
    description: "TypeScript SDK for Herald Protocol",
  },
  {
    owner: "heraldhq-protocol",
    repo: "herald-sdk-rust",
    url: "https://github.com/heraldhq-protocol/herald-sdk-rust",
    description: "Rust SDK for Herald Protocol",
  },
  {
    owner: "heraldhq-protocol",
    repo: "privacy-registry",
    url: "https://github.com/heraldhq-protocol/privacy-registry",
    description: "Privacy Registry for Herald Protocol",
  },
];

function parseVersionFromLine(line: string): { version: string; date?: string } | null {
  const match = line.match(/^##?\s*\[?v?(\d+\.\d+(?:\.\d+)?[^\s]*)\]?\s*[-–]?\s*(.*)$/i);
  if (match) {
    const version = match[1];
    const rest = match[2].trim();
    const dateMatch = rest.match(/(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4})/);
    return {
      version: version.startsWith("v") ? version : `v${version}`,
      date: dateMatch ? dateMatch[1] : undefined,
    };
  }

  const simpleMatch = line.match(/^##?\s*\[?v?(\d+\.\d+(?:\.\d+)?)\]?\s*$/i);
  if (simpleMatch) {
    return {
      version: simpleMatch[1].startsWith("v") ? simpleMatch[1] : `v${simpleMatch[1]}`,
    };
  }

  return null;
}

function parseChangelog(content: string, owner: string, repo: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const lines = content.split("\n");
  let currentVersion: string | undefined;
  let currentDate: string | undefined;
  let currentContent: string[] = [];
  let inUnreleased = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.toLowerCase().startsWith("# changelog")) continue;

    const versionInfo = parseVersionFromLine(line);

    if (versionInfo) {
      if (currentVersion && currentContent.length > 0) {
        entries.push({
          repo,
          owner,
          version: currentVersion,
          date: currentDate,
          content: currentContent.join("\n").trim(),
        });
      }

      currentVersion = versionInfo.version;
      currentDate = versionInfo.date;
      currentContent = [];
      inUnreleased = false;
    } else if (
      trimmed.toLowerCase().startsWith("## unreleased") ||
      trimmed.toLowerCase().startsWith("### unreleased")
    ) {
      inUnreleased = true;
      if (currentVersion && currentContent.length > 0) {
        entries.push({
          repo,
          owner,
          version: currentVersion,
          date: currentDate,
          content: currentContent.join("\n").trim(),
        });
      }
      currentVersion = "Unreleased";
      currentDate = undefined;
      currentContent = [];
    } else if (
      (trimmed.startsWith("## ") || trimmed.startsWith("### ")) &&
      !inUnreleased
    ) {
      if (currentVersion && currentContent.length > 0) {
        entries.push({
          repo,
          owner,
          version: currentVersion,
          date: currentDate,
          content: currentContent.join("\n").trim(),
        });
      }
      currentVersion = undefined;
      currentDate = undefined;
      currentContent = [];
    } else if (currentVersion) {
      currentContent.push(line);
    }
  }

  if (currentVersion && currentContent.length > 0) {
    entries.push({
      repo,
      owner,
      version: currentVersion,
      date: currentDate,
      content: currentContent.join("\n").trim(),
    });
  }

  return entries;
}

export async function fetchChangelogFromRepo(
  owner: string,
  repo: string
): Promise<ChangelogEntry[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/CHANGELOG.md`,
      {
        headers: {
          Accept: "application/vnd.github.v3.raw",
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch changelog for ${owner}/${repo}: ${response.status}`);
      return [];
    }

    const content = await response.text();
    return parseChangelog(content, owner, repo);
  } catch (error) {
    console.error(`Error fetching changelog for ${owner}/${repo}:`, error);
    return [];
  }
}

export async function fetchAllChangelogs(): Promise<ChangelogEntry[]> {
  const results = await Promise.all(
    CHANGELOG_REPOS.map((r) => fetchChangelogFromRepo(r.owner, r.repo))
  );

  const allEntries: ChangelogEntry[] = [];
  
  for (let i = 0; i < results.length; i++) {
    allEntries.push(...results[i]);
  }

  return allEntries.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}
