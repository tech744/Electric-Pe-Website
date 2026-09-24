import type { NextConfig } from "next";
// Posts keep the old WordPress path, /blogs/<slug>, so those links still resolve
// untouched. This map covers the sections that moved: /news/, /articles/,
// root-level posts, and the interim /blog/ URLs.
import legacyBlogRedirects from "./content/blog/legacy-redirects.json";

// Charging business retired (Sep 2026). Every page dedicated to charging
// infrastructure has been deleted -- the city/vehicle/highway/use-case
// directory, the /ev-charging-stations hub, and the B2B charging pages
// (CPO, charger OEM, CMS). These paths were indexed, so each one is kept
// alive as a permanent redirect to the homepage rather than left to 404.
const RETIRED_CHARGING_PATHS = [
  // Hub
  "/ev-charging-stations",
  // City directory
  "/ev-charging-stations-ahmedabad",
  "/ev-charging-stations-alwar",
  "/ev-charging-stations-belagavi",
  "/ev-charging-stations-bengaluru",
  "/ev-charging-stations-bhubaneswar",
  "/ev-charging-stations-chandigarh",
  "/ev-charging-stations-chennai",
  "/ev-charging-stations-coimbatore",
  "/ev-charging-stations-delhi",
  "/ev-charging-stations-faridabad",
  "/ev-charging-stations-ghaziabad",
  "/ev-charging-stations-gurugram",
  "/ev-charging-stations-guwahati",
  "/ev-charging-stations-hubballi",
  "/ev-charging-stations-hyderabad",
  "/ev-charging-stations-indore",
  "/ev-charging-stations-jaipur",
  "/ev-charging-stations-kochi",
  "/ev-charging-stations-kolkata",
  "/ev-charging-stations-lucknow",
  "/ev-charging-stations-mangaluru",
  "/ev-charging-stations-meerut",
  "/ev-charging-stations-mumbai",
  "/ev-charging-stations-mysuru",
  "/ev-charging-stations-nagpur",
  "/ev-charging-stations-nashik",
  "/ev-charging-stations-noida",
  "/ev-charging-stations-pune",
  "/ev-charging-stations-shivamogga",
  "/ev-charging-stations-surat",
  "/ev-charging-stations-thiruvananthapuram",
  "/ev-charging-stations-tirupati",
  "/ev-charging-stations-tumakuru",
  "/ev-charging-stations-vadodara",
  "/ev-charging-stations-vijayawada",
  "/ev-charging-stations-visakhapatnam",
  // Vehicle x city
  "/ev-charging-bengaluru-ather-450x",
  "/ev-charging-bengaluru-ola-s1",
  "/ev-charging-chennai-tvs-iqube",
  "/ev-charging-delhi-hero-vida",
  "/ev-charging-delhi-ola-s1",
  "/ev-charging-hyderabad-ather-450x",
  "/ev-charging-pune-bajaj-chetak",
  // Highway corridors
  "/ev-charging-bengaluru-chennai-highway",
  "/ev-charging-bengaluru-mysuru-highway",
  "/ev-charging-delhi-agra-highway",
  "/ev-charging-delhi-jaipur-highway",
  "/ev-charging-hyderabad-bengaluru-highway",
  "/ev-charging-mumbai-pune-expressway",
  // Use cases
  "/corporate-ev-charging-india",
  "/ev-charging-for-apartments-india",
  "/ev-charging-subscription-plan-india",
  "/ev-fleet-charging-india",
  "/home-ev-charger-installation-india",
  // B2B charging-infrastructure pages
  "/cms",
  "/partnerships/charger-oem",
  "/partnerships/cpo",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "electricpe.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3200, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 95],
  },

  async redirects() {
    return [
      // Every retired charging URL lands on the homepage. The wildcards below
      // also catch the pre-Next.js WordPress station URLs, which used to point
      // at /ev-charging-stations -- that hub is gone too, so they go to / now.
      ...RETIRED_CHARGING_PATHS.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),
      { source: "/ev-charging-station", destination: "/", permanent: true },
      { source: "/ev-charging-station/categories/:slug*", destination: "/", permanent: true },
      { source: "/ev-charging-station/:slug*", destination: "/", permanent: true },
      { source: "/electric-charging-station/:slug*", destination: "/", permanent: true },
      { source: "/tag/:slug*", destination: "/blogs", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/career-category/:slug*", destination: "/careers", permanent: true },
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/scooters", destination: "/ev", permanent: true },
      { source: "/products", destination: "/ev", permanent: true },
      {
        source: "/stores/mathura/mathura-goverdhan-chauraha",
        destination: "/stores/mathura/mathura-sonkh-road",
        permanent: true,
      },
      // Brand rename (Aug 2026): Sniper Duo -> Kaido, Vibe -> Igris, Raptor 2.0 -> Drakon.
      // Keep the old /ev/<slug> URLs (and their /<variant> children) resolving so
      // indexed links and existing campaigns carry over to the new slugs.
      { source: "/ev/sniper-duo", destination: "/ev/kaido", permanent: true },
      { source: "/ev/sniper-duo/:variant", destination: "/ev/kaido/:variant", permanent: true },
      { source: "/ev/vibe", destination: "/ev/igris", permanent: true },
      { source: "/ev/vibe/:variant", destination: "/ev/igris/:variant", permanent: true },
      { source: "/ev/rapter", destination: "/ev/drakon", permanent: true },
      { source: "/ev/rapter/:variant", destination: "/ev/drakon/:variant", permanent: true },
      ...legacyBlogRedirects,
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
