import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from '@unocss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/web-audio/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [vue(), UnoCSS()],
}))
