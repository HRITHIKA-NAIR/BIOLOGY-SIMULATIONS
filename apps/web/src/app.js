import { animate } from "animejs";
import { withMethod } from "../../../content/methods.js";
import { practicals } from "../../../content/practicals.js";
import { initial, seek, advance, awaiting, snapshot, clamp } from "./engine.js";
import { scene, paintScene } from "./scenes.js";
import { KEY, readStore, writeStore, saveLesson } from "./storage.js";
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const base = document.body.dataset.base;
let ambient = null;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
function motion() {
  const off = reduced.matches || readStore().motionOff;
  ambient?.cancel();
  ambient = null;
  if (!off && $(".orb"))
    ambient = animate(".orb", {
      translateY: [0, -13],
      opacity: [0.4, 0.8],
      duration: 3400,
      alternate: true,
      loop: true,
      ease: "inOutSine",
    });
  document.documentElement.dataset.labMotion =
    off || document.hidden ? "off" : "on";
  const labButton = $("#lab-motion");
  if (labButton) {
    labButton.textContent = off ? "Play animation" : "Pause animation";
    labButton.setAttribute("aria-pressed", String(off));
    labButton.disabled = reduced.matches;
    if (reduced.matches) labButton.textContent = "Reduced motion on";
  }
  const b = $("#motion");
  if (b) {
    b.textContent = off ? "Background motion: off" : "Background motion: on";
    b.setAttribute("aria-pressed", String(!off));
  }
}
$("#motion")?.addEventListener("click", () => {
  const s = readStore();
  s.motionOff = !(reduced.matches || s.motionOff);
  writeStore(s);
  motion();
});
$("#lab-motion")?.addEventListener("click", () => {
  const s = readStore();
  s.motionOff = !s.motionOff;
  writeStore(s);
  motion();
});
document.addEventListener("visibilitychange", motion);
reduced.addEventListener("change", motion);
motion();
if ($("#catalogue")) {
  let category = "all";
  const filter = () => {
    const q = $("#search").value.trim().toLowerCase();
    let count = 0;
    $$("[data-card]").forEach((c) => {
      const visible =
        (category === "all" || c.dataset.category === category) &&
        c.textContent.toLowerCase().includes(q);
      c.hidden = !visible;
      if (visible) count++;
    });
    $("#results-count").textContent =
      `${count} practical${count === 1 ? "" : "s"}`;
    $("#no-results").hidden = count !== 0;
  };
  $$("[data-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      category = b.dataset.filter;
      $$("[data-filter]").forEach((x) =>
        x.setAttribute("aria-pressed", String(x === b)),
      );
      filter();
    }),
  );
  $("#search").addEventListener("input", filter);
  filter();
}
function confirmAction(title, text, fn) {
  const d = $("#confirm-dialog");
  $("#confirm-title").textContent = title;
  $("#confirm-text").textContent = text;
  d.showModal();
  const yes = $("#confirm-yes");
  yes.onclick = async () => {
    d.close();
    await fn();
  };
}
$("#confirm-no")?.addEventListener("click", () => $("#confirm-dialog").close());
if ($("#player")) {
  const baseLesson = practicals.find(
    (p) => p.id === document.body.dataset.lesson,
  );
  const store = readStore();
  let lesson = withMethod(baseLesson, store.lessons?.[baseLesson.id]?.method);
  let remember = store.remember === true;
  let state = initial(lesson, store.lessons?.[lesson.id]),
    last = null,
    selected = false,
    drag = null,
    dragStart = null,
    lastSave = 0;
  let playbackSpeed = 1;
  $("#playback-speed").onchange = (e) => {
    playbackSpeed = Number(e.target.value);
  };
  $("#large-text").onchange = (e) => {
    $("#player").classList.toggle("large-text", e.target.checked);
  };
  $("#zoom-scene").onclick = (e) => {
    const on = $("#scene").classList.toggle("zoomed");
    e.target.setAttribute("aria-pressed", String(on));
    e.target.textContent = on ? "Fit apparatus" : "Enlarge apparatus";
  };
  const root = $("#scene");
  const status = $("#save-status");
  $("#remember").checked = remember;
  const save = () => {
    if (!remember) {
      status.textContent = "Progress is not being saved.";
      return;
    }
    status.textContent = saveLesson(lesson.id, {
      ...snapshot(lesson, state),
      method: lesson.method,
    })
      ? "Saved on this device."
      : "Could not save: browser storage is unavailable.";
  };
  $("#remember").onchange = () => {
    remember = $("#remember").checked;
    const x = readStore();
    x.remember = remember;
    writeStore(x);
    save();
  };
  const mount = (transition = false) => {
    const previous =
      transition && !reduced.matches && !awaiting(lesson, state)
        ? root.querySelector("svg")?.cloneNode(true)
        : null;
    selected = false;
    drag = null;
    root.innerHTML = scene(lesson, state.index);
    if (previous) {
      previous
        .querySelectorAll("[tabindex]")
        .forEach((el) => el.removeAttribute("tabindex"));
      previous.querySelectorAll("*").forEach((el) => {
        for (const a of [...el.attributes]) {
          if (a.name.startsWith("data-")) el.removeAttribute(a.name);
        }
      });
      const ghost = document.createElement("div");
      ghost.className = "scene-ghost";
      ghost.inert = true;
      ghost.setAttribute("aria-hidden", "true");
      ghost.innerHTML = previous.outerHTML
        .replace(/id="([^"]+)"/g, 'id="old-$1"')
        .replace(/url\(#/g, "url(#old-");
      root.append(ghost);
    }
    $$("[data-step-label]").forEach(
      (el, i) => (el.textContent = lesson.steps[i].title),
    );
    $$("[data-seek]").forEach((el, i) =>
      el.setAttribute("aria-label", `Step ${i + 1}: ${lesson.steps[i].title}`),
    );
    const written = $("#written-sequence");
    written.replaceChildren(
      ...lesson.steps.map((s) => {
        const li = document.createElement("li");
        const strong = document.createElement("strong");
        strong.textContent = s.title + ". ";
        li.append(strong, document.createTextNode(s.text));
        return li;
      }),
    );
    $("#stage-title").textContent = lesson.steps[state.index].title;
    $("#stage-number").textContent = state.index + 1;
    $("#caption").textContent = lesson.steps[state.index].text;
    $("#observation").textContent = lesson.observations[state.index];
    $("#stage-count").textContent =
      `Step ${state.index + 1} of ${lesson.steps.length}`;
    $$("[data-seek]").forEach((b) => {
      if (Number(b.dataset.seek) === state.index)
        b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
    });
    $("#action-button").textContent =
      lesson.steps[state.index].action || "Complete action";
  };
  const paint = () => {
    const wait = awaiting(lesson, state);
    $("#playback-progress").value =
      ((state.index + state.elapsed / lesson.steps[state.index].duration) /
        lesson.steps.length) *
      100;
    $("#play").textContent = state.playing && !wait ? "Pause" : "Play";
    $("#play").disabled =
      wait || (state.completed && state.index === lesson.steps.length - 1);
    $("#back").disabled = state.index === 0;
    $("#next").disabled = state.index === lesson.steps.length - 1;
    $("#action-row").hidden = !wait;
    $("#action-hint").textContent = selected
      ? "Now select the outlined destination, or use Complete action."
      : "Drag the highlighted object, or select it and then its outlined destination.";
    $("#completion").hidden = !state.completed;
    $$("[data-mode]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.mode === state.mode)),
    );
    const ghost = root.querySelector(".scene-ghost");
    if (ghost) {
      const t = reduced.matches ? 1 : Math.min(1, state.elapsed / 0.85);
      ghost.style.opacity = String(1 - t);
      ghost.style.transform = `translateX(${-t * 30}px)`;
      root.querySelector("svg").style.opacity = String(t);
      if (t === 1) ghost.remove();
    }
    paintScene(
      root.querySelector("svg"),
      lesson,
      state,
      reduced.matches
        ? state.elapsed > 0
          ? 1
          : 0
        : state.elapsed / lesson.steps[state.index].duration,
      drag,
    );
  };
  const go = (i) => {
    state = seek(lesson, state, i);
    mount();
    paint();
    save();
  };
  const act = () => {
    if (!awaiting(lesson, state)) return;
    state = { ...state, acted: true, playing: true };
    drag = null;
    selected = false;
    paint();
    save();
    $("#play").focus();
  };
  if ($("#method-choice")) {
    $("#method-choice").value = lesson.method;
    $("#method-choice").onchange = (e) => {
      lesson = withMethod(baseLesson, e.target.value);
      state = initial(lesson);
      mount();
      paint();
      save();
    };
  }
  $("#play").onclick = () => {
    state.playing = !state.playing;
    paint();
    save();
  };
  $("#back").onclick = () => go(state.index - 1);
  $("#next").onclick = () => go(state.index + 1);
  $("#action-button").onclick = act;
  $("#restart").onclick = () =>
    confirmAction(
      "Restart this practical?",
      "This resets your current checkpoint for this practical.",
      () => {
        state = initial(lesson);
        mount();
        paint();
        save();
      },
    );
  $$("[data-seek]").forEach(
    (b) => (b.onclick = () => go(Number(b.dataset.seek))),
  );
  $$("[data-mode]").forEach(
    (b) =>
      (b.onclick = () => {
        state = {
          ...state,
          mode: b.dataset.mode,
          playing: false,
          acted: false,
          elapsed: 0,
        };
        mount();
        paint();
        save();
      }),
  );
  function point(e) {
    const svg = root.querySelector("svg");
    const p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse());
  }
  root.addEventListener("pointerdown", (e) => {
    if (!awaiting(lesson, state) || !e.target.closest("[data-object]")) return;
    const obj = root.querySelector("[data-object]"),
      [x, y] = obj.dataset.from.split(",").map(Number);
    dragStart = {
      ...point(e),
      x: point(e).x,
      y: point(e).y,
      ox: x,
      oy: y,
      id: e.pointerId,
    };
    drag = { x, y };
    root.setPointerCapture(e.pointerId);
    selected = true;
    paint();
  });
  root.addEventListener("pointermove", (e) => {
    if (!dragStart || e.pointerId !== dragStart.id) return;
    const p = point(e);
    drag = {
      x: clamp(dragStart.ox + p.x - dragStart.x, 35, 865),
      y: clamp(dragStart.oy + p.y - dragStart.y, 45, 420),
    };
    paint();
  });
  root.addEventListener("pointerup", (e) => {
    if (!dragStart) return;
    const obj = root.querySelector("[data-object]"),
      [tx, ty] = obj.dataset.to.split(",").map(Number);
    const good = Math.hypot(drag.x - tx, drag.y - ty) < 85;
    dragStart = null;
    drag = null;
    if (good) act();
    else paint();
  });
  root.addEventListener("pointercancel", () => {
    dragStart = null;
    drag = null;
    paint();
  });
  root.addEventListener("click", (e) => {
    if (!awaiting(lesson, state)) return;
    if (e.target.closest("[data-target]") && selected) act();
    else if (e.target.closest("[data-object]")) {
      selected = true;
      paint();
    }
  });
  root.addEventListener("keydown", (e) => {
    if (!awaiting(lesson, state) || !["Enter", " "].includes(e.key)) return;
    if (e.target.closest("[data-object]")) {
      e.preventDefault();
      selected = true;
      paint();
      root.querySelector("[data-target]").focus();
    } else if (e.target.closest("[data-target]")) {
      e.preventDefault();
      if (selected) act();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      state.playing = false;
      paint();
      save();
    }
  });
  window.addEventListener("pagehide", save);
  function frame(now) {
    const dt = last === null ? 0 : Math.min(0.1, (now - last) / 1000);
    last = now;
    if (!dragStart) {
      const old = state;
      state = advance(lesson, state, dt * playbackSpeed);
      if (old.index !== state.index) {
        mount(true);
        save();
      }
      if (!old.completed && state.completed) save();
      paint();
      if (state.playing && now - lastSave > 5000) {
        save();
        lastSave = now;
      }
    }
    requestAnimationFrame(frame);
  }
  mount();
  paint();
  save();
  requestAnimationFrame(frame);
  $("#quiz-form").onsubmit = (e) => {
    e.preventDefault();
    const choice = new FormData(e.target).get("answer");
    if (choice === null) {
      $("#quiz-feedback").textContent = "Choose an answer first.";
      return;
    }
    const correct = Number(choice) === lesson.correct;
    $("#quiz-feedback").textContent =
      (correct ? "Correct. " : "Try again. ") + lesson.explanation;
    if (remember && correct) {
      const x = readStore();
      x.quizzes = { ...x.quizzes, [lesson.id]: true };
      writeStore(x);
    }
  };
}
function renderLearning() {
  const target = $("#saved-list");
  if (!target) return;
  const saved = readStore().lessons || {};
  target.replaceChildren();
  const entries = practicals
    .map((p) => withMethod(p, saved[p.id]?.method))
    .filter((p) => saved[p.id]?.version === p.version);
  if (!entries.length) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent =
      "Your next experiment starts here. Open a practical and choose Remember my progress to save a checkpoint on this device.";
    target.append(p);
    return;
  }
  for (const l of entries) {
    const item = document.createElement("div");
    item.className = "saved-item";
    const detail = document.createElement("div"),
      h = document.createElement("h2"),
      p = document.createElement("p"),
      a = document.createElement("a");
    h.textContent = l.title;
    const s = initial(l, saved[l.id]);
    p.textContent = `${s.completed ? "Preview viewed" : `Step ${s.index + 1} of ${l.steps.length}`} · saved on this device`;
    detail.append(h, p);
    a.href = base + "practicals/" + l.id + "/";
    a.textContent = "Resume practical";
    a.className = "button small secondary";
    item.append(detail, a);
    target.append(item);
  }
}
renderLearning();
function message(t) {
  const el = $("#device-status");
  if (el) el.textContent = t;
}
$("#clear-progress")?.addEventListener("click", () =>
  confirmAction(
    "Clear your learning progress?",
    "This removes this app’s checkpoints and quiz outcomes from this browser. Offline lesson files remain available.",
    () => {
      try {
        const s = readStore();
        delete s.lessons;
        delete s.quizzes;
        s.remember = false;
        localStorage.setItem(KEY, JSON.stringify(s));
        message("Learning progress cleared from this device.");
        renderLearning();
      } catch {
        message(
          "Could not clear browser storage. Use your browser’s site-data settings.",
        );
      }
    },
  ),
);
const cachePrefix = "science-practicals-offline-";
async function offlineStatus() {
  if (!("caches" in window)) return;
  try {
    const keys = await caches.keys();
    const cache = keys.find((k) => k.startsWith(cachePrefix));
    $("#offline-status")?.replaceChildren(
      document.createTextNode(
        cache
          ? "An offline copy is saved on this device. Save again while online to refresh it."
          : "Not saved offline yet.",
      ),
    );
  } catch {}
}
offlineStatus();
$("#save-offline")?.addEventListener("click", async (e) => {
  const b = e.currentTarget;
  b.disabled = true;
  try {
    if (!("serviceWorker" in navigator))
      throw new Error("Offline saving needs HTTPS and a supported browser.");
    message("Preparing the offline copy…");
    await navigator.serviceWorker.register(base + "sw.js", { scope: base });
    const reg = await navigator.serviceWorker.ready;
    await new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      const timeout = setTimeout(
        () =>
          reject(
            new Error("The download took too long. Please retry while online."),
          ),
        60000,
      );
      channel.port1.onmessage = (e) => {
        clearTimeout(timeout);
        e.data.ok
          ? resolve()
          : reject(
              new Error(e.data.error || "Download interrupted. Please retry."),
            );
      };
      reg.active.postMessage({ type: "SAVE_OFFLINE" }, [channel.port2]);
    });
    message(
      "Saved offline. External videos and source sheets still need internet.",
    );
    offlineStatus();
  } catch (err) {
    message(err.message);
  } finally {
    b.disabled = false;
  }
});
$("#remove-offline")?.addEventListener("click", () =>
  confirmAction(
    "Remove offline files?",
    "You will need internet to reopen lessons. Your saved learning progress is kept.",
    async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(
          keys
            .filter((k) => k.startsWith(cachePrefix))
            .map((k) => caches.delete(k)),
        );
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          regs
            .filter((r) => r.scope === new URL(base, location.origin).href)
            .map((r) => r.unregister()),
        );
        message("Offline files removed.");
        offlineStatus();
      } catch {
        message(
          "Could not remove offline files. Use browser site-data settings.",
        );
      }
    },
  ),
);
