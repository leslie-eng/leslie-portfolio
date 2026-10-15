---
title: ClassTrack — Cohort Performance Engine
order: 5
summary: A cohort accountability platform — challenges, streaks, AI-graded article submissions, WhatsApp nudges, and weekly quizzes — built on FastAPI + React with in-browser code execution.
discipline: FULL-STACK + APPLIED AI
impact: Keeps a study cohort accountable with AI-graded submissions, streaks, leaderboards, automated WhatsApp nudges for members falling behind, and sandboxed in-browser coding exercises.
stack:
  - Python 3.13
  - FastAPI
  - SQLAlchemy 2
  - React 19
  - TypeScript
  - Tailwind v4
  - Pyodide
evidence:
  - kind: repo
    label: CLASS-TRACK REPO
    url: https://github.com/leslie-eng/class-performance-tracker
---

## Problem

Study cohorts die quietly: nobody submits, nobody notices, the group chat goes quiet. Accountability needs teeth — visible streaks, real consequences, and someone (or something) paying attention every single day.

## Approach

- **Daily loop.** Members join challenges and submit work — code, or a link to an article they wrote. Submissions earn points and streaks; challenge and global leaderboards make progress public.
- **AI grading with a rubric.** Article submissions are graded by Claude against a rubric, so feedback is consistent rather than vibes — an applied-LLM workflow, not a chatbot bolted on.
- **The Friday Drop.** A weekly digest at 08:00 (timezone-aware): week's notes, a pick between member-proposed projects, and a timed quiz (10/20/30 minutes, easy to hard). First Friday of the month adds an interview-prep quiz per specialization.
- **Nudges that land.** A nightly job finds members falling behind and can send a WhatsApp nudge; admins get a weekly digest of the cohort's health.
- **In-browser code exercises.** Python runs via Pyodide and JavaScript in a sandboxed worker — in the member's own browser, never on the server. Learning materials feed quiz and exercise generation through an admin review screen.
- **Stack.** FastAPI + SQLAlchemy 2 + APScheduler on the API; React 19 + TypeScript + Tailwind v4 + TanStack Query on the web; PostgreSQL (SQLite tolerated only in tests).

## Outcome

A platform that does the chasing so humans don't have to: submissions tracked, articles graded, stragglers nudged, admins informed — with the AI doing grading and generation under explicit rubrics and review screens, not free-form autonomy.
