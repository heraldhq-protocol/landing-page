import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const ALL_FIELDS: { key: string; label: string }[] = [
  { key: "fullName", label: "Full Name" },
  { key: "workEmail", label: "Work Email" },
  { key: "role", label: "Role" },
  { key: "protocolName", label: "Protocol" },
  { key: "website", label: "Website" },
  { key: "wallets", label: "Active Wallets" },
  { key: "useCase", label: "Use Case" },
  { key: "channel", label: "Channel" },
  { key: "chain", label: "Chain" },
  { key: "teamSize", label: "Team Size" },
  { key: "stage", label: "Stage" },
  { key: "timeline", label: "Timeline" },
  { key: "currentSetup", label: "Current Setup" },
  { key: "volume", label: "Volume" },
  { key: "socialLinks", label: "Social / GitHub" },
  { key: "source", label: "Source" },
  { key: "notes", label: "Notes" },
];

const BRAND_EMAIL_HTML = (body: Record<string, string>) => {
  const useCase =
    body.useCase === "Other:" && body.useCaseOther
      ? `Other: ${body.useCaseOther}`
      : body.useCase;

  const rows = ALL_FIELDS
    .map(({ key, label }) => {
      const value = key === "useCase" ? useCase : body[key] ?? "";
      if (!value) return "";
      return `<tr>
        <td style="padding:12px 18px;white-space:nowrap;vertical-align:top;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:#64748B;border-bottom:1px solid #E2E8F0;">${label}</td>
        <td style="padding:12px 18px;vertical-align:top;font-size:14px;font-weight:600;color:#0F172A;border-bottom:1px solid #E2E8F0;text-align:right;word-break:break-word;">${value}</td>
      </tr>`;
    })
    .filter(Boolean)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>New waitlist signup — Herald</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root { color-scheme:light dark; }
  * { box-sizing:border-box; }
  body { margin:0; padding:0; background:#F8FAFC; color:#0F172A; font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased; text-size-adjust:100%; }
  .wrap { width:100%; background:#F8FAFC; padding:32px 16px; }
  .container { max-width:600px; margin:0 auto; }
  .header { padding:2px 4px 28px; }
  .brand-row { display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .brand { display:flex; align-items:center; gap:10px; }
  .brand img { width:32px; height:32px; display:block; border-radius:7px; }
  .brand-name { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; letter-spacing:-0.01em; color:#0F172A; }
  .protocol-tag { font-size:10px; text-transform:uppercase; letter-spacing:0.16em; color:#64748B; font-weight:700; }
  .card { background:#FFFFFF; border:1px solid #E2E8F0; border-radius:8px; padding:32px; }
  .eyebrow { font-size:10px; text-transform:uppercase; letter-spacing:0.16em; font-weight:700; color:#00C896; margin:0 0 20px; display:flex; align-items:center; gap:6px; }
  .eyebrow .dot { width:6px; height:6px; border-radius:99px; background:#00C896; flex:0 0 auto; }
  .headline { font-family:'Syne',sans-serif; font-size:24px; font-weight:700; line-height:1.2; letter-spacing:-0.022em; color:#0F172A; margin:0 0 10px; }
  .body-text { font-size:15px; line-height:1.6; color:#475569; margin:0 0 24px; font-weight:400; }
  .body-text strong { color:#0F172A; font-weight:600; }
  table.meta { width:100%; border-collapse:collapse; font-size:14px; }
  table.meta td:first-child { width:1%; }
  .footer { padding:28px 8px 8px; }
  .footer-divider { height:1px; background:#E2E8F0; margin:20px 0 18px; border:0; }
  .footer-row { display:flex; align-items:center; gap:8px; font-size:12px; color:#64748B; flex-wrap:wrap; }
  .footer-row img { width:20px; height:20px; display:block; border-radius:5px; }
  .footer-row strong { color:#475569; font-family:'Syne',sans-serif; font-weight:700; }
  .footer-row a { color:#64748B; text-decoration:none; }
  .pipe { color:#CBD5E1; padding:0 4px; }
</style>
</head>
<body>
  <span style="display:none!important;visibility:hidden;opacity:0;height:0;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:transparent;mso-hide:all;">New design partner signup: ${body.fullName} — ${body.protocolName}</span>
  <div class="wrap" style="width:100%;background:#F8FAFC;padding:32px 16px;">
    <div class="container" style="max-width:600px;margin:0 auto;">
      <div class="header" style="padding:2px 4px 28px;">
        <div class="brand-row" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div class="brand" style="display:flex;align-items:center;gap:10px;">
            <img src="https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/herald-logo.svg" width="32" height="32" alt="Herald">
            <span class="brand-name" style="font-family:'Syne',sans-serif;font-weight:700;font-size:15px;letter-spacing:-0.01em;color:#0F172A;">Herald</span>
          </div>
          <span class="protocol-tag" style="font-size:10px;text-transform:uppercase;letter-spacing:0.16em;color:#64748B;font-weight:700;">Waitlist</span>
        </div>
      </div>
      <div class="card" style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:8px;padding:32px;">
        <div class="eyebrow" style="font-size:10px;text-transform:uppercase;letter-spacing:0.16em;font-weight:700;color:#00C896;margin:0 0 20px;display:flex;align-items:center;gap:6px;">
          <span class="dot" style="width:6px;height:6px;border-radius:99px;background:#00C896;flex:0 0 auto;"></span>
          Design Partner Signup
        </div>
        <h1 class="headline" style="font-family:'Syne',sans-serif;font-size:24px;font-weight:700;line-height:1.2;letter-spacing:-0.022em;color:#0F172A;margin:0 0 10px;">${body.fullName}</h1>
        <p class="body-text" style="font-size:15px;line-height:1.6;color:#475569;margin:0 0 24px;font-weight:400;">
          New waitlist registration from <strong>${body.protocolName}</strong>. Details below.
        </p>
        <table class="meta" style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="footer" style="padding:28px 8px 8px;">
        <hr class="footer-divider" style="height:1px;background:#E2E8F0;margin:20px 0 18px;border:0;">
        <div class="footer-row" style="display:flex;align-items:center;gap:8px;font-size:12px;color:#64748B;flex-wrap:wrap;">
          <img src="https://herald-storage-bucket.s3.eu-north-1.amazonaws.com/herald-logo.svg" width="20" height="20" alt="">
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
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { error } = await resend.emails.send({
      from: "waitlist@useherald.xyz",
      to: ["hello@useherald.xyz"],
      bcc: ["herald.admin@gmail.com"],
      subject: `New waitlist signup: ${body.fullName} — ${body.protocolName}`,
      html: BRAND_EMAIL_HTML(body),
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
