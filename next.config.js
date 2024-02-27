/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/api/cancelPayment/:paymentkey",
        destination: `https://api.tosspayments.com/v1/payments/:paymentkey/cancel`,
      },
      {
        source: "/api/confirmPayment",
        destination: `https://api.tosspayments.com/v1/payments/confirm`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/products/categories",
        destination: "/products/categories/all?orderby=popularity",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "/account?tab=profile",
        permanent: true,
      },
      ...[
        "/products/categories/headphone",
        "/products/categories/battery",
        // "/products/categories/shoes",
        // "/products/categories/bag",
        // "/products/categories/jewel",
      ].map((source) => ({
        source,
        destination: `${source}/all?orderby=popularity`,
        permanent: true,
      })),
    ];
  },
  // webpack(config, { dev: isDev, isServer }) {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     resourceQuery: /svgr/, // only use svgr to load svg if path ends with *.svg?svgr
  //     use: ['@svgr/webpack'],
  //   });

  //   // Re-add default nextjs loader for svg
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     loader: 'next-image-loader',
  //     issuer: { not: /\.(css|scss|sass)$/ },
  //     dependency: { not: ['url'] },
  //     resourceQuery: { not: [/svgr/] }, // Ignore this rule if the path ends with *.svg?svgr
  //     options: { isServer, isDev, basePath: '', assetPrefix: '' },
  //   });
  //   return config;
  // },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test?.(".svg")
    );

    config.module.rules.push({
      oneOf: [
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: { not: /svgr/ },
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: /svgr/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.html$/i,
          use: "raw-loader",
        },
      ],
    });

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     //     include: /svgr[\\\/].*\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: ['@svgr/webpack', 'url-loader'],
  //   });
  //   return config;
  // },
};

module.exports = nextConfig;
