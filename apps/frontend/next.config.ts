import path from "node:path";
import type { NextConfig } from "next";

const DEFAULT_API_REWRITE_TARGET = "http://localhost:3001/api/v1";
const workspaceRoot = path.resolve(__dirname, "../..");

function getApiRewriteTarget() {
  const rawTarget = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_REWRITE_TARGET;
  let parsedTarget: URL;

  try {
    parsedTarget = new URL(rawTarget);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_API_URL must be an absolute URL including http:// or https://",
    );
  }

  if (!["http:", "https:"].includes(parsedTarget.protocol)) {
    throw new Error("NEXT_PUBLIC_API_URL must use the http:// or https:// protocol");
  }

  const target = parsedTarget.toString().replace(/\/+$/, "");

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
