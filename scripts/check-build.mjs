// Build-output gate: the one seam (per spec). Asserts on emitted HTML only.
import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function mustContain(file, needles) {
  const path = join(dist, file);
  if (!(await exists(path))) throw new Error(`missing build output: ${file}`);
  const html = await readFile(path, "utf8");
  for (const n of needles) {
    if (!html.includes(n)) throw new Error(`${file} does not contain: "${n}"`);
  }
}

const HEADLINE = "Data engineer. Founder of Kinetic Kraft Robotics.";
const SECTIONS = ["Projects", "Skills", "About", "Certifications", "Resume", "Contact"];

// The sample Case Study authored for the content-pipeline ticket.
const SAMPLE = {
  slug: "retail-medallion-warehouse",
  galleryNeedles: ["Retail Store Data Warehouse", "Bronze → Silver → Gold"],
  pageNeedles: ["MinIO", "Apache Airflow 3", "Evidence"],
};

try {
  await mustContain("index.html", [HEADLINE, ...SECTIONS, ...SAMPLE.galleryNeedles]);
  await mustContain(join("projects", SAMPLE.slug, "index.html"), SAMPLE.pageNeedles);
  if (!(await exists(join(dist, "404.html")))) throw new Error("missing build output: 404.html");
  const projectPages = (await exists(join(dist, "projects")))
    ? (await readdir(join(dist, "projects"))).filter((d) => !d.startsWith("."))
    : [];
  console.log(`check-build: OK — index, 404, ${projectPages.length} Case Study page(s)`);
} catch (err) {
  console.error(`check-build: FAIL — ${err.message}`);
  process.exit(1);
}
