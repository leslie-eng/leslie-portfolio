// Build-output gate: the one seam (per spec). Asserts on emitted HTML only.
import { access, open, readFile } from "node:fs/promises";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function mustContain(file, needles) {
  const path = join(dist, file);
  if (!(await exists(path))) throw new Error(`missing build output: ${file}`);
  const html = (await readFile(path, "utf8")).toLowerCase();
  for (const n of needles) {
    const needle = n.toLowerCase();
    if (!html.includes(needle)) throw new Error(`${file} does not contain: "${n}"`);
  }
}

const HEADLINE = "Data engineer. Founder of Kinetic Kraft Robotics.";
const SECTIONS = ["Projects", "Skills", "About", "Certifications", "Resume", "Contact"];

// Supporting-section content (ticket T5).
const SECTION_CONTENT = [
  "Afrineuron", // experience fact (CV authority)
  "Kinetic Kraft Robotics", // startup story in About
  "WorldQuant University", // certification fact
  "anguleslie7@gmail.com", // contact link
  "Technical University of Mombasa", // education fact
  "/resume.pdf", // resume download link
];

const SAMPLE = {
  slug: "retail-medallion-warehouse",
  galleryNeedles: ["Retail Store Data Warehouse", "Bronze → Silver → Gold"],
  pageNeedles: ["MinIO", "Apache Airflow 3", "Evidence"],
};

// All five Featured Projects must be present in the gallery and as pages (T4).
const ALL_PROJECTS = [
  { slug: "address-yangu", pageNeedles: ["Kinetic Kraft Robotics", "unlock-with-token"] },
  { slug: "retail-medallion-warehouse", pageNeedles: SAMPLE.pageNeedles },
  { slug: "streaming-etl-kafka", pageNeedles: ["Kafka", "Airflow"] },
  { slug: "biolinks-platform", pageNeedles: ["biopharmlifescience.co.ke", "contract"] },
  { slug: "classtrack", pageNeedles: ["Claude", "WhatsApp"] },
];

try {
  await mustContain("index.html", [HEADLINE, ...SECTIONS, ...SECTION_CONTENT, ...SAMPLE.galleryNeedles]);
  if (!(await exists(join(dist, "404.html")))) throw new Error("missing build output: 404.html");

  for (const p of ALL_PROJECTS) {
    await mustContain(join("projects", p.slug, "index.html"), p.pageNeedles);
  }

  const resumePath = join(dist, "resume.pdf");
  if (!(await exists(resumePath))) throw new Error("missing build output: resume.pdf");
  const fh = await open(resumePath);
  const header = Buffer.alloc(5);
  await fh.read(header, 0, 5, 0);
  await fh.close();
  if (header.toString("utf8") !== "%PDF-") throw new Error("resume.pdf is not a PDF");

  console.log(`check-build: OK — index, 404, ${ALL_PROJECTS.length} Case Study page(s), resume.pdf`);
} catch (err) {
  console.error(`check-build: FAIL — ${err.message}`);
  process.exit(1);
}
