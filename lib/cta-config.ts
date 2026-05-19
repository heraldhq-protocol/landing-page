export const IS_EARLY_ACCESS = true;

export const PARTNERS_URL = "/partners";

export const isExternal = (href: string) => href.startsWith("http");

// ── Per-component CTA configs ─────────────────────────────

export const NAV_CTA = {
  label: IS_EARLY_ACCESS ? "Get early access →" : "Register →",
  href: IS_EARLY_ACCESS ? PARTNERS_URL : "https://notify.useherald.xyz/register",
};

export const HERO_PROTOCOL_CTA = {
  label: IS_EARLY_ACCESS ? "Get early access" : "Integrate as a protocol",
  href: IS_EARLY_ACCESS ? PARTNERS_URL : "/for-protocols",
};

export const DUAL_PROTOCOL_CTA = {
  label: IS_EARLY_ACCESS ? "Get early access" : "Start integrating",
  href: IS_EARLY_ACCESS ? PARTNERS_URL : "https://app.useherald.xyz",
};

export const FINAL_PROTOCOL_CTA = {
  label: IS_EARLY_ACCESS ? "Get early access →" : "Start building →",
  href: IS_EARLY_ACCESS ? PARTNERS_URL : "https://app.useherald.xyz",
};

export const PROTOCOL_HERO_CTA = {
  label: IS_EARLY_ACCESS ? "Get early access →" : "Start integrating →",
  href: IS_EARLY_ACCESS ? PARTNERS_URL : "/for-protocols",
};

export const PRICING_CTA = {
  label: IS_EARLY_ACCESS ? "Get early access" : "Start for free",
  href: IS_EARLY_ACCESS ? PARTNERS_URL : "https://app.useherald.xyz/register",
};

export const PRICING_SPEC_CTA = {
  label: IS_EARLY_ACCESS ? "GET EARLY ACCESS" : "",
  href: IS_EARLY_ACCESS ? PARTNERS_URL : "",
};
