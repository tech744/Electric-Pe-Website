/**
 * Internal email notification for website leads.
 *
 * Deliberately dependency-free - we POST to Resend's REST API with `fetch`,
 * the same shape as lib/integrations/zoho-crm.ts, so no mail SDK enters the
 * bundle and the lockfile stays untouched.
 *
 * Fully env-gated and graceful: with no credentials the call is a no-op that
 * resolves `{ ok: true }`, exactly like the Zoho webhook, so forms keep working
 * in dev and in any environment where mail has not been wired up yet.
 *
 * To switch mail providers, replace the body of `deliver()` - the rest of the
 * app only knows about `sendLeadEmail`.
 *
 * Environment:
 *   RESEND_API_KEY      API key from resend.com (required to send)
 *   LEAD_NOTIFY_EMAILS  comma-separated recipients (required to send)
 *   LEAD_NOTIFY_FROM    verified sender, e.g. "ElectricPe <website@electricpe.com>"
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

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

function recipients(): string[] {
  return (process.env.LEAD_NOTIFY_EMAILS ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
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
  const apiKey = process.env.RESEND_API_KEY;
  const to = recipients();
  const from =
    process.env.LEAD_NOTIFY_FROM ?? "ElectricPe Website <website@electricpe.com>";

  if (!apiKey || to.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[lead-email] Skipping send - RESEND_API_KEY / LEAD_NOTIFY_EMAILS unset (dev).",
        { subject: email.subject, rows: email.rows },
      );
    }
    return { ok: true };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: email.subject,
        html: renderHtml(email),
        text: renderText(email),
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });
    return { ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "unknown error",
    };
  }
}
