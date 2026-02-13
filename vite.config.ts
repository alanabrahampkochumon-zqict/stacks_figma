import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
    plugins: [react(), viteSingleFile()],
    build: {
        target: "esnext",
        assetsInlineLimit: 100000000, // Force everything inline
        chunkSizeWarningLimit: 100000000,
        cssCodeSplit: false, // Don't split CSS
        emptyOutDir: false,
        outDir: "dist",
        rollupOptions: {
            input: {
                ui: "./index.html", // Your React entry HTML
            },
            output: {
                entryFileNames: "ui.js", // Output specific name
            },
        },
    },
});
