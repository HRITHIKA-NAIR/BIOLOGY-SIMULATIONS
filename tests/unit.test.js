import { test } from "node:test";
import assert from "node:assert/strict";
import { practicals } from "../content/practicals.js";
import {
  initial,
  advance,
  seek,
  awaiting,
  snapshot,
} from "../apps/web/src/engine.js";
const l = practicals.find((p) => p.id === "photosynthesis");
test("watch advances, pause freezes, and try waits for a meaningful object action", () => {
  let s = { ...initial(l), playing: true };
  s = advance(l, s, 7);
  assert.equal(s.index, 1);
  s = { ...s, mode: "try" };
  assert.ok(awaiting(l, s));
  assert.deepEqual(advance(l, s, 99), s);
  s = { ...s, acted: true };
  assert.equal(advance(l, s, 7).index, 2);
  s = { ...s, playing: false };
  assert.deepEqual(advance(l, s, 99), s);
});
test("restoration clamps invalid state and never auto-plays", () => {
  let s = initial(l, {
    version: 1,
    index: 999,
    elapsed: Infinity,
    mode: "bad",
  });
  assert.equal(s.index, 4);
  assert.equal(s.elapsed, 0);
  assert.equal(s.mode, "watch");
  assert.equal(s.playing, false);
  assert.equal(initial(l, { version: 0, index: 3 }).index, 0);
});
test("seek reconstructs a stage without retaining a completed action", () => {
  const s = seek(
    l,
    { ...initial(l), acted: true, playing: true, elapsed: 6 },
    2,
  );
  assert.equal(s.elapsed, 0);
  assert.equal(s.acted, false);
  assert.equal(s.playing, false);
  assert.equal(snapshot(l, s).index, 2);
});
test("catalogue uses six Combined Science core activities and two separate-Biology additions", () => {
  assert.equal(practicals.filter((p) => p.core).length, 6);
  assert.deepEqual(
    practicals.filter((p) => !p.core).map((p) => p.ref),
    ["1.13B", "5.18B"],
  );
  assert.equal(new Set(practicals.map((p) => p.id)).size, 8);
  for (const p of practicals) {
    assert.equal(p.steps.length, 5);
    assert.match(p.videoUrl, /^https:\/\/www.youtube.com\/watch\?v=/);
    assert.ok(p.correct >= 0 && p.correct < p.answers.length);
    assert.match(p.review, /pending/);
  }
});

test("completed direct-object action survives a same-version checkpoint", () => {
  const s = { ...initial(l), index: 1, mode: "try", acted: true, elapsed: 2 };
  const restored = initial(l, snapshot(l, s));
  assert.equal(restored.acted, true);
  assert.equal(awaiting(l, restored), false);
  assert.equal(restored.elapsed, 2);
  assert.equal(restored.playing, false);
});
