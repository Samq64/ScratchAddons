import { defineConfig } from "vite";
import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  base: "/dist/",
  plugins: [svelte()],

  build: {
    outDir: "../dist/",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: "popup.html",
        settings: "settings.html",
      },
    },
  },
});
