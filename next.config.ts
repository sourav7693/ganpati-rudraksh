import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
  return [
    {
      source: "/api/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
    },
  ];
},
  reactCompiler: true,
  output: "standalone",
  allowedDevOrigins: ["10.165.218.213"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
