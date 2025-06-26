import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/",
        permanent: false,
      },
    ];
  },
  experimental: {
    forceSwcTransforms: true, // ✅ Forces SWC even if Babel is present
  },
  images: {
    domains: ["via.placeholder.com"], // Add external image domain here
  },
};





export default nextConfig;
