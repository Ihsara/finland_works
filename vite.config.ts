
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Finland Works!',
        short_name: 'FinlandWorks',
        description: 'A standalone, local-first conversational assistant curated for starting life in Finland.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'https://api.dicebear.com/9.x/micah/svg?seed=FWIcon',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'https://api.dicebear.com/9.x/micah/svg?seed=FWIcon',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        shortcuts: [
          {
            name: "Start Chat",
            short_name: "Chat",
            description: "Ask the AI assistant",
            url: "/?action=chat",
            icons: [{ src: "https://api.dicebear.com/9.x/micah/svg?seed=FWChat", sizes: "192x192", type: "image/svg+xml" }]
          },
          {
            name: "Open Guide",
            short_name: "Guide",
            description: "Browse the wiki",
            url: "/?action=wiki",
            icons: [{ src: "https://api.dicebear.com/9.x/micah/svg?seed=FWWiki", sizes: "192x192", type: "image/svg+xml" }]
          }
        ],
        categories: ["productivity", "education", "travel"]
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
