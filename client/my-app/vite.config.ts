import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: "https://team-book-it-993b.onrender.com", // Your deployed backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
