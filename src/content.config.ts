import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Featured Projects: one markdown file per Case Study. The schema enforces the
// Case Study format (problem → approach → stack → outcome) plus Evidence, and
// the order field fixes gallery position (Flagship is order 1).
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/projects" }),
  schema: z.object({
    title: z.string(),
    order: z.number().int().min(1),
    summary: z.string().max(200),
    discipline: z.string().default("DATA ENGINEERING"),
    impact: z.string().max(220).optional(),
    stack: z.array(z.string()),
    // Evidence that the work is real. At least one entry per Case Study;
    // kind "photos" may be pending while images are awaited.
    evidence: z
      .array(
        z.object({
          kind: z.enum(["repo", "live", "photos"]),
          label: z.string(),
          url: z.string().url().optional(),
          pending: z.boolean().default(false),
        })
      )
      .min(1),
  }),
});

export const collections = { projects };
