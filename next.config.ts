import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/chat",
        destination: "/admin/chat",
        permanent: false,
      },
      {
        source: "/testing-grounds",
        destination: "/admin/chat",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
