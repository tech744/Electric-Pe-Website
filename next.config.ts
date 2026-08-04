import type { NextConfig } from "next";
// Posts keep the old WordPress path, /blogs/<slug>, so those links still resolve
// untouched. This map covers the sections that moved: /news/, /articles/,
// root-level posts, and the interim /blog/ URLs.
import legacyBlogRedirects from "./content/blog/legacy-redirects.json";

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
      { source: "/ev-charging-station", destination: "/ev-charging-stations", permanent: true },
      { source: "/ev-charging-station/categories/:slug*", destination: "/ev-charging-stations", permanent: true },
      { source: "/ev-charging-station/:slug*", destination: "/ev-charging-stations", permanent: true },
      { source: "/electric-charging-station/:slug*", destination: "/ev-charging-stations", permanent: true },
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
