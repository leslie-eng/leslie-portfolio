import type { APIRoute } from "astro";
import { site } from "../../content/profile";

export const GET: APIRoute = () =>
  new Response(
    ["User-agent: *", "Allow: /", "Disallow: /offline/", "", `Sitemap: ${new URL("/sitemap-index.xml", site.url).href}`, ""].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
