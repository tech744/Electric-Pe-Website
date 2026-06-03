import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";
import { postSupportRequest } from "@/lib/integrations/electricpe-leads";

export const runtime = "nodejs";

const TOPIC_LABEL: Record<string, string> = {
  sales: "Buying a scooter",
  service: "Service / warranty",
  partnership: "Partnerships / dealership",
  press: "Press / media",
  other: "Other",
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, phone, email, topic, message } = parsed.data;
  const reference = `CT-${Date.now().toString(36).toUpperCase()}`;
  const description = `[${TOPIC_LABEL[topic] ?? topic}] ${message}`;

  const [epResult, zohoResult] = await Promise.allSettled([
    postSupportRequest({ name, phone, email, description }),
    postLeadToZoho({
      source: `contact-${topic}`,
      name,
      phone,
      email,
      notes: message,
      meta: { reference, topic },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    reference,
    electricpe: epResult.status === "fulfilled" && epResult.value.ok,
    zoho: zohoResult.status === "fulfilled" && zohoResult.value.ok,
  });
}
