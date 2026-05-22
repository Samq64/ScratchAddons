import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";

export default defineConfig({
  root: ".",
  base: "./",
  publicDir: "public",
  build: {
    outDir: "../webpages",
    emptyOutDir: true,
    assetsDir: "assets",
    target: "es2022",
    cssCodeSplit: true,
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup/index.html"),
        settings: resolve(__dirname, "settings/index.html"),
        popups: resolve(__dirname, "popups/index.html"),
      },
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        runes: true,
        css: "external",
      },
      onwarn(warning, defaultHandler) {
        // The legacy pages used many imperative DOM interactions; suppress noisy a11y warnings.
        if (warning.code?.startsWith("a11y_")) return;
        if (warning.code === "state_referenced_locally") return;
        defaultHandler?.(warning);
      },
    }),
  ],
  resolve: {
    alias: {
      $lib: resolve(__dirname, "lib"),
      $libraries: resolve(__dirname, "../libraries"),
      $images: resolve(__dirname, "../images"),
      $addons: resolve(__dirname, "../addons"),
    },
  },
  server: {
    port: 5173,
  },
});
