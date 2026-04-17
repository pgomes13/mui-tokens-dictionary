import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/mui-tokens-dictionary/',
  resolve: {
    alias: {
      '@tokens': path.resolve(__dirname, '../tokens'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
