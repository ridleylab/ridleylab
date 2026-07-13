import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // UploadThing host
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    return [
      {
        source: '/online-course',
        destination: '/services/online-course',
        permanent: true, // 301 redirect
      },
      {
        source: '/offline-mentoring',
        destination: '/services/offline-mentoring',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
