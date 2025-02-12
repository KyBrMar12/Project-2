import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: "https://team-book-it.onrender.com", // Your deployed backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
    allowedHosts: ["team-book-it-993b.onrender.com"], // ✅ Add your Render frontend URL
  },
})
