/**
 * ElectricPe user-service: dealership enquiry.
 *
 * Writes the lead into the client's own database so the sales team works from
 * one list instead of an inbox. The endpoint is public - no token - so it is
 * still called server-side: that keeps the browser off a third-party origin,
 * lets the payload be built from validated input, and means a slow or broken
 * upstream never surfaces to the applicant.
 *
 * Like the other sinks on this route, a failure here is logged, not raised. A
 * dealership enquiry is worth far too much to reject because an API blinked,
 * and the notification email carries the same data as a fallback.
 */

const API_BASE = process.env.ELECTRICPE_API_BASE_URL ?? "https://prodapi.electricpe.com";
const ENDPOINT = "/api/user-service/dealership-enquiry/save";

/** Upstream is held to this; past it the applicant's submit is more important. */
const TIMEOUT_MS = 8_000;

export type DealershipEnquiry = {
  name: string;
  /** 10 digits, no country code - the schema strips +91 before we get here. */
  phoneNo: string;
  email?: string;
  location?: string;
  /** Bucket key, e.g. "20-30L" - the API stores these verbatim. */
  investmentRange?: string;
  natureOfBusiness?: string;
  remarks?: string;
};

export async function saveDealershipEnquiry(
  enquiry: DealershipEnquiry,
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}${ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!res.ok) {
      // Read the body on failure - the API tends to explain itself there, and
      // "HTTP 400" alone is not enough to debug a field mapping from logs.
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        error: `HTTP ${res.status}${detail ? ` - ${detail.slice(0, 300)}` : ""}`,
      };
    }

    const saved = (await res.json().catch(() => null)) as { id?: string | number } | null;
    return { ok: true, id: saved?.id != null ? String(saved.id) : undefined };
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return {
      ok: false,
      error: timedOut
        ? `no response in ${TIMEOUT_MS}ms`
        : err instanceof Error
          ? err.message
          : "unknown error",
    };
  }
}
