"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CONSENT_OPEN_EVENT,
  clearTrackingCookies,
  readConsent,
  writeConsent,
  type ConsentDecision,
} from "@/lib/analytics/consent";

/**
 * Cookie consent bar.
 *
 * The two buttons are the same size, the same weight and sit next to each
 * other. Making refusal harder than acceptance is the dark pattern the DPDP
 * Act is written against, and a banner that nudges is worse than no banner at
 * all - it documents that we knew consent was needed and shaped the answer.
 *
 * "Accept necessary only" rather than "Reject", because that is what the
 * button does: the strictly necessary cookies stay either way, and a visitor
 * who reads "Reject" may reasonably expect the site to stop working.
 *
 * It is not a modal. Nothing is tracking while the visitor ignores it, so
 * trapping them in a dialog would buy compliance nothing and cost every
 * visitor who just wants to read a page.
 */
export function ConsentBanner() {
  // null until the effect runs: the server cannot know the stored decision,
  // so rendering anything before mount would mismatch on hydration.
  const [decision, setDecision] = React.useState<ConsentDecision | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [reopened, setReopened] = React.useState(false);

  React.useEffect(() => {
    setDecision(readConsent());
    setMounted(true);
    const onOpen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  const choose = (next: ConsentDecision) => {
    const wasGranted = readConsent() === "granted";
    writeConsent(next);
    setDecision(next);
    setReopened(false);

    if (next === "denied") {
      // Withdrawal has to actually undo something. Clear unconditionally, not
      // only when we had a stored yes: anyone who visited before this banner
      // shipped is already carrying a _fbp from the ungated pixel, and "no"
      // has to mean that one goes too.
      clearTrackingCookies();
      // A reload is only needed if a tracker is live on this page; otherwise
      // it would throw away whatever the visitor was reading.
      if (wasGranted) window.location.reload();
    }
  };

  const open = mounted && (decision === null || reopened);

  // Tell the page a decision is pending, so globals.css can move the floating
  // widgets out from on top of the two buttons.
  React.useEffect(() => {
    if (!open) return;
    document.body.dataset.consentOpen = "true";
    return () => {
      delete document.body.dataset.consentOpen;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[var(--z-consent)] p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-xl)] md:p-6">
        <h2 id="consent-title" className="font-display text-base font-bold">
          We use cookies
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          The cookies this site needs to work are always on. We would also like
          to use analytics and advertising cookies, which let Google and Meta
          measure how the site is used and show you our ads elsewhere. Those
          only run if you say yes, and you can change your mind any time from
          the footer.{" "}
          <Link
            href="/privacy"
            className="text-[var(--color-brand)] underline underline-offset-2"
          >
            Privacy policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <Button size="md" onClick={() => choose("granted")} className="sm:flex-1">
            Accept all
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={() => choose("denied")}
            className="sm:flex-1"
          >
            Accept necessary only
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Footer entry point. Withdrawing consent has to be as easy as giving it, so
 * this sits in the same strip as the policy links rather than inside it.
 */
export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      Cookie preferences
    </button>
  );
}
