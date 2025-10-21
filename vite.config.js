// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": {}, // tránh lỗi process
  },
  envPrefix: "APP_",
  build: {
    lib: {
      entry: "src/embed.jsx",
      name: "SimpleChatButton",
      formats: ["iife"],
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
