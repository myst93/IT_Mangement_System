import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173,      // Default Vite port, can be changed
    proxy: {
      '/api': 'http://10.1.0.222:3000', // Point to your backend running on LAN IP
    },
  },
})

const api = axios.create({
  baseURL: '/api'
});
