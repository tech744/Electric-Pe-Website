import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Heart,
  Shield,
  Handshake,
  MapPin,
  Clock,
  Store,
  Factory,
  Wrench,
  Droplets,
  Flame,
  Weight,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FactoryVideo } from "@/components/marketing/factory-video";
import { BrochureCta } from "@/components/marketing/brochure-cta";
import { globals } from "@/content/globals";

export const metadata: Metadata = {
  title: { absolute: "About ElectricPe | India's Trusted EV Retail Network" },
  description:
    "We're building the EV retail network India deserves: 30+ real stores, 24-hour service, component-level warranty, and a promise to stay with you after the sale.",
  alternates: { canonical: "/about-us" },
};

const HERO_PROOF = [
  { icon: Factory, label: "We manufacture in-house" },
  { icon: Store, label: `${globals.stats.storesOpen} Mobility Centers` },
  { icon: Wrench, label: "24-hour service promise" },
] as const;

const HERO_STATS = [
  { v: globals.stats.storesOpen, l: "Mobility Centers" },
  { v: globals.stats.citiesServed, l: "Cities" },
  { v: globals.stats.happyOwners, l: "Owners served" },
] as const;

/**
 * Stills pulled from the factory walkthrough so the manufacturing claim is
 * backed by our own floor, not stock photography. Ordered as the journey a
 * scooter actually takes, ending at the store the buyer walks into.
 */
const FACTORY_SHOTS = [
  {
    src: "/img/factory/assembly-line.webp",
    alt: "Scooter frames with wiring looms and suspension lined up on the ElectricPe assembly line.",
    caption: "Frames, looms, and suspension go on in-house.",
  },
  {
    src: "/img/factory/quality-check.webp",
    alt: "A finished white ElectricPe scooter being checked on the assembly floor.",
    caption: "Every unit is checked before it is wrapped.",
  },
  {
    src: "/img/factory/finished-units.webp",
    alt: "Rows of finished ElectricPe scooters being packed for dispatch.",
    caption: "Finished units are staged and packed for dispatch.",
  },
  {
    src: "/img/factory/storefront.webp",
    alt: "An ElectricPe Mobility Center with the day's scooters lined up outside the showroom.",
    caption: "And land at a Mobility Center you can walk into.",
  },
] as const;

/**
 * The three bench tests every platform clears before it reaches a showroom,
 * photographed on our own test floor. These are the failures that actually
 * strand an Indian rider - a flooded street, a shorted loom, an overloaded
 * frame - so we show the test rather than just claiming the warranty.
 */
const TESTS = [
  {
    icon: Droplets,
    title: "Water splash",
    text: "Motors and sealed assemblies are run submerged, because a flooded street in July is not a hypothetical.",
    src: "/img/brochure/test-water.webp",
    alt: "An ElectricPe hub motor being run inside a water tank during splash testing.",
  },
  {
    icon: Flame,
    title: "Fire resistance",
    text: "Wiring and lamp housings are held to an open flame to confirm they resist a fire instead of feeding it.",
    src: "/img/brochure/test-fire.webp",
    alt: "A technician holding a flame to an ElectricPe tail light harness during fire resistance testing.",
  },
  {
    icon: Weight,
    title: "Heavy loading",
    text: "Frames and suspension are loaded well past a normal two-up ride, the way a delivery rider will use them.",
    src: "/img/brochure/test-load.webp",
    alt: "Two riders carrying large boxes on an ElectricPe scooter during a heavy load test.",
  },
] as const;

const MILESTONES = [
  {
    year: "2021",
    title: "Wattapp Technologies founded",
    text: "Started as an EV charging-station aggregator in Bengaluru.",
  },
  {
    year: "2022",
    title: "$3M seed round",
    text: "Led by Blume Ventures, 8i Ventures, and angels from the EV space.",
  },
  {
    year: "2023",
    title: "$5M Pre-Series A",
    text: "Scaled to 10 Mobility Centers across South India.",
  },
  {
    year: "2024",
    title: "30+ stores live",
    text: "2,500+ scooters sold, 200,000+ app downloads, 4.4★ average rating.",
  },
  {
    year: "2026",
    title: "100+ stores and an extensive franchise network",
    text: "Growing into Delhi NCR, West India, and Tier-2 city clusters.",
  },
];

/**
 * Assembly units. Addresses are reproduced exactly as the client supplied
 * them - including the repeated pincode in the Gurugram line and the
 * all-caps Chittoor line - so nothing is silently "corrected" on a page
 * that doubles as a business record.
 */
const ASSEMBLY_UNITS = [
  {
    name: "Gurugram Unit",
    region: "Haryana",
    address:
      "Kila no 23 min 24 min 25 min, Baba Parkash Puri Ganda Nala, Community Centre, 122017, Sarai Allawardi, HR-122017, IND",
  },
  {
    name: "Chittoor Unit",
    region: "Andhra Pradesh",
    address:
      "37, MSME CDP, GANDRAJUPALLI, INDUSTRIAL ESTATE, GANDRAJUPALLI, PALAMANER, DIST. CHITTOR, Andhra Pradesh - 517432, IND",
  },
  { name: "Ahmednagar Unit", region: "Maharashtra" },
  { name: "Lucknow Unit", region: "Uttar Pradesh" },
] as const;

const VALUES = [
  {
    icon: Shield,
    title: "Trust over hype",
    text: "Numbers we can defend, photos of real owners, commitments in writing.",
  },
  {
    icon: Heart,
    title: "Service before sale",
    text: "The first test ride is not the end. It's the start of a long relationship.",
  },
  {
    icon: Target,
    title: "Accessibility",
    text: "Low-speed EVs that don't need a licence. EMIs that don't need perfect credit.",
  },
  {
    icon: Handshake,
    title: "Transparency",
    text: "Real prices. Real warranty terms. Real service SLAs published monthly.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--color-surface-muted)] pt-14 md:pt-20 pb-16 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(85% 70% at 10% 0%, #eefaf3 0%, #f5fbf8 42%, var(--color-surface-muted) 78%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(3,152,85,0.7) 1px, transparent 1.5px)",
            backgroundSize: "26px 26px",
          }}
        />

        <Container>
          {/* Walkthrough on the left, copy on the right from lg up. The copy
              stays first in the DOM so mobile reads the pitch before the
              video, which is the slower thing to commit to. */}
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 lg:order-2">
              <p className="text-eyebrow mb-3">About us</p>
              <h1 className="text-display-xl">
                We're building the EV retail network India deserves.
              </h1>
              <p className="mt-5 text-lg text-[var(--color-text-muted)] leading-relaxed">
                Most EV brands will sell you a scooter and wish you luck.
                ElectricPe is different. We build our own scooters, sell them
                through stores you can walk into, and put our service promise in
                writing.
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[var(--color-text)]">
                {HERO_PROOF.map(({ icon: Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-2">
                    <Icon
                      className="h-4 w-4 text-[var(--color-brand)]"
                      aria-hidden
                    />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
                >
                  <Link href="/stores">Find a store near you</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/become-a-dealer">Become a dealer</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <FactoryVideo caption="A walk through the floor where every ElectricPe scooter is built." />
              <ul className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)]">
                {HERO_STATS.map((s) => (
                  <li key={s.l} className="bg-white px-3 py-3.5 text-center">
                    <p className="font-display text-xl font-bold text-[var(--color-text)]">
                      {s.v}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                      {s.l}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Our story"
          title="From a charging app to India's EV retail network"
          align="left"
        />
        {/* Stacked with a left rail on small screens, a horizontal stepper
            from lg up so five milestones read as one continuous run. */}
        <ol className="grid gap-9 lg:grid-cols-5 lg:gap-8">
          {MILESTONES.map((m, i) => (
            <li key={m.year} className="relative pl-9 lg:pl-0">
              {/* Rail to the next milestone, drawn per item so the line stops
                  at the last one instead of trailing off the container. */}
              {i < MILESTONES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[7px] top-[15px] -bottom-9 w-px bg-[var(--color-border-brand)] lg:left-[15px] lg:-right-8 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto"
                />
              )}
              <span
                aria-hidden
                className="absolute left-0 top-0 block h-[15px] w-[15px] rounded-full border-[3px] border-[var(--color-brand)] bg-white lg:static lg:mb-6"
              />
              <p className="font-display text-2xl font-bold leading-none text-[var(--color-brand)]">
                {m.year}
              </p>
              <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-[var(--color-text)]">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {m.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Who is behind the company. A buyer spending a month's salary on a
          scooter from a brand they have not heard of wants to know someone
          serious is funding it and will still be here for the warranty. */}
      <Section className="bg-[var(--color-surface-muted)]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <figure className="m-0 lg:col-span-5">
            <div className="relative aspect-[7/6] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
              <Image
                src="/img/brochure/founders.webp"
                alt="Anupam Mittal with Avinash Sharma, CEO and founder of ElectricPe."
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-[var(--color-text-muted)]">
              Anupam Mittal with Avinash Sharma, CEO and founder of ElectricPe.
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <p className="text-eyebrow mb-4">Who backs us</p>
            <h2 className="text-display-lg">
              Trusted by India&apos;s biggest investors.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-muted)]">
              ElectricPe has raised over ₹100 crore, including backing from
              Anupam Mittal, the Shaadi.com founder and Shark Tank India judge.
              In July 2024 we signed an official partnership with Google. That
              funding is why we can own our plants, own our stores, and still be
              here in year three of your warranty.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="font-display text-3xl font-bold text-[var(--color-brand)]">
                  ₹100 Cr+
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Funding raised
                </dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-bold text-[var(--color-brand)]">
                  {globals.stats.storesOpen}
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Company-owned stores
                </dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-bold text-[var(--color-brand)]">
                  Google
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Official partner
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="By the numbers" title="What we've built so far" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { v: globals.stats.storesOpen, l: "Mobility Centers" },
            { v: globals.stats.vehiclesSold, l: "Scooters sold" },
            { v: globals.stats.appDownloads, l: "App downloads" },
            { v: globals.stats.stationsCount, l: "Charging stations in app" },
            { v: globals.stats.networksCount, l: "Partner networks" },
            { v: globals.stats.communityMembers, l: "Community members" },
            { v: `${globals.slaThisMonthPct}%`, l: "24h service SLA hit" },
            { v: globals.stats.rating, l: "App Store / Play rating" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl bg-white border border-[var(--color-border)] p-5 text-center"
            >
              <p className="text-number-stat text-[var(--color-text)]">{s.v}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{s.l}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The walkthrough itself now plays in the hero, so this section makes
          the claim in words and backs it with stills from the same floor -
          read left to right as the journey a scooter actually takes. */}
      <Section className="bg-[var(--color-surface-muted)]">
        <div className="max-w-3xl">
          <p className="text-eyebrow mb-4">Manufacturing</p>
          <h2 className="text-display-lg">We build our own scooters.</h2>
          <p className="mt-5 text-[var(--color-text-muted)] text-lg leading-relaxed">
            ElectricPe is not a reseller. Our scooters are assembled, tested,
            and dispatched from our own units, which is how we can stand behind
            component-level warranty and keep spares moving to every Mobility
            Center.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FACTORY_SHOTS.map((shot, i) => (
            <li key={shot.src}>
              <figure className="m-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 23vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex gap-2.5 text-sm text-[var(--color-text-muted)]">
                  <span
                    aria-hidden
                    className="mt-px shrink-0 font-display text-sm font-bold text-[var(--color-brand)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {shot.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </Section>

      {/* Testing. The manufacturing claim above is only worth something if the
          output is checked, so the bench gets its own section with the
          photographs rather than a line of copy. */}
      <Section>
        <SectionHeader
          eyebrow="Quality control"
          title="We test it hard before you ride it."
          description="Every platform goes through the same bench before it reaches a showroom floor. It is cheaper for us to break a scooter here than for you to break down on the road."
          align="left"
        />
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {TESTS.map(({ icon: Icon, title, text, src, alt }) => (
            <figure key={title} className="m-0">
              <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 31vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-[var(--color-text)]">
                  <Icon
                    className="h-5 w-5 shrink-0 text-[var(--color-brand)]"
                    aria-hidden
                  />
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {text}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Our facilities"
          title="ElectricPe assembly units"
          description="Two units are running today, with two more coming up to shorten delivery times across North and West India."
        />
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {ASSEMBLY_UNITS.map((unit) => {
            const live = "address" in unit;
            return (
              <Card key={unit.name} className="p-6 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display text-xl font-bold text-[var(--color-text)]">
                    {unit.name}
                  </h3>
                  <span
                    className={
                      live
                        ? "shrink-0 rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-pressed)]"
                        : "shrink-0 rounded-full bg-[var(--color-surface-sunken)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)]"
                    }
                  >
                    {live ? "Operational" : "Coming soon"}
                  </span>
                </div>

                <p className="text-sm font-medium text-[var(--color-text-muted)] mb-3">
                  {unit.region}
                </p>

                {live ? (
                  <>
                    <p className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                      <MapPin
                        className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-brand)]"
                        aria-hidden
                      />
                      <span>{unit.address}</span>
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline"
                    >
                      Open in Maps
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </>
                ) : (
                  <p className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">
                    <Clock
                      className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-text-subtle)]"
                      aria-hidden
                    />
                    <span>
                      Under development. Address will be published once the unit
                      is commissioned.
                    </span>
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="How we work" title="Four values that shape everything" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-3">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-1">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <BrochureCta context="about-us" />
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-lg">Want to work with us?</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            We're hiring store executives, technicians, engineers, and operations folks
            across India. Come build with us.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="/careers">See open roles</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact-us">Get in touch</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
