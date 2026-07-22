import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["packages/*/src/**/*.test.ts", "tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json"],
      include: ["packages/*/src/**/*.ts"],
      exclude: ["packages/*/src/**/*.test.ts"],
    },
  },
  resolve: {
    alias: {
      "@docscript/types": path.resolve(__dirname, "packages/types/src"),
      "@docscript/core": path.resolve(__dirname, "packages/core/src"),
      "@docscript/parser": path.resolve(__dirname, "packages/parser/src"),
      "@docscript/validator": path.resolve(__dirname, "packages/validator/src"),
      "@docscript/renderer-docx": path.resolve(
        __dirname,
        "packages/renderer-docx/src",
      ),
    },
  },
});
