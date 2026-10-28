import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./content/profile.ts";

// https://astro.build/config
export default defineConfig({
  site: site.url,
  output: "static",
  devToolbar: { enabled: false },
  trailingSlash: "ignore",
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes("/offline/") })],
  vite: { plugins: [tailwindcss()] },
});
