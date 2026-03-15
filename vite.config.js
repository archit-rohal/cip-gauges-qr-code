import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration for Gauge Identification System
 * Configured for Netlify deployment (no base path needed)
 * Hash-based routing works out of the box
 */
export default defineConfig({
  plugins: [react()],
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
