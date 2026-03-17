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
    // motion/react nur laden wenn die Komponente tatsächlich gerendert wird
    modulePreload: {
      resolveDependencies(url, deps) {
        return deps.filter((dep) => !dep.includes("motion"));
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Animations – schwer, wird separat gecacht
          if (id.includes('motion') || id.includes('framer-motion')) {
            return 'motion';
          }
          // Radix UI Primitives – viele kleine Pakete → ein Chunk
          if (id.includes('@radix-ui')) {
            return 'radix';
          }
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // React Kern + Router → stabiler Cache-Chunk
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('react-router')
          ) {
            return 'react-vendor';
          }
          // Formulare – nur auf Kontakt/Termin benötigt
          if (id.includes('react-hook-form')) {
            return 'forms';
          }
          // Helmet – nur für SEO-Tags
          if (id.includes('react-helmet-async') || id.includes('helmet')) {
            return 'helmet';
          }
        },
      },
    },
  },
})
