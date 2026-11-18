/**
 * Browser validation pass.
 *
 * Opens the page at every target viewport, captures the hero and the full
 * page, and reports horizontal overflow, elements wider than the viewport,
 * failing text contrast, and any console errors.
 *
 * Run with: node scripts/audit.mjs [url]
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const URL = process.argv[2] ?? "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = path.resolve("screenshots");

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "mobile-360", width: 360, height: 740, mobile: true },
];

const relativeLuminance = ([r, g, b]) => {
  const f = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

const report = [];

for (const vp of viewports) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 2,
    isMobile: Boolean(vp.mobile),
    hasTouch: Boolean(vp.mobile),
  });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);

  // Walk the page so every scroll-triggered reveal has fired.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });

  const findings = await page.evaluate(() => {
    const doc = document.documentElement;
    const out = {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflowing: [],
      lowContrast: [],
      smallTargets: [],
      heroHeight: 0,
      viewportHeight: window.innerHeight,
    };

    const hero = document.getElementById("portada");
    if (hero) out.heroHeight = Math.round(hero.getBoundingClientRect().height);

    const describe = (el) =>
      `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ").slice(0, 3).join(".")}`;

    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right > doc.clientWidth + 1 || r.left < -1) {
        out.overflowing.push({
          el: describe(el),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    });

    // Touch target size on interactive elements.
    if (window.innerWidth <= 768) {
      document
        .querySelectorAll("a, button, input, select, textarea")
        .forEach((el) => {
          if (el.classList.contains("sr-only")) return;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.height < 40) {
            out.smallTargets.push({
              el: describe(el),
              text: el.textContent.trim().slice(0, 28),
              h: Math.round(r.height),
            });
          }
        });
    }

    // Contrast of every visible run of text. Colours go through a canvas so
    // any CSS colour syntax (oklab, color-mix, color(srgb ...)) resolves.
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const cache = new Map();
    const parse = (css) => {
      if (cache.has(css)) return cache.get(css);
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1, 1);
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      const rgb = [r, g, b];
      cache.set(css, rgb);
      return rgb;
    };
    const isOpaque = (css) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
      return ctx.getImageData(0, 0, 1, 1).data[3] > 128;
    };
    const bgOf = (el) => {
      let node = el;
      while (node && node !== document.documentElement) {
        const bg = getComputedStyle(node).backgroundColor;
        if (bg && bg !== "transparent" && isOpaque(bg)) return parse(bg);
        node = node.parentElement;
      }
      return [255, 255, 255];
    };

    document.querySelectorAll("body *").forEach((el) => {
      const hasText = Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
      );
      if (!hasText) return;
      if (el.closest(".sr-only")) return;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.opacity === "0") return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;

      out.lowContrast.push({
        el: describe(el),
        text: el.textContent.trim().slice(0, 40),
        fg: parse(style.color),
        bg: bgOf(el),
        size: parseFloat(style.fontSize),
        weight: style.fontWeight,
      });
    });

    return out;
  });

  // Contrast maths in Node so the page stays untouched.
  const failing = findings.lowContrast
    .map((item) => {
      const l1 = relativeLuminance(item.fg);
      const l2 = relativeLuminance(item.bg);
      const ratio =
        (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const large =
        item.size >= 24 || (item.size >= 18.66 && Number(item.weight) >= 700);
      return { ...item, ratio: +ratio.toFixed(2), needed: large ? 3 : 4.5 };
    })
    .filter((item) => item.ratio < item.needed);

  await page.screenshot({
    path: path.join(OUT, `${vp.name}-hero.png`),
    captureBeyondViewport: false,
  });
  await page.screenshot({
    path: path.join(OUT, `${vp.name}-full.png`),
    fullPage: true,
  });

  report.push({
    viewport: vp.name,
    overflow: findings.scrollWidth - findings.clientWidth,
    overflowing: findings.overflowing.slice(0, 6),
    heroHeight: findings.heroHeight,
    viewportHeight: findings.viewportHeight,
    heroFits: findings.heroHeight <= findings.viewportHeight + 1,
    smallTargets: findings.smallTargets.slice(0, 8),
    failingContrast: failing.slice(0, 10),
    consoleErrors: consoleErrors.slice(0, 5),
  });

  await page.close();
}

await browser.close();

fs.writeFileSync(
  path.join(OUT, "audit.json"),
  JSON.stringify(report, null, 2),
);

for (const r of report) {
  console.log(`\n=== ${r.viewport} ===`);
  console.log(`overflow ${r.overflow}px | hero ${r.heroHeight}/${r.viewportHeight} ${r.heroFits ? "fits" : "OVERFLOWS"}`);
  for (const o of r.overflowing) console.log(`  wide: ${o.el} [${o.left}..${o.right}]`);
  for (const t of r.smallTargets) console.log(`  tap ${t.h}px: ${t.el} "${t.text}"`);
  for (const c of r.failingContrast)
    console.log(`  contrast ${c.ratio}/${c.needed} ${c.size}px: ${c.el} "${c.text}"`);
  for (const e of r.consoleErrors) console.log(`  console: ${e}`);
}
