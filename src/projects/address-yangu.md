---
title: Address Yangu
order: 1
summary: Kinetic Kraft Robotics' first product — a housing-vacancy platform pairing a field-installed hardware unit with a tenant/caretaker web platform, built and shipped by my own startup.
discipline: EMBEDDED + FULL-STACK // FOUNDER
impact: A working vacancy platform with hardware units installed on real buildings — tenant search-to-unlock flow, caretaker vacancy management, and the device that feeds it, shipped by my own startup.
stack:
  - React (Vite) PWA
  - FastAPI
  - Leaflet / OpenStreetMap
  - ESP32-class field hardware
  - Geolocation search
evidence:
  - kind: photos
    label: FIELD INSTALLATION PHOTOS
    pending: true
  - kind: repo
    label: PUBLIC DEMO BUILD
    url: https://github.com/leslie-eng/address_yangu_version_2
---

## Problem

Finding a rental in Nairobi runs on word of mouth and photocopies. Vacancies go unlisted; tenants pay agents for information; caretakers manage occupancy on paper. And the data that would fix this — which buildings have space, right now — lives nowhere.

## Approach

I founded **Kinetic Kraft Robotics** to build the whole loop, device to dataset to user:

- **The device.** A field unit installed on participating buildings, capturing occupancy signals at the source. This is where my embedded background pays: the hardware is designed, assembled, and maintained by us, not procured around.
- **The platform.** A React PWA with phone + OTP login. Tenants search by unit type, price, and area — or use their current location, with results sorted by walking distance on an interactive OpenStreetMap. The unlock-with-token flow reveals caretaker contacts only after a genuine match, and directions links close the loop.
- **The caretaker side.** Vacancy management built for the person who actually flips the switch: mark units occupied or open, keep the platform honest at the source.
- **The demo build.** The public repository is a trimmed, runnable version of the production system (mocked OTP, map without paid API keys) so the flow can be inspected without exposing production secrets. Production runs the full stack: PostGIS spatial queries, SMS/USSD via Africa's Talking, M-Pesa/Daraja payments, admin portal, and the AY-NVD2 device integration.

## Outcome

The system exists in the field: hardware installed on real buildings and a platform connecting tenants to caretakers. As founder I owned everything — hardware design, backend, frontend, and the deployment itself — which is the strongest proof I can offer that my data pipelines never lose touch with where data is born.

*Installation photographs are being added; the evidence links above already point at the public demo build.*
