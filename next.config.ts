import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eyqzajqbqrrjhdfzbwig.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },

      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
