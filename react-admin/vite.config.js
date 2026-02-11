import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { '/api': 'http://localhost:3001' } },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      layout: path.resolve(__dirname, './src/layout'),
      views: path.resolve(__dirname, './src/views'),
    },
  },
})
