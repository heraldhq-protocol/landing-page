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
    description: "Copy-paste code for Herald integration patterns: backend, serverless, webhook, batch, registration-check, broadcast, subscribe, cli-send, or cli-agent.",
    inputSchema: {
      type: "object",
      properties: {
        pattern: {
          type: "string",
          enum: ["backend", "serverless", "webhook", "batch", "registration-check", "broadcast", "subscribe", "cli-send", "cli-agent"],
          description: "Integration pattern name. Use cli-send for a terminal one-liner, cli-agent for AI agent tool-use patterns.",
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
  broadcast: `## Broadcast to All Subscribers\n\nBroadcast sends a single notification to every wallet subscribed to your protocol.\nRequires Growth tier or above.\n\n\`\`\`typescript\nimport { Herald } from "@herald-protocol/sdk";\n\nconst herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });\n\n// Send to every subscriber\nconst result = await herald.broadcast({\n  subject: "Governance Vote: Protocol Upgrade v2",\n  body: "A governance proposal to upgrade the protocol is live. Vote before May 24.",\n  category: "governance",\n  receipt: true,\n});\n\nconsole.log(\`Queued \${result.queued_count} / \${result.total_subscribers} subscribers\`);\nconsole.log(\`Estimated delivery: \${result.estimated_delivery_s}s\`);\n\`\`\`\n\n### Audience sources\nSubscribers are added via:\n- **Join link**: \`https://notify.useherald.xyz/join/{protocolId}\`\n- **SDK subscribe()**: Called from your app when a user opts in\n- **Automatic backfill**: Wallets that previously received a notification from you`,
  subscribe: `## Managing Subscriptions\n\nAdd or remove wallets from your protocol's audience.\n\n\`\`\`typescript\nimport { Herald } from "@herald-protocol/sdk";\n\nconst herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });\n\n// Subscribe a wallet (idempotent — safe to call on every login)\nawait herald.subscribe({\n  walletAddress: "7xR4mKp2nQ...",\n  channels: ["email"], // optional, defaults to ["email"]\n});\n\n// Unsubscribe a wallet\nawait herald.unsubscribe("7xR4mKp2nQ...");\n\n// Check if a wallet is subscribed\nconst status = await herald.checkSubscription("7xR4mKp2nQ...");\n// { subscribed: true, channels: ["email"], subscribedAt: "2026-05-17T..." }\n\`\`\`\n\n### Share a join link (no SDK needed)\nDrop this in your docs, Discord, or UI — no SDK integration required:\n\`https://notify.useherald.xyz/join/{protocolId}\``,

  "cli-send": `## Herald CLI — Send a Notification from the Terminal\n\n### Install\n\`\`\`bash\nnpm install -g @herald-protocol/cli\n\`\`\`\n\n### Authenticate\n\`\`\`bash\nherald auth login\n# or via env vars (preferred for CI)\nexport HERALD_API_KEY=hrld_live_…\nexport HERALD_PROTOCOL_ID=77a7cf6e-…\n\`\`\`\n\n### Send a notification\n\`\`\`bash\nherald notify send \\\n  --wallet 9TXw1ZfGvdWvjEhMGLAqFQwHo7xqj8JyBfCbiPJmpBTF \\\n  --subject "Governance vote live" \\\n  --body "Proposal #42 is open — vote before Friday." \\\n  --category governance\n\`\`\`\n\n### Block until delivered (CI-safe)\n\`\`\`bash\nherald notify send \\\n  --wallet $WALLET \\\n  --subject "Deploy complete" \\\n  --body "v1.2.0 deployed" \\\n  --category system \\\n  --idempotency-key "deploy-$GIT_SHA" \\\n  --wait --json\n\`\`\`\n\n### Check delivery status\n\`\`\`bash\nherald notify status <notification-id> --json\nherald notify status <id> --poll --poll-timeout 60000 --json\n\`\`\`\n\n### Run health check\n\`\`\`bash\nherald doctor --json\n\`\`\`\n\nSee full reference: https://docs.useherald.xyz/docs/cli/commands`,

  "cli-agent": `## Herald CLI — AI Agent Tool-Use Pattern\n\nThe Herald CLI is designed for AI agents. All commands support --json for machine-readable output and granular exit codes.\n\n### Install once\n\`\`\`bash\nnpm install -g @herald-protocol/cli\n\`\`\`\n\n### Agent tool definition (OpenAI / Claude format)\n\`\`\`json\n{\n  "name": "herald_notify",\n  "description": "Send a notification to a Solana wallet via Herald Protocol. Use --wait to block until delivered. Use --idempotency-key to make retries safe.",\n  "parameters": {\n    "type": "object",\n    "properties": {\n      "wallet":          { "type": "string", "description": "Recipient Solana wallet address" },\n      "subject":         { "type": "string" },\n      "body":            { "type": "string" },\n      "category":        { "type": "string", "enum": ["defi","governance","system","marketing","security"] },\n      "idempotency_key": { "type": "string", "description": "Unique key to prevent duplicates on retry" },\n      "wait":            { "type": "boolean", "description": "Block until delivered (recommended)" }\n    },\n    "required": ["wallet", "subject", "body", "category"]\n  }\n}\n\`\`\`\n\n### Shell invocation\n\`\`\`bash\nherald notify send \\\n  --wallet "$wallet" \\\n  --subject "$subject" \\\n  --body "$body" \\\n  --category "$category" \\\n  --idempotency-key "$idempotency_key" \\\n  --wait --json\n\`\`\`\n\n### Health check before any session\n\`\`\`bash\nHEALTH=$(herald doctor --json)\nif [ "$(echo "$HEALTH" | jq -r '.ok')" != "true" ]; then\n  echo "$HEALTH" | jq '.errors'\n  exit 1\nfi\n\`\`\`\n\n### Batch send from stdin\n\`\`\`bash\necho '[{"wallet":"…","subject":"…","body":"…","category":"system"}]' \\\n  | herald notify batch --from-stdin --idempotency-key "$JOB_ID" --yes --json\n\`\`\`\n\n### Exit codes for agent branching\n0=success  1=error  3=not-found  4=auth  5=rate-limited  6=network\n\nFull CLI agent guide: https://docs.useherald.xyz/docs/cli/agents`,
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
