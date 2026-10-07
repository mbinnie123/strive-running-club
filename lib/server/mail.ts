import "server-only";

const RECIPIENTS = ["matthewdouglaspt@outlook.com", "marcus@promodesigns.co.uk"];

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Returns true if sent. Never throws - the DB is the source of truth. */
export async function sendMail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
  to?: string[];
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set; skipping email");
    return false;
  }
  // Until a domain is verified in Resend, onboarding@resend.dev only delivers to the account owner.
  const from = process.env.MAIL_FROM || "Strive Running Club <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: opts.to ?? RECIPIENTS,
        reply_to: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      console.error("Resend failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email failed", err);
    return false;
  }
}
