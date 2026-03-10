import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Converts render-blocking <link rel="stylesheet"> to non-blocking preload.
// Safe for React SPAs: JS is always larger than CSS, so CSS loads before
// React renders — no flash of unstyled content.
function nonBlockingCssPlugin() {
  return {
    name: 'non-blocking-css',
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet" (crossorigin )?href="([^"]+\.css)">/g,
        (_match, crossorigin, href) =>
          `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
      )
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    nonBlockingCssPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Merge all lucide-react icon chunks into one bundle so they load in
        // a single request instead of many tiny sequential fetches.
        manualChunks(id) {
          if (id.includes('lucide-react')) {
            return 'icons';
          }
        },
      },
    },
  },
})
