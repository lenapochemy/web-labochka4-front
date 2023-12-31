import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  base : "",
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // proxy: 'http://localhost:8080'
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8080',
  //     changeOrigin: true,
  //     ws: true,
  //     secure: false
  //   }
  // }
  // ,
  // server: {
  //   port: 5353,
  //   proxy: {
  //     '/api' :{
  //       target: 'http://localhost:8080/lab4-1.0-SNAPSHOT/api',
  //       ws: true,
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // }
})