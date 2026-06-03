/**
 * ElectricPe production lead-capture APIs.
 *
 * Provided by the backend team (Amardeep) — these are the same endpoints the
 * old WordPress site posted to, so the field names look WordPress-y (with
 * spaces and trailing asterisks for "required" markers). Do NOT rename the
 * keys; the backend treats them as exact string labels.
 *
 *   - capture-from-wordpress   : test-ride lead
 *   - website-support-request-capture : general support / contact enquiry
 *
 * Both endpoints return a JSON envelope. We don't depend on its shape — we
 * only need to know whether the call succeeded (HTTP 2xx) so we can mark the
 * integration as "fired" in our own response.
 */

const TEST_DRIVE_URL =
  "https://prodapi.electricpe.com/api/mobility-service/test-drive/capture-from-wordpress";
const SUPPORT_URL =
  "https://prodapi.electricpe.com/api/user-service/support/website-support-request-capture";

const REQUEST_TIMEOUT_MS = 8000;

async function postJSON(url: string, body: unknown): Promise<{ ok: boolean; status?: number; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, status: res.status, error: `HTTP ${res.status}` };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network error" };
  } finally {
    clearTimeout(timer);
  }
}

export type TestDriveCaptureInput = {
  name: string;
  phone: string;
  pincode: string;
  /** Display name like "Xypro Lithium Ion". Empty string when user hasn't picked. */
  vehicleModel: string;
  /** City display name like "Bengaluru". */
  city: string;
};

export async function postTestDriveLead(input: TestDriveCaptureInput) {
  return postJSON(TEST_DRIVE_URL, {
    "Name *": input.name,
    "Phone Number *": input.phone,
    "Pincode *": input.pincode,
    "Select Vehicle Model": input.vehicleModel,
    "City": input.city,
  });
}

export type SupportRequestInput = {
  name: string;
  phone: string;
  email: string;
  description: string;
};

export async function postSupportRequest(input: SupportRequestInput) {
  return postJSON(SUPPORT_URL, {
    "Name": input.name,
    "Phone Number": input.phone,
    "Email": input.email,
    "Description": input.description,
  });
}
