import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  { ignores: ["dist/", ".astro/", "node_modules/", "public/", ".lighthouseci/"] },
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.mjs", "public/**/*.js"],
    languageOptions: { globals: { console: "readonly", process: "readonly", Buffer: "readonly" } },
  },
];
