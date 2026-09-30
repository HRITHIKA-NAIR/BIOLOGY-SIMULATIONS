export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export function initial(lesson, saved) {
  const valid =
    saved?.version === lesson.version && Number.isInteger(saved.index);
  return {
    index: valid ? clamp(saved.index, 0, lesson.steps.length - 1) : 0,
    elapsed:
      valid && Number.isFinite(saved.elapsed)
        ? clamp(
            saved.elapsed,
            0,
            lesson.steps[clamp(saved.index, 0, lesson.steps.length - 1)]
              .duration,
          )
        : 0,
    mode: saved?.mode === "try" ? "try" : "watch",
    playing: false,
    acted: valid && saved.acted === true,
    completed: valid && saved.completed === true,
  };
}
export function awaiting(lesson, s) {
  return s.mode === "try" && !!lesson.steps[s.index].action && !s.acted;
}
export function seek(lesson, s, index) {
  return {
    ...s,
    index: clamp(index, 0, lesson.steps.length - 1),
    elapsed: 0,
    playing: false,
    acted: false,
  };
}
export function advance(lesson, s, dt) {
  if (!s.playing || awaiting(lesson, s)) return s;
  const elapsed = Math.min(
    lesson.steps[s.index].duration,
    s.elapsed + Math.max(0, dt),
  );
  if (elapsed < lesson.steps[s.index].duration) return { ...s, elapsed };
  if (s.index === lesson.steps.length - 1)
    return { ...s, elapsed, playing: false, completed: true };
  return { ...s, index: s.index + 1, elapsed: 0, acted: false };
}
export function snapshot(lesson, s) {
  return {
    version: lesson.version,
    index: s.index,
    elapsed: s.elapsed,
    mode: s.mode,
    acted: s.acted,
    completed: s.completed,
  };
}
