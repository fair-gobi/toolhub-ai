/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: 'C:\\Users\\DELL\\toolhub-fresh',
  
  typescript: {
    ignoreBuildErrors: true, // Still needed due to Next.js bug
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      canvas$: false,
    };
    return config;
  },
};

export default nextConfig;
