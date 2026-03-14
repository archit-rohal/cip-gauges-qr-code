import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration for Gauge Identification System
 * Configured for GitHub Pages deployment
 * 
 * Base path: /cip-gauges-qr-code/
 * Update this if repo name changes
 */
export default defineConfig({
  plugins: [react()],
  base: '/cip-gauges-qr-code/',
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
