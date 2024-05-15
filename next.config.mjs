import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const millionConfig = {
  auto: true, // Si estas usando RSC: auto: { rsc: true },
  rsc: true,
};

export default million.next(nextConfig, millionConfig);
