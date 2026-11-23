import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Hors application : références, docs, exports de templates.
    "serelin/**",
    "serelin components/**",
    "references/**",
    "docs/**",
    "assets/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
