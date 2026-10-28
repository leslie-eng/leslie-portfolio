// Renders the Resume (content/resume.mjs) to a text-extractable PDF at
// public/resume.pdf. ATS-friendly: standard Helvetica, selectable text, no tables.
import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { resume } from "../content/resume.mjs";

const outPath = join(process.cwd(), "public", "resume.pdf");
await mkdir(dirname(outPath), { recursive: true });

const doc = new PDFDocument({ size: "A4", margins: { top: 40, bottom: 40, left: 46, right: 46 } });
doc.pipe(createWriteStream(outPath));

const INK = "#111318";
const MUTED = "#5b616e";
const ACCENT = "#0b5f4a";
const WIDTH = doc.page.width - doc.page.margins.left - doc.page.margins.right;

const heading = (text) => {
  doc.moveDown(0.5);
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(ACCENT).text(text.toUpperCase(), { characterSpacing: 1 });
  doc.moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.margins.left + WIDTH, doc.y)
    .strokeColor("#c9cdd4").lineWidth(0.75).stroke();
  doc.moveDown(0.35);
};

const bullet = (text, opts = {}) => {
  doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(text, {
    bulletIndent: 4,
    indent: 12,
    lineGap: 1,
    ...opts,
  });
};

// Header
doc.font("Helvetica-Bold").fontSize(19).fillColor(INK).text(resume.name, { align: "center" });
doc.font("Helvetica").fontSize(10.5).fillColor(MUTED).text(resume.headline, { align: "center" });
doc.font("Helvetica").fontSize(9).fillColor(INK).text(resume.contact.join("  ·  "), { align: "center" });

heading("Professional Summary");
doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(resume.summary, { lineGap: 1 });

heading("Technical Skills");
for (const [group, items] of resume.skills) {
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(group + ": ", { continued: true });
  doc.font("Helvetica").fillColor(INK).text(items, { lineGap: 1 });
}

heading("Professional Experience");
resume.experience.forEach((job, i) => {
  if (i > 0) doc.moveDown(0.35);
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(job.role, { continued: true });
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(`   ${job.dates}`, { continued: false });
  doc.font("Helvetica-Oblique").fontSize(9.5).fillColor(MUTED).text(job.org);
  for (const b of job.bullets) bullet(b);
});

heading("Key Projects");
for (const p of resume.projects) {
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(p.name, { continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(` — ${p.detail}`, { lineGap: 1 });
}

heading("Education");
for (const e of resume.education) bullet(e);

heading("Certifications");
for (const c of resume.certifications) bullet(c);

heading("Languages");
doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(resume.languages);

doc.end();
await new Promise((resolve, reject) => {
  doc.on("end", resolve);
  doc.on("error", reject);
});
console.log(`resume: wrote ${outPath}`);
