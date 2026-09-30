import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const base = "/BIOLOGY-SIMULATIONS/";
test("catalogue filters, responsive layout and no external tracking requests", async ({
  page,
}) => {
  const foreign = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4173")) foreign.push(r.url());
  });
  await page.goto(base);
  await expect(
    page.getByRole("heading", { name: /Science makes sense/ }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.goto(base + "biology/");
  await page.getByRole("button", { name: "Additional · 2" }).click();
  await expect(page.locator("[data-card]:visible")).toHaveCount(2);
  await page.getByRole("searchbox").fill("nothingmatches");
  await expect(page.locator("#no-results")).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
  await page.goto(base);
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  expect(foreign).toEqual([]);
});
test("player supports keyboard object actions, pause, saved resume, quiz and deletion", async ({
  page,
}) => {
  await page.goto(base + "practicals/photosynthesis/");
  await page.getByLabel("Remember my progress on this device").check();
  await page.getByRole("button", { name: "Try it yourself" }).click();
  await page.getByRole("button", { name: "Next step", exact: true }).click();
  await expect(page.locator("#stage-title")).toHaveText(
    "Include a dark control",
  );
  await expect(page.locator("#play")).toBeDisabled();
  await page.locator("[data-object]").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-target]")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#action-row")).toBeHidden();
  await page.locator("#play").click();
  await expect(page.locator("#play")).toHaveText("Play");
  await page.reload();
  await expect(page.locator("#stage-title")).toHaveText(
    "Include a dark control",
  );
  await expect(page.locator("#play")).toHaveText("Play");
  await page.getByLabel("To compare with a sample kept in darkness").check();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.locator("#quiz-feedback")).toContainText("Correct.");
  await page.screenshot({
    path: "test-results/player-desktop.png",
    fullPage: true,
  });
  await page.goto(base + "learning/");
  await expect(
    page.getByRole("link", { name: "Resume practical" }),
  ).toHaveCount(1);
  await page
    .getByRole("button", { name: "Clear my progress", exact: true })
    .click();
  await page.getByRole("button", { name: "Confirm", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Resume practical" }),
  ).toHaveCount(0);
});
test("all lessons load, share accessible controls, and keep notes available", async ({
  page,
}) => {
  const ids = [
    "microscopy",
    "enzymes",
    "osmosis",
    "photosynthesis",
    "respiration",
    "fieldwork",
    "food-tests",
    "antimicrobials",
  ];
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const id of ids) {
    await page.goto(base + "practicals/" + id + "/");
    await expect(page.locator("#scene svg")).toBeVisible();
    const response = await page.request.get(base + "notes/" + id + ".pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    await page.getByRole("button", { name: "Try it yourself" }).click();
    await page.getByRole("button", { name: "Next step", exact: true }).click();
    await expect(page.locator("#action-row")).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test("WCAG automated checks on home, catalogue, player and data page", async ({
  page,
}) => {
  for (const route of [
    "",
    "biology/",
    "practicals/photosynthesis/",
    "deletion/",
  ]) {
    await page.goto(base + route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});
test("offline copy survives network loss and can be removed", async ({
  page,
  context,
}) => {
  await page.goto(base + "learning/");
  await page.getByRole("button", { name: "Save offline copy" }).click();
  await expect(page.locator("#device-status")).toContainText("Saved offline.", {
    timeout: 20000,
  });
  await context.setOffline(true);
  await page.goto(base + "practicals/microscopy/");
  await expect(page.locator("#stage-title")).toHaveText("Prepare the slide");
  await page.goto(base + "learning/");
  await page.getByRole("button", { name: "Remove offline files" }).click();
  await page.getByRole("button", { name: "Confirm", exact: true }).click();
  await expect(page.locator("#device-status")).toContainText(
    "Offline files removed.",
  );
  await context.setOffline(false);
  expect(
    await page.evaluate(async () =>
      (await caches.keys()).filter((k) =>
        k.startsWith("science-practicals-offline-"),
      ),
    ),
  ).toEqual([]);
});
test("mobile player has no overflow and reduced motion honours preference", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "practicals/microscopy/");
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
  await expect(page.locator("#motion")).toHaveText("Background motion: off");
  await page.screenshot({
    path: "test-results/player-mobile.png",
    fullPage: true,
  });
});
test("dragging accepts the correct target and rejects an incorrect drop", async ({
  page,
}) => {
  await page.goto(base + "practicals/photosynthesis/");
  await page.getByRole("button", { name: "Try it yourself" }).click();
  await page.getByRole("button", { name: "Next step", exact: true }).click();
  await page.locator("#scene").scrollIntoViewIfNeeded();
  const positions = await page.locator("[data-object]").evaluate((el) => {
    const svg = el.ownerSVGElement;
    const pos = (value) => {
      const [x, y] = value.split(",").map(Number);
      const point = new DOMPoint(x, y).matrixTransform(svg.getScreenCTM());
      return { x: point.x, y: point.y };
    };
    return { from: pos(el.dataset.from), to: pos(el.dataset.to) };
  });
  await page.mouse.move(positions.from.x, positions.from.y);
  await page.mouse.down();
  await page.mouse.move(positions.from.x - 100, positions.from.y, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator("#action-row")).toBeVisible();
  await page.mouse.move(positions.from.x, positions.from.y);
  await page.mouse.down();
  await page.mouse.move(positions.to.x, positions.to.y, { steps: 10 });
  await page.mouse.up();
  await expect(page.locator("#action-row")).toBeHidden();
  await expect(page.locator("#play")).toHaveText("Pause");
});

test("process motion changes every practical and stops precisely on pause", async ({
  page,
}) => {
  for (const [id, index] of [
    ["microscopy", 3],
    ["enzymes", 3],
    ["osmosis", 3],
    ["photosynthesis", 3],
    ["respiration", 3],
    ["fieldwork", 3],
    ["food-tests", 2],
    ["antimicrobials", 3],
  ]) {
    await page.goto(base + "practicals/" + id + "/");
    await page.locator(`[data-seek="${index}"]`).click();
    const before = await page.locator("#scene > svg").innerHTML();
    await page.locator("#play").click();
    await expect
      .poll(() => page.locator("#scene > svg").innerHTML())
      .not.toBe(before);
    await page.locator("#play").click();
    const paused = await page.locator("#scene > svg").innerHTML();
    await page.waitForTimeout(120);
    expect(await page.locator("#scene > svg").innerHTML()).toBe(paused);
  }
});
test("alternative methods restore the correct checkpoint and mobile controls remain readable", async ({
  page,
}) => {
  await page.goto(base + "practicals/fieldwork/");
  await page.locator("#method-choice").selectOption("random");
  await page.locator("#remember").check();
  await page.locator('[data-seek="2"]').click();
  await expect(page.locator("#stage-title")).toHaveText("Place the quadrat");
  await page.reload();
  await expect(page.locator("#method-choice")).toHaveValue("random");
  await expect(page.locator("#stage-title")).toHaveText("Place the quadrat");
  await page.goto(base + "learning/");
  await expect(
    page.getByRole("link", { name: "Resume practical" }),
  ).toBeVisible();
  await page.goto(base + "practicals/microscopy/");
  await page.locator("#method-choice").selectOption("prepared");
  await page.locator('[data-seek="1"]').click();
  await expect(page.locator("#stage-title")).toHaveText("Secure the slide");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#large-text").check();
  expect(
    await page
      .locator("#caption")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(22);
  await page.locator("#zoom-scene").click();
  expect(
    await page
      .locator("#scene")
      .evaluate((el) => el.scrollWidth > el.clientWidth),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("indicator colour develops gradually rather than switching at a stage boundary", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto(base + "practicals/photosynthesis/");
  await page.locator('[data-seek="3"]').click();
  const liquid = page.locator("#scene > svg [data-liquid]").first();
  const start = await liquid.getAttribute("fill");
  await page.locator("#play").click();
  await page.clock.runFor(4500);
  const middle = await liquid.getAttribute("fill");
  await page.clock.runFor(4500);
  const later = await liquid.getAttribute("fill");
  expect(middle).not.toBe(start);
  expect(later).not.toBe(middle);
  await page.locator("#play").click();
  await page.clock.runFor(2000);
  expect(await liquid.getAttribute("fill")).toBe(later);
});
