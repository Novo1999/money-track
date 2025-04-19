import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'MoneyTrack - Personal Finance Tracker',
        short_name: 'MoneyTrack',
        description: 'Track your monthly expenses with ease',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'mask-icon.svg',
            sizes: '64x64',
            type: 'image/svg'
          },
          {
            src: 'mask-icon.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: 'mask-icon.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'any'
          },
          {
            src: 'mask-icon.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
