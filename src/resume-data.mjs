// Single source of truth for the Resume (from the data-engineer CV — the fact
// authority). Rendered to a text-extractable PDF by scripts/build-resume.mjs.
export const resume = {
  name: "LESLIE GUSERWA ANGU",
  headline: "Data Engineer | Telemetry, Metrics & Dashboard Analytics",
  contact: [
    "Nairobi, Kenya",
    "anguleslie7@gmail.com",
    "+254 707 700 995",
    "github.com/leslie-eng",
    "linkedin.com/in/leslie-angu-00aa86341",
  ],
  summary:
    "Data engineer with 3 years of experience designing and maintaining SQL-driven ELT/ETL pipelines, operational dashboards, and cloud data infrastructure. Skilled in SQL optimization (joins, CTEs, window functions), Power BI dashboarding, and automated reporting, applying software engineering best practices to deliver clean, governed, well-documented datasets. Experienced analyzing telemetry from embedded hardware and sensor systems for root-cause findings. Founder of Kinetic Kraft Robotics.",
  skills: [
    ["Query Languages & Telemetry", "SQL (joins, CTEs, window functions, optimization), KQL transferability, large-scale extraction, root-cause analysis"],
    ["Data Engineering & ELT/ETL", "Pipeline design, multi-source extraction/transformation, validation & quality checks, metric ownership"],
    ["Data Modeling & Warehousing", "Kimball dimensional modeling, star schema, lakehouse layers (raw/clean/curated), governance"],
    ["Cloud & Platforms", "AWS (S3, Glue, Redshift), Google BigQuery, Azure Data Factory, PySpark, Apache Airflow, Apache Kafka"],
    ["Dashboards & Reporting", "Power BI, Tableau, Matplotlib, Seaborn, Plotly, automated reporting pipelines"],
    ["Device Telemetry & Embedded", "ESP32/Arduino telemetry capture, Firebase logging, C/C++, sensor integration"],
    ["Programming", "Python (Pandas, NumPy, Scikit-learn, SciPy, Statsmodels), Bash, C, C++, JavaScript, Git, Jupyter"],
  ],
  experience: [
    {
      role: "Data Scientist (Data Engineering Focus)",
      org: "Afrineuron — Nairobi, Kenya",
      dates: "Jan 2024 - Present",
      bullets: [
        "Designed, built, and maintained ELT/ETL pipelines in Python (Pandas, NumPy) turning multi-source raw data (files, SQL, NoSQL, APIs) into analysis-ready datasets, improving downstream reliability by ~30%.",
        "Applied Kimball-style dimensional modeling to structure datasets feeding BI dashboards, improving report reliability.",
        "Built and managed a centralized data repository on AWS S3, Glue, and Redshift alongside BigQuery, cutting manual preparation time by ~25%.",
        "Monitored pipelines for performance, availability, and quality; contributed to governance and MLOps workflows including drift detection.",
        "Documented data architecture, logic, and dependencies; presented findings to non-technical audiences.",
      ],
    },
    {
      role: "Data Analyst / Data Scientist",
      org: "Almasi Bottlers — Nairobi, Kenya",
      dates: "Jun 2022 - Dec 2023",
      bullets: [
        "Optimized SQL queries across relational databases, cutting query run times by up to 35%.",
        "Built automated, ELT-driven Power BI and Tableau dashboards that let non-technical operational and sales teams self-serve KPIs.",
        "Designed and maintained pipelines feeding forecasting and classification models with rigorous EDA, feature engineering, and validation.",
        "Maintained data integrity above 99% through systematic cleansing and validation workflows.",
      ],
    },
    {
      role: "Junior Data Scientist",
      org: "Lectrotel Microsystems — Nairobi, Kenya",
      dates: "Oct 2021 - May 2022",
      bullets: [
        "Built structured datasets from raw ESP32/Arduino/Firebase telemetry, applying ETL best practices to identify device-level failure and performance patterns.",
        "Automated data collection and processing workflows in Python, reducing manual preparation time and improving reproducibility by ~40%.",
        "Performed EDA on engineering and operational telemetry and built SQL-based visualization and reporting layers.",
      ],
    },
  ],
  projects: [
    {
      name: "Retail Store Data Warehouse (Medallion Architecture)",
      detail: "MinIO → PostgreSQL batch pipeline, Bronze → Silver → Gold, orchestrated with Apache Airflow 3. github.com/leslie-eng/medallion-arch-pipeline",
    },
    {
      name: "Streaming ETL Pipeline (API → Kafka → PostgreSQL)",
      detail: "Airflow-produced Kafka topic consumed into PostgreSQL with Grafana observability. github.com/leslie-eng/ETL_001",
    },
    {
      name: "Accident Severity Prediction Model",
      detail: "End-to-end pipeline: preprocessing, EDA, feature engineering, training, evaluation. github.com/leslie-eng/Accident-prediction-using-decision-tree-classifier",
    },
  ],
  education: [
    "BSc Electrical & Electronic Engineering — Technical University of Mombasa",
    "Applied Data Science Lab — WorldQuant University (Credly-verified)",
    "Machine Learning Specialisation — Stanford University via Coursera",
  ],
  certifications: [
    "Certified Data Analyst — LuxDev Academy",
    "Certified Data Engineer — LuxDev Academy (expected)",
    "AWS Data Engineering Certification (in progress)",
  ],
  languages: "English (fluent), Swahili (fluent)",
};
