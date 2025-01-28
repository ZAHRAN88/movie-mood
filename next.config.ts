import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
  },
};

export default nextConfig;
