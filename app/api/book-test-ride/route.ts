import { NextResponse } from "next/server";
import { bookTestRideSchema } from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";
import {
  sendWhatsAppTemplate,
  WHATSAPP_TEMPLATES,
} from "@/lib/integrations/whatsapp-business";
import { postTestDriveLead } from "@/lib/integrations/electricpe-leads";
import { scooters } from "@/content/scooters";
import { getCity } from "@/content/cities";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`book:${ip}`, 5, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = bookTestRideSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const reference = `TR-${Date.now().toString(36).toUpperCase()}`;

  // Resolve model + city to the display labels the ElectricPe backend expects
  // (e.g. "Xypro Lithium Ion", "Bengaluru"). "model" is the brand-variant slug
  // joined with a dash, e.g. "xypro-lithium-ion".
  const matchedScooter = input.model
    ? scooters.find((s) => `${s.brand}-${s.variantSlug}` === input.model)
    : undefined;
  const vehicleModelLabel = matchedScooter?.name ?? "";
  const cityLabel = getCity(input.city)?.name ?? input.city;

  // Fire integrations in parallel; if any fail, we still confirm the booking
  // (the lead is written to our system regardless).
  const [epResult, zohoResult, waResult] = await Promise.allSettled([
    postTestDriveLead({
      name: input.name,
      phone: input.phone,
      pincode: input.pincode,
      vehicleModel: vehicleModelLabel,
      city: cityLabel,
    }),
    postLeadToZoho({
      source: "test-ride",
      name: input.name,
      phone: input.phone,
      email: input.email || undefined,
      city: input.city,
      interest: input.model,
      notes: `Slot ${input.preferredDate} ${input.preferredSlot}. Pincode: ${input.pincode}. Currently rides: ${input.currentlyRides}. Store: ${input.storeSlug ?? "any"}.`,
      meta: {
        reference,
        utmSource: input.utm?.source,
        utmMedium: input.utm?.medium,
        utmCampaign: input.utm?.campaign,
      },
    }),
    sendWhatsAppTemplate({
      to: input.phone.startsWith("91") ? input.phone : `91${input.phone}`,
      templateName: WHATSAPP_TEMPLATES.testRideConfirmed,
      params: [
        { type: "text", text: input.name },
        { type: "text", text: reference },
        { type: "text", text: input.preferredDate },
      ],
    }),
  ]);

  return NextResponse.json({
    ok: true,
    reference,
    electricpe: epResult.status === "fulfilled" && epResult.value.ok,
    zoho: zohoResult.status === "fulfilled" && zohoResult.value.ok,
    whatsapp: waResult.status === "fulfilled" && waResult.value.ok,
  });
}
