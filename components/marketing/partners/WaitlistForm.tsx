"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CheckIcon as Check } from "@/components/ui/check";
import { Loader2, Hash, Bell, Send, Globe, Users, Clock, Wrench, Activity, Link2, MessageSquare, Zap, Sparkles } from "lucide-react";

const API_URL = "/api/partners";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  workEmail: z.string().email("Enter a valid work email"),
  role: z.string().min(1, "Role is required"),
  website: z.string().min(1, "Protocol website is required"),
  protocolName: z.string().min(1, "Protocol name is required"),
  wallets: z.string().min(1, "Select a wallet range"),
  useCase: z.string().min(1, "Select a use case"),
  useCaseOther: z.string().optional(),
  channel: z.string().min(1, "Select a channel"),
  chain: z.string().optional(),
  teamSize: z.string().optional(),
  stage: z.string().optional(),
  timeline: z.string().optional(),
  currentSetup: z.string().optional(),
  volume: z.string().optional(),
  socialLinks: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type FieldName = keyof FormData;

const WALLET_OPTIONS = [
  "1,000",
  "1,000 - 10,000",
  "10,000 - 50,000",
  "50,000+",
];

const USE_CASE_OPTIONS = [
  "Liquidation alerts",
  "Governance votes",
  "Rate & APY changes",
  "Collateral Unlock/Vesting",
  "Whale/Large Trade Alerts",
];

const CHANNEL_OPTIONS = ["Email", "Telegram", "SMS", "All of the above"];

const CHAIN_OPTIONS = ["Solana", "Eclipse", "SVM L2", "EVM", "Other"];
const TEAM_SIZE_OPTIONS = ["Just me", "2\u20135", "6\u201320", "21\u2013100", "100+"];
const STAGE_OPTIONS = ["Idea", "In development", "Testnet", "Mainnet (early)", "Mainnet (live)"];
const TIMELINE_OPTIONS = ["ASAP (1\u20132 weeks)", "1\u20133 months", "3\u20136 months", "No firm timeline"];
const SETUP_OPTIONS = ["In-house email", "Telegram bot", "SMS provider", "Web3 notification service", "Not doing it yet"];
const VOLUME_OPTIONS = ["Less than 10K", "10K\u2013100K", "100K\u20131M", "1M+", "Unsure"];
const SOURCE_OPTIONS = ["Twitter / X", "GitHub", "Docs", "Friend / Colleague", "Conference", "Search", "Other"];

function RadioCard({
  name,
  value,
  checked,
  onChange,
  label,
  icon,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (val: string) => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl border cursor-pointer transition-transform duration-150 ease-out motion-safe:hover:-translate-y-0.5 ${
        checked
          ? "border-teal/50 bg-teal/5 shadow-[0_0_16px_rgba(20,184,166,0.1)]"
          : "border-border bg-bg-base hover:border-border-2 hover:bg-bg-surface"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer appearance-none w-4 h-4 rounded-full border-2 border-border-2 bg-bg-base shrink-0 checked:border-teal checked:bg-teal checked:shadow-[0_0_8px_rgba(20,184,166,0.4)] transition-colors duration-100"
      />
      {icon && <span className="text-text-muted shrink-0">{icon}</span>}
      <span
        className={`text-sm transition-colors duration-100 ${
          checked ? "text-text-primary font-medium" : "text-text-secondary"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default function WaitlistForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    workEmail: "",
    role: "",
    website: "",
    protocolName: "",
    wallets: "",
    useCase: "",
    useCaseOther: "",
    channel: "",
    chain: "Solana",
    teamSize: "",
    stage: "",
    timeline: "",
    currentSetup: "",
    volume: "",
    socialLinks: "",
    source: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: FieldName, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      let firstField: FieldName | null = null;
      for (const issue of result.error.issues) {
        const path = issue.path[0] as FieldName;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
          if (!firstField) firstField = path;
        }
      }
      setErrors(fieldErrors);

      if (firstField) {
        const el = formRef.current?.querySelector<HTMLElement>(
          `[name="${firstField}"]`
        );
        el?.focus();
      }
      return;
    }

    setStatus("submitting");

    const useCase =
      form.useCase === "Other:" ? `Other: ${form.useCaseOther}` : form.useCase;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          workEmail: form.workEmail,
          role: form.role,
          website: form.website,
          protocolName: form.protocolName,
          wallets: form.wallets,
          useCase,
          channel: form.channel,
          chain: form.chain,
          teamSize: form.teamSize,
          stage: form.stage,
          timeline: form.timeline,
          currentSetup: form.currentSetup,
          volume: form.volume,
          socialLinks: form.socialLinks,
          source: form.source,
          notes: form.notes,
        }),
      });

      if (!res.ok) throw new Error("Server rejected");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto p-6 sm:p-10 md:p-14 rounded-2xl bg-bg-surface border border-teal/20 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
        <div className="w-16 h-16 rounded-full bg-teal/10 border border-teal/25 flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-teal" />
        </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-text-primary mb-3">
            You&apos;re a Design Partner
          </h3>
          <p className="text-text-secondary text-base leading-relaxed max-w-sm mx-auto">
            We&apos;ll reach out within 48 hours to schedule your onboarding call. In
            the meantime, check out our{" "}
            <Link
              href="/docs/quickstart"
              className="text-teal hover:text-teal/80 font-medium underline-offset-2 hover:underline transition-colors duration-100"
            >
              documentation
            </Link>{" "}
            or{" "}
            <a
              href="https://github.com/heraldhq-protocol"
              className="text-teal hover:text-teal/80 font-medium underline-offset-2 hover:underline transition-colors duration-100"
            >
              explore on GitHub
            </a>
            .
          </p>
      </div>
    );
  }

  const inputBase =
    "w-full h-11 px-3.5 sm:px-4 rounded-xl bg-bg-base border text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/30 transition-colors duration-100";

  const fieldError = (name: FieldName) => {
    const id = `${name}-error`;
    return errors[name] ? (
      <p id={id} className="text-xs text-red-400 mt-1.5" role="alert">
        {errors[name]}
      </p>
    ) : null;
  };

  function RadioSection({
    label,
    icon,
    field,
    options,
    required,
  }: {
    label: string;
    icon: React.ReactNode;
    field: FieldName;
    options: string[];
    required?: boolean;
  }) {
    return (
      <fieldset>
        <legend className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          {icon}
          {label}
          {required ? (
            <span className="text-red-400 ml-0.5">*</span>
          ) : (
            <span className="font-normal text-text-muted/50 ml-1 text-xs">(optional)</span>
          )}
        </legend>
        {fieldError(field)}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          {options.map((opt) => (
            <RadioCard
              key={opt}
              name={field}
              value={opt}
              checked={form[field] === opt}
              onChange={(val) => update(field, val)}
              label={opt}
            />
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="max-w-2xl mx-auto p-5 sm:p-8 md:p-10 rounded-2xl bg-bg-surface border border-border space-y-6 sm:space-y-8"
      >
      {/* ── Text fields — 2-col grid ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <FormField
          id="fullName"
          label="Full name"
          error={errors.fullName}
          required
        >
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            spellCheck={false}
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="John Doe"
            aria-invalid={errors.fullName ? "true" : undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputBase}
          />
        </FormField>

        <FormField id="role" label="Your role" error={errors.role} required>
          <input
            id="role"
            name="role"
            type="text"
            autoComplete="organization-title"
            spellCheck={false}
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="Founder / Dev / PM"
            aria-invalid={errors.role ? "true" : undefined}
            aria-describedby={errors.role ? "role-error" : undefined}
            className={inputBase}
          />
        </FormField>

        <FormField id="workEmail" label="Work email" error={errors.workEmail} required>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={form.workEmail}
            onChange={(e) => update("workEmail", e.target.value)}
            placeholder="john@protocol.xyz"
            aria-invalid={errors.workEmail ? "true" : undefined}
            aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
            className={inputBase}
          />
        </FormField>

        <FormField id="protocolName" label="Protocol name" error={errors.protocolName} required>
          <input
            id="protocolName"
            name="protocolName"
            type="text"
            autoComplete="organization"
            spellCheck={false}
            value={form.protocolName}
            onChange={(e) => update("protocolName", e.target.value)}
            placeholder="Jupiter / Kamino / Drift"
            aria-invalid={errors.protocolName ? "true" : undefined}
            aria-describedby={errors.protocolName ? "protocolName-error" : undefined}
            className={inputBase}
          />
        </FormField>

        <div className="sm:col-span-2">
          <FormField id="website" label="Protocol website" error={errors.website} required>
            <input
              id="website"
              name="website"
              type="url"
              autoComplete="url"
              spellCheck={false}
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://"
              aria-invalid={errors.website ? "true" : undefined}
              aria-describedby={errors.website ? "website-error" : undefined}
              className={inputBase}
            />
          </FormField>
        </div>
      </div>

      {/* ── Approximate Active Wallets ──────────────────────── */}
      <RadioSection
        label="Approximate Active Wallets"
        icon={<Hash size={14} className="text-teal" />}
        field="wallets"
        options={WALLET_OPTIONS}
        required
      />

      {/* ── Primary Notification Use Case ───────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Bell size={14} className="text-teal" />
          Primary Notification Use Case
          <span className="text-red-400 ml-0.5">*</span>
        </legend>
        {fieldError("useCase")}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          {USE_CASE_OPTIONS.map((opt) => (
            <RadioCard
              key={opt}
              name="useCase"
              value={opt}
              checked={form.useCase === opt}
              onChange={(val) => update("useCase", val)}
              label={opt}
            />
          ))}
          <RadioCard
            name="useCase"
            value="Other:"
            checked={form.useCase === "Other:"}
            onChange={(val) => update("useCase", val)}
            label={
              form.useCase === "Other:" ? "Other:" : "Other"
            }
          />
          {form.useCase === "Other:" && (
            <div className="sm:col-span-2 -mt-1">
              <input
                type="text"
                value={form.useCaseOther || ""}
                onChange={(e) => update("useCaseOther", e.target.value)}
                placeholder="Describe your use case\u2026"
                className={`${inputBase} h-10 text-xs`}
              />
            </div>
          )}
        </div>
      </fieldset>

      {/* ── Divider — optional section ──────────────────────── */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-bg-surface px-3 text-xs font-semibold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={12} /> Additional info <span className="font-normal normal-case tracking-normal text-text-muted/60">(optional)</span>
          </span>
        </div>
      </div>

      {/* ── Target Chain ────────────────────────────────────── */}
      <RadioSection
        label="Target Chain"
        icon={<Globe size={14} className="text-teal" />}
        field="chain"
        options={CHAIN_OPTIONS}
      />

      {/* ── Team Size ────────────────────────────────────────── */}
      <RadioSection
        label="Team Size"
        icon={<Users size={14} className="text-teal" />}
        field="teamSize"
        options={TEAM_SIZE_OPTIONS}
      />

      {/* ── Protocol Stage ───────────────────────────────────── */}
      <RadioSection
        label="Protocol Stage"
        icon={<Zap size={14} className="text-teal" />}
        field="stage"
        options={STAGE_OPTIONS}
      />

      {/* ── Integration Timeline ────────────────────────────── */}
      <RadioSection
        label="Integration Timeline"
        icon={<Clock size={14} className="text-teal" />}
        field="timeline"
        options={TIMELINE_OPTIONS}
      />

      {/* ── Current Notification Setup ──────────────────────── */}
      <RadioSection
        label="Current Notification Setup"
        icon={<Wrench size={14} className="text-teal" />}
        field="currentSetup"
        options={SETUP_OPTIONS}
      />

      {/* ── Monthly Notification Volume ─────────────────────── */}
      <RadioSection
        label="Monthly Notification Volume"
        icon={<Activity size={14} className="text-teal" />}
        field="volume"
        options={VOLUME_OPTIONS}
      />

      {/* ── Social / GitHub ──────────────────────────────────── */}
      <FormField id="socialLinks" label="Social / GitHub (for background check)" error={errors.socialLinks}>
        <input
          id="socialLinks"
          name="socialLinks"
          type="url"
          autoComplete="url"
          spellCheck={false}
          value={form.socialLinks}
          onChange={(e) => update("socialLinks", e.target.value)}
          placeholder="https://github.com/your-protocol"
          aria-invalid={errors.socialLinks ? "true" : undefined}
          aria-describedby={errors.socialLinks ? "socialLinks-error" : undefined}
          className={inputBase}
        />
      </FormField>

      {/* ── How did you hear about us? ──────────────────────── */}
      <RadioSection
        label="How did you hear about us?"
        icon={<Link2 size={14} className="text-teal" />}
        field="source"
        options={SOURCE_OPTIONS}
      />

      {/* ── Notes ────────────────────────────────────────────── */}
      <FormField id="notes" label="Additional notes" error={errors.notes}>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Anything else you'd like us to know\u2026"
          className={`${inputBase} h-auto min-h-[80px] resize-y pt-2.5`}
        />
      </FormField>

      {/* ── Preferred Channel ───────────────────────────────── */}
      <RadioSection
        label="Preferred Channel"
        icon={<Send size={14} className="text-teal" />}
        field="channel"
        options={CHANNEL_OPTIONS}
        required
      />

      {/* ── Submit ──────────────────────────────────────────── */}
      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/20 text-sm text-red-400 text-center">
          Couldn&apos;t submit the form. Please try again or email us directly at{" "}
          <a
            href="mailto:hello@useherald.xyz"
            className="text-teal hover:underline font-medium"
          >
            hello@useherald.xyz
          </a>
        </div>
      )}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-teal text-bg-base hover:bg-teal/90 font-bold h-12 rounded-xl text-base shadow-[0_0_24px_rgba(0,200,150,0.2)] hover:shadow-[0_0_32px_rgba(0,200,150,0.35)] disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-150 ease-out"
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={18} className="motion-safe:animate-spin" /> Submitting…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Apply as a Design Partner <Send size={16} />
          </span>
        )}
      </Button>
    </form>
  );
}

function FormField({
  id,
  label,
  error,
  children,
  required,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-semibold text-text-primary mb-1.5 block"
      >
        {label}
        {required ? (
          <span className="text-red-400 ml-0.5">*</span>
        ) : (
          <span className="font-normal text-text-muted/50 ml-1 text-xs">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400 mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
