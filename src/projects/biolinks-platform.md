---
title: Biolinks — Production Platform Under Contract
order: 4
summary: A contract engagement delivering the public site and staff back-office for a Kenyan biopharma supplier — React + FastAPI + PostgreSQL, running in production with real users.
discipline: FULL-STACK // CONTRACT
impact: Delivered a live production system — biopharmlifescience.co.ke — serving a real company's catalog, POS, orders, clients, and finances under a single contract engagement.
stack:
  - React 18
  - TypeScript
  - Vite
  - FastAPI
  - SQLAlchemy 2
  - PostgreSQL 17
evidence:
  - kind: live
    label: LIVE PRODUCTION SITE
    url: https://biopharmlifescience.co.ke
  - kind: repo
    label: SOURCE CODE
    url: https://github.com/leslie-eng/biopharmlifescience
---

## Problem

A Kenyan biopharma supplier needed its operation online: a trustworthy public face (catalog, calculators, assessments) and a back-office that staff would actually run daily — products, POS, orders, clients, finances, reports. Off-the-shelf storefronts couldn't model their business; a hand-rolled spreadsheet "system" was holding it together.

## Approach

Delivered as a contract engagement, end to end:

- **Architecture that fits the budget.** React 18 + Vite SPA on Vercel; FastAPI (SQLAlchemy 2, Alembic migrations, PyJWT auth, bcrypt) on Render; PostgreSQL 17 as the source of truth. Boring, cheap, and fully owned.
- **Public site.** Product catalog, the Dhibiti model, an Akiba savings calculator, facility assessment, and a chatbot entry point — built to be credible to medical customers, not just pretty.
- **Staff back-office.** Products, point-of-sale, orders, clients, and finances with reports — the screens staff live in, with auth and roles handled properly (JWT, hashed credentials, Alembic-managed schema).
- **Production discipline.** Migrations versioned in the repo, environment split between frontend and API hosts, product images on a dedicated uploads disk.

## Outcome

The system runs today at [biopharmlifescience.co.ke](https://biopharmlifescience.co.ke) with its API at `api.biopharmlifescience.co.ke`, serving a real business's daily operations. Contract delivery — scoped, shipped, handed over — with the code public and the production URL as standing evidence.
