# leslie-portfolio

Leslie Angu's portfolio — recruiter-facing, headline identity **Data Engineer**. Astro 5 (static) + Tailwind v4 + TypeScript, deployed on Vercel. Installable as a PWA.

## Editing content

| What | Where |
|---|---|
| Profile, hero, experience, skills, certifications, about, contact, metrics, screenshots | `content/profile.ts` |
| Case studies (frontmatter = card + TL;DR + diagram + results; body = Approach, Data quality & testing) | `content/projects/*.mdx` |
| Résumé (rendered to `public/resume.pdf` on every build) | `content/resume.mjs` |

Values still waiting on real numbers are marked `TODO(me)`; `null` values are hidden, never rendered as placeholders:

```sh
grep -rn "TODO(me)" content/
```

## Commands

```sh
npm run dev         # http://localhost:4321
npm run build       # resume.pdf → astro build → build-output checks
npm run lint        # ESLint
npm run typecheck   # astro check
npm run lighthouse  # Lighthouse CI against dist/ (≥ 0.95 perf / a11y / SEO)
```

CI (`.github/workflows/ci.yml`) runs lint, type-check, build and Lighthouse on every push and PR.

See GLOSSARY.md for the vocabulary that governs site copy.
