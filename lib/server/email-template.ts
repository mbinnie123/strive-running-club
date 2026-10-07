import { escapeHtml } from "@/lib/server/mail";
import { site } from "@/lib/site";

type Row = [label: string, value: string];

/** Branded, inline-styled HTML email (table layout for email-client compatibility). */
export function emailLayout(opts: {
  heading: string;
  intro?: string;
  rows?: Row[];
  /** Free-text block shown in a quote box (e.g. the contact message). Escaped here. */
  message?: { label: string; text: string };
  /** Short "what happens next" list. */
  nextSteps?: string[];
  /** Call-to-action button. */
  button?: { label: string; href: string };
  footer?: string;
}) {
  const rows = (opts.rows ?? [])
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e6eefc;width:130px;font-size:13px;color:#64748b;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e6eefc;font-size:15px;color:#0f172a;font-weight:600;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  const message = opts.message
    ? `<div style="margin-top:20px;">
        <div style="font-size:13px;color:#64748b;margin-bottom:8px;">${escapeHtml(opts.message.label)}</div>
        <div style="background:#f1f6ff;border-left:4px solid #1768f5;border-radius:8px;padding:14px 16px;font-size:15px;line-height:1.6;color:#0f172a;">${escapeHtml(opts.message.text).replace(/\n/g, "<br>")}</div>
      </div>`
    : "";

  const nextSteps = opts.nextSteps?.length
    ? `<div style="margin-top:24px;background:#f8fbff;border:1px solid #dbe7fb;border-radius:12px;padding:16px 18px;">
        <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1768f5;margin-bottom:8px;">What happens next</div>
        <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#334155;">${opts.nextSteps
          .map((s) => `<li>${escapeHtml(s)}</li>`)
          .join("")}</ol>
      </div>`
    : "";

  const button = opts.button
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;"><tr><td style="background:#1768f5;border-radius:999px;">
        <a href="${escapeHtml(opts.button.href)}" style="display:inline-block;padding:12px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">${escapeHtml(opts.button.label)}</a>
      </td></tr></table>`
    : "";

  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f8fbff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fbff;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #dbe7fb;border-radius:16px;overflow:hidden;">
        <tr><td align="center" style="background:#ffffff;padding:24px 28px 16px;">
          <a href="${site.url}" style="text-decoration:none;"><img src="${site.url}/email-logo.png" width="260" alt="Strive Running Club Glasgow" style="display:block;border:0;outline:none;width:260px;max-width:100%;height:auto;"></a>
        </td></tr>
        <tr><td style="background:#1768f5;height:6px;line-height:6px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">${escapeHtml(opts.heading)}</h1>
          ${opts.intro ? `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#334155;">${escapeHtml(opts.intro)}</p>` : ""}
          ${rows ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>` : ""}
          ${message}
        </td></tr>
        <tr><td style="padding:16px 28px;background:#f1f6ff;font-size:12px;color:#64748b;">${escapeHtml(opts.footer ?? "Strive Running Club Glasgow · striverunningclubglasgow.co.uk")}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
