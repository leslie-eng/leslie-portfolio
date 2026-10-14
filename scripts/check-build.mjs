// Build-output gate: the one seam (per spec). Asserts on emitted HTML only.
import { access, readFile } from "node:fs/promises";
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

try {
  await mustContain("index.html", [HEADLINE, ...SECTIONS]);
  if (!(await exists(join(dist, "404.html")))) throw new Error("missing build output: 404.html");
  console.log("check-build: OK — index + 404 emitted, Headline and sections present");
} catch (err) {
  console.error(`check-build: FAIL — ${err.message}`);
  process.exit(1);
}
