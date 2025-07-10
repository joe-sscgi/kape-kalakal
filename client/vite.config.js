import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // host: "0.0.0.0",
    // host: "127.0.0.1",
    port: 5103,
    proxy: {
      "/api": {
        target: "http://localhost:5100/api",
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
