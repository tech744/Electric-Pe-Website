"use client";

import { Download, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globals } from "@/content/globals";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { track, EVENTS } from "@/lib/analytics/events";

/**
 * "Know more about ElectricPe" brochure block, shared by /about-us and
 * /become-a-dealer.
 *
 * The PDF is the client's 8-page FOFO brochure, re-compressed from 21 MB to
 * 3.5 MB so it is a reasonable download on mobile data. Set `available` back
 * to false if the file is ever pulled - the block falls back to WhatsApp and
 * email instead of linking to a 404.
 */
const BROCHURE = {
  available: true,
  href: "/docs/electricpe-brochure.pdf",
  fileName: "ElectricPe-Brochure.pdf",
  sizeLabel: "PDF · 8 pages · 3.5 MB",
} as const;

export function BrochureCta({
  context = "website",
  description = "Our brochure covers the full model line-up, range and battery options, warranty terms, and how our Mobility Center network supports every scooter after the sale.",
}: {
  /** Where the request came from - ends up in the WhatsApp message. */
  context?: string;
  description?: string;
}) {
  const whatsappHref = buildWhatsAppLink(
    "Hi! Please share the ElectricPe brochure.",
    context,
  );

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10 shadow-[var(--shadow-sm)]">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]">
          <FileText className="h-7 w-7" aria-hidden />
        </div>

        <div className="flex-1">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text)]">
            Know more about ElectricPe
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:shrink-0">
          {BROCHURE.available ? (
            <>
              <Button
                asChild
                size="lg"
                leadingIcon={<Download className="h-4 w-4" aria-hidden />}
                onClick={() => track(EVENTS.BROCHURE_REQUESTED, { method: "download", context })}
              >
                <a href={BROCHURE.href} download={BROCHURE.fileName}>
                  Download brochure
                </a>
              </Button>
              <p className="text-xs text-[var(--color-text-muted)] md:text-center">
                {BROCHURE.sizeLabel}
              </p>
            </>
          ) : (
            <>
              <Button
                asChild
                size="lg"
                variant="whatsapp"
                leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
                onClick={() => track(EVENTS.BROCHURE_REQUESTED, { method: "whatsapp", context })}
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Get the brochure
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`mailto:${globals.supportEmail}?subject=Please%20send%20me%20the%20ElectricPe%20brochure`}>
                  Email us
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
