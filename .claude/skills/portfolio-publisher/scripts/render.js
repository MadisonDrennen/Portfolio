// Usage:
//   node render.js <path> <out.png> [--mobile] [--section "Chapter Title"] [--base http://localhost:3000]
//
// Renders a portfolio page headlessly after loading every lazy image and
// forcing scroll-reveal animations visible, then saves either the whole page
// or one chapter (found by its <h2> text). Prints the viewport and page widths
// so horizontal overflow on phones is caught (they must match).

const puppeteer = require("puppeteer-core");

const args = process.argv.slice(2);
const path = args[0];
const out = args[1];
const mobile = args.includes("--mobile");
const sectionIdx = args.indexOf("--section");
const section = sectionIdx > -1 ? args[sectionIdx + 1] : null;
const baseIdx = args.indexOf("--base");
const base = baseIdx > -1 ? args[baseIdx + 1] : "http://localhost:3000";

if (!path || !out) {
  console.error('usage: node render.js <path> <out.png> [--mobile] [--section "Title"] [--base URL]');
  process.exit(1);
}

(async () => {
  const b = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--hide-scrollbars", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const p = await b.newPage();
  p.on("pageerror", (e) => console.log("pageerror:", e.message));
  if (mobile) {
    await p.setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    );
  }
  await p.setViewport({ width: mobile ? 390 : 1440, height: mobile ? 844 : 900, isMobile: mobile, hasTouch: mobile });
  await p.goto(base + path, { waitUntil: "networkidle2", timeout: 120000 });

  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 450) {
    await p.evaluate((y) => scrollTo(0, y), y);
    await new Promise((r) => setTimeout(r, 140));
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

  if (section) {
    const clip = await p.evaluate((title) => {
      const h = [...document.querySelectorAll("h2")].find((x) => x.textContent.trim() === title);
      if (!h) return null;
      const sec = h.closest("section") || h;
      const r = sec.getBoundingClientRect();
      return { x: 0, y: r.top + scrollY, width: document.documentElement.clientWidth, height: Math.min(r.height, 6000) };
    }, section);
    if (!clip) {
      console.log(`section "${section}" not found; headings on page:`,
        await p.evaluate(() => [...document.querySelectorAll("h2")].map((h) => h.textContent.trim())));
      await b.close();
      process.exit(2);
    }
    await p.screenshot({ path: out, clip, captureBeyondViewport: true });
  } else {
    await p.screenshot({ path: out, fullPage: true });
  }

  const [vw, sw] = await p.evaluate(() => [innerWidth, document.documentElement.scrollWidth]);
  console.log(`saved ${out}  viewport=${vw} pageWidth=${sw}${sw > vw ? "  <-- HORIZONTAL OVERFLOW" : ""}`);
  await b.close();
})();
