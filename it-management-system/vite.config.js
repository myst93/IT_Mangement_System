import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Update with your backend URL
});
