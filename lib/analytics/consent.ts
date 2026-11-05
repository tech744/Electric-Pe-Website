/**
 * Cookie consent, DPDP style.
 *
 * The rule the Act sets is simple and absolute: nothing that identifies or
 * profiles a visitor may run before they agree to it. So the decision has to
 * be readable synchronously on the client, before a single tracking script is
 * rendered, and it has to survive a reload.
 *
 * localStorage rather than a cookie, because a consent cookie would be sent to
 * the server on every request and the server has no use for it - the gate is
 * entirely a rendering decision.
 *
 * The stored value carries a version. When we start using a tracker the
 * visitor was not told about, bumping CONSENT_VERSION asks everybody again
 * instead of quietly reusing a yes they gave to a different question.
 */

export const CONSENT_VERSION = 1;

const STORAGE_KEY = "ep_cookie_consent";

/** Fired on `window` whenever the decision changes, with the new value. */
export const CONSENT_CHANGED_EVENT = "ep:consent-changed";
/** Fired on `window` to reopen the banner, e.g. from the footer link. */
export const CONSENT_OPEN_EVENT = "ep:consent-open";

export type ConsentDecision = "granted" | "denied";

type StoredConsent = {
  v: number;
  decision: ConsentDecision;
  /** When they chose, so we can evidence a consent if it is ever disputed. */
  at: string;
};

export function readConsent(): ConsentDecision | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent | null;
    if (!parsed || parsed.v !== CONSENT_VERSION) return null;
    return parsed.decision === "granted" ? "granted" : "denied";
  } catch {
    // A private window, or blocked site data, throws on read. No readable
    // decision means no consent, which is the only safe answer.
    return null;
  }
}

export function writeConsent(decision: ConsentDecision): void {
  if (typeof window === "undefined") return;
  try {
    const value: StoredConsent = {
      v: CONSENT_VERSION,
      decision,
      at: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Unpersistable, but the choice must still take effect for this page
    // view, so carry on and dispatch. They will be asked again next visit.
  }
  window.dispatchEvent(
    new CustomEvent<ConsentDecision>(CONSENT_CHANGED_EVENT, { detail: decision }),
  );
}

/**
 * Cookies the trackers we gate set in the browser.
 *
 * Withdrawing consent has to mean something. Unmounting the script stops new
 * requests, but the identifiers already written would keep a visitor
 * recognisable on the next site that reads them, so they are deleted too.
 */
const TRACKING_COOKIES = [
  "_fbp", // Meta Pixel browser id
  "_fbc", // Meta Pixel click id
  "_ga", // GA4
  "_gid",
  "_clck", // Microsoft Clarity
  "_clsk",
];

export function clearTrackingCookies(): void {
  if (typeof document === "undefined") return;
  // A cookie can only be deleted from the exact domain and path that set it.
  // Meta writes on the registrable domain, GA on either, so expire the name
  // against every plausible scope rather than guessing.
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of TRACKING_COOKIES) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
