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
      {
        source: '/assets/images/online-course/OC-OG.jpg',
        destination: '/images/og/online-course.jpg',
        permanent: true,
      },
      {
        source: '/assets/images/homepage/homepage-OG.jpg',
        destination: '/images/og/home.jpg',
        permanent: true,
      },
      {
        source: '/assets/images/offline-mentoring/OM-OG.jpg',
        destination: '/images/og/offline-mentoring.jpg',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
