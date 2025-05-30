import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    // Add this to prevent issues with external scripts
    global: "globalThis",
  },
});
