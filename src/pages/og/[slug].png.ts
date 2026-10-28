import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { ogImage } from "../../lib/images";
import { profile } from "../../../content/profile";

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection("projects");
  return [
    { params: { slug: "home" }, props: { kicker: profile.availability, title: profile.name, subtitle: profile.title } },
    ...projects.map((p) => ({
      params: { slug: p.id },
      props: { kicker: `Case study · ${p.data.discipline}`, title: p.data.title, subtitle: p.data.outcome },
    })),
  ];
};

export const GET: APIRoute = async ({ props }) =>
  new Response(await ogImage(props as { kicker: string; title: string; subtitle: string }), {
    headers: { "Content-Type": "image/png" },
  });
