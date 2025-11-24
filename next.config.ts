import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration options here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neurovice.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
