import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Your deployed backend URL , change it back to http://localhost:5000 , if domain doesnt work. Swap to https://team-book-it.onrender.com:5000 if the other doesn't work.
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
