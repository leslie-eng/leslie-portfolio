// Build-output gate: asserts on the emitted static site only.
import { access, open, readFile } from "node:fs/promises";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function read(file) {
  const path = join(dist, file);
  if (!(await exists(path))) throw new Error(`missing build output: ${file}`);
  return readFile(path, "utf8");
}

async function mustContain(file, needles) {
  const html = (await read(file)).toLowerCase();
  for (const n of needles) {
    if (!html.includes(n.toLowerCase())) throw new Error(`${file} does not contain: "${n}"`);
  }
}

async function mustNotContain(file, needles) {
  const html = (await read(file)).toLowerCase();
  for (const n of needles) {
    if (html.includes(n.toLowerCase())) throw new Error(`${file} still contains: "${n}"`);
  }
}

// Never ship role-play copy or empty placeholders.
const BANNED = ["ARCHITECTURAL LOGS", "OPERATOR SPEC", "REGISTRY:", "[EXECUTE]", "whoami", "SYS.VER", "AWAITING ARTWORK", "IMAGES PENDING", "TODO(me)", "Measured outcome"];

const HOME = [
  "Data Engineer — batch &amp; streaming pipelines",
  "Open to Data Engineering roles",
  "View projects",
  "Download résumé",
  "/resume.pdf",
  "Résumé updated",
  "Projects", "Experience", "Skills", "Certifications", "About", "Contact",
  "Afrineuron", "Kinetic Kraft Robotics", "WorldQuant University", "Technical University of Mombasa",
  "anguleslie7@gmail.com", "github.com/leslie-eng", "linkedin.com/in/leslie-angu-00aa86341",
  "application/ld+json", "og:image", "twitter:card", "manifest.webmanifest",
];

// Order matters: data engineering first.
const PROJECTS = [
  { slug: "streaming-etl-kafka", needles: ["Kafka", "ON CONFLICT"] },
  { slug: "retail-medallion-warehouse", needles: ["112,650", "MinIO"] },
  { slug: "biolinks-platform", needles: ["biopharmlifescience.co.ke"] },
  { slug: "address-yangu", needles: ["Kinetic Kraft Robotics", "FreeRTOS"] },
  { slug: "classtrack", needles: ["Claude", "WhatsApp"] },
];
const CASE_STUDY_SECTIONS = ["TL;DR", "Architecture", "Approach", "Data quality &amp; testing", "Results", "What I'd do next"];

try {
  await mustContain("index.html", HOME);
  await mustNotContain("index.html", BANNED);

  const home = await read("index.html");
  const positions = PROJECTS.map((p) => home.indexOf(`/projects/${p.slug}/`));
  if (positions.some((p) => p < 0) || positions.some((p, i) => i > 0 && p < positions[i - 1])) {
    throw new Error("projects are missing or out of order on the home page");
  }

  for (const p of PROJECTS) {
    const file = join("projects", p.slug, "index.html");
    await mustContain(file, [...p.needles, ...CASE_STUDY_SECTIONS, "<svg"]);
    await mustNotContain(file, BANNED);
    if (!(await exists(join(dist, "og", `${p.slug}.png`)))) throw new Error(`missing og/${p.slug}.png`);
  }

  for (const f of ["404.html", "offline/index.html", "robots.txt", "sitemap-index.xml", "manifest.webmanifest", "sw.js", "og/home.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png"]) {
    if (!(await exists(join(dist, f)))) throw new Error(`missing build output: ${f}`);
  }

  const fh = await open(join(dist, "resume.pdf"));
  const header = Buffer.alloc(5);
  await fh.read(header, 0, 5, 0);
  await fh.close();
  if (header.toString("utf8") !== "%PDF-") throw new Error("resume.pdf is not a PDF");

  console.log(`check-build: OK — home, ${PROJECTS.length} case studies, OG images, PWA files, sitemap, resume.pdf`);
} catch (err) {
  console.error(`check-build: FAIL — ${err.message}`);
  process.exit(1);
}
