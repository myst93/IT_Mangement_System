import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://it-mangement-system.onrender.com' || 'http://localhost:3000',
        // target: 'https://it-mangement-system.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
