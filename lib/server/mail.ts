import "server-only";
import nodemailer from "nodemailer";

const RECIPIENTS = ["matthewdouglaspt@outlook.com", "marcus@promodesigns.co.uk"];

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function transport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT || 587);
  return {
    t: nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } }),
    from: process.env.SMTP_FROM || user,
  };
}

/** Returns true if sent. Never throws - the DB is the source of truth. */
export async function sendMail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
  to?: string[];
}) {
  const cfg = transport();
  if (!cfg) {
    console.warn("SMTP not configured; skipping email");
    return false;
  }
  try {
    await cfg.t.sendMail({
      from: `"Strive Running Club" <${cfg.from}>`,
      to: opts.to ?? RECIPIENTS,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
    });
    return true;
  } catch (err) {
    console.error("Email failed", err);
    return false;
  }
}
