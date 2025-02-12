import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Ensuring this is always a number
    open: true,
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:5000", // Backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    port: Number(process.env.PORT) || 10000, // Ensuring this is a number
    host: "0.0.0.0",
    open: false,
  },
})
