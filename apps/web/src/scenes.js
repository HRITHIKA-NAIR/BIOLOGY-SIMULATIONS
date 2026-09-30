const txt = (x, y, t, size = 16, fill = "#244867") =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-family="system-ui,sans-serif">${t}</text>`;
const glass = (x, y, w = 70, h = 140, colour = "#9dc9ba") =>
  `<g transform="translate(${x} ${y})"><path d="M0 0V${h - 15}Q0 ${h} 15 ${h}H${w - 15}Q${w} ${h} ${w} ${h - 15}V0" fill="#fff" fill-opacity=".6" stroke="#46779c" stroke-width="3"/><path d="M4 48V${h - 15}Q4 ${h - 4} 16 ${h - 4}H${w - 16}Q${w - 4} ${h - 4} ${w - 4} ${h - 15}V48Z" data-liquid fill="${colour}" fill-opacity=".8"/><path d="M12 14V${h - 25}" stroke="white" stroke-width="5" stroke-linecap="round"/></g>`;
const lamp = `<path d="M-34 10h68l-8-40h-52z" fill="#efbe6e" stroke="#775d36" stroke-width="3"/><path d="M0 10v130M-45 140h90" stroke="#48665e" stroke-width="9" stroke-linecap="round"/><ellipse cy="11" rx="29" ry="7" fill="#fff1ba"/>`;
const strip = `<rect x="-16" y="-48" width="32" height="96" rx="8" fill="#eacb86" stroke="#897445" stroke-width="2"/><path d="M-7-37v70" stroke="#fff0bf" stroke-width="5"/>`;
const pipette = `<path d="M-9-40h18v62L0 45l-9-23z" fill="#fff" stroke="#426e62" stroke-width="2"/><rect x="-12" y="-58" width="24" height="28" rx="8" fill="#d8ac6c"/><path d="M-5-22h10v44L0 35l-5-13z" fill="#cda356"/>`;
function actionObject(lesson, index, art, from, to) {
  if (!lesson.steps[index].action) return "";
  const [x, y] = from,
    [tx, ty] = to;
  return `<g data-target role="button" tabindex="0" aria-label="Place selected object at the marked position" transform="translate(${tx} ${ty})"><rect x="-51" y="-68" width="102" height="146" rx="14" fill="#e6f3e8" fill-opacity=".4" stroke="#267357" stroke-width="2" stroke-dasharray="6 5"/>${txt(-43, 100, "Place here", 15)}</g><g data-object role="button" tabindex="0" aria-label="${lesson.steps[index].action}" data-from="${x},${y}" data-to="${tx},${ty}" transform="translate(${x} ${y})">${art}<circle r="68" fill="transparent"/>${txt(-45, -78, "Move me", 15)}</g>`;
}
function photosynthesis(l, i) {
  let out = `<path d="M120 320L820 290V365H120Z" fill="#f5e7bb" opacity=".6"/><g transform="translate(118 180)">${i !== 2 ? lamp : ""}</g><rect x="240" y="198" width="54" height="164" rx="7" fill="#badce4" fill-opacity=".5" stroke="#7799a0" stroke-width="3"/>${txt(210, 395, "Heat filter", 15)}`;
  for (let n = 0; n < 4; n++) {
    const x = 350 + n * 118;
    const c =
      i >= 4
        ? n === 3
          ? "#e6bc54"
          : ["#965aab", "#b279a9", "#b88688"][n]
        : "#c7787a";
    out +=
      glass(x, 227, sixty(), 135, c) +
      `<rect x="${x - 3}" y="212" width="66" height="18" rx="3" fill="#375b50"/>`;
    for (let k = 0; k < 10; k++)
      out += `<circle cx="${x + 12 + (k % 4) * 12}" cy="${337 - Math.floor(k / 4) * 12}" r="5" fill="#4c8151"/>`;
    if (n === 3 && i >= 2 && i < 4)
      out += `<rect x="${x - 2}" y="230" width="64" height="133" rx="8" fill="#a7b4b2" stroke="#72817d"/><path d="M${x + 6} 245l42 24-39 23 43 36-36 24" stroke="#e3e9e7" stroke-width="3" fill="none"/>`;
    out += txt(
      x - 4,
      415,
      n === 3 ? "Dark control" : ["Near", "Middle", "Far"][n],
      15,
    );
  }
  out += txt(
    315,
    65,
    i >= 4
      ? "Illustrative colours • not measured results"
      : "Equal algal samples · equal indicator volume",
    18,
  );
  if (i === 1)
    out += actionObject(
      l,
      i,
      `<rect x="-31" y="-55" width="62" height="128" rx="6" fill="#b5c1be" stroke="#687f76"/><path d="M-25-35l40 30-37 24 39 35" fill="none" stroke="#f3f5f3" stroke-width="3"/>`,
      [765, 125],
      [734, 288],
    );
  if (i === 2) out += actionObject(l, i, lamp, [115, 110], [118, 218]);
  if (i >= 3)
    out += `<g data-pulse>${txt(340, 173, i === 3 ? "Equal exposure time · waiting abbreviated" : "Purple ← lower CO₂     higher CO₂ → yellow", 16)}</g>`;
  return out;
}
function sixty() {
  return 60;
}
function microscopy(l, i) {
  if (l.method === "prepared") return preparedMicroscopy(l, i);
  let out = `<g transform="translate(155 130)"><path d="M55 230C210 230 226 72 119 29" fill="none" stroke="#57766c" stroke-width="31"/><path d="M8 35L77-14l34 44-70 47Z" fill="#c6dcd1" stroke="#35584e" stroke-width="4"/><rect x="4" y="-2" width="66" height="29" rx="5" fill="#2e5346" transform="rotate(-35 30 15)"/><path d="M5 164h180" stroke="#345449" stroke-width="15"/><path d="M8 236h208" stroke="#345449" stroke-width="23" stroke-linecap="round"/><circle cx="161" cy="113" r="22" fill="#efbb6d" stroke="#536d61" stroke-width="4"/></g><circle cx="649" cy="225" r="148" fill="#f3e9bd" stroke="#d0b66e" stroke-width="8"/>`;
  out += `<defs><clipPath id="view"><circle cx="649" cy="225" r="142"/></clipPath></defs><g data-cell-view clip-path="url(#view)" opacity="${i >= 3 ? 1 : 0.35}">`;
  for (let a = 0; a < 5; a++)
    for (let b = 0; b < 4; b++) {
      const x = 480 + a * 75,
        y = 91 + b * 69;
      out += `<rect x="${x}" y="${y}" width="72" height="66" rx="13" fill="#e3d996" fill-opacity=".6" stroke="#8a8651" stroke-width="2"/><ellipse cx="${x + 24}" cy="${y + 30}" rx="8" ry="11" fill="#9b765b"/>`;
    }
  out += `</g>${txt(540, 417, "Illustrative onion cells", 17)}${txt(156, 418, "Light microscope", 17)}`;
  const slide = `<rect x="-57" y="-12" width="114" height="30" rx="3" fill="#d9ece6" stroke="#62897a" stroke-width="2"/><ellipse cy="3" rx="20" ry="8" fill="#c6bd72"/>`;
  if (i === 1)
    out += actionObject(
      l,
      i,
      `<path d="M-20-40l20 40 25-45" fill="none" stroke="#526b65" stroke-width="5"/><path d="M-11-2l28 4-5 15h-18Z" fill="#d9c878"/>`,
      [447, 117],
      [386, 317],
    );
  if (i === 2)
    out += actionObject(
      l,
      i,
      `<rect x="-25" y="-25" width="50" height="50" fill="#cfe8df" fill-opacity=".8" stroke="#658679" stroke-width="2" transform="rotate(35)"/>`,
      [448, 111],
      [386, 317],
    );
  if (i === 3) out += actionObject(l, i, slide, [426, 125], [231, 285]);
  else
    out += `<g transform="translate(${i >= 4 ? "231 285" : "386 317"})">${slide}</g>`;
  return out;
}
function enzymes(l, i) {
  let out =
    glass(290, 202, 85, 161, "#e4dba2") +
    `<rect x="465" y="228" width="340" height="132" rx="20" fill="#fff" stroke="#bccfc5" stroke-width="3"/>`;
  for (let n = 0; n < 8; n++)
    out += `<circle data-well="${n}" cx="${503 + (n % 4) * 83}" cy="${266 + Math.floor(n / 4) * 58}" r="18" fill="${i >= 3 ? (n === 7 ? "#cd9850" : "#3c394d") : "#cd9850"}" stroke="#ddd6c0" stroke-width="4"/>`;
  out +=
    txt(280, 402, "Reaction mixture", 17) +
    txt(548, 403, "Iodine spotting tile", 17) +
    txt(493, 75, "Illustrative endpoint sequence", 18);
  if (i > 0 && i < 4)
    out += actionObject(
      l,
      i,
      pipette,
      [157, 129],
      i === 3 ? [503, 218] : [332, 161],
    );
  if (i === 4)
    out += txt(276, 118, "Compare endpoint times across pH values", 21);
  return out;
}
function osmosis(l, i) {
  let out = `<rect x="105" y="300" width="194" height="65" rx="10" fill="#e0e9e3" stroke="#668378" stroke-width="3"/><path d="M115 283h174" stroke="#6d7f78" stroke-width="9"/><rect x="147" y="317" width="110" height="30" rx="4" fill="#f9fcf5"/>${txt(168, 339, i === 4 ? "2.20 g" : "2.00 g", 18)}`;
  for (let n = 0; n < 3; n++) {
    out += glass(
      441 + n * 117,
      188,
      70,
      177,
      ["#cae7e1", "#c4dace", "#bacba6"][n],
    );
    if (i >= 3)
      out += `<g transform="translate(${476 + n * 117} 295)">${strip}</g>`;
    out += txt(440 + n * 117, 407, ["Dilute", "Medium", "Concentrated"][n], 14);
  }
  out += txt(93, 409, "Illustrative balance reading", 16);
  if (l.steps[i].action)
    out += actionObject(
      l,
      i,
      strip,
      i === 4 ? [478, 144] : [346, 144],
      i === 2 ? [476, 295] : [204, 232],
    );
  if (i === 3) {
    for (let n = 0; n < 6; n++)
      out += `<circle data-water="${n}" cx="${420 + n * 14}" cy="${257 + (n % 2) * 17}" r="4" fill="#518dac"/>`;
  }
  return out;
}
function respiration(l, i) {
  let out = "";
  for (let n = 0; n < 2; n++) {
    let x = 207 + n * 361;
    out +=
      glass(x, 214, 92, 153, "#d9e5db") +
      `<rect x="${x + 6}" y="327" width="80" height="26" rx="7" fill="#ecebe2" stroke="#b3b5a5"/><rect x="${x + 6}" y="307" width="80" height="20" rx="8" fill="#fff" stroke="#d9dfd7"/>`;
    if (n === 0)
      for (let k = 0; k < 4; k++)
        out += `<ellipse cx="${x + 19 + k * 17}" cy="293" rx="7" ry="11" fill="#9e7855"/>`;
    if (i !== 1)
      out += `<rect x="${x - 4}" y="203" width="100" height="23" rx="5" fill="#7e7162"/>`;
    out += `<path d="M${x + 46} 212V165h140" stroke="#66877a" stroke-width="9" fill="none"/><path d="M${x + 46} 212V165h140" stroke="#e9f1ea" stroke-width="5" fill="none"/><rect data-marker x="${x + 155}" y="161" width="17" height="8" fill="#ba6584"/>${txt(x - 10, 412, n === 0 ? "Living organisms" : "Control · no organisms", 16)}`;
  }
  out += txt(195, 112, "Oxygen uptake · carbon dioxide absorbed", 22);
  if (i === 1)
    out += actionObject(
      l,
      i,
      `<rect x="-50" y="-12" width="100" height="24" rx="5" fill="#7e7162"/>`,
      [398, 98],
      [253, 216],
    );
  return out;
}
function fieldwork(l, i) {
  if (l.method === "random") return randomFieldwork(l, i);
  let out = `<rect x="90" y="90" width="710" height="280" rx="12" fill="#deead2"/><path d="M95 120Q300 50 445 370H95Z" fill="#abc7a1" opacity=".5"/><path d="M115 340H775" stroke="#a78b59" stroke-width="5"/>`;
  for (let n = 0; n < 55; n++) {
    const x = 114 + ((n * 137) % 653),
      y = 116 + ((n * 83) % 209);
    out += `<g transform="translate(${x} ${y})"><path d="M0 8v-18M0 2q-15-14-18-3Q-12 7 0 2M0-1q12-18 18-8Q16 5 0-1" fill="#60915d" stroke="#64895a" stroke-width="2"/></g>`;
  }
  for (let n = 0; n < 7; n++) out += txt(118 + n * 102, 393, `${n} m`, 15);
  const quad = `<rect x="-57" y="-57" width="114" height="114" fill="none" stroke="#f8fcf3" stroke-width="9"/><path d="M-19-57V57M19-57V57M-57-19H57M-57 19H57" stroke="#829e74" stroke-width="2"/>`;
  if (i === 1) out += actionObject(l, i, quad, [189, 173], [429, 274]);
  else
    out += `<g data-quadrat transform="translate(${i >= 2 ? 429 : 189} 274)">${quad}</g>`;
  return out + txt(90, 65, "Shade", 18) + txt(725, 65, "Open ground", 18);
}
function food(l, i) {
  let out = "";
  const colors = ["#34313c", "#c77838", "#9e70b4", "#e4e8e2"];
  for (let n = 0; n < 4; n++) {
    out += glass(
      165 + n * 164,
      204,
      75,
      155,
      i >= n + 1 ? colors[n] : "#cadcd2",
    );
    out += txt(
      139 + n * 164,
      411,
      ["Iodine", "Benedict’s", "Biuret", "Emulsion"][n],
      17,
    );
  }
  if (i === 1) out += actionObject(l, i, pipette, [398, 111], [202, 169]);
  return (
    out + txt(215, 452, "Separate samples · illustrative positive results", 20)
  );
}
function antimicrobial(l, i) {
  let out = `<ellipse cx="453" cy="244" rx="238" ry="160" fill="#d6dea9" stroke="#83957c" stroke-width="5"/><ellipse cx="453" cy="244" rx="224" ry="147" fill="none" stroke="#fff" stroke-width="3" opacity=".65"/>`;
  [
    [350, 208],
    [549, 207],
    [451, 309],
  ].forEach(([x, y], n) => {
    if (i >= 3 && n < 2)
      out += `<ellipse data-zone="${n}" cx="${x}" cy="${y}" rx="${n === 0 ? 62 : 44}" ry="${n === 0 ? 48 : 33}" fill="#f7f6db" stroke="#b2bd86" stroke-dasharray="3 4"/>`;
    if (i !== 1 || n !== 0)
      out += `<circle cx="${x}" cy="${y}" r="14" fill="#fff" stroke="#869172"/>`;
    out += txt(x - 32, y + 48, ["Test A", "Test B", "Control"][n], 15);
  });
  if (i === 1)
    out += actionObject(
      l,
      i,
      `<circle r="14" fill="#fff" stroke="#869172" stroke-width="2"/>`,
      [157, 136],
      [350, 208],
    );
  return (
    out +
    txt(197, 66, "Closed plate · interpretation only", 22) +
    txt(289, 444, "Schematic zones • not experimental measurements", 16)
  );
}
export function scene(lesson, index = 0) {
  const f = {
    photosynthesis,
    microscopy,
    enzymes,
    osmosis,
    respiration,
    fieldwork,
    "food-tests": food,
    antimicrobials: antimicrobial,
  }[lesson.id];
  return `<svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg" aria-label="${lesson.topic}: ${lesson.steps[index].title}" role="group"><defs><linearGradient id="bench-bg" x2="0" y2="1"><stop stop-color="#f6fbff"/><stop offset="1" stop-color="#dfedfc"/></linearGradient><filter id="focus-soft"><feGaussianBlur id="focus-blur" stdDeviation="0"/></filter></defs><rect width="900" height="480" rx="12" fill="url(#bench-bg)"/><path d="M40 370H860L900 480H0Z" fill="#d6e5f5" opacity=".55"/><path d="M40 370H860" stroke="#9db9d6" stroke-width="3"/><g data-apparatus>${f(lesson, index)}</g>${motionLayer(lesson.id, index)}</svg>`;
}
export function paintScene(root, lesson, state, p, drag) {
  paintMotion(root, lesson, state, Math.max(0, Math.min(1, p)));
  const obj = root.querySelector("[data-object]");
  if (obj) {
    const [x, y] = obj.dataset.from.split(",").map(Number),
      [tx, ty] = obj.dataset.to.split(",").map(Number);
    const q =
      state.mode === "try"
        ? state.acted
          ? Math.min(1, p * 3)
          : 0
        : Math.min(1, p * 1.7);
    const e = q * q * (3 - 2 * q);
    obj.setAttribute(
      "transform",
      `translate(${drag?.x ?? x + (tx - x) * e} ${drag?.y ?? y + (ty - y) * e})`,
    );
    const waiting = state.mode === "try" && !state.acted;
    obj.setAttribute("tabindex", waiting ? "0" : "-1");
    obj.setAttribute("aria-disabled", String(!waiting));
    root
      .querySelector("[data-target]")
      .setAttribute("tabindex", waiting ? "0" : "-1");
    root.querySelector("[data-target]").style.opacity = waiting ? "1" : "0";
    obj.querySelector("text")?.setAttribute("opacity", waiting ? "1" : "0");
  }
  if (
    lesson.id === "enzymes" &&
    state.index === 3 &&
    (state.mode === "watch" || state.acted)
  ) {
    const n = Math.min(7, Math.floor(p * 8)),
      phase = (p * 8) % 1;
    const tx = 503 + (n % 4) * 83,
      ty = 205 + Math.floor(n / 4) * 58;
    const q = phase < 0.6 ? phase / 0.6 : 1 - (phase - 0.6) / 0.4,
      e = q * q * (3 - 2 * q);
    obj?.setAttribute(
      "transform",
      `translate(${332 + (tx - 332) * e} ${145 + (ty - 145) * e - 45 * Math.sin(q * Math.PI)})`,
    );
  }
  if (lesson.id === "enzymes" && state.index === 3)
    root
      .querySelectorAll("[data-well]")
      .forEach((el, n) =>
        el.setAttribute(
          "fill",
          blend(
            "#cd9850",
            n === 7 ? "#cd9850" : "#3c394d",
            Math.max(0, Math.min(1, (p * 8 - n - 0.55) * 3)),
          ),
        ),
      );
  if (lesson.id === "osmosis" && state.index === 3)
    root
      .querySelectorAll("[data-water]")
      .forEach((el, n) =>
        el.setAttribute(
          "transform",
          `translate(${((p * 2 + n / 6) % 1) * 25} 0)`,
        ),
      );
  if (lesson.id === "respiration" && state.index === 3)
    root
      .querySelector("[data-marker]")
      ?.setAttribute("transform", `translate(${-p * 88} 0)`);
}

function motionLayer(id, i) {
  if (id === "photosynthesis")
    return `<g data-rays stroke="#e4b235" stroke-width="4" stroke-dasharray="14 12" opacity=".5"><path d="M151 220 315 252M151 236 315 285M151 252 315 316"/></g>`;
  if (id === "microscopy")
    return `<g data-focus-dial transform="translate(316 243)"><path d="M-12 0h24M0-12v24" stroke="#fff" stroke-width="3"/></g>`;
  if (id === "enzymes")
    return `<circle data-sample-drop cx="332" cy="165" r="7" fill="#c3924b"/><g data-sample-indicator><path d="M477 367h40" stroke="#1d67bc" stroke-width="4"/></g>`;
  if (id === "osmosis" && i === 3)
    return `<g><rect x="105" y="70" width="675" height="85" rx="15" fill="#fff" stroke="#b3cdea"/><path d="M440 82v61" stroke="#8ba7c6" stroke-width="8" stroke-dasharray="6 5"/>${Array.from({ length: 12 }, (_, n) => `<circle data-osmosis-particle="${n}" cx="${330 + n * 17}" cy="${93 + (n % 3) * 18}" r="5" fill="#258dc8"/>`).join("")}${txt(135, 110, "Water", 19)}${txt(605, 110, "Membrane", 19)}</g>`;
  if (id === "respiration")
    return `<g data-gas-arrow stroke="#237ab9" stroke-width="3" fill="none"><path d="M247 245v-42m-7 10 7-10 7 10"/></g>`;
  if (id === "food-tests")
    return `${i === 2 ? '<g data-water-bath><rect x="300" y="280" width="132" height="89" rx="9" fill="#7dc4e6" opacity=".25" stroke="#347ea7" stroke-width="3"/><path d="M305 289q18-8 35 0t35 0t35 0" fill="none" stroke="#347ea7" stroke-width="3"/></g>' : ""}<g data-reagent-tool transform="translate(202 100)">${pipette}</g><circle data-reagent-drop cx="${202 + Math.max(0, i - 1) * 164}" cy="150" r="7" fill="${["#d8ad56", "#d8ad56", "#69bade", "#9571c3", "#dce9f1"][i]}"/>`;
  if (id === "antimicrobials" && i === 4)
    return `<g data-zone-ruler><path d="M285 150h140m-140-8v16m70-16v16m70-16v16" stroke="#2466a8" stroke-width="4"/>${txt(294, 137, "Compare diameters", 16)}</g>`;
  return "";
}
const blend = (a, b, t) =>
  "#" +
  [1, 3, 5]
    .map((k) =>
      Math.round(
        parseInt(a.slice(k, k + 2), 16) * (1 - t) +
          parseInt(b.slice(k, k + 2), 16) * t,
      )
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
function paintMotion(root, lesson, state, p) {
  const i = state.index;
  const set = (q, a, v) => root.querySelector(q)?.setAttribute(a, String(v));
  set("[data-apparatus]", "opacity", 1);
  if (lesson.id === "photosynthesis") {
    set("[data-rays]", "stroke-dashoffset", -p * 160);
    set("[data-rays]", "opacity", i >= 2 ? 0.65 : 0.2);
    if (i >= 3)
      root
        .querySelectorAll("[data-liquid]")
        .forEach((el, n) =>
          el.setAttribute(
            "fill",
            blend(
              "#c7787a",
              ["#965aab", "#b279a9", "#b88688", "#e6bc54"][n],
              i === 4 ? 1 : p,
            ),
          ),
        );
  }
  if (lesson.id === "microscopy") {
    set(
      "[data-focus-dial]",
      "transform",
      `translate(316 243) rotate(${p * 180})`,
    );
    set("[data-cell-view]", "filter", "url(#focus-soft)");
    set("#focus-blur", "stdDeviation", i >= 3 ? (1 - p) * 6 : 5);
    set("[data-cell-view]", "opacity", i >= 3 ? 0.4 + p * 0.6 : 0.35);
  }
  if (lesson.id === "enzymes") {
    const n = Math.min(7, Math.floor(p * 8));
    const x = i === 3 ? 503 + (n % 4) * 83 : 332;
    const y = i === 3 ? 266 + Math.floor(n / 4) * 58 : 248;
    set("[data-sample-drop]", "cx", x);
    set("[data-sample-drop]", "cy", y - 65 + ((p * 8) % 1) * 65);
    set(
      "[data-sample-drop]",
      "opacity",
      i === 3 && (p * 8) % 1 > 0.55 && (p * 8) % 1 < 0.78 ? 1 : 0,
    );
    set("[data-sample-indicator]", "transform", `translate(${(n % 4) * 83} 0)`);
  }
  if (lesson.id === "osmosis")
    root.querySelectorAll("[data-osmosis-particle]").forEach((el, n) => {
      const direction = n < 8 ? 1 : -1;
      el.setAttribute(
        "transform",
        `translate(${direction * (p * 110 - 55)} 0)`,
      );
    });
  if (lesson.id === "respiration") {
    set(
      "[data-gas-arrow]",
      "opacity",
      i === 3 ? 0.4 + 0.6 * Math.abs(Math.sin(p * Math.PI * 5)) : 0,
    );
    set("[data-gas-arrow]", "transform", `translate(0 ${-((p * 3) % 1) * 12})`);
    if (i === 4) set("[data-marker]", "transform", "translate(-88 0)");
  }
  if (lesson.id === "fieldwork" && lesson.method === "random") {
    const positions = [
      [230, 200],
      [630, 290],
      [430, 160],
      [560, 220],
    ];
    if (i === 3) {
      const t = Math.min(2.999, p * 3),
        n = Math.floor(t),
        q = t - n,
        e = q * q * (3 - 2 * q);
      const a = positions[n],
        b = positions[n + 1];
      set(
        "[data-random-quadrat]",
        "transform",
        `translate(${a[0] + (b[0] - a[0]) * e} ${a[1] + (b[1] - a[1]) * e})`,
      );
    }
    set("[data-coordinate-dot]", "opacity", i === 1 ? Math.min(1, p * 2) : 1);
  }
  if (lesson.id === "fieldwork" && lesson.method !== "random") {
    if (i === 0)
      set("[data-quadrat]", "transform", `translate(${189 + p * 240} 274)`);
    if (i === 3)
      set("[data-quadrat]", "transform", `translate(${429 + p * 200} 274)`);
    set("[data-sampling-readout]", "opacity", 0.4 + 0.6 * Math.min(1, p * 3));
  }
  if (lesson.id === "food-tests") {
    const x = 202 + Math.max(0, i - 1) * 164;
    const arrival = Math.min(1, p / 0.3);
    set(
      "[data-reagent-tool]",
      "transform",
      `translate(${x - 90 + 90 * arrival} ${115 - 15 * arrival}) rotate(${i === 4 ? arrival * 25 : 0})`,
    );
    set("[data-reagent-tool]", "opacity", i > 1 ? 1 : 0);
    set(
      "[data-reagent-drop]",
      "cy",
      150 + Math.max(0, Math.min(1, (p - 0.3) / 0.2)) * 110,
    );
    set(
      "[data-reagent-drop]",
      "opacity",
      i === 0 || p < 0.3 || p > 0.5 ? 0 : 1,
    );
    root.querySelectorAll("[data-liquid]").forEach((el, n) => {
      if (i === n + 1)
        el.setAttribute(
          "fill",
          blend(
            ["#d8b465", "#69bade", "#69bade", "#d4e7ee"][n],
            ["#34313c", "#c77838", "#9e70b4", "#f4f6fa"][n],
            Math.max(0, Math.min(1, (p - 0.45) / 0.55)),
          ),
        );
    });
  }
  if (lesson.id === "antimicrobials") {
    root.querySelectorAll("[data-zone]").forEach((el, n) => {
      el.setAttribute(
        "rx",
        i === 3 ? 14 + ((n === 0 ? 62 : 44) - 14) * p : n === 0 ? 62 : 44,
      );
      el.setAttribute(
        "ry",
        i === 3 ? 14 + ((n === 0 ? 48 : 33) - 14) * p : n === 0 ? 48 : 33,
      );
    });
    set("[data-zone-ruler]", "transform", `translate(0 ${p * 60})`);
  }
}

function preparedMicroscopy(l, i) {
  const mapped = i === 1 ? 3 : i >= 2 ? 4 : 0;
  const steps = l.steps.map((s) => ({ ...s, action: null }));
  if (i === 1) steps[3] = { ...l.steps[1] };
  return microscopy({ ...l, method: "onion", steps }, mapped);
}
function randomFieldwork(l, i) {
  const base = {
    ...l,
    method: "transect",
    steps: l.steps.map((s) => ({ ...s, action: null })),
  };
  let art = fieldwork(base, 0).replace(/<g data-quadrat[\s\S]*?<\/g>/, "");
  art += `<path d="M90 90V370H800" fill="none" stroke="#2466a8" stroke-width="4"/><g data-coordinate-dot><path d="M230 90V200H90" fill="none" stroke="#de9238" stroke-width="3" stroke-dasharray="8 6"/><circle cx="230" cy="200" r="7" fill="#de9238"/></g>`;
  const q = `<rect x="-48" y="-48" width="96" height="96" fill="none" stroke="#fff" stroke-width="8"/><path d="M-16-48V48M16-48V48M-48-16H48M-48 16H48" stroke="#628c76" stroke-width="2"/>`;
  if (i === 2) art += actionObject(l, i, q, [730, 140], [230, 200]);
  else if (i >= 3)
    art += `<g data-random-quadrat transform="translate(${i === 4 ? "560 220" : "230 200"})">${q}</g>`;
  return art + txt(100, 445, "Random positions · schematic sampling area", 19);
}
