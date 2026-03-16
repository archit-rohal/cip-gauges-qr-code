import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Vite configuration for Gauge Identification System
 * Configured for Netlify deployment (no base path needed)
 * Hash-based routing works out of the box
 */
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'data/gauges.json'],
      manifest: {
        name: 'Gauge Identification System',
        short_name: 'Gauges',
        description: 'Fast reference for part inspection gauges',
        theme_color: '#ffffff',
        background_color: '#f8fafc',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Cache all essential files for offline mode
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,webp,jpg}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB to include all gauge images
        runtimeCaching: [
          {
            urlPattern: /.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'app-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    open: true,
    port: 3000,
  },
})
