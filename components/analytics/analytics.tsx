"use client";

import * as React from "react";
import Script from "next/script";
import {
  CONSENT_CHANGED_EVENT,
  readConsent,
  type ConsentDecision,
} from "@/lib/analytics/consent";

/**
 * Analytics + remarketing, behind consent.
 *
 * Under the DPDP Act a tracker may not run until the visitor has agreed to
 * it, so none of these scripts are rendered at all until the stored decision
 * reads "granted". That is why this is a client component: the server has no
 * way to know what the visitor chose, and a script in the initial HTML would
 * already have fired by the time we could remove it.
 *
 * There is deliberately no <noscript> pixel fallback. It cannot be gated on a
 * choice the visitor has not made yet, so it would track every no-JS visitor
 * unconditionally - which is the exact thing this file exists to prevent.
 *
 * Configuration - every id is optional, and an unset id disables that tool:
 *   NEXT_PUBLIC_GA_ID         GA4, e.g. "G-XXXXXXXXXX"
 *   NEXT_PUBLIC_FB_PIXEL_ID   Meta Pixel
 *
 * None of these fall back to a hardcoded id. A pixel that keeps firing after
 * its environment variable is removed is indistinguishable from a bug, and in
 * an audit it reads as tracking the operator did not know about.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "";

export function Analytics() {
  const [consent, setConsent] = React.useState<ConsentDecision | null>(null);

  React.useEffect(() => {
    setConsent(readConsent());
    const onChange = (event: Event) => {
      setConsent((event as CustomEvent<ConsentDecision>).detail);
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  if (consent !== "granted") return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {FB_PIXEL_ID && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
