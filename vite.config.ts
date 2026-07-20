import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  logLevel: "info",
  plugins: [
    {
      name: "suppress-css-warnings",
      enforce: "pre",
      configResolved(config) {
        const originalWarn = config.logger.warn;
        config.logger.warn = (msg, options) => {
          if (msg.includes("color-adjust")) return;
          originalWarn(msg, options);
        };
      },
    },
    react(),
  ],
  resolve: {
    dedupe: [
      "@codemirror/state",
      "@codemirror/view",
      "@codemirror/language",
      "@codemirror/search",
      "@codemirror/lang-json",
      "@lezer/common",
      "@lezer/highlight",
    ],
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@jsonhero/json-infer-types/lib/formats": path.resolve(
        __dirname,
        "./src/shims/json-infer-types-formats.ts"
      ),
      "@jsonhero/json-infer-types/lib/@types": path.resolve(
        __dirname,
        "./src/shims/json-infer-types-types.ts"
      ),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: process.env.JSON_HERO_API_URL ?? "http://127.0.0.1:13001",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
});
