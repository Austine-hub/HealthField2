import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  appType: "spa", // Ensures React Router SPA fallback
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
});




