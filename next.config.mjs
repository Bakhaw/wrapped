/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "music.bakhaw.dev",
      },
    ],
  },
};

export default nextConfig;
