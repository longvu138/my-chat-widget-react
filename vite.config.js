// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // tránh lỗi process
  },
  build: {
    lib: {
      entry: 'src/embed.jsx',
      name: 'SimpleChatButton',
      formats: ['iife'],
      fileName: () => `widget.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});