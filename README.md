# UPS CREATOR STUDIO — Master Integrated Build

**IMAGINE. CREATE. INNOVATE.**  
Created & Developed by UMESH PRAKASH SINGH.

This package consolidates the desktop-first responsive workspace, backend starter, the fixed 12-engine / 100-module / 25-lock architecture, the Visual Quality Master Engine, requirement register, package entitlement specification, test suite and retained V11 reference implementation.

## Read these first
1. `docs/MASTER_REQUIREMENTS_REGISTER_HI.md` — consolidated requirements and constraints.
2. `docs/FEATURE_STATUS.md` — honest implementation state.
3. `docs/VISUAL_QUALITY_MASTER_ENGINE.md` — four visual masters and locks.
4. `docs/PACKAGE_ENTITLEMENT_SPEC.md` — Daily / Single Study / Full Study rules.
5. `docs/MASTER_PRODUCTION_SEQUENCE_HI.md` — canonical AI Smart production order.
6. `docs/LEGACY_V11_INTEGRATION_HI.md` — previous V11 tools and boundaries.
7. `docs/QA_CHECKLIST.md` and `docs/RELEASE_AUDIT.md` — validation plan.

## Architecture
- `frontend/`: static responsive UI, guided wizard, local project storage, prompt generation, visual auto-routing helper, in-app optional Gemini generation action, PWA files.
- `backend/`: Node.js 20+ Express API for health, capabilities, RSS discovery and optional Gemini text generation.
- `supabase/`: additive starter schema; review and back up existing data before applying SQL.
- `server/pipeline-config.js`: canonical 12 engines, 100 modules, 25 master locks.
- `tests/`: automated architecture, visual-engine and release checks.
- `frontend/legacy-v11/`: deployed-accessible V11 Legacy Tools Lab, linked from the current dashboard.
- `legacy-reference/V11_INFINITY_FINAL_PLUS/`: original V11 source and separate render backend retained for comparison/recovery.

## Local QA
At the project root:
```bash
npm run check
npm test
```
Backend setup:
```bash
cd backend
cp .env.example .env
npm install
npm start
```
Serve frontend locally from `frontend/` with a static server. Copy `config.example.js` to `config.js` and configure only the Supabase project URL, public anon key and backend base URL.

## Deployment
- GitHub Pages serves only the contents of `frontend/`.
- Deploy `backend/` separately on a Node.js host (Node 20+); set `ALLOWED_ORIGINS` to the exact frontend origin.
- Keep Gemini and other private API keys in backend environment variables only. The Auto-Pilot Production Workspace calls the backend text-generation endpoint when configured.
- Never place Supabase service-role keys in frontend code.
- Android APK is a later Capacitor + Android Studio build after web validation; this ZIP does not claim to contain a signed APK.

## Important
This is a consolidated build package, not a claim that every planned service is live. Direct AI image/video generation, TTS/lip-sync, MP4 rendering, Meta publishing/analytics, payment verification, admin entitlements and Android APK signing need separate provider integrations and live tests. See `docs/FEATURE_STATUS.md`.
