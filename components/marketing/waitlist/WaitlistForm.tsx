"use client";

import { useState, useRef } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CheckIcon as Check } from "@/components/ui/check";
import { Loader2, Hash, Bell, Send } from "lucide-react";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfc9x2Dmbl4mXXS_7mArOqbEw0rVa1xgKovpF9AK80k5qMTeg/formResponse";

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

const entryIds: Record<string, string> = {
  fullName: "entry.665426303",
  workEmail: "entry.242279822",
  role: "entry.2000223748",
  website: "entry.1070070356",
  protocolName: "entry.1171760324",
  wallets: "entry.1951953669",
  useCase: "entry.21602620",
  channel: "entry.107119755",
};

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
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

    const formEl = document.createElement("form");
    formEl.action = FORM_URL;
    formEl.method = "POST";
    formEl.target = "hidden-gform-iframe";

    const fields: Record<string, string> = {
      [entryIds.fullName]: form.fullName,
      [entryIds.workEmail]: form.workEmail,
      [entryIds.role]: form.role,
      [entryIds.website]: form.website,
      [entryIds.protocolName]: form.protocolName,
      [entryIds.wallets]: form.wallets,
      [entryIds.useCase]:
        form.useCase === "Other:"
          ? `Other: ${form.useCaseOther}`
          : form.useCase,
      [entryIds.channel]: form.channel,
    };

    for (const [name, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      formEl.appendChild(input);
    }

    document.body.appendChild(formEl);
    formEl.submit();
    document.body.removeChild(formEl);

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto p-6 sm:p-10 md:p-14 rounded-2xl bg-bg-surface border border-teal/20 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
        <div className="w-16 h-16 rounded-full bg-teal/10 border border-teal/25 flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-teal" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-text-primary mb-3">
          You're on the list
        </h3>
        <p className="text-text-secondary text-base leading-relaxed max-w-sm mx-auto">
          We'll reach out when early access opens. In the meantime, check out
          our{" "}
          <a
            href="/docs/quickstart"
            className="text-teal hover:text-teal/80 font-medium underline-offset-2 hover:underline transition-colors duration-100"
          >
            documentation
          </a>{" "}
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

  return (
    <>
      <iframe
        ref={iframeRef}
        name="hidden-gform-iframe"
        className="hidden"
        title="Google Form submission target"
      />
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

        <FormField id="role" label="Your role" error={errors.role}>
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

        <FormField id="workEmail" label="Work email" error={errors.workEmail}>
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

        <FormField id="protocolName" label="Protocol name" error={errors.protocolName}>
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
          <FormField id="website" label="Protocol website" error={errors.website}>
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
      <fieldset>
        <legend className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Hash size={14} className="text-teal" />
          Approximate Active Wallets
        </legend>
        {fieldError("wallets")}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          {WALLET_OPTIONS.map((opt) => (
            <RadioCard
              key={opt}
              name="wallets"
              value={opt}
              checked={form.wallets === opt}
              onChange={(val) => update("wallets", val)}
              label={opt}
            />
          ))}
        </div>
      </fieldset>

      {/* ── Primary Notification Use Case ───────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Bell size={14} className="text-teal" />
          Primary Notification Use Case
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
                placeholder="Describe your use case…"
                className={`${inputBase} h-10 text-xs`}
              />
            </div>
          )}
        </div>
      </fieldset>

      {/* ── Preferred Channel ───────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Send size={14} className="text-teal" />
          Preferred Channel
        </legend>
        {fieldError("channel")}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          {CHANNEL_OPTIONS.map((opt) => (
            <RadioCard
              key={opt}
              name="channel"
              value={opt}
              checked={form.channel === opt}
              onChange={(val) => update("channel", val)}
              label={opt}
            />
          ))}
        </div>
      </fieldset>

      {/* ── Submit ──────────────────────────────────────────── */}
      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/20 text-sm text-red-400 text-center">
          Couldn't submit the form. Please try again or email us directly at{" "}
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
            <Loader2 size={18} className="animate-spin" /> Submitting…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Get early access <Send size={16} />
          </span>
        )}
      </Button>
    </form>
    </>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-semibold text-text-primary mb-1.5 block"
      >
        {label}
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
