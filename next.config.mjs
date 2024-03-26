/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "music.bakhaw.dev",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
