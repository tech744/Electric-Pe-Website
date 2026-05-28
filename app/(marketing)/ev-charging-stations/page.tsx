import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Zap, MapPin, Navigation2, CreditCard, Search, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { globals } from "@/content/globals";
import { getFaqsByCategory } from "@/content/faqs";
import { getChargingPagesByType, type ChargingPage } from "@/content/charging";

export const metadata: Metadata = {
  title: "EV Charging Stations | 25,000+ Across India",
  description:
    "Find EV charging stations across India. ElectricPe aggregates 25,000+ live stations from 60+ partner networks. Filter, navigate, and pay from one app.",
  alternates: { canonical: "/ev-charging-stations" },
};

const NETWORKS = [
  "Tata Power",
  "Adani EV",
  "BPCL",
  "Shell Recharge",
  "Jio-bp",
  "HP Charge",
  "Indian Oil",
  "Statiq",
  "ChargeZone",
  "Relux",
  "Magenta",
  "Ezili",
  "Fortum",
  "Numocity",
  "ChargeGrid",
  "Plugzmart",
  "Exicom",
  "Zeon",
  "Enviro",
  "BOLT",
  "Park+",
  "Volttic",
  "Exponent",
  "Kazam",
];

const FILTERS = [
  "Connector type (Type-2, CCS2, Bharat AC-001)",
  "Power output (3.3 kW → 150 kW)",
  "Network / operator",
  "Free vs paid",
  "24×7 availability",
];

export default function ChargingStationsPage() {
  const faqs = getFaqsByCategory("charging");

  const cityHubs = getChargingPagesByType("city-hub");
  const cityHubsByState = cityHubs.reduce<
    Record<string, typeof cityHubs>
  >((acc, p) => {
    const key = p.state ?? "Other";
    (acc[key] ??= []).push(p);
    return acc;
  }, {});
  const orderedStateGroups = Object.entries(cityHubsByState).sort(
    ([a], [b]) => a.localeCompare(b),
  );
  const vehicleCityPages = getChargingPagesByType("vehicle-city");
  const highwayPages = getChargingPagesByType("highway");
  const useCasePages = getChargingPagesByType("use-case");

  return (
    <>
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-eyebrow mb-3">Charging network</p>
              <h1 className="text-display-xl">
                25,000+ charging stations. 60+ networks. One app.
              </h1>
              <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
                The ElectricPe app aggregates every major EV charging network in
                India, with live availability, turn-by-turn navigation, and a
                unified wallet. Free to download, free to use.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <a
                    href={globals.appLinks.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get on Play Store
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={globals.appLinks.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    App Store
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Stat big="25,000+" small="Stations aggregated" />
              <Stat big="60+" small="Partner networks" />
              <Stat big="15+" small="Cities covered" />
              <Stat big="4.4★" small="App rating" />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Live map"
          title="Find a charger near you"
          align="left"
        />
        <Card className="overflow-hidden">
          <div className="relative aspect-[16/9] bg-[var(--color-surface-muted)]">
            <Image
              src="/img/store-vector.png"
              alt="Illustration of EV charging network across India"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-contain p-8"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur rounded-2xl px-6 py-5 shadow-[var(--shadow-lg)] text-center max-w-sm">
                <Search
                  className="h-7 w-7 mx-auto text-[var(--color-brand)] mb-2"
                  aria-hidden
                />
                <p className="font-display font-bold text-[var(--color-text)]">
                  Interactive map lives in the app
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Live availability, filters, and in-app payment.
                </p>
                <Button asChild size="sm" className="mt-4">
                  <a href={globals.appLinks.playStore} target="_blank" rel="noopener noreferrer">
                    Open in app
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Card className="p-5">
            <p className="font-semibold text-[var(--color-text)] mb-3">
              Filter by:
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
              {FILTERS.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0 mt-1" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <p className="font-semibold text-[var(--color-text)] mb-3">
              In-app features:
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <Zap className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0 mt-1" aria-hidden />
                Live availability from partner networks
              </li>
              <li className="flex items-start gap-2">
                <Navigation2 className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0 mt-1" aria-hidden />
                Navigate in Google/Apple Maps or in-app
              </li>
              <li className="flex items-start gap-2">
                <CreditCard className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0 mt-1" aria-hidden />
                Unified wallet across 60+ networks
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Partner networks"
          title="Every major operator in India"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {NETWORKS.map((n) => (
            <div
              key={n}
              className="rounded-lg bg-white border border-[var(--color-border)] px-3 py-4 text-center text-sm font-medium text-[var(--color-text-muted)] h-14 flex items-center justify-center"
            >
              {n}
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-[var(--color-text-muted)]">
          …and {globals.stats.networksCount.replace("+", "")}+ more. We add networks every month.
        </p>
      </Section>

      {faqs.length > 0 && (
        <Section>
          <SectionHeader eyebrow="FAQs" title="Charging questions, answered" />
          <div className="rounded-2xl border border-[var(--color-border)] bg-white max-w-3xl mx-auto overflow-hidden">
            <Accordion type="single" collapsible className="px-5 md:px-6">
              {faqs.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent>{f.answerMdx}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>
      )}

      {/* Directory: city hubs by state */}
      <Section>
        <SectionHeader
          eyebrow="By city"
          title="EV charging stations across India"
          description="Browse charging guides for every city ElectricPe covers."
          align="left"
        />
        <div className="space-y-8">
          {orderedStateGroups.map(([state, pages]) => (
            <div key={state}>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-text-subtle)] mb-3">
                {state}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {pages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-3.5 py-1.5 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Directory: vehicle, highway, use-case */}
      <Section className="bg-[var(--color-surface-muted)]">
        <div className="grid md:grid-cols-3 gap-8">
          <DirectoryColumn title="By vehicle" pages={vehicleCityPages} />
          <DirectoryColumn title="Highway routes" pages={highwayPages} />
          <DirectoryColumn title="Charging solutions" pages={useCasePages} />
        </div>
      </Section>

      <section className="bg-gradient-brand text-white py-16 md:py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-display-lg text-white">One app. Every charger.</h2>
            <p className="mt-4 text-white/90">
              Download free. Rated {globals.stats.rating}. {globals.stats.appDownloads}{" "}
              downloads.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[var(--color-brand)] hover:bg-white/90"
              >
                <a
                  href={globals.appLinks.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play Store
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white/60 text-white hover:bg-white/10"
              >
                <a
                  href={globals.appLinks.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ big, small }: { big: string; small: string }) {
  return (
    <Card className="p-5">
      <p className="text-number-stat text-[var(--color-brand)] leading-none">{big}</p>
      <p className="text-sm text-[var(--color-text-muted)] mt-2">{small}</p>
    </Card>
  );
}

function DirectoryColumn({
  title,
  pages,
}: {
  title: string;
  pages: ChargingPage[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-text-subtle)] mb-3">
        {title}
      </h3>
      <ul className="space-y-2">
        {pages.map((p) => {
          const label =
            p.pageType === "vehicle-city" && p.vehicle
              ? `${p.vehicle.model} — ${p.name}`
              : p.name;
          return (
            <li key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors"
              >
                <ArrowRight
                  className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0"
                  aria-hidden
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
