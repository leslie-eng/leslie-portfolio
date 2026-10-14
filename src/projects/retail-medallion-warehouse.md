---
title: Retail Store Data Warehouse
order: 2
summary: A batch data pipeline that lands a real e-commerce dataset in an object store, then models it Bronze → Silver → Gold into a PostgreSQL warehouse, orchestrated by Airflow.
stack:
  - Apache Airflow 3
  - PostgreSQL
  - MinIO (S3)
  - Python
  - Kimball modeling
evidence:
  - kind: repo
    label: medallion-arch-pipeline
    url: https://github.com/leslie-eng/medallion-arch-pipeline
---

## Problem

Raw e-commerce data (orders, customers, payments, geolocation) is only useful for decisions once it is typed, cleaned, and modeled. The task: turn a raw multi-file dataset into a governed warehouse that analysts can query without touching the mess.

## Approach

- **Land it raw (Bronze).** The [Olist Brazilian E-Commerce dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce) lands in MinIO (S3-compatible) and is loaded into PostgreSQL as-is — an immutable raw layer.
- **Clean and type it (Silver).** Standardized column types, deduplicated keys, parsed dates.
- **Model it (Gold).** Kimball-style snowflake views: dimension and fact tables business questions can be asked directly.
- **Orchestrate it.** Apache Airflow 3 runs the pipeline as a DAG (landing → load → model → archive), so the whole flow is reproducible, observable, and restartable.

## Outcome

A warehouse where "what did revenue look like per state, per category?" is one query instead of a archaeology project — plus a pipeline structure that transfers directly to production ELT work.
