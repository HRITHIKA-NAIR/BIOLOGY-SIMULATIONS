# Practical room

An original, Boardworks-inspired school science practical website. This branch replaces the single-page prototype with a static, modular Biology preview collection. The original code is retained under `legacy/photosynthesis/` and at its existing route for comparison; the new catalogue does not link to that unverified pondweed model.

## Current scope

Pearson Edexcel GCSE (9–1) Combined Science (1SC0), Biology: microscopy 1.6, enzymes 1.10, osmosis 1.16, photosynthesis 6.5, respiration 8.11 and fieldwork 9.5. Food tests 1.13B and antimicrobial effects 5.18B are additional for this collection and **core in separate GCSE Biology**, not Combined Science core.

Eight original **reference-based previews** include Watch/Try modes, direct SVG object actions, keyboard/select-and-place alternatives, five-stage written summaries, one quiz each, opt-in device checkpoints and generated PDF preview notes. Photosynthesis uses an algal-ball/indicator method from the Pearson reference sheet. The old bubble-counting prototype is not silently relabelled.

**Exact video fidelity is not verified.** YouTube video/transcript retrieval was unavailable during this implementation. Video URLs are recorded but no timestamps have been invented. Source sheets were consulted, not copied or redistributed. These previews must not be described as complete, video-matched practicals. Antimicrobials is an interpretation-only scene, not a complete culture protocol. See `docs/CONTENT_REVIEW.md`.

## Run

Node 22.12+ (CI uses Node 24).

```sh
npm ci
npm run build
npm run dev
```

Open http://localhost:4173/BIOLOGY-SIMULATIONS/ . `npm run dev` builds first and serves the production output; restart it after source changes.

```sh
npm test
npx playwright install chromium
npm run test:e2e
```

## Architecture

| Path | Responsibility |
|---|---|
| `apps/web/src/app.js` | Catalogue, player controls, quiz, saving, offline UI |
| `apps/web/src/engine.js` | Pure state transitions, stage seeking and snapshots |
| `apps/web/src/scenes.js` | Original SVG apparatus and state-driven animation |
| `apps/web/src/storage.js` | Scoped browser storage with failure handling |
| `apps/web/src/style.css` | Responsive design, focus states and reduced motion |
| `content/practicals.js` | Lesson data, qualification mapping, references and review status |
| `content/policies.js` | Preview-accurate policy and accessibility copy |
| `scripts/build.mjs` | Static pages, bundled assets, PDF summaries, manifest, sitemap and worker |
| `tests/` | Engine and real-browser regression checks |
| `docs/` | Content review, security, release and platform decisions |
| `legacy/` | Preserved initial prototype |
| `dist/` | Generated deployment output; never hand-edit |

There is **no backend, database, authentication or user API** in this version. Supabase is intentionally not provisioned. Progress is local to one browser profile, not an account or cross-device sync. Offline download caches this version’s public pages/assets/PDFs; external resources are excluded. Browser storage may be evicted. Clear progress and remove offline files are separate controls.

## Delivery boundaries

This is a reviewable platform foundation, not the finished full-syllabus service. Login, cloud resume, server-validated points, badges and streaks remain future work. Chemistry and Physics truthfully show planned collections. Original apparatus illustration and animation are used rather than Boardworks assets. Anime.js handles optional background motion; adding Three.js, React Spring and Lenis together would add weight without teaching value here. Native scrolling is retained.

See `docs/DEPLOYMENT.md` for free static hosting, explicit indexing controls and owner actions. `INDEXABLE` defaults to false; previews remain noindex even when catalogue indexing is enabled. No Search Console submission has been made.
