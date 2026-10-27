import { NextResponse } from "next/server";
import {
  dealerEnquirySchema,
  DEALER_INVESTMENT_LABELS,
  DEALER_BUSINESS_LABELS,
} from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";
import { sendLeadEmail } from "@/lib/integrations/lead-email";
import { saveDealershipEnquiry } from "@/lib/integrations/dealership-enquiry";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`dealer-enquiry:${ip}`, 5, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = dealerEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const reference = `DL-${Date.now().toString(36).toUpperCase()}`;
  const investment = DEALER_INVESTMENT_LABELS[input.investmentRange];
  const business = DEALER_BUSINESS_LABELS[input.businessNature];
  // The form collects city and state separately so the team can filter by
  // territory; every downstream sink still wants one human-readable line.
  const location = `${input.city}, ${input.state}`;
  const email = input.email?.trim() || undefined;

  // Every sink is awaited but none of them can fail the request: a dealer
  // enquiry is too valuable to lose to a database, CRM or mail outage, and the
  // reference code is what the applicant quotes when the team calls back.
  const [db, crm, mail] = await Promise.all([
    saveDealershipEnquiry({
      name: input.name,
      phoneNo: input.phone,
      email,
      location,
      // The bucket key, not the ₹ label - it is what the API's own example
      // sends and what their reports group on.
      investmentRange: input.investmentRange,
      natureOfBusiness: business,
      // Carry the reference into remarks so a row in their database can be
      // matched to the notification email the team is looking at.
      remarks: [input.remarks?.trim(), `Ref: ${reference}`]
        .filter(Boolean)
        .join(" · "),
    }),
    postLeadToZoho({
      source: "become-a-dealer",
      name: input.name,
      phone: input.phone,
      email,
      city: input.city,
      interest: "dealership",
      notes: `${business} · ${investment} investment. ${input.remarks ?? ""}`.trim(),
      meta: {
        reference,
        location,
        state: input.state,
        investmentRange: input.investmentRange,
        businessNature: input.businessNature,
      },
    }),
    sendLeadEmail({
      subject: `New dealership enquiry - ${location} (${reference})`,
      intro: `${input.name} wants to open an ElectricPe dealership.`,
      replyTo: email,
      rows: [
        { label: "Reference", value: reference },
        { label: "Name", value: input.name },
        { label: "Phone", value: `+91 ${input.phone}` },
        { label: "Email", value: email ?? "-" },
        { label: "City", value: input.city },
        { label: "State", value: input.state },
        { label: "Investment range", value: investment },
        { label: "Current business", value: business },
        { label: "Remarks", value: input.remarks?.trim() || "-" },
      ],
    }),
  ]);

  if (!db.ok || !crm.ok || !mail.ok) {
    console.error("[dealer-enquiry] Lead delivery degraded", {
      reference,
      db: db.error,
      crm: crm.error,
      mail: mail.error,
    });
  }

  return NextResponse.json({ ok: true, reference });
}
