import { defineConfig } from "@solidjs/start/config";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss() as any],
    ssr: { external: ["drizzle-orm"] },
  },

  middleware: "./src/middleware.ts"
});
