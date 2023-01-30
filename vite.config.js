import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'logos/apple-touch-icon.png', 'logos/masked-icon.svg', './rive/logout.riv'],
      manifest: {
        name: 'Coding Pingkai',
        short_name: 'Coding PingKai',
        description: 'Learn algorithm for everyone!',
        theme_color: '#FFF4CE',
        icons: [
          {
            src: 'logos/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logos/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
  })],
  resolve: {
    alias: {
      '@': '/src',
      'node_modules': '/node_modules',
      'libs': '/src/libs',
    }
  },
  build: {
    outDir: 'dist',
  }
})
