import type { APIRoute, GetStaticPaths } from "astro";
import { iconPng } from "../../lib/images";

// PWA + platform icons, generated at build time.
const ICONS = {
  "icon-192": { width: 192, maskable: false },
  "icon-512": { width: 512, maskable: false },
  "icon-maskable-512": { width: 512, maskable: true },
  "apple-touch-icon": { width: 180, maskable: true },
} as const;

export const getStaticPaths: GetStaticPaths = () =>
  Object.entries(ICONS).map(([name, props]) => ({ params: { name }, props }));

export const GET: APIRoute = async ({ props }) =>
  new Response(await iconPng(props.width as number, props.maskable as boolean), {
    headers: { "Content-Type": "image/png" },
  });
