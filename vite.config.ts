// Vite + TanStack Start config (includes React, Tailwind, Nitro, and path aliases).
// Do NOT duplicate those plugins manually or the build will break.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts.
    server: { entry: "server" },
  },
});
