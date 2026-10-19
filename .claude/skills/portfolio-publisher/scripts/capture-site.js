// Usage: node capture-site.js <out-dir> [--base https://madisondrennen.com] [--mobile]
//
// Full-page screenshots of every page, top to bottom. Defaults to the live
// site. The About hero is captured when "Social Media" is framed (the
// moment Madison prefers for that page).

const puppeteer = require("puppeteer-core");
const fs = require("fs");

const args = process.argv.slice(2);
const out = args[0];
const baseIdx = args.indexOf("--base");
const base = baseIdx > -1 ? args[baseIdx + 1] : "https://madisondrennen.com";
const mobile = args.includes("--mobile");
if (!out) { console.error("usage: node capture-site.js <out-dir> [--base URL] [--mobile]"); process.exit(1); }
fs.mkdirSync(out, { recursive: true });

const PAGES = [
  ["01-home", "/"],
  ["02-about", "/about"],
  ["03-gymrise", "/work/gymrise"],
  ["04-social-mulli", "/work/social-mulli"],
  ["05-rekmed", "/work/rekmed"],
  ["06-explorations", "/work/explorations"],
];

(async () => {
  const b = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--hide-scrollbars", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  for (const [name, path] of PAGES) {
    const p = await b.newPage();
    await p.setViewport({ width: mobile ? 390 : 1440, height: mobile ? 844 : 900, isMobile: mobile, hasTouch: mobile });
    await p.goto(base + path, { waitUntil: "networkidle2", timeout: 120000 });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 450) {
      await p.evaluate((y) => scrollTo(0, y), y);
      await new Promise((r) => setTimeout(r, 150));
    }
    await p.evaluate(() => {
      document.querySelectorAll(".reveal, .reveal-clip").forEach((el) => el.classList.add("visible"));
      document.querySelectorAll("[data-hero-reveal]").forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
      document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"));
      scrollTo(0, 0);
    });
    await p.evaluate(async () => {
      await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; })));
    });
    await new Promise((r) => setTimeout(r, 2500));

    if (path === "/about") {
      // Wait for "Social Media" to settle inside the bracket selector.
      await p.waitForFunction(() => {
        const sel = document.querySelector('[aria-hidden].absolute.top-\\[1\\.2em\\]');
        const items = [...document.querySelectorAll("ul li span")];
        if (!sel || !items.length) return false;
        const c = sel.getBoundingClientRect();
        const cy = c.top + c.height / 2;
        let best = null, d = 1e9;
        for (const s of items) {
          const r = s.getBoundingClientRect();
          const dd = Math.abs(r.top + r.height / 2 - cy);
          if (dd < d) { d = dd; best = s; }
        }
        if (!best || best.textContent.trim().toLowerCase() !== "social media" || d > 2) { window.__ok = 0; return false; }
        window.__ok = (window.__ok || 0) + 1;
        return window.__ok > 6;
      }, { timeout: 90000, polling: 50 }).catch(() => console.log("  (Social Media frame not caught; captured as-is)"));
    }

    await p.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    console.log(name, await p.evaluate(() => document.documentElement.scrollHeight) + "px");
    await p.close();
  }
  await b.close();
})();
