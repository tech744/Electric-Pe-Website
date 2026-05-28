import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Zap,
  MapPin,
  Navigation2,
  CreditCard,
  Search,
  ArrowRight,
  Route,
  Home,
  Building2,
  Truck,
  Wallet,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  JsonLd,
  breadcrumbSchema,
  faqPageSchema,
  chargingServiceSchema,
} from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { globals } from "@/content/globals";
import { getFaqsByCategory, getFaqById } from "@/content/faqs";
import {
  getChargingPage,
  getNearbyChargingPages,
  chargingPageSlugs,
  CHARGING_NETWORKS,
  CHARGING_FILTERS,
  type ChargingPage,
} from "@/content/charging";

type Params = { chargingSlug: string };

export function generateStaticParams(): Params[] {
  return chargingPageSlugs.map((chargingSlug) => ({ chargingSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { chargingSlug } = await params;
  const page = getChargingPage(chargingSlug);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteUrl(`/${page.slug}`),
      type: "website",
    },
  };
}

function breadcrumbLabel(page: ChargingPage): string {
  switch (page.pageType) {
    case "city-hub":
      return `Charging in ${page.name}`;
    case "vehicle-city":
      return page.h1.replace(" — ElectricPe", "").replace(" — ElectricPe App", "");
    case "highway":
      return page.name;
    case "use-case":
      return page.name;
  }
}

export default async function ChargingPageRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { chargingSlug } = await params;
  const page = getChargingPage(chargingSlug);
  if (!page) notFound();

  const nearby = getNearbyChargingPages(page.slug);
  const categoryFaqs = getFaqsByCategory("charging");
  const extraFaqs = (page.faqIds ?? [])
    .map((id) => getFaqById(id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  // De-dupe in case a page lists a FAQ already in the category set.
  const faqs = [
    ...categoryFaqs,
    ...extraFaqs.filter((f) => !categoryFaqs.some((c) => c.id === f.id)),
  ];

  const eyebrow =
    page.pageType === "city-hub" || page.pageType === "vehicle-city"
      ? [page.state, page.tier].filter(Boolean).join(" · ")
      : page.pageType === "highway"
        ? "Intercity route"
        : "Charging solutions";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "EV Charging", href: "/ev-charging-stations" },
            { name: breadcrumbLabel(page), href: `/${page.slug}` },
          ]),
          chargingServiceSchema({
            name: page.name,
            url: `/${page.slug}`,
            description: page.metaDescription,
            areaServedType: page.pageType === "use-case" ? "Country" : "City",
          }),
          ...(faqs.length > 0
            ? [
                faqPageSchema(
                  faqs.map((f) => ({ question: f.question, answer: f.answerMdx })),
                ),
              ]
            : []),
        ]}
      />

      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb
            items={[
              { label: "EV Charging", href: "/ev-charging-stations" },
              { label: breadcrumbLabel(page) },
            ]}
          />
        </Container>
      </div>

      {/* Hero */}
      <section className="relative py-14 md:py-20 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-eyebrow mb-3 inline-flex items-center gap-2">
                {page.pageType === "highway" ? (
                  <Route className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                )}
                {eyebrow}
              </p>
              <h1 className="text-display-xl max-w-3xl">{page.h1}</h1>
              <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
                {page.intro}
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
              <Stat big={globals.stats.stationsCount} small="Stations aggregated" />
              <Stat big={globals.stats.networksCount} small="Partner networks" />
              <Stat big={globals.stats.appDownloads} small="App downloads" />
              <Stat big={`${globals.stats.rating}★`} small="App rating" />
            </div>
          </div>
        </Container>
      </section>

      {/* Map teaser */}
      <Section>
        <SectionHeader
          eyebrow="Live map"
          title={
            page.pageType === "highway"
              ? `Plan charging stops along ${page.name}`
              : `Find a charger${page.pageType === "use-case" ? "" : ` in ${page.name}`}`
          }
          align="left"
        />
        <Card className="overflow-hidden">
          <div className="relative aspect-[16/9] bg-[var(--color-surface-muted)]">
            <Image
              src="/img/store-vector.png"
              alt={`Illustration of the ElectricPe EV charging network — ${page.name}`}
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
                  <a
                    href={globals.appLinks.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in app
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Card className="p-5">
            <p className="font-semibold text-[var(--color-text)] mb-3">Filter by:</p>
            <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
              {CHARGING_FILTERS.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <MapPin
                    className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0 mt-1"
                    aria-hidden
                  />
                  {f}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <p className="font-semibold text-[var(--color-text)] mb-3">In-app features:</p>
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
                Unified wallet across {globals.stats.networksCount} networks
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Type-specific context band */}
      <TypeContext page={page} />

      {/* Networks */}
      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Partner networks"
          title="Every major operator, one app"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CHARGING_NETWORKS.map((n) => (
            <div
              key={n}
              className="rounded-lg bg-white border border-[var(--color-border)] px-3 py-4 text-center text-sm font-medium text-[var(--color-text-muted)] h-14 flex items-center justify-center"
            >
              {n}
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-[var(--color-text-muted)]">
          …and {globals.stats.networksCount.replace("+", "")}+ more. We add networks
          every month.
        </p>
      </Section>

      {/* FAQs */}
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

      {/* Internal links */}
      {nearby.length > 0 && (
        <Section className="bg-[var(--color-surface-muted)]">
          <SectionHeader
            eyebrow="Nearby"
            title={
              page.pageType === "highway"
                ? "Charging in cities on this route"
                : "EV charging in nearby cities"
            }
            align="left"
          />
          <div className="flex flex-wrap gap-3">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/${n.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
              >
                {n.name}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
          {page.storeCitySlug && (
            <p className="mt-6 text-sm text-[var(--color-text-muted)]">
              Looking to buy an electric scooter in {page.name}?{" "}
              <Link
                href={`/stores/${page.storeCitySlug}`}
                className="font-semibold text-[var(--color-brand)] hover:underline"
              >
                Visit our {page.name} Mobility Center →
              </Link>
            </p>
          )}
        </Section>
      )}

      {/* App CTA */}
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
                <a href={globals.appLinks.playStore} target="_blank" rel="noopener noreferrer">
                  Play Store
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white/60 text-white hover:bg-white/10"
              >
                <a href={globals.appLinks.appStore} target="_blank" rel="noopener noreferrer">
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

function TypeContext({ page }: { page: ChargingPage }) {
  if (page.pageType === "vehicle-city" && page.vehicle) {
    return (
      <Section>
        <SectionHeader
          eyebrow={page.vehicle.brand}
          title={`Charge your ${page.vehicle.model} anywhere in ${page.name}`}
          description={`Every public charger compatible with your ${page.vehicle.model} — mapped, with live status and one-tap payment. Filter to the connector your ${page.vehicle.brand} uses and never circle the block looking for a free point again.`}
          align="left"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href={`/ev-charging-stations-${page.name.toLowerCase()}`}>
              All chargers in {page.name}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/ev-charging-stations">How the app works</Link>
          </Button>
        </div>
      </Section>
    );
  }

  if (page.pageType === "highway" && page.route) {
    return (
      <Section>
        <SectionHeader
          eyebrow="Trip planning"
          title={`${page.route.from} to ${page.route.to}${
            page.route.distanceKm ? ` · ${page.route.distanceKm} km` : ""
          }`}
          description="Plan a worry-free intercity run. The ElectricPe app shows every charging stop along the corridor with live availability, so you can pre-plan where to top up and beat range anxiety before you set off."
          align="left"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <a href={globals.appLinks.playStore} target="_blank" rel="noopener noreferrer">
              Plan your trip in the app
            </a>
          </Button>
        </div>
      </Section>
    );
  }

  if (page.pageType === "use-case") {
    const isB2B =
      page.slug.includes("fleet") ||
      page.slug.includes("corporate") ||
      page.slug.includes("apartments");
    const Icon = page.slug.includes("home")
      ? Home
      : page.slug.includes("fleet")
        ? Truck
        : page.slug.includes("corporate") || page.slug.includes("apartments")
          ? Building2
          : Wallet;
    return (
      <Section>
        <SectionHeader
          eyebrow="How it works"
          title={page.name}
          align="left"
        />
        <Card className="p-6 md:p-8">
          <Icon className="h-8 w-8 text-[var(--color-brand)] mb-4" aria-hidden />
          <p className="text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
            {page.intro}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {isB2B ? (
              <>
                <Button asChild size="lg">
                  <Link href="/partnerships">Talk to our team</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact-us">Contact sales</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg">
                  <a href={globals.appLinks.playStore} target="_blank" rel="noopener noreferrer">
                    Get the app
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/ev-charging-stations">Explore the network</Link>
                </Button>
              </>
            )}
          </div>
        </Card>
      </Section>
    );
  }

  return null;
}

function Stat({ big, small }: { big: string; small: string }) {
  return (
    <Card className="p-5">
      <p className="text-number-stat text-[var(--color-brand)] leading-none">{big}</p>
      <p className="text-sm text-[var(--color-text-muted)] mt-2">{small}</p>
    </Card>
  );
}
