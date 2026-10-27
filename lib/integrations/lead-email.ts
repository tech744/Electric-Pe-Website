/**
 * Internal email notification for website leads, sent over SMTP.
 *
 * Nodemailer against our own mailbox rather than a transactional email API:
 * the mailbox already exists and is already paid for, there is no sender
 * domain to verify with a third party, and a handful of lead notifications a
 * day is nowhere near the volume that would justify an ESP.
 *
 * Fully env-gated and graceful: with no SMTP credentials the call is a no-op
 * that resolves `{ ok: true }`, exactly like the Zoho webhook, so forms keep
 * working in dev and in any environment where mail has not been wired up yet.
 *
 * To switch mail providers, replace the body of `sendLeadEmail` - the rest of
 * the app only knows about that function.
 *
 * Environment:
 *   SMTP_HOST           e.g. smtp.gmail.com (required to send)
 *   SMTP_USER           full mailbox address (required to send)
 *   SMTP_PASS           app password, NOT the account password (required to send)
 *   SMTP_PORT           587 for STARTTLS (default), 465 for implicit TLS
 *   LEAD_NOTIFY_EMAILS  comma-separated recipients; overrides DEFAULT_RECIPIENTS
 *   LEAD_NOTIFY_FROM    sender header; must be SMTP_USER or one of its verified
 *                       aliases, because Gmail rejects anything else
 */

import nodemailer, { type Transporter } from "nodemailer";

export type LeadEmail = {
  subject: string;
  /** A short line above the detail table. */
  intro: string;
  /** Ordered label/value pairs rendered as the detail table. */
  rows: { label: string; value: string }[];
  /** Lets the team hit Reply and land in the lead's inbox. */
  replyTo?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Who gets a lead when LEAD_NOTIFY_EMAILS is not set.
 *
 * Checked in deliberately. These are the people who actually chase the
 * enquiries, and a forgotten environment variable on a fresh deploy must not
 * quietly send every dealership lead into a void - the whole point of this
 * file is that a lead never goes missing. Set LEAD_NOTIFY_EMAILS to change the
 * list without a release.
 */
const DEFAULT_RECIPIENTS = [
  "sumit.singh@electricpe.com",
  "harsh.jindal@electricpe.com",
  "rohit@electricpe.com",
  // Our own address, so delivery can be verified end to end. Drop this once
  // the client confirms the three above are receiving the mails.
  "jatin.chhabra@viithiisys.com",
];

function recipients(): string[] {
  const configured = (process.env.LEAD_NOTIFY_EMAILS ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return configured.length > 0 ? configured : DEFAULT_RECIPIENTS;
}

/**
 * Built once and reused. On a warm serverless instance this keeps nodemailer's
 * connection pool alive, so the second lead of the day does not pay for
 * another TCP handshake, TLS negotiation and SMTP login.
 */
let cached: Transporter | null = null;

function transport(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  if (cached) return cached;

  const port = Number(process.env.SMTP_PORT ?? 587);
  cached = nodemailer.createTransport({
    host,
    port,
    // 465 is TLS from the first byte; 587 opens in the clear and upgrades
    // with STARTTLS, which nodemailer does on its own.
    secure: port === 465,
    auth: { user, pass },
    // A mail server having a bad day must not hold a lead submission open.
    // Every caller treats a failure as "logged, not raised", so giving up is
    // always better than hanging.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return cached;
}

function renderHtml(email: LeadEmail): string {
  const rows = email.rows
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:14px;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
        <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
      </tr>`,
    )
    .join("");

  return `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px">
  <h2 style="margin:0 0 4px;font-size:18px;color:#111827">${escapeHtml(email.subject)}</h2>
  <p style="margin:0 0 20px;font-size:14px;color:#6b7280">${escapeHtml(email.intro)}</p>
  <table style="border-collapse:collapse;width:100%">${rows}</table>
  <p style="margin:24px 0 0;font-size:12px;color:#9ca3af">Sent automatically by the ElectricPe website.</p>
</div>`;
}

function renderText(email: LeadEmail): string {
  const rows = email.rows.map(({ label, value }) => `${label}: ${value}`).join("\n");
  return `${email.subject}\n${email.intro}\n\n${rows}\n\nSent automatically by the ElectricPe website.`;
}

export async function sendLeadEmail(
  email: LeadEmail,
): Promise<{ ok: boolean; error?: string }> {
  const mailer = transport();
  const to = recipients();

  if (!mailer || to.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[lead-email] Skipping send - SMTP_HOST / SMTP_USER / SMTP_PASS unset (dev).",
        { subject: email.subject, rows: email.rows },
      );
    }
    return { ok: true };
  }

  try {
    await mailer.sendMail({
      from:
        process.env.LEAD_NOTIFY_FROM ??
        `ElectricPe Website <${process.env.SMTP_USER}>`,
      to,
      subject: email.subject,
      html: renderHtml(email),
      text: renderText(email),
      ...(email.replyTo ? { replyTo: email.replyTo } : {}),
    });
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "unknown error",
    };
  }
}
