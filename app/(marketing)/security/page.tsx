import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  Cpu,
  Eye,
  FileCheck,
  Server,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Key,
  Database,
  Network,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security | Herald Protocol",
  description:
    "Herald's security-first architecture: zero-PII design, dual encryption, TEE isolation, and on-chain ZK receipts. All critical audit findings resolved.",
};

const AUDIT_FINDINGS = [
  { id: "C-01", severity: "Critical", status: "Fixed", description: "Subscription expiry not enforced in write_receipt" },
  { id: "C-02", severity: "Critical", status: "Fixed", description: "Tier send limits not enforced on-chain" },
  { id: "H-01", severity: "High", status: "Fixed", description: "No hard-suspension mechanism for ToS violations" },
  { id: "H-02", severity: "High", status: "Fixed", description: "Billing state missing from on-chain registry" },
  { id: "H-03", severity: "High", status: "Fixed", description: "No audit trail on period send reset" },
  { id: "M-01", severity: "Medium", status: "Confirmed Safe", description: "Owner check via PDA seed derivation" },
  { id: "M-02", severity: "Medium", status: "Fixed", description: "EmptyUpdate not enforced in update_identity" },
  { id: "M-03", severity: "Medium", status: "Accepted", description: "Authority key has no on-chain rotation (v1.1 roadmap)" },
  { id: "M-04", severity: "Medium", status: "Accepted", description: "Notification ID deduplication handled off-chain" },
  { id: "L-01", severity: "Low", status: "Fixed", description: "Clock errors now typed and observable" },
  { id: "L-02", severity: "Low", status: "Confirmed Safe", description: "All arithmetic uses checked operations" },
  { id: "L-03", severity: "Low", status: "Fixed", description: "Light CPI errors now granular and distinct" },
];

function SecurityBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal/20 bg-teal/5 text-teal text-xs font-bold uppercase tracking-widest">
      <Shield className="w-3 h-3" />
      {children}
    </span>
  );
}

function PillarCard({
  icon: Icon,
  title,
  description,
  details,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
}) {
  return (
    <div className="group border border-border/50 rounded-2xl p-6 hover:border-teal/30 transition-all duration-300 bg-bg-base hover:bg-bg-surface/30">
      <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-teal" />
      </div>
      <h3 className="text-lg font-bold font-display text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {description}
      </p>
      <ul className="space-y-2">
        {details.map((detail, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-text-muted">
            <div className="w-1 h-1 rounded-full bg-teal shrink-0" />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlobRow({
  offset,
  label,
  value,
  color,
}: {
  offset: string;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="font-mono text-[10px] text-text-muted w-16 shrink-0">
        {offset}
      </span>
      <span className="font-mono text-xs text-text-secondary w-40 truncate">
        {label}
      </span>
      <span className={`font-mono text-xs ${color}`}>{value}</span>
    </div>
  );
}

function EncryptionBlock({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-border/50 rounded-xl p-5 bg-bg-surface/30">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-4 h-4 text-teal" />
        <h4 className="text-sm font-bold text-text-primary">{title}</h4>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function SecurityFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 border border-border/30 rounded-xl bg-bg-base hover:border-teal/20 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-teal" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-text-primary mb-1">{title}</h4>
        <p className="text-xs text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function AuditStat({
  count,
  label,
  color,
  border,
  bg,
}: {
  count: number;
  label: string;
  color: string;
  border: string;
  bg: string;
}) {
  return (
    <div className={`${bg} border ${border} rounded-xl p-4 text-center`}>
      <div className={`text-2xl font-extrabold ${color} font-mono`}>
        {count}
      </div>
      <div className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    Critical: "text-red font-bold",
    High: "text-amber font-bold",
    Medium: "text-purple",
    Low: "text-text-muted",
  };
  return (
    <span className={`text-xs ${colors[severity] || "text-text-muted"}`}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isFixed = status === "Fixed";
  const isAccepted = status === "Accepted";
  const isSafe = status === "Confirmed Safe";

  if (isFixed) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal/10 text-teal text-[10px] font-bold uppercase tracking-wider">
        <CheckCircle2 className="w-2.5 h-2.5" />
        {status}
      </span>
    );
  }
  if (isAccepted) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[10px] font-bold uppercase tracking-wider">
        <Clock className="w-2.5 h-2.5" />
        {status}
      </span>
    );
  }
  if (isSafe) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple/10 text-purple text-[10px] font-bold uppercase tracking-wider">
        <Shield className="w-2.5 h-2.5" />
        {status}
      </span>
    );
  }
  return <span className="text-xs text-text-muted">{status}</span>;
}

function InfraItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 border border-border/30 rounded-xl bg-bg-base hover:border-teal/20 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-teal" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-text-primary mb-1">{title}</h4>
        <p className="text-xs text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary overflow-hidden">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 -z-10 bg-app-glow opacity-30" />
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <SecurityBadge>Audited</SecurityBadge>
            <SecurityBadge>v1.0.0</SecurityBadge>
            <SecurityBadge>All Criticals Fixed</SecurityBadge>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.1] mb-6">
            Security-First{" "}
            <span className="text-teal text-glow">Architecture</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Your users&apos; privacy is non-negotiable. Here&apos;s exactly how we
            protect it — from encryption at rest to zero-knowledge delivery
            proofs on-chain.
          </p>
        </div>
      </section>

      {/* ── Security Pillars ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
              Four Pillars of Privacy
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Every design decision in Herald starts with one question: does this
              protect the user?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <PillarCard
              icon={Shield}
              title="Zero-PII Design"
              description="No plaintext emails, phone numbers, or social handles are ever stored. All contact info is encrypted before it leaves the user's device."
              details={[
                "Salted SHA-256 for identity matching",
                "Encrypted blobs on-chain",
                "No central PII database",
              ]}
            />
            <PillarCard
              icon={Lock}
              title="Dual Encryption"
              description="Users can decrypt their own stored data in the browser using their wallet key — no server round-trip needed."
              details={[
                "NaCl box (X25519) encryption",
                "Two independent decryption blocks",
                "User block never touches our servers",
              ]}
            />
            <PillarCard
              icon={Cpu}
              title="TEE Isolation"
              description="Decryption occurs inside an AWS Nitro Enclave — a hardware-isolated VM that even system administrators cannot access."
              details={[
                "Attested enclave code (PCR hashes)",
                "No persistent storage inside TEE",
                "KMS-protected decryption keys",
              ]}
            />
            <PillarCard
              icon={Eye}
              title="ZK Receipts"
              description="Every delivery is proven on-chain via Light Protocol compressed receipts — verifiable without revealing the recipient."
              details={[
                "Compressed account proofs",
                "Recipient hash, not address",
                "Immutable on-chain audit trail",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Encryption Architecture ─────────────────────────────── */}
      <section className="py-16 sm:py-24 border-t border-border/30 bg-bg-surface/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
            Encryption Architecture
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10">
            Herald uses a{" "}
            <span className="text-text-primary font-medium">
              dual-recipient encryption scheme
            </span>{" "}
            — two independent encrypted blocks stored on-chain, each decryptable
            by a different party using their own private key.
          </p>

          <div className="bg-[#020810] border border-border rounded-2xl p-6 sm:p-8 mb-8">
            <div className="font-mono text-xs sm:text-sm">
              <div className="text-text-muted mb-4 font-bold uppercase tracking-widest text-[10px]">
                Dual-Encryption Blob Format
              </div>
              <div className="space-y-2">
                <BlobRow
                  offset="0–1"
                  label="Magic prefix"
                  value="0xAA, 0xBB"
                  color="text-purple"
                />
                <BlobRow
                  offset="2–33"
                  label="Ephemeral pubkey 1"
                  value="32 bytes (gateway sender)"
                  color="text-teal"
                />
                <BlobRow
                  offset="34–35"
                  label="Length field"
                  value="uint16 big-endian"
                  color="text-amber"
                />
                <BlobRow
                  offset="36–N"
                  label="Gateway ciphertext"
                  value="nacl.box → gateway public key"
                  color="text-teal"
                />
                <BlobRow
                  offset="+0–+31"
                  label="Ephemeral pubkey 2"
                  value="32 bytes (user sender)"
                  color="text-blue-400"
                />
                <BlobRow
                  offset="+32–end"
                  label="User ciphertext"
                  value="nacl.box → user wallet X25519 key"
                  color="text-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <EncryptionBlock
              icon={Key}
              title="Gateway Block"
              description="Encrypted to Herald's X25519 public key. Only the Notification Gateway can decrypt it — and only inside the Secure Enclave."
            />
            <EncryptionBlock
              icon={Database}
              title="User Block"
              description="Encrypted to the user's wallet-derived X25519 key. Only the user can decrypt it — directly in their browser, no server needed."
            />
          </div>

          <div className="border border-teal/20 bg-teal/5 rounded-xl p-6">
            <h3 className="text-sm font-bold text-teal uppercase tracking-widest mb-3">
              Neither party can read the other&apos;s block
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              The gateway doesn&apos;t have the user&apos;s wallet key. The user
              doesn&apos;t have the gateway&apos;s private key. This means{" "}
              <span className="text-text-primary font-medium">
                Herald cannot access user contact info without the TEE
              </span>
              , and{" "}
              <span className="text-text-primary font-medium">
                users retain full sovereignty
              </span>{" "}
              over their own data.
            </p>
          </div>
        </div>
      </section>

      {/* ── On-Chain Security ───────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-t border-border/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
            On-Chain Security
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10">
            The Herald Privacy Registry is an Anchor program on Solana, with
            security baked into every instruction.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SecurityFeature
              icon={Network}
              title="PDA Seed Constraints"
              description="Identity PDAs are derived from [&quot;identity&quot;, owner]. A different wallet literally cannot derive the same PDA — enforced by the runtime."
            />
            <SecurityFeature
              icon={Shield}
              title="Checked Arithmetic"
              description="All on-chain math uses checked_add and checked_sub. No silent integer wrapping possible."
            />
            <SecurityFeature
              icon={FileCheck}
              title="Tier Enforcement"
              description="Send limits are enforced on-chain per billing period. A protocol cannot exceed its tier quota."
            />
            <SecurityFeature
              icon={Clock}
              title="Subscription Expiry"
              description="Receipts cannot be written if a protocol's subscription has expired. The chain enforces billing compliance."
            />
            <SecurityFeature
              icon={AlertTriangle}
              title="Suspension Mechanism"
              description="Protocols can be hard-suspended for ToS violations. Suspension blocks all access — not reversible by the protocol owner."
            />
            <SecurityFeature
              icon={Terminal}
              title="Granular Error Reporting"
              description="Distinct error variants for Light CPI, account validation, and invocation failures. Clear observability for operators."
            />
          </div>
        </div>
      </section>

      {/* ── Audit Results ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-t border-border/30 bg-bg-surface/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
            Security Audit
          </h2>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <p className="text-text-secondary text-lg leading-relaxed">
              Conducted by{" "}
              <span className="text-text-primary font-medium">Antigravity</span>{" "}
              on March 18, 2026. All critical and high severity findings have
              been resolved in{" "}
              <span className="text-teal font-mono font-bold">v1.0.0</span>.
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <AuditStat
              count={2}
              label="Criticals"
              color="text-red"
              border="border-red/20"
              bg="bg-red/5"
            />
            <AuditStat
              count={3}
              label="Highs"
              color="text-amber"
              border="border-amber/20"
              bg="bg-amber/5"
            />
            <AuditStat
              count={4}
              label="Mediums"
              color="text-purple"
              border="border-purple/20"
              bg="bg-purple/5"
            />
            <AuditStat
              count={3}
              label="Lows"
              color="text-text-muted"
              border="border-bg-border"
              bg="bg-bg-elevated/50"
            />
          </div>

          {/* Full Table */}
          <div className="overflow-x-auto border border-border/50 rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-bg-surface/50">
                  <th className="text-left py-3 px-4 font-mono text-xs text-text-muted uppercase tracking-widest">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 font-mono text-xs text-text-muted uppercase tracking-widest">
                    Severity
                  </th>
                  <th className="text-left py-3 px-4 font-mono text-xs text-text-muted uppercase tracking-widest">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-mono text-xs text-text-muted uppercase tracking-widest hidden sm:table-cell">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {AUDIT_FINDINGS.map((finding) => (
                  <tr
                    key={finding.id}
                    className="border-b border-border/20 last:border-0 hover:bg-bg-surface/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs text-text-primary font-bold">
                      {finding.id}
                    </td>
                    <td className="py-3 px-4">
                      <SeverityBadge severity={finding.severity} />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={finding.status} />
                    </td>
                    <td className="py-3 px-4 text-text-secondary hidden sm:table-cell">
                      {finding.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Infrastructure Security ─────────────────────────────── */}
      <section className="py-16 sm:py-24 border-t border-border/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
            Infrastructure
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10">
            The Notification Gateway is deployed on AWS with defense-in-depth at
            every layer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfraItem
              icon={Server}
              title="ECS Fargate Multi-AZ"
              description="Stateless containers deployed across multiple availability zones. No single point of failure."
            />
            <InfraItem
              icon={Key}
              title="AWS Secrets Manager"
              description="X25519 private keys stored in encrypted secrets. IAM role-scoped access only."
            />
            <InfraItem
              icon={Network}
              title="Redis Caching"
              description="Identity PDAs cached in Redis to reduce Solana RPC calls and improve lookup latency."
            />
            <InfraItem
              icon={Database}
              title="PostgreSQL + Prisma"
              description="Notification metadata stored with zero PII. Wallet addresses and API keys hashed with SHA-256."
            />
            <InfraItem
              icon={Clock}
              title="BullMQ Queue"
              description="Async processing with 5 named queues, dead-letter handling, and exponential backoff retries."
            />
            <InfraItem
              icon={Shield}
              title="Tier Rate Limiting"
              description="Per-API-key rate limits enforced at the gateway level. Developer (2 rps) to Enterprise (500 rps)."
            />
          </div>
        </div>
      </section>

      {/* ── Responsible Disclosure ──────────────────────────────── */}
      <section className="py-16 sm:py-24 border-t border-border/30 bg-bg-surface/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-text-primary mb-6">
            Responsible Disclosure
          </h2>
          <div className="border border-border/50 rounded-2xl p-6 sm:p-8 bg-bg-base">
            <p className="text-text-secondary leading-relaxed mb-6">
              If you believe you have found a security vulnerability in Herald
              Protocol, we encourage responsible disclosure. We take all reports
              seriously and will respond promptly.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary mb-1">
                    Scope
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Smart contracts (Solana program), Notification Gateway API,
                    Encryption architecture, User Portal
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary mb-1">
                    Contact
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Please email{" "}
                    <a
                      href="mailto:security@useherald.xyz"
                      className="text-teal hover:underline"
                    >
                      security@useherald.xyz
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary mb-1">
                    Response Time
                  </h4>
                  <p className="text-sm text-text-secondary">
                    We aim to acknowledge within 48 hours and provide a detailed
                    response within 7 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-t border-border/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight mb-6">
            Don&apos;t trust us. <span className="text-teal">Verify.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            All of our code is open source. Audit our smart contracts, review
            our encryption implementation, and verify our claims yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/heraldhq-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-teal text-bg-base font-bold rounded-xl hover:bg-teal/90 transition-colors shadow-[0_0_20px_rgba(0,200,150,0.2)]"
            >
              View Source Code
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs/quickstart"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-text-secondary hover:text-teal hover:border-teal/30 transition-colors"
            >
              Read the Docs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
