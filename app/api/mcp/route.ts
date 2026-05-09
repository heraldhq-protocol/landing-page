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
  version: "1.0.0",
};

const TOOLS = [
  {
    name: "get_herald_context",
    description: "Get the complete Herald Protocol context — architecture, SDK, API, specs, and all documentation for LLM-assisted integration. Use this first.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "search_herald_docs",
    description: "Search Herald documentation for a specific topic. Returns relevant doc sections with their slugs.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query to find in Herald docs" },
        maxResults: { type: "number", description: "Max results (default 5)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_integration_example",
    description: "Get copy-paste ready code examples for Herald integration patterns.",
    inputSchema: {
      type: "object",
      properties: {
        pattern: {
          type: "string",
          enum: ["backend", "serverless", "webhook", "batch", "registration-check"],
          description: "The integration pattern you need code for.",
        },
      },
      required: ["pattern"],
    },
  },
  {
    name: "get_doc_page",
    description: "Read the full content of a specific Herald documentation page by slug.",
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

async function readDocFiles(): Promise<Map<string, string>> {
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
  return files;
}

async function readContextFile(): Promise<string> {
  try {
    return await fs.readFile(CONTEXT_FILE, "utf-8");
  } catch {
    return "Context file not available.";
  }
}

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  switch (name) {
    case "get_herald_context": {
      const context = await readContextFile();
      return { content: [{ type: "text", text: context }] };
    }

    case "search_herald_docs": {
      const query = String(args.query ?? "").toLowerCase();
      const maxResults = Number(args.maxResults ?? 5);
      const docs = await readDocFiles();

      const results: Array<{ slug: string; snippet: string }> = [];
      for (const [slug, content] of docs) {
        const frontmatter = content.match(/---\n([\s\S]*?)\n---/)?.[1] ?? "";
        const body = content.replace(/---\n[\s\S]*?\n---\n/, "");
        const searchable = `${frontmatter}\n${body}`.toLowerCase();
        if (searchable.includes(query)) {
          const lines = body.split("\n").filter((l) => l.trim());
          const matchLine = lines.find((l) => l.toLowerCase().includes(query));
          const snippet = matchLine
            ? matchLine.trim().slice(0, 200)
            : lines.slice(0, 3).map((l) => l.trim()).join("\n").slice(0, 200);
          results.push({ slug, snippet });
        }
      }

      results.sort((a, b) => a.slug.localeCompare(b.slug));
      const top = results.slice(0, maxResults);

      if (top.length === 0) {
        return { content: [{ type: "text", text: `No documentation found for "${query}". Try a different search term or use get_herald_context for a full overview.` }] };
      }

      const lines = top.map(
        (r, i) => `${i + 1}. **${r.slug}**\n   Snippet: ${r.snippet}\n   Read full: \`get_doc_page("${r.slug}")\``
      );
      return { content: [{ type: "text", text: `Found ${results.length} result(s):\n\n${lines.join("\n\n")}` }] };
    }

    case "get_integration_example": {
      const pattern = String(args.pattern ?? "");
      const examples: Record<string, string> = {
        backend: `## Backend Express Server with Liquidation Alerts\n\n\`\`\`typescript\nimport { Herald, ReadClient } from "@herald-protocol/sdk";\n\nconst herald = new Herald({\n  apiKey: process.env.HERALD_API_KEY!,\n  environment: "production",\n});\nconst readClient = new ReadClient({ cluster: "mainnet-beta" });\n\nasync function sendAlert(wallet: string, healthFactor: number) {\n  const isRegistered = await readClient.isRegistered(wallet);\n  if (!isRegistered) return null;\n\n  return herald.notify({\n    wallet,\n    subject: "Liquidation Warning",\n    body: \`Position health factor: \${healthFactor.toFixed(2)}\`,\n    category: "defi",\n    idempotencyKey: \`liq_\${wallet}_\${Date.now()}\`,\n  });\n}\n\`\`\``,
        serverless: `## Next.js API Route (Serverless)\n\n\`\`\`typescript\nimport { NextResponse } from "next/server";\nimport { Herald } from "@herald-protocol/sdk";\n\nconst herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });\n\nexport async function POST(request: Request) {\n  const { wallet, subject, body, category } = await request.json();\n  if (!wallet || !subject || !body) {\n    return NextResponse.json({ error: "Missing fields" }, { status: 400 });\n  }\n  const result = await herald.notify({\n    wallet, subject, body,\n    category: category ?? "defi",\n    idempotencyKey: crypto.randomUUID(),\n  });\n  return NextResponse.json({ notificationId: result.notificationId }, { status: 202 });\n}\n\`\`\``,
        webhook: `## Webhook Receiver with Signature Verification\n\n\`\`\`typescript\nimport { createHmac, timingSafeEqual } from "node:crypto";\n\nfunction verifySignature(payload: string, header: string, secret: string) {\n  const [ts, sig] = header.split(",").map(s => s.split("=")[1]);\n  const expected = createHmac("sha256", secret)\n    .update(\`\${ts}.\${payload}\`).digest("hex");\n  return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));\n}\n\n// In your webhook handler:\n// 1. Get raw payload text\n// 2. Get X-Herald-Signature header\n// 3. Call verifySignature(payload, signatureHeader, process.env.HERALD_WEBHOOK_SECRET!)\n// 4. Return 401 if invalid, 200 if valid\n\`\`\``,
        batch: `## Batch Sending\n\n\`\`\`typescript\nimport { Herald } from "@herald-protocol/sdk";\n\nconst herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });\n\nasync function sendBatch(wallets: string[], subject: string, body: string) {\n  for (let i = 0; i < wallets.length; i += 100) {\n    const chunk = wallets.slice(i, i + 100);\n    const result = await herald.notifyBatch({\n      notifications: chunk.map(wallet => ({\n        wallet, subject, body,\n        category: "governance" as const,\n        idempotencyKey: crypto.randomUUID(),\n      })),\n    });\n    console.log(\`Batch \${i/100 + 1}: \${result.count} queued\`);\n  }\n}\n\`\`\``,
        "registration-check": `## React Registration Check Component\n\n\`\`\`typescript\n"use client";\nimport { useWallet } from "@solana/wallet-adapter-react";\nimport { ReadClient } from "@herald-protocol/sdk";\nimport { useEffect, useState } from "react";\n\nexport function NotificationSettings() {\n  const { publicKey } = useWallet();\n  const [registered, setRegistered] = useState<boolean | null>(null);\n\n  useEffect(() => {\n    if (!publicKey) return;\n    new ReadClient({ cluster: "mainnet-beta" })\n      .isRegistered(publicKey.toBase58())\n      .then(setRegistered);\n  }, [publicKey]);\n\n  if (!publicKey) return <p>Connect wallet</p>;\n  if (registered === null) return <p>Checking...</p>;\n  if (registered) return <p>Notifications active</p>;\n\n  return <a href="https://notify.useherald.xyz/register" target="_blank">Enable Notifications</a>;\n}\n\`\`\``,
      };

      const code = examples[pattern];
      if (!code) {
        return { content: [{ type: "text", text: `Unknown pattern: ${pattern}. Available: ${Object.keys(examples).join(", ")}` }], isError: true };
      }
      return { content: [{ type: "text", text: code }] };
    }

    case "get_doc_page": {
      const slug = String(args.slug ?? "");
      const docs = await readDocFiles();
      let content = docs.get(slug);
      if (!content) content = docs.get(`${slug}/index`);
      if (!content) content = docs.get(`${slug}/quickstart`);
      if (!content) {
        const available = Array.from(docs.keys()).slice(0, 30);
        return { content: [{ type: "text", text: `Doc page "${slug}" not found. Available pages:\n${available.map((s) => `  - ${s}`).join("\n")}` }], isError: true };
      }
      const body = content.replace(/---\n[\s\S]*?\n---\n/, "");
      return { content: [{ type: "text", text: body }] };
    }

    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jsonrpc, id, method, params } = body;

    if (jsonrpc !== "2.0") {
      return Response.json(
        { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid Request: not JSON-RPC 2.0" } },
        { status: 400 }
      );
    }

    switch (method) {
      case "initialize": {
        const clientVersion = params?.protocolVersion;
        return Response.json({
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
        return Response.json({ jsonrpc: "2.0", id, result: {} });
      }

      case "tools/list": {
        return Response.json({
          jsonrpc: "2.0",
          id,
          result: { tools: TOOLS },
        });
      }

      case "tools/call": {
        const result = await handleToolCall(params?.name, params?.arguments ?? {});
        return Response.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: result.content,
            isError: result.isError ?? false,
          },
        });
      }

      case "ping": {
        return Response.json({ jsonrpc: "2.0", id, result: {} });
      }

      default:
        return Response.json(
          { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } },
          { status: 404 }
        );
    }
  } catch (e) {
    return Response.json(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      { status: 400 }
    );
  }
}

export async function GET() {
  return Response.json({ status: "ok", server: "herald-docs-mcp" });
}
