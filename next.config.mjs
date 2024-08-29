/** @type {import('next').NextConfig} */
import { createProxyMiddleware } from 'http-proxy-middleware';
const jsonUrl = process.env.NEXT_PUBLIC_JSON_URL || "";

const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: '/api/listings',
        destination: jsonUrl,
      },
    ];
  },

  // Extend the development server to use the proxy middleware
  webpackDevMiddleware: (config) => {
    config.before = (app) => {
      app.use(
        '/api/listings',
        createProxyMiddleware({
          target: new URL(jsonUrl).origin, 
          changeOrigin: true,
          pathRewrite: {
            '^/api/listings': new URL(jsonUrl).pathname,
          },
        })
      );
    };
    return config;
  },

};

export default nextConfig;
