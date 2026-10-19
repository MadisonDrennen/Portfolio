// Usage: node render-html-export.js <export.html> <out-dir>
//
// Some design tools export "bundled" HTML pages instead of images. This
// opens one, reports missing resources / unresolved template fields (the
// sign of a bad export: placeholder Latin, empty image slots) and saves a
// full-page PNG. If problems are reported, ask Madison to re-export as PNG
// (posts) or MP4 (reels) instead of using the render.

const puppeteer = require("puppeteer-core");
const fs = require("fs");
const pathLib = require("path");

const [file, out] = process.argv.slice(2);
if (!file || !out) { console.error("usage: node render-html-export.js <export.html> <out-dir>"); process.exit(1); }
fs.mkdirSync(out, { recursive: true });

(async () => {
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
  const p = await b.newPage();
  const problems = [];
  p.on("requestfailed", (r) => problems.push("missing resource: " + decodeURIComponent(r.url()).slice(0, 100)));
  p.on("console", (m) => { if (/never resolved|failed to load/i.test(m.text())) problems.push(m.text().slice(0, 140)); });
  await p.setViewport({ width: 1600, height: 1000 });
  await p.goto("file://" + pathLib.resolve(file), { waitUntil: "networkidle0", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3500));
  const dest = pathLib.join(out, pathLib.basename(file).replace(/\.html$/i, ".png"));
  await p.screenshot({ path: dest, fullPage: true });
  console.log("saved", dest);
  if (problems.length) {
    console.log(`\n${problems.length} problem(s), this export is probably broken:`);
    [...new Set(problems)].slice(0, 12).forEach((x) => console.log("  - " + x));
  } else {
    console.log("no load problems detected");
  }
  await b.close();
})();
