import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/form",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
