import { NextResponse } from "next/server";
import {
  dealerEnquirySchema,
  DEALER_INVESTMENT_LABELS,
  DEALER_BUSINESS_LABELS,
} from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";
import { sendLeadEmail } from "@/lib/integrations/lead-email";

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

  // Both sinks are awaited but neither can fail the request: a dealer enquiry
  // is too valuable to lose to a CRM or mail outage, and the reference code is
  // what the applicant quotes when the team calls back.
  const [crm, mail] = await Promise.all([
    postLeadToZoho({
      source: "become-a-dealer",
      name: input.name,
      phone: input.phone,
      email: input.email,
      city: input.location,
      interest: "dealership",
      notes: `${business} · ${investment} investment. ${input.remarks ?? ""}`.trim(),
      meta: {
        reference,
        location: input.location,
        investmentRange: input.investmentRange,
        businessNature: input.businessNature,
      },
    }),
    sendLeadEmail({
      subject: `New dealership enquiry - ${input.location} (${reference})`,
      intro: `${input.name} wants to open an ElectricPe dealership.`,
      replyTo: input.email,
      rows: [
        { label: "Reference", value: reference },
        { label: "Name", value: input.name },
        { label: "Phone", value: `+91 ${input.phone}` },
        { label: "Email", value: input.email },
        { label: "Location", value: input.location },
        { label: "Investment range", value: investment },
        { label: "Current business", value: business },
        { label: "Remarks", value: input.remarks?.trim() || "-" },
      ],
    }),
  ]);

  if (!crm.ok || !mail.ok) {
    console.error("[dealer-enquiry] Lead delivery degraded", {
      reference,
      crm: crm.error,
      mail: mail.error,
    });
  }

  return NextResponse.json({ ok: true, reference });
}
