import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { globals } from "@/content/globals";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ElectricPe collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "2026-11-05";

export default function PrivacyPage() {
  return (
    <>
      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
        </Container>
      </div>

      <Section>
        <Container size="md">
          <p className="text-eyebrow mb-3">Legal</p>
          <h1 className="text-display-lg">Privacy Policy</h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Last updated: {new Date(LAST_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="prose prose-neutral max-w-none mt-8 text-[var(--color-text)] leading-relaxed text-base space-y-6">
            <p>
              This Privacy Policy explains how {globals.legalEntity.name}{" "}
              ("ElectricPe", "we", "us") collects, uses, and protects your personal
              data when you use our website, mobile app, and retail services in India.
              It is compliant with the Digital Personal Data Protection Act, 2023
              (DPDP Act).
            </p>

            <h2 className="text-h2 mt-8">Data we collect</h2>
            <p>We collect the following categories of personal data:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Identity data:</strong> Name, phone number, email, and
                Aadhaar/PAN when required for vehicle purchase or EMI.
              </li>
              <li>
                <strong>Contact data:</strong> Address, delivery pincode, preferred
                city.
              </li>
              <li>
                <strong>Transaction data:</strong> Scooter purchased, EMI details, and
                service records.
              </li>
              <li>
                <strong>Technical data:</strong> IP address, device type, browser, pages
                viewed, and the actions you take on the site. On the website this is
                only collected if you accept analytics and advertising cookies - see{" "}
                <a href="#cookies" className="text-[var(--color-brand)] underline">
                  Cookies and tracking
                </a>
                .
              </li>
              <li>
                <strong>Communications data:</strong> WhatsApp messages, emails, and
                call records with our support team.
              </li>
            </ul>

            <h2 className="text-h2 mt-8">How we use your data</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To process your purchase, financing, warranty, and service requests.</li>
              <li>To confirm test rides and send appointment reminders over WhatsApp.</li>
              <li>To improve our product and retail network.</li>
              <li>To comply with legal and regulatory obligations in India.</li>
              <li>To send you marketing communications, but only if you opt in.</li>
            </ul>

            <h2 className="text-h2 mt-8">Third parties we share data with</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Finance partners:</strong> HDFC, Bajaj Finserv, IDFC First,
                Shriram, Kotak, LazyPay, only when you apply for EMI.
              </li>
              <li>
                <strong>Payment processors:</strong> Razorpay for deposits + one-time
                payments.
              </li>
              <li>
                <strong>Messaging:</strong> WhatsApp Business Cloud API (Meta) for
                transactional communication.
              </li>
              <li>
                <strong>Analytics:</strong> Google Analytics 4, and only if you accept
                analytics cookies.
              </li>
              <li>
                <strong>Advertising:</strong> Meta (Facebook and Instagram) through the
                Meta Pixel, so we can measure our ads and show them to people who have
                visited this site. Only if you accept advertising cookies.
              </li>
              <li>
                <strong>Website hosting:</strong> Vercel, which hosts this site and
                records anonymous page-performance measurements.
              </li>
              <li>
                <strong>Enquiry handling:</strong> When you submit a form, the details
                reach our sales and service teams by email, and are stored in our own
                systems and CRM. Our website development partner can also receive these
                notifications while the site is being maintained.
              </li>
            </ul>
            <p>
              We do <strong>not</strong> sell your personal data to third parties. Ever.
            </p>

            <h2 className="text-h2 mt-8">Data retention</h2>
            <p>
              We retain identity and transaction data for the lifetime of your
              relationship with ElectricPe plus 7 years thereafter, as required for
              warranty, tax, and regulatory audit. Analytics data is retained for 14
              months. Marketing opt-ins you can revoke at any time, and we'll delete
              them within 30 days.
            </p>

            <h2 className="text-h2 mt-8">Your rights</h2>
            <p>Under the DPDP Act, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access a copy of your personal data.</li>
              <li>Correct inaccurate data.</li>
              <li>Erase your data (subject to legal retention requirements).</li>
              <li>Withdraw consent for marketing messages at any time.</li>
              <li>Lodge a complaint with the Data Protection Board of India.</li>
            </ul>
            <p>
              To exercise these rights, write to our Data Protection Officer at{" "}
              <a
                href={`mailto:${globals.dpoEmail}`}
                className="text-[var(--color-brand)] underline"
              >
                {globals.dpoEmail}
              </a>
              . We respond within 7 days.
            </p>

            <h2 className="text-h2 mt-8" id="cookies">
              Cookies and tracking
            </h2>
            <p>
              The first time you visit, we ask whether you accept analytics and
              advertising cookies. Nothing in those two categories runs until you
              accept - no analytics script, no advertising pixel, and no cookie they
              would set.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Strictly necessary</strong> (always on): your preferred city,
                stored as <code>ep_city</code>, and your cookie choice itself. These
                carry no advertising identifier and the site cannot work without them.
              </li>
              <li>
                <strong>Analytics</strong> (only if you accept): Google Analytics 4,
                which tells us which pages people use. Cookies <code>_ga</code>,{" "}
                <code>_gid</code>.
              </li>
              <li>
                <strong>Advertising</strong> (only if you accept): the Meta Pixel, which
                lets us measure our Facebook and Instagram ads and show them to people
                who have visited the site. Cookies <code>_fbp</code>, <code>_fbc</code>.
              </li>
            </ul>
            <p>
              You can change or withdraw your choice at any time using the{" "}
              <strong>Cookie preferences</strong> link at the bottom of every page.
              Withdrawing is one click, exactly like accepting: we stop the scripts and
              delete the analytics and advertising cookies already in your browser. The
              site works normally either way.
            </p>

            <h2 className="text-h2 mt-8">Transfers outside India</h2>
            <p>
              Google, Meta and Vercel process data on servers outside India. Where that
              happens, it is limited to the categories described above, under those
              providers' contractual data-protection terms, and only to countries not
              restricted by the Central Government under the DPDP Act. Your identity,
              transaction and communications data stays with us and our Indian
              partners.
            </p>

            <h2 className="text-h2 mt-8">Children</h2>
            <p>
              ElectricPe services are intended for users 18 years and older. If you
              believe a child has shared personal data with us, email{" "}
              <a
                href={`mailto:${globals.dpoEmail}`}
                className="text-[var(--color-brand)] underline"
              >
                {globals.dpoEmail}
              </a>{" "}
              and we will delete it.
            </p>

            <h2 className="text-h2 mt-8">Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be
              communicated via email to registered users. Last updated {LAST_UPDATED}.
            </p>

            <h2 className="text-h2 mt-8">Contact us</h2>
            <p>
              {globals.legalEntity.name}
              <br />
              {globals.hqAddress}
              <br />
              Email:{" "}
              <a
                href={`mailto:${globals.dpoEmail}`}
                className="text-[var(--color-brand)] underline"
              >
                {globals.dpoEmail}
              </a>
              <br />
              CIN: {globals.legalEntity.cin}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
