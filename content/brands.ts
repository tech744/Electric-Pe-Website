import type { BrandSlug } from "./types";

/**
 * Brand presentation theme + landing-page content.
 *
 * The `banner` cutout is a transparent PNG of the scooter alone (no baked-in
 * brand text), so every card/hero can render the brand wordmark as real
 * typography on top of a themed background. `tint` is the Tailwind class set
 * for the card background; it matches the aesthetic of the original
 * `*_brand_banner.webp` assets without the letterbox/crop problems.
 *
 * The landing-page fields (`positioning`, `story*`, `pillars`, `bestFor`) are
 * consumed by <BrandLanding> at /ev/{slug}. Icon names reference the keys in
 * BRAND_ICON_MAP below, stored as strings so this module stays pure data.
 */

export type BrandPillarIcon =
  | "Wallet"
  | "ShieldCheck"
  | "Store"
  | "Clock"
  | "Zap"
  | "Gauge"
  | "Heart"
  | "Users"
  | "Package"
  | "Sparkles"
  | "MapPin"
  | "Wrench";

export type BrandPillar = {
  iconName: BrandPillarIcon;
  title: string;
  proof: string;
};

export type BrandTheme = {
  slug: BrandSlug;
  displayName: string;
  tagline: string;
  /** Transparent-PNG cutout of the scooter. */
  cutout: string;
  /** Background on brand tiles / PDP hero (Tailwind class). */
  tint: string;
  /** Text color that reads well against `tint`. */
  onTint: string;

  // ─── Landing-page content ────────────────────────────────
  /** One-line brand positioning, sits under the hero H1. */
  positioning: string;
  /** H2 above the brand story section. */
  storyTitle: string;
  /** 2–3 sentence brand origin / philosophy paragraph. */
  storyBody: string;
  /** 3 brand-specific USP pillars (not the generic service promise). */
  pillars: [BrandPillar, BrandPillar, BrandPillar];
  /** Use-case tags ("Daily commute", "Family", etc.) rendered as chips. */
  bestFor: string[];
  /** Short trust chip row shown under the hero. */
  trustChips: string[];
};

export const BRAND_THEMES: Record<BrandSlug, BrandTheme> = {
  xypro: {
    slug: "xypro",
    displayName: "Xypro",
    tagline: "Best price. No licence, no registration.",
    cutout: "/img/cutouts/xypro_brand_banner-cutout.png",
    tint: "bg-gradient-to-br from-sky-100 via-indigo-100 to-rose-100",
    onTint: "text-slate-900",
    positioning:
      "Best-value everyday ride for first-time EV owners. Available in lead-acid and lithium-ion variants.",
    storyTitle: "Built for the everyday Indian commute",
    storyBody:
      "Xypro was designed around one idea: an electric scooter should cost less than your last bike, charge on any 5A socket at home, and never need a licence or registration. Two variants cover two budgets: the lead-acid Xypro from ₹45,000 with a 50 km+ range and 6-hour charge for the lowest upfront cost, and the lithium-ion Xypro at ₹60,000 with an 80 km+ range and a faster 4-hour charge for lighter weight and longer daily runs.",
    pillars: [
      {
        iconName: "Wallet",
        title: "Starts at ₹45,000",
        proof:
          "The Xypro range starts at ₹45,000 on-road, the lowest-priced electric scooter in our lineup. EMI from ₹1,599/month.",
      },
      {
        iconName: "Zap",
        title: "80 km+ real-world range",
        proof:
          "Every Xypro variant delivers a real-world 80 km+ on a single 4-hour charge, tested on Indian roads, not a lab bench.",
      },
      {
        iconName: "ShieldCheck",
        title: "No licence, no RTO",
        proof:
          "All three Xypro variants are ≤25 km/h, classified low-speed under Indian motor-vehicle rules. Ride home the same day, no DL or registration.",
      },
    ],
    bestFor: ["Daily commute", "Students", "First-time EV riders"],
    trustChips: ["Road-legal", "Made in India", "Low running cost", "No licence required"],
  },

  jett: {
    slug: "jett",
    displayName: "Jett",
    tagline: "Timeless elegance meets daily comfort.",
    cutout: "/img/cutouts/jett_brand_banner-cutout.png",
    tint: "bg-gradient-to-b from-red-950 via-red-900 to-red-950",
    onTint: "text-white",
    positioning:
      "A classic-silhouette electric scooter built for the family ride: generous seat, 12-inch wheels, cargo you can live with.",
    storyTitle: "The family scooter, reimagined electric",
    storyBody:
      "Jett keeps the silhouette of the scooter your parents rode and gives it a silent, clean-running electric heart. 12-inch wheels flatten out Indian roads, a cushioned dual seat and 10 kg of under-seat storage make daily errands effortless, and every variant stretches 80 km+ on a charge, enough for two commutes and the weekend grocery run.",
    pillars: [
      {
        iconName: "Users",
        title: "Two-up comfort",
        proof:
          "Cushioned dual seat with lumbar support and 160 kg payload, built to carry a rider and a pillion every day without complaint.",
      },
      {
        iconName: "Package",
        title: "10 kg under-seat storage",
        proof:
          "The largest dry-storage compartment in the ElectricPe range. Helmet, groceries, a laptop bag, all lock away under the seat.",
      },
      {
        iconName: "Gauge",
        title: "12-inch wheels",
        proof:
          "Larger wheels absorb potholes and speed breakers far better than the 10-inch standard: a quieter, steadier ride on rough roads.",
      },
    ],
    bestFor: ["Family", "Daily commute", "Weekend errands"],
    trustChips: ["Road-legal", "Made in India", "Low running cost", "No licence required"],
  },

  "4all": {
    slug: "4all",
    displayName: "4ALL",
    tagline: "Best range. Zero hassle.",
    cutout: "/img/cutouts/4all_brand_banner-cutout.png",
    tint: "bg-gradient-to-b from-stone-600 via-stone-700 to-neutral-900",
    onTint: "text-white",
    positioning:
      "Best range in the no-licence category: 80 km+ on a single charge, honest 25 km/h top speed, lithium-ion from ₹75,000 on-road (lead-acid from ₹56,000).",
    storyTitle: "Range, without the paperwork",
    storyBody:
      "Most long-range electric scooters ask you to queue at the RTO and memorise a traffic code. 4ALL refuses that trade. Both variants cap speed at 25 km/h to stay in the no-licence category, but deliver 80 km+ on a single 4-hour charge. Lithium for lighter weight and faster recovery cycles. Lead-acid for proven, easy-to-service chemistry. Pick your chemistry.",
    pillars: [
      {
        iconName: "Zap",
        title: "80 km+ real-world range",
        proof:
          "Both 4ALL variants return 80 km+ on a single charge, tested on Indian roads with a 70 kg rider, not on a lab bench in neutral.",
      },
      {
        iconName: "ShieldCheck",
        title: "No RTO, no waiting",
        proof:
          "25 km/h means no driving licence, no registration, no road tax. Book today, ride home tonight. That's the promise.",
      },
      {
        iconName: "Sparkles",
        title: "Lithium or lead-acid",
        proof:
          "Same chassis, two chemistries. Lithium-ion for lighter weight, an 80 km+ range and a 4-hour charge at ₹75,000. Lead-acid for proven, easy-to-service durability with a 50 km+ range and 6-hour charge at ₹56,000.",
      },
    ],
    bestFor: ["Long commutes", "Daily family use", "Range anxiety, fixed"],
    trustChips: ["Road-legal", "Made in India", "Low running cost", "No licence required"],
  },

  vibe: {
    slug: "vibe",
    displayName: "Vibe",
    tagline: "Modern style. Daily comfort.",
    cutout: "/img/cutouts/vibe_brand_banner-cutout.png",
    tint: "bg-gradient-to-br from-rose-100 via-red-100 to-pink-100",
    onTint: "text-slate-900",
    positioning:
      "Modern-style electric scooter built for everyday urban riding. Lithium-ion at ₹77,000, lead-acid at ₹57,000. 25 km/h, no licence, no registration.",
    storyTitle: "Daily commute, with a bit more style",
    storyBody:
      "Vibe was designed for riders who want their daily scooter to look the part. A sleeker silhouette, LED-style lighting and a clean modern stance, paired with the same licence-free, 25 km/h ride and the same any-5A-socket charging the rest of our lineup runs on. Two chemistries cover two budgets: lithium-ion at ₹77,000 with an 80 km+ range and a 4-hour charge, lead-acid at ₹57,000 with a 50 km+ range and a 6-hour charge.",
    pillars: [
      {
        iconName: "Sparkles",
        title: "Modern, sleek design",
        proof:
          "A contemporary silhouette with smooth body panels and an LED-style headlight, available in six colours: red, black, blue, grey, white and green.",
      },
      {
        iconName: "Zap",
        title: "80 km+ range on lithium",
        proof:
          "The Vibe Lithium Ion delivers 80 km+ of real-world range on a single 4-hour charge from any regular 5A home socket. No special wiring, no installer visit.",
      },
      {
        iconName: "ShieldCheck",
        title: "No licence, no RTO",
        proof:
          "Both Vibe variants cap at 25 km/h, which qualifies them as low-speed EVs under Indian motor-vehicle rules. Ride home the same day, no DL, no registration, no road tax.",
      },
    ],
    bestFor: ["Daily commute", "Young urban riders", "Style-conscious buyers"],
    trustChips: ["Road-legal", "Made in India", "Low running cost", "No licence required"],
  },

  rapter: {
    slug: "rapter",
    displayName: "Raptor 2.0",
    tagline: "Urban presence. Sporty stance.",
    cutout: "/img/cutouts/rapter_brand_banner-cutout.png",
    tint: "bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100",
    onTint: "text-slate-900",
    positioning:
      "Premium urban electric scooter with a bolder, sportier stance. Lithium-ion at ₹79,000, lead-acid at ₹58,000. 25 km/h, no licence, no registration.",
    storyTitle: "More presence, same simple rules",
    storyBody:
      "Raptor 2.0 is for riders who want a bigger road presence without giving up the no-paperwork advantage of a low-speed EV. A larger front fairing, a windshield-ready cowl and a sportier seat profile sit on the same proven 25 km/h chassis. Two variants: lithium-ion at ₹79,000 with an 80 km+ range and a 4-hour charge, lead-acid at ₹58,000 with a 50 km+ range and a 6-hour charge. Six colours: red, black, blue, grey, white and green.",
    pillars: [
      {
        iconName: "Gauge",
        title: "Sportier urban stance",
        proof:
          "Larger front fairing, prominent headlight cluster and a more substantial body, finished in six colour options so it looks distinct on the road.",
      },
      {
        iconName: "Zap",
        title: "80 km+ range on lithium",
        proof:
          "The Raptor 2.0 Lithium Ion returns 80 km+ on a single 4-hour charge from any regular 5A socket. Detachable battery for charging indoors when parking is awkward.",
      },
      {
        iconName: "ShieldCheck",
        title: "No licence, no RTO",
        proof:
          "Both Raptor 2.0 variants are speed-limited to 25 km/h, qualifying as low-speed EVs under Indian motor-vehicle rules. No DL, no registration, no road tax.",
      },
    ],
    bestFor: ["Daily commute", "Riders wanting more presence", "Premium urban use"],
    trustChips: ["Road-legal", "Made in India", "Low running cost", "No licence required"],
  },

  "sniper-duo": {
    slug: "sniper-duo",
    displayName: "Sniper Duo",
    tagline: "Two-rider ready. Best-price commute.",
    cutout: "/img/cutouts/sniper-duo_brand_banner-cutout.png",
    tint: "bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100",
    onTint: "text-slate-900",
    positioning:
      "Best-price two-up electric scooter built for the daily ride. Lithium-ion at ₹64,000, lead-acid at ₹48,000. 25 km/h, no licence, no registration.",
    storyTitle: "Two-rider ready, single-rider priced",
    storyBody:
      "Sniper Duo is built around the most common Indian use case: one rider on the daily commute, a pillion on the weekend. A wider, padded dual seat, sturdy grab rail and a chassis tuned for two-up weight, all kept inside the no-licence 25 km/h envelope. Two chemistries cover two budgets: lithium-ion at ₹64,000 with an 80 km+ range and a 4-hour charge, lead-acid at ₹48,000 with a 50 km+ range and a 6-hour charge.",
    pillars: [
      {
        iconName: "Wallet",
        title: "Starts at ₹48,000",
        proof:
          "The Sniper Duo Lead Acid is ₹48,000 on-road, our most accessible two-up scooter. EMI from ₹1,749/month.",
      },
      {
        iconName: "Users",
        title: "Built for two-up riding",
        proof:
          "Wider dual seat, full-length pillion grab rail and a chassis tuned for the rider-plus-pillion weight that defines the Indian daily ride.",
      },
      {
        iconName: "ShieldCheck",
        title: "No licence, no RTO",
        proof:
          "Both Sniper Duo variants cap at 25 km/h, qualifying them as low-speed EVs under Indian motor-vehicle rules. Ride home the same day, no DL, no registration, no road tax.",
      },
    ],
    bestFor: ["Daily commute", "Two-up riding", "Best-price first EV"],
    trustChips: ["Road-legal", "Made in India", "Low running cost", "No licence required"],
  },
};

export const BRAND_ORDER: BrandSlug[] = ["xypro", "jett", "4all", "vibe", "rapter", "sniper-duo"];

export function getBrandTheme(slug: string): BrandTheme | undefined {
  return BRAND_THEMES[slug as BrandSlug];
}
