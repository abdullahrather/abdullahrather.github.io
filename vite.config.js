import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  define: {
    // react-google-recaptcha still references `global`
    global: "globalThis",
    // Shared by the client and pre-render builds so date-based text hydrates identically
    "import.meta.env.VITE_BUILD_TIME": JSON.stringify(process.env.VITE_BUILD_TIME || new Date().toISOString()),
  },
  build: {
    target: "es2022",
  },
});
