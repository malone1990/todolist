import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
    // vite.config.js
  server: { proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true }}} //开发环境下的接口代理，解决跨域问题
})
