# Biology simulations

Practical-by-practical interactive biology activities. First prototype: photosynthesis.

## Run
Open index.html in a modern browser from a local checkout. No installation, server, network connection or build is required. The root page opens photosynthesis/index.html.

## Files
- photosynthesis/index.html: accessible interface and SVG apparatus diagram.
- photosynthesis/style.css: responsive layout.
- photosynthesis/script.js: stages, shared animation clock, measurement, results and CSV export.

## Try the practical
1. Next to choose distance; set 10–50 cm.
2. Next to adjustment; start and wait, or skip.
3. Start measurement. Pause freezes the clock and bubbles. Choose 10× for a short demonstration.
4. Record the completed result. Restart this trial for repeats, or Back to choose a new distance.
5. Compare means and download CSV. Reset experiment clears every recorded trial.

## Scientific scope
This is a guided prototype, not a verified reproduction of every step of the linked video. Model rate = 90 / (1 + (distance_cm / 20)^2) bubbles per minute. This is an illustrative saturating light response; it is not a fitted biological model. Repeats are deterministic and will give the same count; real trials vary. The water bath, fixed 25°C and fixed solution concentration represent controlled conditions. Bubble counting is only an approximation to oxygen volume production. Distances, 30-second adjustment and 60-second measurement are prototype choices pending the reference method. AQA source: https://www.aqa.org.uk/subjects/biology/gcse/biology-8461/specification/practical-assessment . Reference video: https://www.youtube.com/watch?v=cBCKedXdFeE .

## Next iteration
Verify the full video method, add equipment assembly and a complete Watch mode. This version includes a lamp slider and measurement playback, not draggable apparatus or a full automatic demonstration.

## Development
Each practical lives in its own directory. This repository starts with photosynthesis; subsequent practicals can reuse the controls and result-table structure.

## Validation
JavaScript syntax and model/control checks passed for adjustment, measurement, pause, duplicate-record prevention and reset. Browser visual testing could not run in the initial environment because its browser download was unavailable.

## Hosting
This is a static application. A root index.html opens the photosynthesis practical. Hosting is not enabled by committing these files.
