import fs from "fs/promises";
import path from "path";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");
const CONTEXT_FILE = path.join(process.cwd(), "HERALD_CONTEXT.md");

const INSTRUCTIONS = [
  "This MCP server provides access to Herald Protocol documentation.",
  "Use get_herald_context for a comprehensive overview of Herald.",
  "Use search_herald_docs to find specific documentation topics.",
  "Use get_integration_example to get copy-paste ready code.",
  "Use get_doc_page to read the full content of a specific documentation page.",
].join("\n");

const SERVER_INFO = {
  name: "herald-docs-mcp",
  version: "1.0.1",
};

const TOOLS = [
  {
    name: "get_herald_context",
    description: "Full Herald Protocol context — architecture, SDK, API, specs.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "search_herald_docs",
    description: "Search Herald documentation by keyword. Returns matching slugs with snippets.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search keyword to find in Herald docs" },
        maxResults: { type: "number", description: "Maximum results to return (default 5)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_integration_example",
    description: "Copy-paste code for Herald integration patterns: backend, serverless, webhook, batch, or registration-check.",
    inputSchema: {
      type: "object",
      properties: {
        pattern: {
          type: "string",
          enum: ["backend", "serverless", "webhook", "batch", "registration-check"],
          description: "Integration pattern name",
        },
      },
      required: ["pattern"],
    },
  },
  {
    name: "get_doc_page",
    description: "Read a full Herald documentation page by slug (e.g. 'quickstart/quickstart' or 'sdk/typescript').",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Doc page slug path, e.g. 'quickstart/quickstart' or 'sdk/typescript'",
        },
      },
      required: ["slug"],
    },
  },
];

type DocEntry = { frontmatter: string; body: string };
type SearchIndex = Map<string, Set<string>>;

let docsCache: Map<string, DocEntry> | null = null;
let searchIndex: SearchIndex | null = null;
let contextCache: string | null = null;

function tokenize(text: string): string[] {
  const words = text.toLowerCase().split(/[^a-z0-9]+/);
  return [...new Set(words.filter((w) => w.length > 1))];
}

async function ensureDocsLoaded(): Promise<Map<string, DocEntry>> {
  if (docsCache) return docsCache;
  const files = new Map<string, string>();
  async function walk(dir: string, prefix: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith("_meta") || entry.name.startsWith(".")) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full, `${prefix}${entry.name}/`);
      } else if (entry.name.endsWith(".mdx")) {
        const slug = `${prefix}${entry.name.replace(/\.mdx$/, "")}`;
        const content = await fs.readFile(full, "utf-8");
        files.set(slug, content);
      }
    }
  }
  await walk(DOCS_DIR, "");
  docsCache = new Map();
  searchIndex = new Map();
  for (const [slug, raw] of files) {
    const frontmatter = raw.match(/---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const body = raw.replace(/---\n[\s\S]*?\n---\n/, "");
    docsCache.set(slug, { frontmatter, body });
    const searchable = `${frontmatter}\n${body}`.toLowerCase();
    for (const word of tokenize(searchable)) {
      const set = searchIndex.get(word) ?? new Set();
      set.add(slug);
      searchIndex.set(word, set);
    }
  }
  return docsCache;
}

async function ensureContextLoaded(): Promise<string> {
  if (contextCache) return contextCache;
  try {
    contextCache = await fs.readFile(CONTEXT_FILE, "utf-8");
  } catch {
    contextCache = "Context file not available.";
  }
  return contextCache;
}

const EXAMPLES: Record<string, string> = {
  backend: `## Backend Express Server with Liquidation Alerts\n\n\`\`\`typescript\nimport { Herald, ReadClient } from "@herald-protocol/sdk";\n\nconst herald = new Herald({\n  apiKey: process.env.HERALD_API_KEY!,\n  environment: "production",\n});\nconst readClient = new ReadClient({ cluster: "mainnet-beta" });\n\nasync function sendAlert(wallet: string, healthFactor: number) {\n  const isRegistered = await readClient.isRegistered(wallet);\n  if (!isRegistered) return null;\n\n  return herald.notify({\n    wallet,\n    subject: "Liquidation Warning",\n    body: \`Position health factor: \${healthFactor.toFixed(2)}\`,\n    category: "defi",\n    idempotencyKey: \`liq_\${wallet}_\${Date.now()}\`,\n  });\n}\n\`\`\``,
  serverless: `## Next.js API Route (Serverless)\n\n\`\`\`typescript\nimport { NextResponse } from "next/server";\nimport { Herald } from "@herald-protocol/sdk";\n\nconst herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });\n\nexport async function POST(request: Request) {\n  const { wallet, subject, body, category } = await request.json();\n  if (!wallet || !subject || !body) {\n    return NextResponse.json({ error: "Missing fields" }, { status: 400 });\n  }\n  const result = await herald.notify({\n    wallet, subject, body,\n    category: category ?? "defi",\n    idempotencyKey: crypto.randomUUID(),\n  });\n  return NextResponse.json({ notificationId: result.notificationId }, { status: 202 });\n}\n\`\`\``,
  webhook: `## Webhook Receiver with Signature Verification\n\n\`\`\`typescript\nimport { createHmac, timingSafeEqual } from "node:crypto";\n\nfunction verifySignature(payload: string, header: string, secret: string) {\n  const [ts, sig] = header.split(",").map(s => s.split("=")[1]);\n  const expected = createHmac("sha256", secret)\n    .update(\`\${ts}.\${payload}\`).digest("hex");\n  return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));\n}\n\n// In your webhook handler:\n// 1. Get raw payload text\n// 2. Get X-Herald-Signature header\n// 3. Call verifySignature(payload, signatureHeader, process.env.HERALD_WEBHOOK_SECRET!)\n// 4. Return 401 if invalid, 200 if valid\n\`\`\``,
  batch: `## Batch Sending\n\n\`\`\`typescript\nimport { Herald } from "@herald-protocol/sdk";\n\nconst herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });\n\nasync function sendBatch(wallets: string[], subject: string, body: string) {\n  for (let i = 0; i < wallets.length; i += 100) {\n    const chunk = wallets.slice(i, i + 100);\n    const result = await herald.notifyBatch({\n      notifications: chunk.map(wallet => ({\n        wallet, subject, body,\n        category: "governance" as const,\n        idempotencyKey: crypto.randomUUID(),\n      })),\n    });\n    console.log(\`Batch \${i/100 + 1}: \${result.count} queued\`);\n  }\n}\n\`\`\``,
  "registration-check": `## React Registration Check Component\n\n\`\`\`typescript\n"use client";\nimport { useWallet } from "@solana/wallet-adapter-react";\nimport { ReadClient } from "@herald-protocol/sdk";\nimport { useEffect, useState } from "react";\n\nexport function NotificationSettings() {\n  const { publicKey } = useWallet();\n  const [registered, setRegistered] = useState<boolean | null>(null);\n\n  useEffect(() => {\n    if (!publicKey) return;\n    new ReadClient({ cluster: "mainnet-beta" })\n      .isRegistered(publicKey.toBase58())\n      .then(setRegistered);\n  }, [publicKey]);\n\n  if (!publicKey) return <p>Connect wallet</p>;\n  if (registered === null) return <p>Checking...</p>;\n  if (registered) return <p>Notifications active</p>;\n\n  return <a href="https://notify.useherald.xyz/register" target="_blank">Enable Notifications</a>;\n}\n\`\`\``,
};

function json(
  body: unknown,
  init?: { status?: number; headers?: Record<string, string> }
) {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, GET, OPTIONS",
    "access-control-allow-headers": "Content-Type, Accept",
    ...init?.headers,
  };
  return Response.json(body, { status: init?.status ?? 200, headers });
}

async function handleToolCall(
  name: string,
  args: Record<string, unknown>
): Promise<{
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}> {
  switch (name) {
    case "get_herald_context": {
      const context = await ensureContextLoaded();
      return { content: [{ type: "text", text: context }] };
    }

    case "search_herald_docs": {
      const query = String(args.query ?? "").trim();
      if (!query) {
        return {
          content: [
            {
              type: "text",
              text: "Search query is required. Use `query` parameter with a keyword to search Herald docs.",
            },
          ],
          isError: true,
        };
      }
      const maxResults = Math.min(Math.max(Number(args.maxResults ?? 5), 1), 50);
      const docs = await ensureDocsLoaded();
      const queryWords = tokenize(query);

      const slugScores = new Map<string, number>();
      for (const word of queryWords) {
        const matching = searchIndex!.get(word);
        if (!matching) continue;
        for (const slug of matching) {
          slugScores.set(slug, (slugScores.get(slug) ?? 0) + 1);
        }
      }

      const ranked = [...slugScores.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, maxResults);

      if (ranked.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No documentation found for "${query}". Try a different search term or use get_herald_context for a full overview.`,
            },
          ],
        };
      }

      const lines = ranked.map(([slug]) => {
        const entry = docs.get(slug)!;
        const bodyLines = entry.body.split("\n").filter((l) => l.trim());
        const matchLine = bodyLines.find((l) =>
          queryWords.some((w) => l.toLowerCase().includes(w))
        );
        const snippet = matchLine
          ? matchLine.trim().slice(0, 200)
          : bodyLines.slice(0, 3).map((l) => l.trim()).join("\n").slice(0, 200);
        return `${slug} — ${snippet}\n   Read full: \`get_doc_page("${slug}")\``;
      });

      return {
        content: [
          {
            type: "text",
            text: `Found ${slugScores.size} result(s) for "${query}":\n\n${lines.join("\n\n")}`,
          },
        ],
      };
    }

    case "get_integration_example": {
      const pattern = String(args.pattern ?? "");
      if (!pattern) {
        return {
          content: [
            {
              type: "text",
              text: `Missing required argument "pattern". Choose one: ${Object.keys(EXAMPLES).join(", ")}`,
            },
          ],
          isError: true,
        };
      }
      const code = EXAMPLES[pattern];
      if (!code) {
        return {
          content: [
            {
              type: "text",
              text: `Unknown pattern: "${pattern}". Available: ${Object.keys(EXAMPLES).join(", ")}`,
            },
          ],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: code }] };
    }

    case "get_doc_page": {
      const slug = String(args.slug ?? "").trim();
      if (!slug) {
        return {
          content: [
            {
              type: "text",
              text: 'Missing required argument "slug". Use a doc page slug like "quickstart/quickstart" or "sdk/typescript".',
            },
          ],
          isError: true,
        };
      }
      const docs = await ensureDocsLoaded();
      let entry = docs.get(slug);
      if (!entry) entry = docs.get(`${slug}/index`);
      if (!entry) entry = docs.get(`${slug}/quickstart`);
      if (!entry) {
        const available = Array.from(docs.keys()).slice(0, 30);
        return {
          content: [
            {
              type: "text",
              text: `Doc page "${slug}" not found. Available pages:\n${available.map((s) => `  - ${s}`).join("\n")}`,
            },
          ],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: entry.body }] };
    }

    default:
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jsonrpc, id, method, params } = body;

    if (jsonrpc !== "2.0") {
      return json(
        {
          jsonrpc: "2.0",
          id: null,
          error: { code: -32600, message: "Invalid Request: not JSON-RPC 2.0" },
        },
        { status: 400 }
      );
    }

    switch (method) {
      case "initialize": {
        const clientVersion = params?.protocolVersion;
        return json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: clientVersion || "2024-11-05",
            capabilities: { tools: {} },
            serverInfo: SERVER_INFO,
            instructions: INSTRUCTIONS,
          },
        });
      }

      case "notifications/initialized": {
        return json({ jsonrpc: "2.0", id, result: {} });
      }

      case "tools/list": {
        return json({
          jsonrpc: "2.0",
          id,
          result: { tools: TOOLS },
        });
      }

      case "tools/call": {
        const result = await handleToolCall(
          params?.name,
          params?.arguments ?? {}
        );
        return json({
          jsonrpc: "2.0",
          id,
          result: {
            content: result.content,
            isError: result.isError ?? false,
          },
        });
      }

      case "ping": {
        return json({ jsonrpc: "2.0", id, result: {} });
      }

      default:
        return json(
          {
            jsonrpc: "2.0",
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`,
            },
          },
          { status: 404 }
        );
    }
  } catch (_e) {
    return json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" },
      },
      { status: 400 }
    );
  }
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, GET, OPTIONS",
    "access-control-allow-headers": "Content-Type, Accept",
  };
}

export async function GET() {
  return json({ status: "ok", server: "herald-docs-mcp" });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
