import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns :[
      {
        protocol : "https",
        hostname : "i.scdn.co",
      },
      {
        protocol : "https",
        hostname : "mosaic.scdn.co",
      },
      {
        protocol : "https",
        hostname : "image-cdn-ak.spotifycdn.com",
      },
      {
        protocol : "https",
        hostname : "image-cdn-fa.spotifycdn.com",
      }
    ]
  }
};

export default nextConfig;
