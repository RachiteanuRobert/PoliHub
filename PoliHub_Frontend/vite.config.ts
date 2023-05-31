/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    tsconfigPaths(),
  ],
  base: "/",
  server: {
    proxy: {
      '/api': {
        target: 'http://10.41.125.127:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: 3000,
    hmr: {
      protocol: "ws",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
