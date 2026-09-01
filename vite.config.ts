import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://<user>.github.io/portfolio/ — override with BASE_PATH=/ for a custom domain.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/portfolio/',
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false },
})
