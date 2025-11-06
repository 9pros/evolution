/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    serverComponentsExternalPackages: ['ws'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  env: {
    OPENAI_LIKE_BASE_URL: process.env.OPENAI_LIKE_BASE_URL,
    OPENAI_LIKE_API_KEY: process.env.OPENAI_LIKE_API_KEY,
    OPENAI_LIKE_CHAT_MODEL_1: process.env.OPENAI_LIKE_CHAT_MODEL_1 || 'qwen3-coder-plus',
    OPENAI_LIKE_CHAT_MODEL_2: process.env.OPENAI_LIKE_CHAT_MODEL_2 || 'qwen3-vl-plus',
    OPENAI_LIKE_CHAT_MODEL_3: process.env.OPENAI_LIKE_CHAT_MODEL_3 || 'kimi-k2-0905',
    OPENAI_LIKE_CHAT_MODEL_4: process.env.OPENAI_LIKE_CHAT_MODEL_4 || 'glm-4.6',
    OPENAI_LIKE_CHAT_MODEL_5: process.env.OPENAI_LIKE_CHAT_MODEL_5 || 'deepseek-v3.2',
  },
};

module.exports = nextConfig;