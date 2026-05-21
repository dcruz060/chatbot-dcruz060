import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, /api/chat se reenvía al backend ASP.NET local
    proxy: {
      "/api/chat": {
        target: "http://localhost:5172",
        changeOrigin: true,
      },
    },
  },
})
