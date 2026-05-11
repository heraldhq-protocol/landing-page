export interface FrameworkSnippet {
  title: string;
  description: string;
  code: string;
  githubUrl?: string;
}

export interface FrameworkIntegration {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  icon: string;
  packageName: string;
  installCommand: string;
  useCases: string[];
  snippets: FrameworkSnippet[];
  repoUrl: string;
}

const BASE_REPO = "https://github.com/heraldhq-protocol/herald-example/tree/master/examples";
const RAW_BASE = "https://raw.githubusercontent.com/heraldhq-protocol/herald-example/master/examples";

export const FRAMEWORKS: FrameworkIntegration[] = [
  {
    slug: "nextjs",
    name: "Next.js",
    category: "Full-Stack Framework",
    description: "API routes and React dashboard components for server-side notification handling.",
    longDescription:
      "Use Next.js App Router to build a full-stack notification dashboard. Server-side API routes keep your Herald API key secure, while React client components provide an interactive UI for sending notifications, checking delivery status, and managing webhooks.",
    icon: "Globe",
    packageName: "@herald-protocol/sdk",
    installCommand: "npm install @herald-protocol/sdk",
    useCases: [
      "Server-side API routes with route handlers",
      "Client dashboard with React components",
      "Webhook endpoint for delivery callbacks",
      "Delivery status polling",
    ],
    repoUrl: `${BASE_REPO}/nextjs-app`,
    snippets: [
      {
        title: "Initialize SDK",
        description: "Create a server-side Herald client — never imported in client components.",
        githubUrl: `${BASE_REPO}/nextjs-app/src/lib/herald.ts`,
        code: `import { Herald } from '@herald-protocol/sdk';

export const herald = new Herald({
  apiKey: process.env.HERALD_API_KEY!,
});`,
      },
      {
        title: "Send Notification (API Route)",
        description: "POST /api/notify route handler for sending a single notification.",
        githubUrl: `${BASE_REPO}/nextjs-app/src/app/api/notify/route.ts`,
        code: `import { NextRequest, NextResponse } from 'next/server';
import { herald } from '../../../lib/herald';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { wallet, subject, body: messageBody, category, idempotencyKey } = body;

  if (!wallet || !subject) {
    return NextResponse.json({ error: 'wallet and subject are required' }, { status: 400 });
  }

  const result = await herald.notify({
    wallet,
    subject,
    body: messageBody,
    category: category ?? 'defi',
    receipt: true,
    idempotencyKey,
  });

  return NextResponse.json(result, { status: 202 });
}`,
      },
      {
        title: "Webhook Handler",
        description: "Verify HMAC-SHA256 signatures and handle delivery events.",
        githubUrl: `${BASE_REPO}/nextjs-app/src/app/api/webhooks/herald/route.ts`,
        code: `import { NextRequest, NextResponse } from 'next/server';
import { Herald } from '@herald-protocol/sdk';

const WEBHOOK_SECRET = process.env.HERALD_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-herald-signature');
  const payload = await req.json();
  const rawBody = JSON.stringify(payload);

  if (!signature || !WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 401 });
  }

  const isValid = await Herald.verifyWebhookSignature(rawBody, signature, WEBHOOK_SECRET);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  switch (payload.event) {
    case 'delivery.confirmed':
      console.log(\`✅ \${payload.notificationId} delivered\`);
      break;
    case 'delivery.failed':
      console.error(\`❌ \${payload.notificationId} failed: \${payload.error}\`);
      break;
  }

  return NextResponse.json({ received: true });
}`,
      },
      {
        title: "Send from Client Component",
        description: "React client component calling the API route.",
        code: `'use client';

export function SendNotification() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wallet: data.get('wallet'),
        subject: data.get('subject'),
        body: data.get('body'),
      }),
    });
    const result = await res.json();
    console.log('Notification sent:', result.notificationId);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="wallet" placeholder="Wallet address" required />
      <input name="subject" placeholder="Subject" required />
      <textarea name="body" placeholder="Message body" />
      <button type="submit">Send Notification</button>
    </form>
  );
}`,
      },
    ],
  },
  {
    slug: "react-spa",
    name: "React SPA",
    category: "Client-Side App",
    description: "Vite-based React dashboard for sending notifications and monitoring usage.",
    longDescription:
      "Build a single-page application with React and Vite that integrates with Herald through your backend proxy. Components for liquidation alerts, governance broadcasts, yield alerts, and usage monitoring — all keeping your API key server-side.",
    icon: "Monitor",
    packageName: "@herald-protocol/sdk",
    installCommand: "npm install @herald-protocol/sdk",
    useCases: [
      "Protocol dashboard UI components",
      "Notification form with wallet input",
      "Usage and quota monitoring",
      "Billing status display",
    ],
    repoUrl: `${BASE_REPO}/react-spa`,
    snippets: [
      {
        title: "App Structure",
        description: "Main App component composing dashboard panels.",
        githubUrl: `${BASE_REPO}/react-spa/src/App.tsx`,
        code: `import { LiquidationPanel } from './components/LiquidationPanel';
import { GovernanceBoard } from './components/GovernanceBoard';
import { YieldAlert } from './components/YieldAlert';
import { UsageDisplay } from './components/UsageDisplay';

export function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>Herald Protocol Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LiquidationPanel />
        <GovernanceBoard />
        <YieldAlert />
        <UsageDisplay />
      </div>
    </div>
  );
}`,
      },
      {
        title: "Call API via Backend Proxy",
        description: "Client components call your backend (never expose the Herald API key).",
        code: `export function LiquidationPanel() {
  async function sendAlert() {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wallet: '7xR4mKp2n...',
        subject: '⚠️ Liquidation Warning',
        body: 'Health factor dropped to 1.05. Add collateral immediately.',
        category: 'defi',
      }),
    });
    const data = await res.json();
    console.log('Sent:', data.notificationId);
  }

  return (
    <div>
      <h2>⚡ Liquidation Alert</h2>
      <button onClick={sendAlert}>Send Warning</button>
    </div>
  );
}`,
      },
    ],
  },
  {
    slug: "express",
    name: "Express.js",
    category: "Backend Framework",
    description: "RESTful notification endpoints and webhook receiver for Express servers.",
    longDescription:
      "Add Herald notification capabilities to any Express.js server. Define routes for sending liquidation warnings, broadcasting governance proposals, receiving delivery webhooks, and checking API usage — all with input validation and error handling.",
    icon: "Server",
    packageName: "@herald-protocol/sdk",
    installCommand: "npm install @herald-protocol/sdk express",
    useCases: [
      "POST /liquidation — single notification with defi category",
      "POST /governance — bulk notify with governance category",
      "POST /webhooks/herald — delivery callback verification",
      "GET /usage — quota and usage monitoring",
    ],
    repoUrl: `${BASE_REPO}/express-api`,
    snippets: [
      {
        title: "Server Setup",
        description: "Mount all Herald routes on an Express app.",
        githubUrl: `${BASE_REPO}/express-api/src/index.ts`,
        code: `import express from 'express';
import { liquidationRouter } from './routes/liquidation';
import { governanceRouter } from './routes/governance';
import { webhookRouter } from './routes/webhooks';
import { usageRouter } from './routes/usage';

const app = express();
app.use(express.json());

app.use(liquidationRouter);
app.use(governanceRouter);
app.use(webhookRouter);
app.use(usageRouter);

app.listen(3001, () => {
  console.log('Herald API running on http://localhost:3001');
});`,
      },
      {
        title: "Liquidation Route",
        description: "POST /liquidation with idempotency key and defi category.",
        githubUrl: `${BASE_REPO}/express-api/src/routes/liquidation.ts`,
        code: `import { Router } from 'express';
import { Herald } from '@herald-protocol/sdk';

const herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });
export const liquidationRouter = Router();

liquidationRouter.post('/liquidation', async (req, res) => {
  const { wallet, positionId, healthFactor, debtAmount, asset } = req.body;

  if (!wallet || !positionId) {
    res.status(400).json({ error: 'wallet and positionId are required' });
    return;
  }

  const idempotencyKey = \`liquidation_\${positionId}_\${Math.floor(Date.now() / 30000)}\`;

  const result = await herald.notify({
    wallet,
    subject: \`⚠️ Liquidation Warning — Health factor: \${healthFactor}\`,
    body: [
      \`Position #\${positionId} is approaching liquidation.\`,
      \`Health factor: \${healthFactor}\`,
      \`Debt: \${debtAmount} \${asset}\`,
      \`Add collateral or repay immediately.\`,
    ].join('\\n'),
    category: 'defi',
    receipt: true,
    idempotencyKey,
  });

  res.status(202).json(result);
});`,
      },
      {
        title: "Webhook Verification",
        description: "Verify HMAC-SHA256 signatures and dispatch delivery events.",
        githubUrl: `${BASE_REPO}/express-api/src/routes/webhooks.ts`,
        code: `import { Router } from 'express';
import { Herald } from '@herald-protocol/sdk';

export const webhookRouter = Router();
const WEBHOOK_SECRET = process.env.HERALD_WEBHOOK_SECRET!;

webhookRouter.post('/webhooks/herald', async (req, res) => {
  const signature = req.headers['x-herald-signature'] as string;
  const rawBody = JSON.stringify(req.body);

  if (!signature || !WEBHOOK_SECRET) {
    res.status(401).json({ error: 'Missing signature or webhook secret' });
    return;
  }

  const isValid = await Herald.verifyWebhookSignature(rawBody, signature, WEBHOOK_SECRET);

  if (!isValid) {
    res.status(401).json({ error: 'Invalid signature' });
    return;
  }

  const { event, notificationId } = req.body;

  switch (event) {
    case 'delivery.confirmed':
      console.log(\`✅ \${notificationId} delivered via \${req.body.channel}\`);
      break;
    case 'delivery.failed':
      console.error(\`❌ \${notificationId} failed: \${req.body.error}\`);
      break;
    case 'delivery.bounced':
      console.warn(\`⚠️ \${notificationId} bounced: \${req.body.bounceType}\`);
      break;
  }

  res.json({ received: true });
});`,
      },
      {
        title: "Usage Endpoint",
        description: "GET /usage — check current quota and usage stats.",
        githubUrl: `${BASE_REPO}/express-api/src/routes/usage.ts`,
        code: `import { Router } from 'express';
import { Herald } from '@herald-protocol/sdk';

const herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });
export const usageRouter = Router();

usageRouter.get('/usage', async (_req, res) => {
  try {
    const usage = await herald.getUsage();
    res.json(usage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch usage' });
  }
});`,
      },
    ],
  },
  {
    slug: "nestjs",
    name: "NestJS",
    category: "Enterprise Backend",
    description: "Production-grade module with DI, services, and controllers for scalable notification systems.",
    longDescription:
      "Integrate Herald as a proper NestJS module with dependency injection, global configuration, and feature modules. The HeraldModule provides a HeraldService that can be injected into any controller or service — following NestJS best practices for scalable backend architecture.",
    icon: "Layers",
    packageName: "@herald-protocol/sdk",
    installCommand: "npm install @herald-protocol/sdk @nestjs/common",
    useCases: [
      "Global HeraldModule with factory provider",
      "Inject HeraldService into feature controllers",
      "Liquidation, Governance, Yield modules",
      "Webhook controller with signature verification",
    ],
    repoUrl: `${BASE_REPO}/nestjs-module`,
    snippets: [
      {
        title: "Herald Module",
        description: "Global module providing Herald client and service via DI.",
        githubUrl: `${BASE_REPO}/nestjs-module/src/herald.module.ts`,
        code: `import { Global, Module } from '@nestjs/common';
import { Herald } from '@herald-protocol/sdk';
import { HeraldService } from './herald.service';

@Global()
@Module({
  providers: [
    {
      provide: 'HERALD_API_KEY',
      useValue: process.env.HERALD_API_KEY!,
    },
    {
      provide: Herald,
      useFactory: (apiKey: string) => new Herald({ apiKey }),
      inject: ['HERALD_API_KEY'],
    },
    HeraldService,
  ],
  exports: [Herald, HeraldService],
})
export class HeraldModule {}`,
      },
      {
        title: "Herald Service",
        description: "Injectable service wrapping all Herald SDK methods.",
        githubUrl: `${BASE_REPO}/nestjs-module/src/herald.service.ts`,
        code: `import { Injectable } from '@nestjs/common';
import { Herald } from '@herald-protocol/sdk';

export interface NotifyOptions {
  wallet: string;
  subject: string;
  body: string;
  category?: 'defi' | 'governance' | 'system' | 'marketing';
  receipt?: boolean;
  idempotencyKey?: string;
}

@Injectable()
export class HeraldService {
  constructor(private readonly herald: Herald) {}

  async send(options: NotifyOptions) {
    return this.herald.notify(options);
  }

  async sendBulk(options: { wallets: string[]; subject: string; body: string; category?: string }) {
    return this.herald.notifyBulk(options);
  }

  async getStatus(notificationId: string) {
    return this.herald.getStatus(notificationId);
  }

  async getUsage() {
    return this.herald.getUsage();
  }

  async isRegistered(wallet: string) {
    return this.herald.isRegistered(wallet);
  }
}`,
      },
      {
        title: "Liquidation Controller",
        description: "Feature controller injecting HeraldService for defi alerts.",
        githubUrl: `${BASE_REPO}/nestjs-module/src/liquidation/liquidation.controller.ts`,
        code: `import { Controller, Post, Body } from '@nestjs/common';
import { HeraldService } from '../herald.service';

@Controller('liquidation')
export class LiquidationController {
  constructor(private readonly herald: HeraldService) {}

  @Post()
  async send(@Body() body: {
    wallet: string;
    positionId: string;
    healthFactor: number;
    debtAmount: number;
    asset: string;
  }) {
    const idempotencyKey = \`liquidation_\${body.positionId}_\${Math.floor(Date.now() / 30000)}\`;

    return this.herald.send({
      wallet: body.wallet,
      subject: \`⚠️ Liquidation Warning — Health factor: \${body.healthFactor}\`,
      body: [
        \`Position #\${body.positionId} is approaching liquidation.\`,
        \`Health factor: \${body.healthFactor}\`,
        \`Debt: \${body.debtAmount} \${body.asset}\`,
        \`Add collateral or repay immediately.\`,
      ].join('\\n'),
      category: 'defi',
      receipt: true,
      idempotencyKey,
    });
  }
}`,
      },
      {
        title: "App Module",
        description: "Import HeraldModule and register feature controllers.",
        githubUrl: `${BASE_REPO}/nestjs-module/src/app.module.ts`,
        code: `import { Module } from '@nestjs/common';
import { HeraldModule } from './herald.module';
import { LiquidationController } from './liquidation/liquidation.controller';
import { GovernanceController } from './governance/governance.controller';
import { YieldController } from './yield/yield.controller';
import { WebhookController } from './webhooks/webhook.controller';

@Module({
  imports: [HeraldModule],
  controllers: [
    LiquidationController,
    GovernanceController,
    YieldController,
    WebhookController,
  ],
})
export class AppModule {}`,
      },
    ],
  },
  {
    slug: "nodejs-script",
    name: "Node.js Script",
    category: "Automation & Scripting",
    description: "Standalone TypeScript scripts for bots, cron jobs, and automation.",
    longDescription:
      "Write standalone Node.js scripts using the Herald SDK for automated notification workflows. Perfect for liquidation bots, governance broadcast scripts, batch airdrops, staking rewards notifications, and bridge transfer alerts — each script is a self-contained example.",
    icon: "FileCode",
    packageName: "@herald-protocol/sdk",
    installCommand: "npm install @herald-protocol/sdk tsx",
    useCases: [
      "Liquidation warning script with idempotency",
      "Governance proposal broadcast",
      "Batch airdrop from CSV wallet list",
      "Staking rewards and yield APY alerts",
    ],
    repoUrl: `${BASE_REPO}/nodejs-script`,
    snippets: [
      {
        title: "Send Liquidation Warning",
        description: "Standalone script — init SDK, send defi notification, log result.",
        githubUrl: `${BASE_REPO}/nodejs-script/src/01-liquidation.ts`,
        code: `import { Herald } from '@herald-protocol/sdk';

const herald = new Herald({
  apiKey: process.env.HERALD_API_KEY!,
});

interface LiquidationParams {
  wallet: string;
  positionId: string;
  healthFactor: number;
  debtAmount: number;
  asset: string;
}

async function sendLiquidationWarning(params: LiquidationParams) {
  const idempotencyKey = \`liquidation_\${params.positionId}_\${Math.floor(Date.now() / 30000)}\`;

  const result = await herald.notify({
    wallet: params.wallet,
    subject: \`⚠️ Liquidation Warning — Health factor: \${params.healthFactor.toFixed(2)}\`,
    body: [
      \`Your lending position #\${params.positionId} is approaching liquidation.\`,
      \`\`,
      \`Current health factor: \${params.healthFactor.toFixed(2)}\`,
      \`Outstanding debt: \${params.debtAmount} \${params.asset}\`,
      \`\`,
      \`Action required: Add collateral or repay debt immediately.\`,
      \`Threshold: 1.00\`,
    ].join('\\n'),
    category: 'defi',
    receipt: true,
    idempotencyKey,
  });

  console.log(\`[Liquidation] Sent → \${result.notificationId} (\${result.status})\`);
  return result;
}

const params: LiquidationParams = {
  wallet: '7xR4mKp2nQwBvTsYjL8dHcFoEa3ZiXuW',
  positionId: 'POS-42069',
  healthFactor: 1.05,
  debtAmount: 50000,
  asset: 'SOL',
};

sendLiquidationWarning(params).catch(console.error);`,
      },
      {
        title: "Webhook Verification",
        description: "Verify HMAC-SHA256 signature and handle delivery events.",
        githubUrl: `${BASE_REPO}/nodejs-script/src/08-webhook-verify.ts`,
        code: `import { Herald } from '@herald-protocol/sdk';

async function handleHeraldWebhook(
  rawBody: string,
  signatureHeader: string,
  webhookSecret: string,
) {
  const isValid = await Herald.verifyWebhookSignature(
    rawBody,
    signatureHeader,
    webhookSecret,
  );

  if (!isValid) {
    console.error('[Webhook] INVALID SIGNATURE — rejecting');
    return { status: 401, body: 'Invalid signature' };
  }

  const payload = JSON.parse(rawBody);

  switch (payload.event) {
    case 'delivery.confirmed':
      console.log(\`[Webhook] ✅ \${payload.notificationId} delivered\`);
      break;
    case 'delivery.failed':
      console.error(\`[Webhook] ❌ \${payload.notificationId} failed: \${payload.error}\`);
      break;
    case 'delivery.bounced':
      console.warn(\`[Webhook] ⚠️ \${payload.notificationId} bounced\`);
      break;
  }

  return { status: 200, body: 'ok' };
}`,
      },
    ],
  },
  {
    slug: "cli-tool",
    name: "CLI Tool",
    category: "Command Line Interface",
    description: "Commander-based CLI with commands for sending, checking, and managing notifications.",
    longDescription:
      "Build a powerful CLI tool with Commander for sending Herald notifications from the terminal. Supports liquidation warnings, governance broadcasts, batch sends, rewards alerts, bridge transfer notifications, multisig approvals, delivery status checks, and quota queries.",
    icon: "Terminal",
    packageName: "@herald-protocol/sdk",
    installCommand: "npm install @herald-protocol/sdk commander",
    useCases: [
      "herald liquidation — send defi warning with arguments",
      "herald governance — broadcast proposal to voters",
      "herald batch — bulk notify from CSV file",
      "herald check — poll delivery status",
    ],
    repoUrl: `${BASE_REPO}/cli-tool`,
    snippets: [
      {
        title: "CLI Program Setup",
        description: "Commander program registering all subcommands.",
        githubUrl: `${BASE_REPO}/cli-tool/src/index.ts`,
        code: `#!/usr/bin/env node

import { Command } from 'commander';
import { liquidationCommand } from './commands/liquidation';
import { governanceCommand } from './commands/governance';
import { batchCommand } from './commands/batch';
import { rewardsCommand } from './commands/rewards';
import { bridgeCommand } from './commands/bridge';
import { multisigCommand } from './commands/multisig';
import { checkCommand } from './commands/check';
import { usageCommand } from './commands/usage';

const program = new Command();

program
  .name('herald')
  .description('CLI for sending Herald notifications')
  .version('1.0.0');

liquidationCommand(program);
governanceCommand(program);
batchCommand(program);
rewardsCommand(program);
bridgeCommand(program);
multisigCommand(program);
checkCommand(program);
usageCommand(program);

program.parse();`,
      },
      {
        title: "Liquidation Command",
        description: "Subcommand with positional args and options.",
        githubUrl: `${BASE_REPO}/cli-tool/src/commands/liquidation.ts`,
        code: `import { Command } from 'commander';
import { Herald } from '@herald-protocol/sdk';

const herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });

export function liquidationCommand(program: Command) {
  program
    .command('liquidation')
    .description('Send liquidation warning to a wallet')
    .argument('<wallet>', 'Recipient wallet address')
    .requiredOption('--hf <number>', 'Health factor')
    .requiredOption('--pos <id>', 'Position ID')
    .option('--debt <number>', 'Debt amount', '0')
    .option('--asset <symbol>', 'Asset symbol', 'SOL')
    .action(async (wallet: string, opts) => {
      const idempotencyKey = \`liquidation_\${opts.pos}_\${Math.floor(Date.now() / 30000)}\`;

      const result = await herald.notify({
        wallet,
        subject: \`⚠️ Liquidation Warning — Health factor: \${opts.hf}\`,
        body: [
          \`Position #\${opts.pos} is approaching liquidation.\`,
          \`Health factor: \${opts.hf}\`,
          \`Debt: \${opts.debt} \${opts.asset}\`,
          \`Add collateral or repay immediately.\`,
        ].join('\\n'),
        category: 'defi',
        receipt: true,
        idempotencyKey,
      });

      console.log(\`Sent: \${result.notificationId} (\${result.status})\`);
    });
}`,
      },
    ],
  },
  {
    slug: "hono",
    name: "Hono",
    category: "Edge Framework",
    description: "Lightweight edge-native notification API with Hono — runs anywhere (Node, Deno, Bun, CF Workers).",
    longDescription:
      "Use Hono for a lightweight, ultra-fast notification API that works across all JavaScript runtimes (Node.js, Deno, Bun, Cloudflare Workers). Mount notification and webhook routes with minimal boilerplate — perfect for edge-deployed notification endpoints.",
    icon: "Zap",
    packageName: "@herald-protocol/sdk",
    installCommand: "npm install @herald-protocol/sdk hono",
    useCases: [
      "POST /liquidation — edge notification endpoint",
      "POST /webhooks/herald — webhook verification at the edge",
      "GET /usage — lightweight quota check",
      "Runs on any JavaScript runtime",
    ],
    repoUrl: `${BASE_REPO}/hono-api`,
    snippets: [
      {
        title: "Server Setup",
        description: "Minimal Hono app with route mounting.",
        githubUrl: `${BASE_REPO}/hono-api/src/index.ts`,
        code: `import { Hono } from 'hono';
import { liquidationRoute } from './routes/liquidation';
import { webhookRoute } from './routes/webhooks';
import { usageRoute } from './routes/usage';

const app = new Hono();

app.route('/', liquidationRoute);
app.route('/', webhookRoute);
app.route('/', usageRoute);

const port = process.env.PORT ?? 3004;
export default {
  port,
  fetch: app.fetch,
};

console.log(\`Hono Herald API running on http://localhost:\${port}\`);`,
      },
      {
        title: "Liquidation Route",
        description: "POST /liquidation with validation and idempotency.",
        githubUrl: `${BASE_REPO}/hono-api/src/routes/liquidation.ts`,
        code: `import { Hono } from 'hono';
import { Herald } from '@herald-protocol/sdk';

const herald = new Herald({ apiKey: process.env.HERALD_API_KEY! });
export const liquidationRoute = new Hono();

liquidationRoute.post('/liquidation', async (c) => {
  const { wallet, positionId, healthFactor, debtAmount, asset } = await c.req.json();

  if (!wallet || !positionId) {
    return c.json({ error: 'wallet and positionId are required' }, 400);
  }

  const idempotencyKey = \`liquidation_\${positionId}_\${Math.floor(Date.now() / 30000)}\`;

  const result = await herald.notify({
    wallet,
    subject: \`⚠️ Liquidation Warning — Health factor: \${healthFactor}\`,
    body: [
      \`Position #\${positionId} is approaching liquidation.\`,
      \`Health factor: \${healthFactor}\`,
      \`Debt: \${debtAmount} \${asset}\`,
      \`Add collateral or repay immediately.\`,
    ].join('\\n'),
    category: 'defi',
    receipt: true,
    idempotencyKey,
  });

  return c.json(result, 202);
});`,
      },
      {
        title: "Webhook Route",
        description: "POST /webhooks/herald with HMAC verification.",
        githubUrl: `${BASE_REPO}/hono-api/src/routes/webhooks.ts`,
        code: `import { Hono } from 'hono';
import { Herald } from '@herald-protocol/sdk';

const WEBHOOK_SECRET = process.env.HERALD_WEBHOOK_SECRET!;
export const webhookRoute = new Hono();

webhookRoute.post('/webhooks/herald', async (c) => {
  const signature = c.req.header('x-herald-signature');
  const payload = await c.req.json();
  const rawBody = JSON.stringify(payload);

  if (!signature || !WEBHOOK_SECRET) {
    return c.json({ error: 'Missing signature or secret' }, 401);
  }

  const isValid = await Herald.verifyWebhookSignature(rawBody, signature, WEBHOOK_SECRET);

  if (!isValid) {
    return c.json({ error: 'Invalid signature' }, 401);
  }

  switch (payload.event) {
    case 'delivery.confirmed':
      console.log(\`✅ \${payload.notificationId} delivered\`);
      break;
    case 'delivery.failed':
      console.error(\`❌ \${payload.notificationId} failed\`);
      break;
  }

  return c.json({ received: true });
});`,
      },
    ],
  },
  {
    slug: "cloudflare-worker",
    name: "Cloudflare Worker",
    category: "Edge Function",
    description: "Deploy notification endpoints and webhook handlers at the edge with Cloudflare Workers.",
    longDescription:
      "Run Herald notification logic at the edge with Cloudflare Workers. Handle governance broadcasts and incoming webhooks directly on Cloudflare's global network — with zero cold starts, sub-millisecond latency, and the Worker's env-binding pattern for API key management.",
    icon: "Cloud",
    packageName: "@herald-protocol/sdk",
    installCommand: "npm install @herald-protocol/sdk",
    useCases: [
      "Edge governance broadcast with env bindings",
      "Edge webhook verification and dispatch",
      "Zero-cold-start notification delivery",
      "Sub-millisecond signature verification",
    ],
    repoUrl: `${BASE_REPO}/cloudflare-worker`,
    snippets: [
      {
        title: "Worker Entry Point",
        description: "Fetch handler dispatching to governance and webhook routes.",
        githubUrl: `${BASE_REPO}/cloudflare-worker/src/index.ts`,
        code: `import { Herald } from '@herald-protocol/sdk';

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === '/api/governance' && req.method === 'POST') {
      return handleGovernance(req, env);
    }

    if (url.pathname === '/api/webhooks/herald' && req.method === 'POST') {
      return handleWebhook(req, env);
    }

    return new Response('Not found', { status: 404 });
  },
};

interface Env {
  HERALD_API_KEY: string;
  HERALD_WEBHOOK_SECRET: string;
}

async function handleGovernance(req: Request, env: Env): Promise<Response> {
  const herald = new Herald({ apiKey: env.HERALD_API_KEY });
  const { title, voters } = await req.json();

  if (!voters?.length || !title) {
    return Response.json({ error: 'voters and title required' }, { status: 400 });
  }

  const result = await herald.notifyBulk({
    wallets: voters,
    subject: \`🗳 New Proposal: \${title}\`,
    body: \`A new governance proposal has been published.\\nCast your vote on the DAO dashboard.\`,
    category: 'governance',
    receipt: true,
    idempotencyPrefix: \`gov_\${Date.now()}\`,
  });

  return Response.json(result, { status: 202 });
}

async function handleWebhook(req: Request, env: Env): Promise<Response> {
  const signature = req.headers.get('x-herald-signature');
  const payload = await req.json();
  const rawBody = JSON.stringify(payload);

  if (!signature || !env.HERALD_WEBHOOK_SECRET) {
    return Response.json({ error: 'Missing signature or secret' }, { status: 401 });
  }

  const isValid = await Herald.verifyWebhookSignature(rawBody, signature, env.HERALD_WEBHOOK_SECRET);

  if (!isValid) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  console.log(\`[Webhook] \${payload.event}: \${payload.notificationId}\`);
  return Response.json({ received: true });
}`,
      },
    ],
  },
  {
    slug: "ai-mcp",
    name: "AI / MCP",
    category: "AI Agent Integration",
    description: "Connect AI agents (Claude, Cursor) to Herald via the Model Context Protocol for assisted integration.",
    longDescription:
      "Herald exposes a Model Context Protocol (MCP) endpoint that lets AI agents browse documentation, search for topics, and retrieve copy-paste ready code — making integration faster. Configure Claude Desktop or Cursor to use the Herald MCP server and get AI-assisted integration support.",
    icon: "Bot",
    packageName: "",
    installCommand: "",
    useCases: [
      "AI-assisted SDK integration with Claude Desktop",
      "Cursor IDE with inline MCP tool calls",
      "Search Herald docs programmatically via API",
      "Retrieve copy-paste code snippets for any pattern",
    ],
    repoUrl: "",
    snippets: [
      {
        title: "Claude Desktop Configuration",
        description: "Add to claude_desktop_config.json to enable the Herald MCP server.",
        code: `{
  "mcpServers": {
    "herald-docs": {
      "type": "url",
      "url": "https://useherald.xyz/api/mcp"
    }
  }
}`,
      },
      {
        title: "Cursor Configuration",
        description: "Add MCP server in Cursor settings.",
        code: `// Cursor > Settings > Features > MCP Servers
// Add new server with URL:
// https://useherald.xyz/api/mcp`,
      },
      {
        title: "Available MCP Tools",
        description: "Four tools exposed by the Herald MCP endpoint.",
        code: `get_herald_context    — Full protocol overview & architecture
search_herald_docs   — Search docs by keyword (query, maxResults)
get_integration_example — Copy-paste code (backend, serverless, webhook, batch)
get_doc_page         — Read a doc page by slug (e.g., sdk/typescript)`,
      },
      {
        title: "Test via curl",
        description: "Verify the MCP endpoint with a tools/list call.",
        code: `# List all available tools
curl -X POST https://useherald.xyz/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'

# Get integration example for webhooks
curl -X POST https://useherald.xyz/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_integration_example","arguments":{"pattern":"webhook"}}}'`,
      },
    ],
  },
];
