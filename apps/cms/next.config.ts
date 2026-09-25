import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  assetPrefix: process.env.NODE_ENV === "production" ? "/cms-assets" : undefined,
};

export default withPayload(nextConfig);
