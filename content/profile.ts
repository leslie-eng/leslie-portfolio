/**
 * Single source of truth for everything on the site except project prose
 * (which lives in content/projects/*.mdx).
 *
 * Every value marked `TODO(me)` is waiting on Leslie. A `null` TODO is never
 * rendered — the UI simply omits it — so the site never ships an empty
 * placeholder. Fill a value in and it appears on the next build.
 *
 *   grep -n "TODO(me)" content/profile.ts
 */

export type Link = { label: string; href: string };
export type Metric = { label: string; value: string | null };
export type Screenshot = { src: string; alt: string; caption: string };

export const site = {
  // TODO(me): switch to the custom domain once it is attached in Vercel.
  url: "https://leslie-portfolio-pudu.vercel.app",
  title: "Leslie Angu — Data Engineer",
  description:
    "Leslie Angu is a data engineer in Nairobi building batch and streaming pipelines, warehouses and orchestration with Airflow, Kafka, PostgreSQL and AWS.",
  locale: "en_KE",
};

export const profile = {
  name: "Leslie Angu",
  fullName: "Leslie Guserwa Angu",
  role: "Data Engineer",
  title: "Data Engineer — batch & streaming pipelines, warehousing, Airflow/Kafka/AWS",
  location: "Nairobi, Kenya",
  availability: "Open to Data Engineering roles · Nairobi / Remote",
  value: [
    "I build the pipelines and warehouses that turn messy, multi-source data into tables people can trust — from Kafka streams and Airflow DAGs to Kimball models on PostgreSQL and AWS.",
    "Since 2021 I've done data work at Afrineuron, Almasi Bottlers and Lectrotel Microsystems, and shipped a production system for a contract client.",
  ],
  proof: [
    "Currently @ Afrineuron",
    "Live production client system",
    "Airflow · Kafka · Postgres · AWS",
  ],
  email: "anguleslie7@gmail.com",
  github: "https://github.com/leslie-eng",
  linkedin: "https://www.linkedin.com/in/leslie-angu-00aa86341",
  education: {
    degree: "BSc Electrical & Electronic Engineering",
    school: "Technical University of Mombasa",
  },
  languages: ["English", "Swahili"],
};

export const resume = {
  href: "/resume.pdf",
  // TODO(me): confirm — set to the month you last edited content/resume.mjs.
  updated: "October 2026",
};

// ——— Experience ————————————————————————————————————————————————
// Dates and figures come from the existing résumé (content/resume.mjs).
// TODO(me): confirm every date and percentage below is still accurate.

export type Job = {
  role: string;
  company: string;
  location: string;
  start: string | null;
  end: string | null;
  bullets: string[];
};

export const experience: Job[] = [
  {
    role: "Data Scientist (Data Engineering focus)",
    company: "Afrineuron",
    location: "Nairobi",
    start: "Jan 2024",
    end: "Present",
    bullets: [
      "Build and maintain Python ELT/ETL pipelines that turn files, SQL, NoSQL and API sources into analysis-ready datasets, improving downstream reliability by ~30%.",
      "Stood up a central data repository on AWS S3, Glue and Redshift alongside BigQuery, cutting manual data preparation time by ~25%.",
      "Model datasets Kimball-style for BI dashboards and monitor pipelines for performance, availability and data quality, including drift detection.",
    ],
  },
  {
    role: "Data Analyst / Data Scientist",
    company: "Almasi Bottlers",
    location: "Nairobi",
    start: "Jun 2022",
    end: "Dec 2023",
    bullets: [
      "Optimised SQL across relational databases, cutting query run times by up to 35%.",
      "Kept data integrity above 99% with systematic cleansing and validation workflows.",
      "Built automated Power BI and Tableau dashboards so operations and sales teams could self-serve KPIs.",
    ],
  },
  {
    role: "Junior Data Scientist",
    company: "Lectrotel Microsystems",
    location: "Nairobi",
    start: "Oct 2021",
    end: "May 2022",
    bullets: [
      "Turned raw ESP32, Arduino and Firebase device telemetry into structured datasets to find device-level failure and performance patterns.",
      "Automated collection and processing in Python, improving reproducibility and cutting preparation time by ~40%.",
    ],
  },
  {
    role: "Founder",
    company: "Kinetic Kraft Robotics",
    location: "Nairobi",
    start: null, // TODO(me): founding month/year, e.g. "Mar 2025"
    end: "Present",
    bullets: [
      "Founded a robotics startup whose first product, Address Yangu, pairs a field-installed LTE device with a tenant and caretaker web platform.",
      "Own the full system: STM32/FreeRTOS firmware, FastAPI backend, React PWA and field deployment.",
      // TODO(me): add a number, e.g. "Installed N units across N buildings".
    ],
  },
];

// ——— Skills (three groups, primary first) ——————————————————————————

export const skills = {
  primary: {
    name: "Data engineering",
    items: [
      "SQL — CTEs, window functions, query tuning",
      "Python — pandas, PySpark",
      "Apache Airflow",
      "Apache Kafka",
      "PostgreSQL",
      "Dimensional modelling — Kimball, star & snowflake",
      "Medallion / lakehouse layers",
      "ELT/ETL design",
      "Data quality & validation",
    ],
  },
  secondary: {
    name: "Cloud & tools",
    items: [
      "AWS — S3, Glue, Redshift",
      "Google BigQuery",
      "Azure Data Factory",
      "Docker Compose",
      "MinIO",
      "GitHub Actions",
      "Grafana",
      "Power BI",
      "Tableau",
    ],
  },
  range: {
    name: "Software & embedded",
    line: "FastAPI · React/TypeScript · C/C++ · FreeRTOS · STM32 / ESP32 · KiCad",
  },
};

// ——— Certifications ————————————————————————————————————————————————

export type Cert = {
  name: string;
  issuer: string;
  year: string | null;
  verify: string | null;
};

export const certifications: { completed: Cert[]; inProgress: string[] } = {
  completed: [
    {
      name: "Applied Data Science Lab",
      issuer: "WorldQuant University",
      year: null, // TODO(me): year issued
      verify: "https://www.credly.com/badges/cd1c52d3-7981-49ef-9f7b-b9d12e83a934",
    },
    {
      name: "Machine Learning Specialization",
      issuer: "Stanford University · Coursera",
      year: "2023",
      verify: null, // TODO(me): Coursera certificate URL
    },
    {
      name: "Certified Data Analyst",
      issuer: "LuxDev Academy",
      year: null, // TODO(me): year issued
      verify: null, // TODO(me): certificate URL
    },
  ],
  inProgress: [
    "Certified Data Engineer — LuxDev Academy",
    "AWS Data Engineering certification",
  ],
};

// ——— About (~80 words) ——————————————————————————————————————————————

export const about = [
  "I trained as an electrical and electronic engineer at the Technical University of Mombasa and started out writing firmware for sensors. Those devices produced data nobody was reading, so I moved into telemetry analysis, then analytics, then data engineering — building the pipelines and warehouses that make that data useful.",
  "I also founded Kinetic Kraft Robotics. Its first product, Address Yangu, pairs field hardware with a web platform. Hardware taught me that every dataset starts somewhere physical.",
];

// ——— Per-project numbers awaiting Leslie ————————————————————————————
// Keyed by project slug (the .mdx filename). `null` values are hidden.
// Known, already-verified numbers live in each project's frontmatter `results`.

export const projectMetrics: Record<string, Metric[]> = {
  "streaming-etl-kafka": [
    { label: "Events per producer run", value: null }, // TODO(me)
    { label: "Throughput (msgs/s)", value: null }, // TODO(me)
    { label: "End-to-end latency (API → Postgres)", value: null }, // TODO(me)
  ],
  "retail-medallion-warehouse": [
    { label: "Full pipeline runtime", value: null }, // TODO(me): e.g. "6 min 40 s"
    { label: "Rows loaded into bronze per run", value: null }, // TODO(me)
  ],
  "biolinks-platform": [
    { label: "Active staff users", value: null }, // TODO(me)
    { label: "Orders processed", value: null }, // TODO(me)
    { label: "In production since", value: null }, // TODO(me)
  ],
  "address-yangu": [
    { label: "Buildings with units installed", value: null }, // TODO(me)
    { label: "Tenants / caretakers onboarded", value: null }, // TODO(me)
  ],
  "classtrack": [
    { label: "Cohort members", value: null }, // TODO(me)
    { label: "Submissions graded", value: null }, // TODO(me)
  ],
};

// TODO(me): once you have a stronger headline number for a project, set it here
// and it replaces the card's "Outcome" line. Leave null to keep the frontmatter one.
export const outcomeOverrides: Record<string, string | null> = {
  "streaming-etl-kafka": null,
  "retail-medallion-warehouse": null,
  "biolinks-platform": null,
  "address-yangu": null,
  "classtrack": null,
};

// ——— Screenshots ————————————————————————————————————————————————
// Put images in public/screenshots/<slug>/ and list them here. A project with
// no screenshots simply has no Screenshots section.
// TODO(me): Airflow DAG graph, Grafana panel, warehouse query result,
//           Biolinks back-office, Address Yangu device + app.

export const screenshots: Record<string, Screenshot[]> = {
  "streaming-etl-kafka": [
    // { src: "/screenshots/streaming-etl-kafka/airflow-graph.png", alt: "Airflow graph view of the producer DAG", caption: "Producer DAG: get_data → format_data → stream_data" },
    // { src: "/screenshots/streaming-etl-kafka/grafana.png", alt: "Grafana panel of records by gender", caption: "Grafana reading the company_data table" },
  ],
  "retail-medallion-warehouse": [
    // { src: "/screenshots/retail-medallion-warehouse/airflow-graph.png", alt: "Airflow graph of the 7-task DAG", caption: "s3_to_postgres DAG, all tasks green" },
    // { src: "/screenshots/retail-medallion-warehouse/gold-query.png", alt: "Revenue by state and category query result", caption: "Revenue per state per category from gold.fact_orders" },
  ],
  "biolinks-platform": [],
  "address-yangu": [],
  "classtrack": [],
};
