# Herald Protocol — LLM Context

This file contains the full context about Herald for LLMs to assist with integration.

---

## What is Herald?

Herald is a **privacy-preserving notification layer for Solana DeFi**. It allows protocols to send email, Telegram, and SMS notifications to users **without the protocol ever seeing or storing the user's personal contact information**.

- **Website**: https://useherald.xyz
- **Dashboard**: https://app.useherald.xyz
- **User Portal** (wallet registration): https://notify.useherald.xyz/register
- **Docs**: https://useherald.xyz/docs/quickstart
- **Contact**: hello@useherald.xyz
- **GitHub org**: https://github.com/heraldhq-protocol

---

## Quick Facts

| Item | Value |
|---|---|
| TypeScript SDK | `npm install @herald-protocol/sdk` |
| Solana Program ID | `2pxjAf8tLCakKVDuN4vY51B5TeaEQk4koPuk9NZvWqdf` |
| API Base URL | `https://api.useherald.xyz` |
| API Key Format | `hrld_live_...` (prod) or `hrld_test_...` (sandbox) |
| Cluster | `mainnet-beta` |
| TEE | AWS Nitro Enclave |
| Encryption | NaCl `crypto_box` (X25519) |
| On-chain Registry | Solana Anchor program (Privacy Registry) |

---

## Architecture Overview

```
User Wallet ──encrypts email──> Solana Identity PDA (encrypted blob)
                                     │
Protocol ──API call──> Herald Notification Gateway
                            │
                     ┌──────┴──────┐
                Solana lookup    Forward to TEE
                     │               │
                Fetch encrypted    Nitro Enclave
                Identity PDA      decrypts in memory
                                     │
                           ┌─────────┴────────┐
                        SES/Email    Telegram    SMS/Twilio
                           │
                    ZK receipt written
                    to Light Protocol (on-chain proof)
```

---

## SDK: @herald-protocol/sdk

### Installation
```bash
npm install @herald-protocol/sdk
```

### 5 Client Classes

1. **`UserClient`** — Frontend wallet-based identity registration.
2. **`ReadClient`** — Read-only queries (no signing needed). Methods: `isRegistered(wallet)`, `checkProtocolCanSend(pubkey)`.
3. **`Herald`** (Gateway Client) — Backend notification sending. Requires API key.
4. **`NotificationKeyClient`** — End-to-end encryption key management for client-side decryption.
5. **`ChannelUserClient`** — Multi-channel setup (Telegram, SMS).

### Sending a Notification

```typescript
import { Herald } from "@herald-protocol/sdk";

const herald = new Herald({
  apiKey: process.env.HERALD_API_KEY,
  environment: "production", // or "sandbox"
});

const result = await herald.notify({
  wallet: "7xR4mKp2nQ...",      // recipient's Solana address
  subject: "Liquidation Warning",
  body: "Your position is at risk. HF: 1.05.",
  category: "defi",              // "defi" | "governance" | "marketing"
  idempotencyKey: "unique-uuid", // optional: prevents duplicates
});
// result.notificationId -> use to poll status
```

### Batch Sending

```typescript
await herald.notifyBatch({
  notifications: [
    { wallet: "0x1...", subject: "Alert", body: "...", category: "defi" },
    { wallet: "0x2...", subject: "Alert", body: "...", category: "defi" },
  ],
});
// Max 100 per batch
```

### Audience & Broadcast

Protocols maintain a subscriber audience. Users join via:
- **Join link**: `https://notify.useherald.xyz/join/{protocolId}`
- **SDK `subscribe()`**: Called from your app after a user opts in
- **Automatic backfill**: Wallets that previously received a notification

```typescript
// Add a wallet to your audience
await herald.subscribe({ walletAddress: '7xR4mKp2nQ...', channels: ['email'] });

// Remove from audience
await herald.unsubscribe('7xR4mKp2nQ...');

// Check if subscribed
const status = await herald.checkSubscription('7xR4mKp2nQ...');
// { subscribed: true, channels: ['email'], subscribedAt: '...' }

// Broadcast to all subscribers (Growth tier+)
const result = await herald.broadcast({
  subject: 'Governance Alert',
  body: 'A new proposal is live. Vote before May 24.',
  category: 'governance',
});
// result.broadcast_id, result.queued_count, result.total_subscribers
```

### Checking Registration

```typescript
import { ReadClient } from "@herald-protocol/sdk";
const client = new ReadClient({ cluster: "mainnet-beta" });
const isRegistered = await client.isRegistered(walletAddress);
```

### PDA Utilities

```typescript
import { findIdentityPda, findProtocolPda } from "@herald-protocol/sdk";

const [identityPda] = findIdentityPda(userPublicKey, programId);
const [protocolPda] = findProtocolPda(protocolPubkey, programId);
```

### Error Handling

```typescript
import { isHeraldErrorCode } from "@herald-protocol/sdk";

try { await herald.notify(...) }
catch (e) {
  if (isHeraldErrorCode(e, "INSUFFICIENT_QUOTA")) { ... }
  if (isHeraldErrorCode(e, "RATE_LIMIT_EXCEEDED")) { ... }
}
```

### Sub-modules

| Import Path | Purpose |
|---|---|
| `@herald-protocol/sdk/billing` | Subscriptions and Helio payments |
| `@herald-protocol/sdk/channels` | Telegram and SMS advanced config |
| `@herald-protocol/sdk/encryption` | Low-level encryption utilities |
| `@herald-protocol/sdk/events` | Real-time event streaming |

---

## REST API

Base URL: `https://api.useherald.xyz`

### Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/v1/notify` | Send a notification |
| `POST` | `/v1/notify/batch` | Batch send (max 100) |
| `POST` | `/v1/notify/broadcast` | Broadcast to all subscribers (Growth+) |
| `GET` | `/v1/notifications/:id` | Get notification status |
| `GET` | `/v1/notifications` | List notifications (paginated) |
| `POST` | `/v1/subscriptions` | Subscribe a wallet to your protocol |
| `DELETE` | `/v1/subscriptions` | Unsubscribe a wallet |
| `GET` | `/v1/subscriptions/:wallet` | Check subscription status |
| `POST` | `/v1/webhooks` | Register webhook |
| `GET` | `/v1/webhooks` | List webhooks |
| `PATCH` | `/v1/webhooks/:id` | Update webhook |
| `DELETE` | `/v1/webhooks/:id` | Delete webhook |
| `GET` | `/v1/analytics` | Delivery analytics |
| `GET` | `/v1/usage` | Current usage vs quota |
| `GET` | `/v1/audience` | Audience analytics (subscribers, sources, trend) |
| `GET` | `/v1/engagement` | Engagement metrics (open/click/unsubscribe rates) |
| `GET` | `/v1/billing/status` | Subscription status |
| `POST` | `/v1/preview` | Preview notification rendering |
| `GET` | `/health` | Health check (no auth) |

### Authentication

All endpoints (except `/health`) require: `Authorization: Bearer hrld_live_...`

---

## Subscription Tiers

| Tier | Monthly Volume | Price | Features |
|---|---|---|---|
| Developer | 1,000 | Free | Email only, shared gateway |
| Growth | 50,000 | $99/mo USDC | Telegram + Email, priority queue |
| Scale | 250,000 | $299/mo USDC | All channels, custom webhooks, analytics |
| Enterprise | 1,000,000 | $999/mo USDC | Dedicated infra, SLA, custom rate limits |

Overage: $0.005 per additional notification. Billed via Helio (USDC).

---

## On-Chain Specs

### Identity PDA (1024 bytes)
```
[b"identity", owner_pubkey] -> Account
  owner: Pubkey (32 bytes)
  encrypted_email: Bytes (max 512)
  email_hash: Bytes (32 bytes, SHA-256)
  nonce: Bytes (24 bytes)
  opt_ins: Bitfield (opt_in_all, defi, governance, marketing)
  channel_email, channel_telegram, channel_sms: U8 each
  encrypted_telegram_id, encrypted_phone: encrypted blobs
  sealed_x25519_pubkey, sender_x25519_pubkey
```

### Protocol PDA (256 bytes)
```
[b"protocol", protocol_wallet] -> Account
  owner: Pubkey
  name_hash: Bytes (32)
  tier: U8 (0=Dev, 1=Growth, 2=Scale, 3=Enterprise)
  subscription_expires_at, last_renewed_at: i64
  sends_this_period: U64
  is_active, is_suspended: Bool
```

---

## Webhook Events

| Event | Trigger |
|---|---|
| `notification.delivered` | Message delivered to provider |
| `notification.bounced` | Email bounced |
| `notification.failed` | Delivery failed after retries |
| `receipt.minted` | ZK-proof written to Solana |
| `user.registered` | New user registered a wallet |
| `quota.exceeded` | Protocol exceeded monthly quota |

### Signature Verification

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verifyWebhookSignature(payload: string, header: string, secret: string) {
  const [ts, sig] = header.split(",").map(s => s.split("=")[1]);
  const expected = createHmac("sha256", secret)
    .update(`${ts}.${payload}`).digest("hex");
  return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
```

---

## Wire Format

Binary message frame (little-endian):

| Offset | Size | Field |
|---|---|---|
| 0x00 | 4 | Magic `0x48455241` ("HERA") |
| 0x04 | 1 | Version (`0x01`) |
| 0x05 | 1 | Flags (encrypted, compressed) |
| 0x06 | 2 | Header Len |
| 0x08 | 4 | Payload Len |
| 0x0C | 32 | Channel ID (Blake3 hash) |
| 0x2C | 8 | Timestamp (Unix ns) |
| 0x34 | 64 | Ed25519 Signature |
| 0x74 | var | CBOR Payload |

Max payload: 64KB. Timestamp window: 5 minutes.

---

## Integration Patterns

1. **Backend Trigger** — Monitor on-chain events, call SDK.
2. **Serverless / Edge** — Next.js API routes, Vercel Functions.
3. **Webhook Bridge** — Forward from existing alert systems.
4. **On-Chain Listener** — Listen for Solana program events.

---

## Common Errors

| Code | Cause | Fix |
|---|---|---|
| `INSUFFICIENT_QUOTA` | Exceeded tier volume | Upgrade tier or wait for reset |
| `RATE_LIMIT_EXCEEDED` | Too many req/s | Exponential backoff |
| `UNAUTHORIZED` | Invalid API key | Check `hrld_live_...` key |
| `NOT_FOUND` | Wallet not registered | Prompt user to register |

---

## External Links

| Resource | URL |
|---|---|
| TypeScript SDK | https://github.com/heraldhq-protocol/herald-sdk-ts |
| Privacy Registry (Anchor) | https://github.com/heraldhq-protocol/privacy-registry |
| Rust SDK | https://github.com/heraldhq-protocol/herald-sdk-rust |
| Developer Dashboard | https://app.useherald.xyz |
| User Registration | https://notify.useherald.xyz/register |
| Status Page | https://useherald.xyz/status |
| Contact | hello@useherald.xyz |

---

---

## AI Agent MCP Endpoint

Herald exposes a Model Context Protocol (MCP) endpoint for AI agents.

- **URL**: `POST https://useherald.xyz/api/mcp`
- **Transport**: MCP Streamable HTTP (JSON-RPC 2.0)
- **Auth**: None (public docs)

### Tools

| Tool | Description |
|---|---|
| `get_herald_context` | Returns this full context document |
| `search_herald_docs` | Search docs by keyword (params: `query`, `maxResults`) |
| `get_integration_example` | Copy-paste code (params: `pattern`: `backend`/`serverless`/`webhook`/`batch`/`registration-check`) |
| `get_doc_page` | Read a doc page by slug (e.g. `quickstart/quickstart`, `sdk/typescript`) |

### Claude Desktop Config

Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "herald-docs": {
      "type": "url",
      "url": "https://useherald.xyz/api/mcp"
    }
  }
}
```

---

## Security Design

- **Zero-PII**: No plaintext contact info ever stored.
- **Dual encryption**: Herald gateway and user independently decrypt their blocks.
- **TEE isolation**: AWS Nitro Enclave decrypts in hardware-isolated memory.
- **ZK delivery receipts**: Compressed proofs on Light Protocol.
- **Ed25519 signatures**: Every notification and webhook event is signed.
- **Audited**: Antigravity audit (March 2026) — 2 critical, 3 high, 4 medium, 3 low findings. All critical/high fixed.
- **Bus Factor**: Encrypted data stays on-chain. Alternative gateways can be built using public keys.
