const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["aquarida-tour.kz", "tourism-backend-laq8.onrender.com"],
  },
};

module.exports = nextConfig;
