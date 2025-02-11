import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,  // Local Dev
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
    port: 4173, // Ensure Render can detect this port
    open: true,
  },
})
