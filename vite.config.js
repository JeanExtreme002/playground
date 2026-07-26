import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://<user>.github.io/playground/, so every asset
// path has to be prefixed with the repository name.
const BASE = '/playground/'

// GitHub Pages knows nothing about React routes (e.g. /playground/sample).
// The classic fix: ship a copy of index.html as 404.html. Pages returns that
// file for any unknown URL and React takes the route from there.
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [react(), spaFallback()],

  // Test setup (run with `npm test`).
  test: {
    environment: 'jsdom', // simulates a browser inside Node
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
  },
})
