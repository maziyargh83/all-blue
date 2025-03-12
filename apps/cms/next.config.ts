/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@all-blue/ui"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  outputFileTracingIncludes: {
    "/**/*": [".docs/**/*"],
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = require("@next/mdx")();
export default withMDX(nextConfig);
