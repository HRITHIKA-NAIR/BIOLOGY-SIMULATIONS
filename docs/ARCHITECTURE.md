# Implementation decision: static first

The earlier planning pack proposed Astro/React plus a Worker and Supabase for future accounts. This first implementation deliberately reduces that to ES modules + Vite-generated static HTML, because the latest request says to introduce a database only if necessary. The simulation runs in the browser; no network request is needed for an animation frame. The code is small enough that adding React merely to move SVG apparatus would not improve the current implementation.

Public route generation and lesson content are separate from the player state machine. Each practical owns a version, review status, qualification mapping, source links, stages and quiz. The engine owns mode, stage, elapsed time and completed object action. The renderer derives the apparatus state; seeking reconstructs it rather than starting orphaned timers. One requestAnimationFrame clock drives the active lesson. Pausing or hiding the tab freezes it; app restart never silently resumes playback. Reduced motion uses discrete object positions.

The content contract must expand before full fidelity: per-stage evidence timestamps, concrete apparatus quantities, measurement provenance, scientific model assumptions, captions and teacher sign-off. Five-stage previews are not substitutes for that contract. Future real measurement interactions must distinguish collected results from skipped or illustrative results.

## Future account boundary

Keep public lessons static. Add authenticated API routes only for cloud identity, progress, deletion and server-controlled achievements. Introduce a database with tested row policies then. Local checkpoints become an offline queue with idempotency keys, version compatibility and explicit conflicts between devices. Existing device data must not automatically be uploaded merely because a learner signs in.

Points, badges and streaks remain unimplemented. They should reward learning milestones once, not repeated clicks; remain private and optional; never pressure a child with a countdown or loss-of-streak notification. Authentication, eligibility and legal review must precede collecting student accounts.

## Design

Working title: Practical room (owner can choose the final brand). Warm paper surfaces, deep green controls, restrained subject accents, readable system fonts and original 2D apparatus. Iconoir supplies real icons with retained MIT notice. Anime.js is the only ambient-animation library. Three.js, React Spring and Lenis are not included: this first player needs neither 3D rendering nor custom scrolling. Respect the system reduced-motion setting and provide a visible background-motion switch.

The player is the primary surface. Written procedure and source resources are separate, collapsible supporting material. Dragging has a select/place and labelled button equivalent. No signup wall, marketing popups, fake availability or forced account creation.
