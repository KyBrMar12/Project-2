import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Local development
    open: true,
    proxy: {
      "/api": {
        target: "https://team-book-it.onrender.com", // Backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    port: process.env.PORT || 10000, // Ensure Render detects this
    host: "0.0.0.0", // Required for Render to bind properly
    open: false,
  },
})
