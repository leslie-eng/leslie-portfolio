---
title: Streaming ETL — API to Kafka to Warehouse
order: 3
summary: "A local streaming pipeline: an external API is pulled by an Airflow producer, streamed through a Kafka topic, consumed into PostgreSQL, and observed live in Grafana."
discipline: DATA ENGINEERING
impact: End-to-end streaming path — API → Kafka topic → PostgreSQL → Grafana — with every hop orchestrated by Airflow, demonstrating the streaming pattern production telemetry needs.
stack:
  - Apache Kafka
  - Apache Airflow
  - PostgreSQL
  - Grafana
  - Python
evidence:
  - kind: repo
    label: ETL_001
    url: https://github.com/leslie-eng/ETL_001
---

## Problem

Batch pipelines answer yesterday's questions. When data arrives continuously — device telemetry, user events, sensor readings — the pipeline needs a streaming spine: decoupled producers and consumers, a buffer that survives consumers falling behind, and dashboards that show the stream's health while it flows.

## Approach

- **Produce.** An Airflow DAG pulls records from an external API (randomuser.me as the stand-in for any real feed), formats them, and streams them to a Kafka topic (`users_created`) — ingestion, transformation, and emission as three explicit, retryable tasks.
- **Buffer.** Kafka decouples producer from consumer: the consumer can crash, redeploy, or lag without losing the stream.
- **Consume.** A standalone Python consumer commits records into a PostgreSQL table, the system of record.
- **Observe.** Grafana reads the warehouse so the pipeline's shape — throughput, lag, contents — is visible in real time, not inferred from logs.

## Outcome

A complete streaming reference path with the same bones as production telemetry systems I've worked on: orchestrated ingestion at Lectrotel, where ESP32/Firebase device signals became structured, model-ready datasets. The stack is swappable; the pattern isn't.
