import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One .mdx per Featured Project. Frontmatter feeds the home-page card and the
// case-study chrome (TL;DR, architecture, results, links); the MDX body holds
// the prose sections (Approach, Data quality & testing, What I'd do next).
const node = z.object({
  id: z.string(),
  label: z.string(),
  sub: z.string().optional(),
  col: z.number().int().min(0),
  row: z.number().min(0).default(0),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./content/projects" }),
  schema: z.object({
    title: z.string(),
    order: z.number().int().min(1),
    discipline: z.string(),
    problem: z.string().max(160),
    // Every outcome must contain a number.
    outcome: z.string().max(200).regex(/\d/, "Outcome must contain a number"),
    role: z.string(),
    tags: z.array(z.string()).min(4).max(5),
    stack: z.array(z.string()),
    links: z.object({
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
    }),
    results: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    next: z.array(z.string()).min(1),
    diagram: z.object({
      nodes: z.array(node).min(2),
      edges: z.array(
        z.object({ from: z.string(), to: z.string(), label: z.string().optional() })
      ),
    }),
  }),
});

export const collections = { projects };
