import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const BRAND_EMAIL_HTML = (rows: string) => `<!DOCTYPE html>
<html lang="en" style="box-sizing:border-box;color-scheme:light dark;">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>New waitlist signup — Herald</title>
<style>
  * { box-sizing:border-box; }
  body { margin:0; padding:0; background:#F8FAFC; color:#0F172A;
    font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
    -webkit-font-smoothing:antialiased; text-size-adjust:100%; }
  .wrap { width:100%; background:#F8FAFC; padding:32px 16px; }
  .container { max-width:600px; margin:0 auto; }
  .header { padding:8px 4px 28px; }
  .brand { display:flex; align-items:center; gap:10px; }
  .brand-mark { width:32px; height:32px; background:#00C896; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:16px; color:#fff; font-weight:700; }
  .brand-name { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; letter-spacing:-0.01em; color:#0F172A; }
  .card { background:#FFFFFF; border:1px solid #E2E8F0; border-radius:8px; padding:36px 32px; }
  .eyebrow { display:block; font-size:10px; text-transform:uppercase; letter-spacing:0.16em; font-weight:700; color:#00C896; margin:0 0 20px; }
  .eyebrow .dot { width:6px; height:6px; border-radius:99px; background:#00C896; display:inline-block; vertical-align:middle; margin-right:6px; position:relative; top:-1px; }
  .headline { font-family:'Syne',sans-serif; font-size:22px; font-weight:700; line-height:1.18; letter-spacing:-0.022em; color:#0F172A; margin:0 0 16px; }
  .meta-wrap { margin-top:20px; }
  .meta-row { display:flex; justify-content:space-between; gap:16px; padding:14px 0; border-top:1px solid #E2E8F0; font-size:13px; }
  .meta-row:first-child { border-top:0; padding-top:0; }
  .meta-key { color:#64748B; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; font-weight:600; white-space:nowrap; }
  .meta-val { color:#0F172A; font-weight:600; text-align:right; word-break:break-word; }
  .footer { padding:28px 8px 8px; }
  .footer-meta { font-size:12.5px; line-height:1.65; color:#64748B; margin:0; }
  .footer-divider { height:1px; background:#E2E8F0; margin:20px 0 18px; border:0; }
  .footer-brand { display:flex; align-items:center; gap:8px; font-size:12px; color:#64748B; flex-wrap:wrap; }
  .footer-brand .dot-mark { width:20px; height:20px; background:#00C896; border-radius:5px; display:inline-flex; align-items:center; justify-content:center; font-size:10px; color:#fff; font-weight:700; }
  .footer-brand strong { color:#475569; font-family:'Syne',sans-serif; font-weight:700; }
  .footer-brand a { color:#64748B; text-decoration:none; }
  .pipe { color:#CBD5E1; padding:0 4px; }
  @media (max-width:600px) {
    .card { padding:28px 22px; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#F8FAFC;color:#0F172A;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-size-adjust:100%;">
  <div class="wrap" style="width:100%;background:#F8FAFC;padding:32px 16px;">
    <div class="container" style="max-width:600px;margin:0 auto;">
      <div class="header" style="padding:8px 4px 28px;">
        <div class="brand" style="display:flex;align-items:center;gap:10px;">
          <span class="brand-mark" style="width:32px;height:32px;background:#00C896;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;font-size:16px;color:#fff;font-weight:700;">✦</span>
          <span class="brand-name" style="font-family:'Syne',sans-serif;font-weight:700;font-size:15px;letter-spacing:-0.01em;color:#0F172A;">Herald</span>
        </div>
      </div>
      <div class="card" style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:8px;padding:36px 32px;">
        <span class="eyebrow" style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.16em;font-weight:700;color:#00C896;margin:0 0 20px;">
          <span class="dot" style="width:6px;height:6px;border-radius:99px;background:#00C896;display:inline-block;vertical-align:middle;margin-right:6px;position:relative;top:-1px;"></span>New signup
        </span>
        <h1 class="headline" style="font-family:'Syne',sans-serif;font-size:22px;font-weight:700;line-height:1.18;letter-spacing:-0.022em;color:#0F172A;margin:0 0 16px;">Waitlist registration received</h1>
        <div class="meta-wrap" style="margin-top:20px;">
          ${rows}
        </div>
      </div>
      <div class="footer" style="padding:28px 8px 8px;">
        <hr class="footer-divider" style="height:1px;background:#E2E8F0;margin:20px 0 18px;border:0;">
        <div class="footer-brand" style="display:flex;align-items:center;gap:8px;font-size:12px;color:#64748B;flex-wrap:wrap;">
          <span class="dot-mark" style="width:20px;height:20px;background:#00C896;border-radius:5px;display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:700;">✦</span>
          <strong style="color:#475569;font-family:'Syne',sans-serif;font-weight:700;">Herald</strong>
          <span class="pipe" style="color:#CBD5E1;padding:0 4px;">|</span>
          <span>Notification layer for Solana DeFi</span>
          <span class="pipe" style="color:#CBD5E1;padding:0 4px;">|</span>
          <a href="https://useherald.xyz" style="color:#64748B;text-decoration:none;">useherald.xyz</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

function MetaRow({ label, value, first }: { label: string; value: string; first: boolean }) {
  return `<div class="meta-row${first ? "" : ""}" style="display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-top:${first ? "0" : "1px solid #E2E8F0"};font-size:13px;${first ? "padding-top:0" : ""}">
    <span class="meta-key" style="color:#64748B;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;font-weight:600;white-space:nowrap;">${label}</span>
    <span class="meta-val" style="color:#0F172A;font-weight:600;text-align:right;word-break:break-word;">${value}</span>
  </div>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const useCase =
      body.useCase === "Other:" && body.useCaseOther
        ? `Other: ${body.useCaseOther}`
        : body.useCase;

    const fields: [string, string][] = [
      ["Full Name", body.fullName],
      ["Work Email", body.workEmail],
      ["Role", body.role],
      ["Protocol", body.protocolName],
      ["Website", body.website],
      ["Active Wallets", body.wallets],
      ["Use Case", useCase],
      ["Channel", body.channel],
    ];

    const rows = fields
      .map(([label, value], i) => MetaRow({ label, value, first: i === 0 }))
      .join("");

    const { error } = await resend.emails.send({
      from: "waitlist@useherald.xyz",
      to: ["hello@useherald.xyz"],
      subject: `New waitlist signup: ${body.fullName} — ${body.protocolName}`,
      html: BRAND_EMAIL_HTML(rows),
    });

    if (error) {
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, error: "Failed to send" },
      { status: 500 }
    );
  }
}
