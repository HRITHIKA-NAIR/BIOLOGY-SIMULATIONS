import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { build } from "vite";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { practicals } from "../content/practicals.js";
import { policies } from "../content/policies.js";
import { labIllustration } from "../apps/web/src/lab-illustration.js";
import { scene } from "../apps/web/src/scenes.js";
const BASE = process.env.BASE_PATH || "/BIOLOGY-SIMULATIONS/";
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(BASE))
  throw new Error("BASE_PATH must be a slash-delimited path");
const SITE = (
  process.env.SITE_URL || "https://hrithika-nair.github.io"
).replace(/\/$/, "");
if (!/^https:\/\/[a-z0-9.-]+$/i.test(SITE))
  throw new Error("SITE_URL must be an HTTPS origin");
const INDEX = process.env.INDEXABLE === "true";
const root = path.resolve(".site");
await fs.rm(root, { recursive: true, force: true });
await fs.mkdir(root, { recursive: true });
await fs.cp("apps", root + "/apps", { recursive: true });
await fs.cp("content", root + "/content", { recursive: true });
const icons = {};
for (const name of [
  "leaf",
  "microscope",
  "test-tube",
  "droplet",
  "flask",
  "frame",
  "circle",
  "arrow-right",
  "play",
  "download",
  "book",
  "bookmark",
  "search",
  "atom",
  "settings",
]) {
  try {
    icons[name] = (
      await fs.readFile(
        `node_modules/iconoir/icons/regular/${name}.svg`,
        "utf8",
      )
    ).replace(
      "<svg ",
      '<svg class="icon" aria-hidden="true" focusable="false" ',
    );
  } catch {
    icons[name] =
      '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  }
}
const icon = (n) => icons[n];
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const link = (r, t, c = "") =>
  `<a href="${BASE + r}"${c ? ` class="${c}"` : ""}>${t}</a>`;
const ext = (u, t) =>
  `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${t} ↗</a>`;
const entries = [];
const header = () =>
  `<a class="skip" href="#main">Skip to main content</a><div class="wrap"><header class="header">${link("", `<span class="brand-mark">${icon("leaf")}</span>Practical room`, "brand")}<nav aria-label="Main navigation">${link("biology/", "Practicals")}${link("learning/", icon("bookmark") + " My learning")}${link("accessibility/", "Help", "desktop-only")}</nav></header></div>`;
const footer = () =>
  `<div class="wrap"><footer class="footer"><div><strong>Practical room</strong><br>Independent science learning · development preview<br>Not affiliated with Pearson Edexcel or Boardworks.</div><nav aria-label="Policies">${link("privacy/", "Privacy")}${link("deletion/", "Delete data")}${link("acceptable-use/", "Acceptable use")}${link("copyright/", "Copyright")}${link("accessibility/", "Accessibility")}${link("digital-access/", "Offline & digital access")}</nav><button id="motion" class="motion-control" aria-pressed="true">Background motion</button></footer></div>`;
const dialog = `<dialog id="confirm-dialog" aria-labelledby="confirm-title" aria-describedby="confirm-text"><h2 id="confirm-title"></h2><p id="confirm-text"></p><div class="row"><button id="confirm-no" class="button secondary">Cancel</button><button id="confirm-yes" class="button">Confirm</button></div></dialog>`;
async function page(route, title, description, body, lesson = null) {
  const file = path.join(root, route, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  entries.push(file);
  const noindex = !INDEX || lesson !== null;
  await fs.writeFile(
    file,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="robots" content="${noindex ? "noindex,follow" : "index,follow"}"><meta name="theme-color" content="#255c47"><meta name="referrer" content="strict-origin-when-cross-origin"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'"><title>${esc(title)} | Practical room</title><link rel="canonical" href="${SITE + BASE + route}"><link rel="icon" href="${BASE}favicon.svg" type="image/svg+xml"><link rel="manifest" href="${BASE}manifest.webmanifest"><link rel="stylesheet" href="/apps/web/src/style.css"><script type="module" src="/apps/web/src/app.js"></script></head><body data-base="${BASE}"${lesson ? ` data-lesson="${lesson.id}"` : ""}>${header()}<main id="main" class="wrap" tabindex="-1">${body}</main>${footer()}${dialog}</body></html>`,
  );
}
const crumb = (last) =>
  `<nav class="breadcrumb" aria-label="Breadcrumb">${link("", "Home")}<span>/</span>${link("biology/", "Edexcel Combined Science · Biology")}<span>/</span><span>${esc(last)}</span></nav>`;
const p = practicals.find((x) => x.id === "photosynthesis");
await page(
  "",
  "Interactive science practicals",
  "Explore original interactive GCSE science practical previews. Watch the method, move the apparatus and revisit each step.",
  `<section class="hero"><div><span class="eyebrow">A little curiosity. A lot to discover.</span><h1>Science makes sense<br>when you <em>see it.</em></h1><p>A place to watch, try and understand school practicals. Move the apparatus. Follow what changes. Learn at your own pace.</p><div class="row">${link("biology/", "Explore Biology " + icon("arrow-right"), "button")}${link("practicals/photosynthesis/", icon("play") + " Try a preview", "button secondary")}</div><p class="hero-note">Free to explore · No account needed · Works on your device</p></div><div class="hero-lab illustrated-lab"><div class="lab-label"><span>A space for discovery</span><span>Watch · Try · Learn</span></div>${labIllustration()}<div class="lab-art-footer"><span>Big discoveries start with curiosity.</span><button id="lab-motion" class="lab-motion" type="button" aria-pressed="false">Pause animation</button></div></div></section><section class="explainer" aria-label="How it works"><div>${icon("play")}<span><strong>See the whole process</strong>Watch each stage unfold.</span></div><div>${icon("microscope")}<span><strong>Take a turn at the bench</strong>Move objects in Try mode.</span></div><div>${icon("bookmark")}<span><strong>Pick up where you left off</strong>Save a checkpoint on this device.</span></div></section><section><div class="section-head"><div><span class="eyebrow">Choose your subject</span><h2>One experiment at a time.</h2></div><span class="subtle">Pearson Edexcel GCSE (9–1)<br>Combined Science · 1SC0</span></div><div class="subjects">${link("biology/", icon("leaf") + `<span class="arrow">↗</span><h3>Biology</h3><p>Living things, tiny cells and big questions.<br>6 core · 2 additional previews</p>`, "subject")}${link("chemistry/", icon("flask") + `<h3>Chemistry</h3><p>Reactions, materials and matter.<br>Collection planned</p>`, "subject")}${link("physics/", icon("atom") + `<h3>Physics</h3><p>Forces, energy and how things work.<br>Collection planned</p>`, "subject")}</div></section><section class="feature-row" aria-label="Featured practicals">${[practicals[0], p].map((l) => `<article class="feature"><div class="mini-scene">${scene(l, 4)}</div><div><span class="tag">Core practical · ${l.ref}</span><h3>${l.title}</h3><p class="subtle">${l.topic}</p>${link("practicals/" + l.id + "/", "Open preview →")}</div></article>`).join("")}</section><p class="notice">An evolving collection: these original previews are checked against linked reference sheets, but have not yet been checked scene-by-scene against the supplied videos. They support revision and do not replace supervised laboratory work.</p>`,
);
const card = (l) =>
  `<article class="card" data-card data-category="${l.core ? "core" : "additional"}"><div class="card-art" aria-hidden="true" inert>${scene(l, 4)}</div><div class="card-body"><span class="tag">${l.core ? "Core practical" : "Additional · separate Biology core"} · ${l.ref}</span><h2>${l.title}</h2><p>${l.summary}</p>${link("practicals/" + l.id + "/", "Open " + l.topic + " preview →")}<span class="status">Video verification pending</span></div></article>`;
await page(
  "biology/",
  "Edexcel Combined Science Biology practicals",
  "Six core Biology practicals and two additional activities, with interactive previews, source videos and original notes.",
  `<nav class="breadcrumb" aria-label="Breadcrumb">${link("", "Home")} / Pearson Edexcel / GCSE Combined Science</nav><span class="eyebrow">Explore the living world</span><h1 class="page-title">Biology, at the bench.</h1><p class="page-intro">Watch the method first, then take control of the apparatus. Each practical has a written sequence, a short knowledge check and its original source links.</p><div class="notice">Food tests (1.13B) and antimicrobial effects (5.18B) are additional here. Both are core practicals in the <strong>separate GCSE Biology</strong> qualification.</div><section id="catalogue" aria-label="Biology practical catalogue"><div class="toolbar"><div class="tabs" aria-label="Filter practicals"><button data-filter="all" aria-pressed="true">All practicals</button><button data-filter="core" aria-pressed="false">Core · 6</button><button data-filter="additional" aria-pressed="false">Additional · 2</button></div><label class="search">${icon("search")}<span class="sr-only" hidden>Search practicals</span><input id="search" type="search" aria-label="Search Biology practicals" placeholder="Find a practical…"></label></div><p id="results-count" class="subtle" aria-live="polite">8 practicals</p><div class="cards">${practicals.map(card).join("")}</div><p id="no-results" class="empty" hidden>No practicals match. Try another word or choose All practicals.</p></section>`,
);
for (const subject of ["chemistry", "physics"])
  await page(
    subject + "/",
    `GCSE ${subject} collection`,
    `The ${subject} practical collection is planned. Biology previews are available now.`,
    `${crumb(subject)}<h1 class="page-title">${subject[0].toUpperCase() + subject.slice(1)} is next.</h1><p class="page-intro">This collection is planned. We will add reviewed practicals one at a time; there are no ${subject} simulations to open yet.</p><div class="row">${link("biology/", "Explore Biology previews", "button")}${link("", "Back to subjects", "button secondary")}</div><div style="height:160px"></div>`,
  );
for (const l of practicals) {
  await page(
    "practicals/" + l.id + "/",
    l.topic + " practical preview",
    l.summary,
    `${crumb(l.topic)}<span class="eyebrow">${l.core ? "Combined Science · Core practical" : "Additional here · Separate Biology core"} ${l.ref}</span><h1 class="page-title">${l.title}</h1><p class="page-intro">${l.summary}</p><p class="notice">${l.review}. This is an original teaching preview, not a verified reproduction of the video. ${l.id === "photosynthesis" ? "This version uses the algal-ball reference method, not the earlier pondweed prototype." : ""}</p><div class="player-layout" id="player"><section class="player-panel" aria-label="Interactive practical"><div class="player-top"><span class="tag" id="stage-count">Step 1 of ${l.steps.length}</span><div class="mode-toggle" aria-label="Playback mode"><button data-mode="watch" aria-pressed="true">Watch</button><button data-mode="try" aria-pressed="false">Try it yourself</button></div></div><div class="stage-heading"><span id="stage-number" class="step-number">1</span><h2 id="stage-title">${l.steps[0].title}</h2></div><div id="scene" class="scene">${scene(l, 0)}</div><div id="caption" class="caption" aria-live="polite">${l.steps[0].text}</div><div class="action-row" id="action-row" hidden><p class="action-hint" id="action-hint"></p><button class="button small secondary" id="action-button">Complete action</button></div><div class="player-controls"><div class="row"><button id="play" class="button small">Play</button><button id="back" class="button plain small">Previous</button><button id="next" class="button plain small">Next step</button></div><div class="step-dots" aria-label="Jump to step">${l.steps.map((s, i) => `<button data-seek="${i}" aria-label="Step ${i + 1}: ${s.title}">${i + 1}</button>`).join("")}</div><button id="restart" class="button plain small">Restart</button></div></section><aside class="player-aside"><section class="sidecard"><h2>Your experiment</h2><ol class="step-list">${l.steps.map((s) => `<li>${s.title}</li>`).join("")}</ol><div class="save-box"><label><input type="checkbox" id="remember">Remember my progress on this device</label><p id="save-status" class="status-line" role="status"></p></div></section><section class="sidecard"><h2>Keep exploring</h2><a class="button secondary" href="${l.videoUrl}" target="_blank" rel="noopener noreferrer">${icon("play")} Source video ↗</a><a class="button secondary" href="${BASE}notes/${l.id}.pdf" download>${icon("download")} Preview notes · PDF</a>${link("learning/", icon("bookmark") + " Save for offline use", "button secondary")}<p class="subtle">YouTube opens separately. Video captions and exact timings await review.</p></section></aside></div><div id="completion" class="notice" hidden>Preview finished. You can revisit any step or try the knowledge check below. This is not a record of completing a real laboratory practical.</div><div class="text-sections"><section><h2>Understand the practical</h2><p>${l.concept}</p><details open><summary>Written sequence</summary><ol>${l.steps.map((s) => `<li><strong>${s.title}.</strong> ${s.text}</li>`).join("")}</ol></details><details><summary>Apparatus and safety</summary><p>${l.apparatus}</p><p>${l.safety}</p><p>Follow your teacher’s instructions and school risk assessment. This preview is not a complete laboratory protocol.</p></details><details><summary>Sources and verification</summary><p>${ext(l.videoUrl, "User-supplied video")} · ${ext(l.sheet, "Pearson reference sheet")} · ${ext(l.source, "Pearson practical collection")}</p><p>Reference checked 29 September 2026. Video timestamps: not yet verified. Original schematic artwork; illustrative observations are not measurements. Version ${l.version}.</p></details></section><section class="quiz"><span class="eyebrow">A moment to think</span><h2>Check your understanding</h2><form id="quiz-form"><fieldset><legend>${l.question}</legend>${l.answers.map((a, i) => `<label><input type="radio" name="answer" value="${i}">${a}</label>`).join("")}</fieldset><button class="button" type="submit">Check answer</button><p id="quiz-feedback" role="status"></p></form><p>Take your time. There is no timer and you can try again.</p></section></div>`,
    l,
  );
}
await page(
  "learning/",
  "My learning",
  "Resume device-saved science practical previews and manage offline access.",
  `${crumb("My learning")}<span class="eyebrow">Your own pace</span><h1 class="page-title">A place to pick up again.</h1><p class="page-intro">Checkpoints stay in this browser. No sign-in or cloud sync is enabled in this preview. On a shared computer, clear your progress when you finish.</p><div class="learning-grid"><section aria-label="Saved practicals"><div id="saved-list"></div>${link("biology/", "Find another practical →")}</section><aside><section class="sidecard"><h2>Take the lab offline</h2><p class="subtle">Save all eight previews and their notes on this device. Source videos and Pearson sheets are not included.</p><p id="offline-status" class="status-line">Not saved offline yet.</p><button id="save-offline" class="button">${icon("download")} Save offline copy</button></section><section class="sidecard"><h2>Your device, your choice</h2><button id="clear-progress" class="button secondary">Clear my progress</button><button id="remove-offline" class="button secondary">Remove offline files</button><p id="device-status" class="status-line" role="status"></p>${link("deletion/", "How data deletion works")}</section></aside></div>`,
);
for (const [slug, p] of Object.entries(policies)) {
  await page(
    slug + "/",
    p.title,
    p.intro,
    `<article class="article"><span class="eyebrow">Help & your choices · Preview v2</span><h1>${p.title}</h1><p>${p.intro}</p>${p.sections.map(([h, t]) => `<section><h2>${h}</h2><p>${t}</p></section>`).join("")}${slug === "deletion" ? '<div class="row"><button id="clear-progress" class="button secondary">Clear my progress</button><button id="remove-offline" class="button secondary">Remove offline files</button></div><p id="device-status" role="status"></p>' : ""}<p>Updated 29 September 2026. ${ext("https://github.com/HRITHIKA-NAIR/BIOLOGY-SIMULATIONS/issues", "Report a non-sensitive project issue")}</p></article>`,
  );
}
await fs.mkdir(root + "/public/notes", { recursive: true });
await fs.writeFile(
  root + "/public/favicon.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#255c47"/><path d="M18 44c-7-27 25-32 31-29 0 28-18 34-31 29Zm1 0 22-22" fill="none" stroke="#edf2d5" stroke-width="4" stroke-linecap="round"/></svg>',
);
await fs.writeFile(
  root + "/public/manifest.webmanifest",
  JSON.stringify({
    name: "Practical room - Science previews",
    short_name: "Practical room",
    start_url: BASE,
    scope: BASE,
    display: "standalone",
    background_color: "#f7f8f2",
    theme_color: "#255c47",
    icons: [
      {
        src: BASE + "favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }),
);
function ascii(s) {
  return s
    .replaceAll("×", "x")
    .replaceAll("−", "-")
    .replaceAll("÷", "/")
    .replaceAll("³", "3")
    .replaceAll("₂", "2")
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-")
    .replaceAll("·", "|")
    .replace(/[^\x20-\x7e\n]/g, "");
}
for (const l of practicals) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(
      await fs.readFile(
        "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff",
      ),
      { subset: true },
    ),
    bold = await pdf.embedFont(
      await fs.readFile(
        "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff",
      ),
      { subset: true },
    );
  const sheet = pdf.addPage([595, 842]);
  let y = 789;
  const draw = (text, size = 11, b = false) => {
    const words = ascii(text).split(/\s+/);
    let line = "";
    for (const word of words) {
      const candidate = line ? line + " " + word : word;
      if ((b ? bold : font).widthOfTextAtSize(candidate, size) > 495) {
        sheet.drawText(line, {
          x: 50,
          y,
          size,
          font: b ? bold : font,
          color: rgb(0.15, 0.25, 0.2),
        });
        y -= size * 1.5;
        line = word;
      } else line = candidate;
    }
    if (line) {
      sheet.drawText(line, {
        x: 50,
        y,
        size,
        font: b ? bold : font,
        color: rgb(0.15, 0.25, 0.2),
      });
      y -= size * 1.5;
    }
    y -= 7;
  };
  draw("PRACTICAL ROOM / ORIGINAL PREVIEW NOTES", 10, true);
  draw(l.title, 23, true);
  draw(l.topic + " | " + l.ref, 12);
  draw(
    "Reference-based summary. Video verification pending. Not a complete laboratory protocol.",
    10,
    true,
  );
  draw("METHOD PREVIEW", 11, true);
  l.steps.forEach((s, i) => draw(`${i + 1}. ${s.title}. ${s.text}`, 10));
  draw("UNDERSTAND", 11, true);
  draw(l.concept, 10);
  draw("SAFETY", 11, true);
  draw(l.safety + " Follow your teacher and school risk assessment.", 10);
  draw("SOURCE VIDEO", 10, true);
  draw(l.videoUrl, 10);
  draw(
    "Reference: Pearson Biology core practical sheets; full link on the lesson page.",
    9,
  );
  draw(
    `Version ${l.version} | 29 September 2026 | Independent, unaffiliated learning preview.`,
    9,
  );
  if (y < 30) throw new Error(`PDF overflow ${l.id}`);
  await fs.writeFile(root + `/public/notes/${l.id}.pdf`, await pdf.save());
}
await build({
  root,
  base: BASE,
  publicDir: root + "/public",
  configFile: false,
  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,
    rollupOptions: { input: entries },
  },
});
const list = async (dir) => {
  const a = [];
  for (const f of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) a.push(...(await list(p)));
    else a.push(p);
  }
  return a;
};
await fs.writeFile(
  "dist/404.html",
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Practical room</title><h1>That page is not here.</h1><p><a href="${BASE}">Return to Practical room</a></p></html>`,
);
const urls = INDEX
  ? ["", "biology/", "chemistry/", "physics/"]
      .map((r) => `<url><loc>${SITE + BASE + r}</loc></url>`)
      .join("")
  : "";
await fs.writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
);
await fs.writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${SITE + BASE}sitemap.xml\n`,
);
await fs.writeFile(
  "dist/_headers",
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: frame-ancestors 'none'\n`,
);
const files = (await list("dist")).filter((f) => !f.endsWith("_headers"));
const hash = crypto.createHash("sha256");
for (const f of files) hash.update(await fs.readFile(f));
const version = hash.digest("hex").slice(0, 12);
const paths = files.map(
  (f) => BASE + path.relative("dist", f).replaceAll("\\", "/"),
);
paths.push(BASE);
await fs.writeFile(
  "dist/sw.js",
  `const NAME='science-practicals-offline-${version}';const PREFIX='science-practicals-offline-';const FILES=${JSON.stringify(paths)};self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));self.addEventListener('message',e=>{if(e.data?.type!=='SAVE_OFFLINE')return;e.waitUntil((async()=>{try{const cache=await caches.open(NAME);await cache.addAll(FILES.map(p=>new Request(p,{cache:'reload'})));for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==NAME)await caches.delete(k);e.ports[0]?.postMessage({ok:true});}catch{const c=await caches.open(NAME);if(!(await c.match(FILES[0])))await caches.delete(NAME);e.ports[0]?.postMessage({ok:false,error:'Download interrupted. Your previous offline copy is kept. Please retry online.'});}})());});self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith('${BASE}'))return;e.respondWith((async()=>{for(const k of (await caches.keys()).filter(k=>k.startsWith(PREFIX)).sort(k=>k===NAME?-1:1)){const c=await caches.open(k);const hit=await c.match(e.request)||await c.match(u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname);if(hit)return hit;}return fetch(e.request);})());});`,
);
console.log(
  `Built ${practicals.length} practical previews; indexing ${INDEX ? "enabled for catalogue only" : "disabled pending review"}. Offline version ${version}.`,
);
