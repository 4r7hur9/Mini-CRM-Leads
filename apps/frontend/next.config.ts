import path from "node:path";
import type { NextConfig } from "next";

const DEFAULT_API_REWRITE_TARGET = "http://localhost:3001/api/v1";
const workspaceRoot = path.resolve(__dirname, "../..");

function getApiRewriteTarget() {
  const rawTarget = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_REWRITE_TARGET;
  const target = rawTarget.replace(/\/+$/, "");

  return target.endsWith("/api/v1") ? target : `${target}/api/v1`;
}

const apiRewriteTarget = getApiRewriteTarget();

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: workspaceRoot,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiRewriteTarget}/:path*`,
      },
    ];
  },
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;
