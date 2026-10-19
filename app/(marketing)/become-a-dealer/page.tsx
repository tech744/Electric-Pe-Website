import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Droplets,
  Factory,
  Flame,
  Headset,
  Layers,
  LifeBuoy,
  Package,
  Truck,
  Weight,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FactoryVideo } from "@/components/marketing/factory-video";
import { BrochureCta } from "@/components/marketing/brochure-cta";
import { BecomeADealerForm } from "@/components/forms/become-a-dealer-form";
import { globals } from "@/content/globals";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: "Become a Dealer | ElectricPe Electric Scooter Dealership",
  description:
    "Open an ElectricPe electric scooter dealership. ₹100 Cr+ raised, backed by Anupam Mittal, our own plants and 126+ company-owned showrooms, 24x7 spares and service. Share your details and our team will call you.",
  alternates: { canonical: "/become-a-dealer" },
};

const HERO_PROOF = [
  { icon: Factory, label: "In-house manufacturing" },
  { icon: Layers, label: "6 models, lead-acid + lithium" },
  { icon: LifeBuoy, label: "Finance and service support" },
] as const;

/**
 * Headline credibility, straight from the FOFO dealer brochure. These are the
 * four things a prospective dealer actually weighs before anything else, so
 * they sit immediately under the hero rather than deep in the page.
 */
const CREDENTIALS = [
  { v: "₹100 Cr+", l: "Funding raised" },
  { v: globals.stats.storesOpen, l: "Own showrooms" },
  { v: "Anupam Mittal", l: "Investor" },
  { v: "Google", l: "Official partner" },
] as const;

const DEALER_PILLARS = [
  {
    icon: Truck,
    title: "Timely dispatches",
    text: "Stock leaves our own plants, so your showroom floor is never waiting on a third-party supplier.",
  },
  {
    icon: Package,
    title: "Spare availability",
    text: "Every fast-moving part is racked and ready. A bike off the road is a customer you lose.",
  },
  {
    icon: BadgeCheck,
    title: "Genuine warranty",
    text: "Component-level warranty we honour ourselves - battery, motor, controller, and charger.",
  },
] as const;

/** Real ElectricPe showrooms, pulled from the dealer brochure. */
const SHOWROOMS = [
  {
    src: "/img/brochure/store-1.webp",
    alt: "An ElectricPe showroom with scooters lined up along the storefront.",
  },
  {
    src: "/img/brochure/store-2.webp",
    alt: "An ElectricPe showroom decorated with flowers on its opening day.",
  },
  {
    src: "/img/brochure/store-3.webp",
    alt: "An ElectricPe showroom in Karnataka with Kannada signage and scooters on display.",
  },
  {
    src: "/img/brochure/store-4.webp",
    alt: "An ElectricPe showroom entrance decorated with marigold garlands.",
  },
  {
    src: "/img/brochure/store-5.webp",
    alt: "An ElectricPe showroom with EV sales, service, spares, and charging signage.",
  },
] as const;

const TESTS = [
  {
    icon: Droplets,
    title: "Water splash testing",
    text: "Motors and sealed assemblies are run submerged, because monsoon potholes are not a theoretical problem.",
    src: "/img/brochure/test-water.webp",
    alt: "An ElectricPe hub motor being run inside a water tank during splash testing.",
  },
  {
    icon: Flame,
    title: "Fire resistance testing",
    text: "Wiring and lamp housings are held to an open flame to confirm they resist, not feed, a fire.",
    src: "/img/brochure/test-fire.webp",
    alt: "A technician holding a flame to an ElectricPe tail light harness during fire resistance testing.",
  },
  {
    icon: Weight,
    title: "Heavy loading testing",
    text: "Frames and suspension are loaded well past a normal two-up ride, the way a delivery rider will use them.",
    src: "/img/brochure/test-load.webp",
    alt: "Two riders carrying large boxes on an ElectricPe scooter during a heavy load test.",
  },
] as const;

/**
 * Plant locations and status, as published in the dealer brochure. The street
 * addresses for the two live units are on /about-us; here a dealer only needs
 * to know which regions can supply them and when.
 */
const PLANTS = [
  { state: "Haryana", city: "Gurugram", live: true },
  { state: "Andhra Pradesh", city: "Chittoor", live: true },
  { state: "Maharashtra", city: "Ahmednagar", live: false },
  { state: "Uttar Pradesh", city: "Lucknow", live: false },
] as const;

const SERVICE_SUPPORT = [
  {
    icon: Headset,
    title: "A dedicated relationship manager",
    text: "One named person who knows your store, your stock, and your pending tickets. Not a queue.",
  },
  {
    icon: Package,
    title: "All parts in stock",
    text: "Our spares warehouse carries every fast-moving component, so a repair does not become a two-week wait.",
  },
  {
    icon: Wrench,
    title: "Expert training for your technicians",
    text: "We train your workshop on our drivetrain, battery packs, and diagnostics before your first delivery.",
  },
] as const;

const HIGHLIGHTS = [
  {
    title: "We build what you sell",
    text: "Assembly units in Gurugram and Chittoor, with Ahmednagar and Lucknow coming up - so supply, spares, and quality control stay in-house.",
  },
  {
    title: "A line-up for every buyer",
    text: "Six models across lead-acid and lithium-ion, all no-licence low-speed EVs, which opens up a much wider customer base.",
  },
  {
    title: "Retail support, not just stock",
    text: "Store branding, EMI and finance tie-ups, technician training, and a service SLA we publish every month.",
  },
];

export default function BecomeADealerPage() {
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
          {/* The form sits in the hero rather than at the bottom of the page -
              a dealer who is already convinced should not have to scroll past
              seven sections of proof to find the one input we need. */}
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="text-eyebrow mb-3">Become a dealer</p>
              <h1 className="text-display-xl">
                Build an EV business with a manufacturer behind you.
              </h1>
              <p className="mt-5 text-lg text-[var(--color-text-muted)] leading-relaxed">
                ElectricPe manufactures its own electric two-wheelers and
                retails them through a growing network of Mobility Centers. If
                you want to bring that to your city, tell us a little about
                yourself and our team will get in touch.
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

              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-4">
                {CREDENTIALS.map((c) => (
                  <div
                    key={c.l}
                    className="flex flex-col justify-center bg-white px-3 py-3.5 text-center"
                  >
                    <p className="font-display text-lg font-bold leading-tight text-[var(--color-text)]">
                      {c.v}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-[var(--color-text-muted)]">
                      {c.l}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Prefer to talk first?
                </p>
                <div className="mt-3 flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" variant="whatsapp">
                    <a
                      href={buildWhatsAppLink(
                        "Hi! I'd like to open an ElectricPe dealership.",
                        "become-a-dealer",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp us
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={`tel:${globals.supportPhone}`}>
                      {globals.supportPhone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <Card
              id="enquiry"
              className="scroll-mt-24 p-6 md:p-8 lg:col-span-6 shadow-[var(--shadow-xl)]"
            >
              <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">
                Dealership enquiry
              </h2>
              <p className="mt-2 mb-6 text-sm text-[var(--color-text-muted)]">
                All fields marked with * are required. We usually respond within
                two business days.
              </p>
              <BecomeADealerForm />
            </Card>
          </div>
        </Container>
      </section>

      {/* Investor credibility. A dealer is committing their own capital, so the
          question "who is behind this company" gets answered before the pitch. */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-eyebrow mb-4">Backed by</p>
            <h2 className="text-display-lg">
              Trusted by India&apos;s biggest investors.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-muted)]">
              ElectricPe has raised over ₹100 crore, including backing from
              Anupam Mittal - the Shark Tank India judge and Shaadi.com founder.
              In July 2024 we also signed an official partnership with Google,
              which puts our stores in front of customers already searching for
              an EV nearby.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="font-display text-3xl font-bold text-[var(--color-brand)]">
                  ₹100 Cr+
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Raised to date
                </dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-bold text-[var(--color-brand)]">
                  {globals.stats.storesOpen}
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Company-owned showrooms
                </dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-bold text-[var(--color-brand)]">
                  2021
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Building EV retail since
                </dd>
              </div>
            </dl>
          </div>

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
        </div>
      </Section>

      {/* The strongest argument in the brochure: we are not asking dealers to
          do something we have not done ourselves 126 times over. */}
      <Section className="bg-[var(--color-surface-muted)]">
        <SectionHeader
          eyebrow="Why dealers choose us"
          title="We run our own showrooms, so we know what you need."
          description="Every problem a dealer has - stock that arrives late, a spare that is never in stock, a warranty claim nobody owns - is a problem we have had to solve in our own stores first."
        />

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {DEALER_PILLARS.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-[var(--color-text)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {text}
              </p>
            </Card>
          ))}
        </div>

        {/* Two wide shots lead, three square ones follow - keeps the collage
            from reading as a uniform grid of thumbnails. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {SHOWROOMS.map((s, i) => (
            <li
              key={s.src}
              className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <div
                className={`relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)] ${
                  i < 2 ? "aspect-[16/7]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-sm text-[var(--color-text-muted)]">
          ElectricPe showrooms across India - all company-owned and running.
        </p>
      </Section>

      {/* Quality proof. Every EV dealer has been burned by a brand whose bikes
          came back; showing the test bench answers that before it is asked. */}
      <Section>
        <SectionHeader
          eyebrow="Quality control"
          title="We test it hard before you sell it."
          description="Every platform goes through the same bench before it reaches a showroom floor, so the warranty we hand you is one we expect to honour rarely."
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

      {/* Manufacturing. The walkthrough video is the centrepiece here - the
          about page leads with it, and a dealer will want to see the floor. */}
      <Section className="bg-[var(--color-surface-muted)]">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-eyebrow mb-4">Our plants</p>
            <h2 className="text-display-lg">
              We manufacture our own scooters.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-muted)]">
              Two plants are running today and two more are coming up, which is
              how we keep dispatch times short and spares flowing without a
              third party in the middle.
            </p>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
              {PLANTS.map((p) => (
                <li key={p.state} className="bg-white px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[var(--color-text)]">
                      {p.state}
                    </p>
                    <span
                      className={
                        p.live
                          ? "shrink-0 rounded-full bg-[var(--color-brand-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-brand-pressed)]"
                          : "shrink-0 rounded-full bg-[var(--color-surface-sunken)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-text-muted)]"
                      }
                    >
                      {p.live ? "Live" : "Upcoming"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                    {p.city}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-8 space-y-5">
              {HIGHLIGHTS.map((h) => (
                <div key={h.title}>
                  <dt className="font-semibold text-[var(--color-text)]">
                    {h.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {h.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <FactoryVideo caption="A walk through the plants that will supply your showroom." />

            <div className="relative mt-5 aspect-[21/9] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
              <Image
                src="/img/brochure/plant-aerial.webp"
                alt="Aerial view of an ElectricPe manufacturing plant with the showroom on the ground floor."
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                {
                  src: "/img/brochure/plant-floor1.webp",
                  alt: "Rows of bare ElectricPe scooter frames on the plant floor.",
                },
                {
                  src: "/img/brochure/plant-floor2.webp",
                  alt: "Finished ElectricPe scooters wrapped and staged for dispatch.",
                },
              ].map((p) => (
                <div
                  key={p.src}
                  className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)]"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 23vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* After-sales. This is where most dealer relationships actually break,
          so it gets its own section rather than a bullet. */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:order-2">
            <p className="text-eyebrow mb-4">After the sale</p>
            <h2 className="text-display-lg">Spares and service, 24x7.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-muted)]">
              Selling the scooter is the easy half. What keeps a dealership
              alive is what happens the week a customer rolls back in.
            </p>
            <ul className="mt-8 space-y-6">
              {SERVICE_SUPPORT.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 lg:col-span-7 lg:order-1">
            {[
              {
                src: "/img/brochure/spares-warehouse.webp",
                alt: "ElectricPe spares warehouse with racked and labelled parts.",
                caption: "Every fast-moving part, racked and labelled.",
              },
              {
                src: "/img/brochure/spares-tech.webp",
                alt: "An ElectricPe technician servicing a scooter's rear wheel.",
                caption: "Your technicians are trained on our drivetrain.",
              },
            ].map((p) => (
              <figure key={p.src} className="m-0">
                <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 54vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-[var(--color-text-muted)]">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <BrochureCta
          context="become-a-dealer"
          description="The full dealer brochure: our investors and plants, the quality bench every model clears, the spares and service you get after the sale, and the complete range with specs and warranty."
        />
      </Section>
    </>
  );
}
