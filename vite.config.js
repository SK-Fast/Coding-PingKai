import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

const packageJSONData = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const appVersion = packageJSONData.version
const chunkPrefix = appVersion.replace(/\./g, '')

console.log("Running vite config with chunk prefix ", chunkPrefix)

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
    },
    workbox: {
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__)/]
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
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-${chunkPrefix}.js`,
        chunkFileNames: `assets/[name]-${chunkPrefix}.js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
})
