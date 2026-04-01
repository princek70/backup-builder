import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Allow mobile devices on the local network during development only
  ...(isDev && {
    allowedDevOrigins: [
      "192.168.29.*",
      "10.178.*.*",
      "192.168.*.*",
      "172.16.*.*",
    ],
  }),
};

export default nextConfig;
