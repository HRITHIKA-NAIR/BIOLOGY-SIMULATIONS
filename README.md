# Biology simulations

Original browser-based animated practicals, built one practical at a time. First activity: photosynthesis.

## Run
Open index.html locally, or open the published GitHub Pages site. No build or dependencies required.

## Animated lesson
- Watch is the default. Press Play once: apparatus fades into place, pondweed lowers into its tube, the lamp moves to 40, 20 and 10 cm, and each adjustment and measurement plays automatically.
- Try it follows the same sequence but pauses at lamp-placement stages. Drag the lamp itself into the outlined destination. Touch and mouse work through pointer events. Alternatively select the lamp then its outline, or focus the lamp and press Enter/Space.
- Play/Pause uses one animation clock. Back and Next reconstruct the selected stage. Restart and switching modes reset the lesson. Skipping measurements marks results as skipped, not as observed.
- Results appear only at the conclusion. No sliders, separate timers, manual recording or dashboard panels.

## Files
photosynthesis/index.html: scene, explanation and playback controls.
photosynthesis/style.css: responsive player styling.
photosynthesis/script.js: automatic stage sequence, direct lamp interaction, bubbles and results.

## Scientific scope
Illustrative model: 90 / (1 + (distance_cm / 20)^2) bubbles per minute; deterministic simulated counts. Each 60-second measurement plays in 12 seconds. Adjustment time is abbreviated. Temperature is held at 25°C; pondweed and solution concentration stay fixed. Real bubbles differ in size and real measurements need repeats. This demonstration is not a replacement for carrying out or evaluating the full practical. The reference video's complete method has not yet been verified; distances and timings remain prototype choices.

Reference video: https://www.youtube.com/watch?v=cBCKedXdFeE
AQA: https://www.aqa.org.uk/subjects/biology/gcse/biology-8461/specification/practical-assessment

## Validation
Syntax and state tests passed: full Watch sequence, simulated counts (18,45,72), Try-mode pauses, placement continuation, pause, back-navigation invalidation, skipped data and restart. Browser rendering and real pointer-device testing remain unverified because no browser executable is available in the authoring environment.
