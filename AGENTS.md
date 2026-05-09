<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:herald-context -->
# Herald Protocol Documentation

Herald is a privacy-preserving notification layer for Solana DeFi.

For full documentation context, read `HERALD_CONTEXT.md` (comprehensive LLM context file).

## Quick Links
- **Docs site**: /docs/quickstart
- **HERALD_CONTEXT.md**: Full protocol context at repo root
- **MCP endpoint**: POST /api/mcp (JSON-RPC 2.0)
- **Source docs**: content/docs/*.mdx

## MCP Endpoint
- **URL**: POST https://useherald.xyz/api/mcp
- **Docs page**: /docs/guides/ai-agent-mcp
- **Protocol**: MCP Streamable HTTP (JSON-RPC 2.0)
- **Configure in Claude Desktop**: Add `{"mcpServers":{"herald-docs":{"type":"url","url":"https://useherald.xyz/api/mcp"}}}` to `claude_desktop_config.json`

## MCP Tools Available
- `get_herald_context` — Full protocol overview
- `search_herald_docs` — Search documentation by keyword
- `get_integration_example` — Copy-paste code for integration patterns
- `get_doc_page` — Read a specific doc page by slug
<!-- END:herald-context -->
