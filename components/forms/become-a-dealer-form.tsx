"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  dealerEnquirySchema,
  DEALER_INVESTMENT_VALUES,
  DEALER_INVESTMENT_LABELS,
  DEALER_BUSINESS_VALUES,
  DEALER_BUSINESS_LABELS,
  INDIAN_STATES,
  type DealerInvestmentRange,
  type DealerBusinessNature,
  type IndianState,
} from "@/lib/validation/booking";
import { track, EVENTS } from "@/lib/analytics/events";

export function BecomeADealerForm() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [city, setCity] = React.useState("");
  const [stateName, setStateName] = React.useState<IndianState | "">("");
  const [investmentRange, setInvestmentRange] =
    React.useState<DealerInvestmentRange | "">("");
  const [businessNature, setBusinessNature] =
    React.useState<DealerBusinessNature | "">("");
  const [remarks, setRemarks] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [reference, setReference] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = dealerEnquirySchema.safeParse({
      name,
      phone,
      email,
      city,
      state: stateName,
      investmentRange,
      businessNature,
      remarks,
      consent,
    });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Invalid"]),
        ),
      );
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/dealer-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ _: data.error ?? "Something went wrong." });
        return;
      }
      setReference(data.reference);
      track(EVENTS.DEALER_ENQUIRY_SUBMITTED, {
        investment_range: parsed.data.investmentRange,
        business_nature: parsed.data.businessNature,
      });
    } catch {
      setErrors({ _: "Network error. Try WhatsApp or call us instead." });
    } finally {
      setSubmitting(false);
    }
  };

  if (reference) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)] mb-5">
          <Check className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="text-h2 mb-2">Thanks. Our team will call you.</h2>
        <p className="text-[var(--color-text-muted)] mb-3">
          Your reference:{" "}
          <span className="font-mono font-semibold text-[var(--color-text)]">
            {reference}
          </span>
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-5">
          We review every dealership enquiry and usually respond within two
          business days.
        </p>
        <Button asChild variant="outline">
          <Link href="/about-us">Know more about ElectricPe</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {errors._ && (
        <p
          role="alert"
          className="rounded-lg bg-[var(--color-danger-soft)] text-[var(--color-danger)] px-4 py-3 text-sm"
        >
          {errors._}
        </p>
      )}

      <FormField id="d-name" label="Name" required error={errors.name}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="Your full name"
        />
      </FormField>

      <div className="grid md:grid-cols-2 gap-4">
        <FormField id="d-phone" label="Number" required error={errors.phone}>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile"
          />
        </FormField>
        <FormField id="d-email" label="Email" error={errors.email}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          id="d-city"
          label="City"
          required
          error={errors.city}
          hint="City or district you want the dealership in"
        >
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="address-level2"
            placeholder="e.g. Nashik"
          />
        </FormField>

        <FormField id="d-state" label="State" required error={errors.state}>
          <Select
            value={stateName}
            onValueChange={(v) => setStateName(v as IndianState)}
          >
            <SelectTrigger id="d-state">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          id="d-investment"
          label="Investment range"
          required
          error={errors.investmentRange}
        >
          <Select
            value={investmentRange}
            onValueChange={(v) => setInvestmentRange(v as DealerInvestmentRange)}
          >
            <SelectTrigger id="d-investment">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {DEALER_INVESTMENT_VALUES.map((value) => (
                <SelectItem key={value} value={value}>
                  {DEALER_INVESTMENT_LABELS[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          id="d-business"
          label="Nature of current business"
          required
          error={errors.businessNature}
        >
          <Select
            value={businessNature}
            onValueChange={(v) => setBusinessNature(v as DealerBusinessNature)}
          >
            <SelectTrigger id="d-business">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {DEALER_BUSINESS_VALUES.map((value) => (
                <SelectItem key={value} value={value}>
                  {DEALER_BUSINESS_LABELS[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField id="d-remarks" label="Remarks" error={errors.remarks}>
        <textarea
          id="d-remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-white px-3.5 py-2.5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
          placeholder="Showroom space available, current brands you handle, timeline to start - anything that helps us assess the fit"
        />
      </FormField>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[var(--color-border-strong)]"
        />
        <span className="text-sm text-[var(--color-text-muted)]">
          I agree to be contacted about this dealership enquiry and accept
          ElectricPe's{" "}
          <Link href="/privacy" className="text-[var(--color-brand)] underline">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-[var(--color-danger)]" role="alert">
          {errors.consent}
        </p>
      )}

      <Button type="submit" loading={submitting} size="lg" fullWidth>
        Submit enquiry
      </Button>
    </form>
  );
}
