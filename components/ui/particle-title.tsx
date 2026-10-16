"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
 * Particle Title
 *
 * A headline that dissolves into drifting dust inside a soft glow, then
 * gathers back into crisp text. Six dissolve styles rotate.
 *
 * Adapted from the original single-line demo so it can drive a real
 * hero headline: it measures the live <h1> (font, size, line height,
 * letter-spacing) and draws the same lines on a canvas laid over it.
 * The real text stays in the DOM for layout, SEO and screen readers,
 * and stays visible until the canvas is ready (and under reduced motion).
 * ------------------------------------------------------------------ */

type RGB = [number, number, number];
type Box = { x: number; y: number; w: number; h: number };
type Field = { cx: number; cy: number; rx: number; ry: number };
type Mode = "smoke" | "vortex" | "sand" | "burst" | "sweep" | "absorb";
export type Blob = { rgb: RGB; a: number; fx: number; fy: number; fw: number; fh: number };
export type Palette = { ink: RGB; page: RGB; blobs: Blob[] };

const MODES: Mode[] = ["smoke", "vortex", "sand", "burst", "sweep", "absorb"];
// Long hold so the name is readable most of the cycle.
const TIMING = { hold: 6500, field: 900, travel: 2800 };
const MAX_CELLS = 6000;

function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => {
  const c = clamp(t);
  return c * c * (3 - 2 * c);
};
const ease = (t: number) => {
  const c = clamp(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
};

function createModeBag(seed: number): () => Mode {
  const r = createRng(seed);
  let bag: Mode[] = [];
  let last: Mode | null = null;
  return () => {
    if (!bag.length) {
      bag = MODES.slice();
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag[bag.length - 1] === last) [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
    }
    last = bag.pop() as Mode;
    return last;
  };
}

function blobStrength(b: Blob, A: Box, x: number, y: number) {
  const bw = b.fw * A.w, bh = b.fh * A.h;
  const cx = A.x + b.fx * A.w + bw / 2, cy = A.y + b.fy * A.h + bh / 2;
  return Math.max(0, 1 - Math.hypot((x - cx) / (bw / 2), (y - cy) / (bh / 2))) * b.a;
}

function rimMask(A: Box, x: number, y: number) {
  const r = Math.hypot((x - (A.x + A.w / 2)) / (A.w / 2), (y - (A.y + A.h / 2)) / (A.h / 2));
  return r < 0.55 ? 1 : r >= 1 ? 0 : 1 - (r - 0.55) / 0.45;
}

function glowAt(pal: Palette, A: Box, x: number, y: number): { c: RGB; s: number } {
  let [r, g, b] = pal.page;
  let vis = 0;
  const m = rimMask(A, x, y);
  for (const bl of pal.blobs) {
    const s = blobStrength(bl, A, x, y) * m;
    r = mix(r, bl.rgb[0], s);
    g = mix(g, bl.rgb[1], s);
    b = mix(b, bl.rgb[2], s);
    vis = Math.max(vis, s);
  }
  return { c: [r, g, b], s: vis };
}

function sampleFieldPoint(pal: Palette, rand: () => number, f: Field, A: Box) {
  let best: { x: number; y: number; c: RGB; s: number } | null = null;
  for (let k = 0; k < 4; k++) {
    const a = rand() * 6.2832;
    const q = Math.pow(rand(), 0.6);
    const x = f.cx + Math.cos(a) * f.rx * q;
    const y = f.cy + Math.sin(a) * f.ry * q;
    const g = glowAt(pal, A, x, y);
    if (!best || g.s > best.s) best = { x, y, c: g.c, s: g.s };
  }
  return best as { x: number; y: number; c: RGB; s: number };
}

type Cell = {
  rx: number; ry: number; rw: number; rh: number; hx: number; hy: number; nx: number; ny: number;
  r1: number; r2: number; r3: number; size: number; fx: number; fy: number; fc: RGB;
  lt: number; bend: number; pa: number;
};
type Phase = "text" | "dissolving" | "field" | "gathering";

function plan(mode: Mode, p: Cell, W: number, H: number) {
  switch (mode) {
    case "smoke": return { delay: (1 - clamp(p.ny)) * 0.35 + p.r3 * 0.25, bend: (p.r1 - 0.5) * 150 };
    case "vortex":
      return {
        delay: (Math.hypot(p.hx - W / 2, p.hy - H / 2) / Math.max(1, W)) * 0.9 + p.r3 * 0.15,
        bend: (p.r2 > 0.5 ? 1 : -1) * (90 + p.r1 * 140),
      };
    case "sand": return { delay: p.nx * 0.6 + p.r3 * 0.18, bend: (p.r1 - 0.5) * 60 };
    case "burst": return { delay: p.r3 * 0.1, bend: (p.r2 - 0.5) * 26 };
    case "sweep": return { delay: (1 - p.nx) * 0.6 + p.r3 * 0.18, bend: -(60 + p.r1 * 90) };
    default: return { delay: p.r1 * 0.55, bend: (p.r2 - 0.5) * 100 };
  }
}

function bowAt(a: [number, number], b: [number, number], bend: number, t: number) {
  const e = ease(t), dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
  const bow = Math.sin(e * Math.PI) * bend;
  return [mix(a[0], b[0], e) + (-dy / L) * bow, mix(a[1], b[1], e) + (dx / L) * bow, e] as const;
}

const rgbStr = (a: RGB, b: RGB, t: number) => {
  const c = (i: number) => Math.max(0, Math.min(255, Math.round(mix(a[i], b[i], t))));
  return `rgb(${c(0)},${c(1)},${c(2)})`;
};

type Typo = { lines: string[]; font: string; size: number; lineHeight: number; tracking: number; padX: number; padY: number };
type Engine = { setActive: (on: boolean) => void; resize: (t: Typo) => void; destroy: () => void };

function createEngine(cv: HTMLCanvasElement, initial: Typo, pal: Palette, onReady: () => void): Engine | null {
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  const textCv = document.createElement("canvas");
  const nextMode = createModeBag((Date.now() & 0xffff) ^ 0x5a5a);
  let typo = initial;
  let W = 0, H = 0, dpr = 1;
  let field: Field = { cx: 0, cy: 0, rx: 0, ry: 0 };
  let box: Box = { x: 0, y: 0, w: 0, h: 0 };
  let parts: Cell[] = [];
  let phase: Phase = "text", mode: Mode = nextMode(), phaseStart = 0, raf = 0, timer = 0;
  let active = true, destroyed = false;

  function reroll() {
    const r = createRng((Math.random() * 1e9) | 0);
    for (const p of parts) { const q = sampleFieldPoint(pal, r, field, box); p.fx = q.x; p.fy = q.y; p.fc = q.c; }
  }

  function build() {
    W = cv.clientWidth; H = cv.clientHeight;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.max(1, Math.round(W * dpr)); cv.height = Math.max(1, Math.round(H * dpr));
    textCv.width = cv.width; textCv.height = cv.height;
    box = { x: 0, y: 0, w: W, h: H };
    field = { cx: W / 2, cy: H / 2, rx: W * 0.46, ry: H * 0.42 };

    const o = textCv.getContext("2d") as CanvasRenderingContext2D;
    o.setTransform(dpr, 0, 0, dpr, 0, 0); o.clearRect(0, 0, W, H);
    o.font = typo.font;
    o.textAlign = "left"; o.textBaseline = "middle";
    // letterSpacing is newer canvas API; ignored where unsupported.
    (o as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${typo.tracking}px`;
    o.fillStyle = `rgb(${pal.ink.join(",")})`;
    const lh = typo.size * typo.lineHeight;
    typo.lines.forEach((ln, i) => o.fillText(ln, typo.padX, typo.padY + i * lh + lh / 2));
    const textTop = typo.padY, textH = lh * typo.lines.length;

    const d = o.getImageData(0, 0, cv.width, cv.height).data;
    let cs = Math.max(2, Math.round(3 * dpr));
    let pts: number[][];
    for (;;) {
      pts = [];
      for (let y = 0; y < cv.height; y += cs) for (let x = 0; x < cv.width; x += cs) {
        const w = Math.min(cs, cv.width - x), h = Math.min(cs, cv.height - y);
        let hit = false;
        for (let yy = y; yy < y + h && !hit; yy++) for (let xx = x; xx < x + w; xx++) if (d[(yy * cv.width + xx) * 4 + 3] > 0) { hit = true; break; }
        if (hit) pts.push([x, y, w, h]);
      }
      if (pts.length <= MAX_CELLS) break;
      cs++;
    }
    let minX = 1e9, maxX = -1e9;
    for (const p of pts) {
      p[4] = (p[0] + p[2] / 2) / dpr; p[5] = (p[1] + p[3] / 2) / dpr;
      if (p[4] < minX) minX = p[4];
      if (p[4] > maxX) maxX = p[4];
    }
    const r = createRng(7);
    parts = pts.map((p) => {
      const u = r(), size = u < 0.62 ? 1 + r() * 0.9 : u < 0.9 ? 2 + r() * 1.6 : 3.6 + r() * 3.4;
      return {
        rx: p[0], ry: p[1], rw: p[2], rh: p[3], hx: p[4], hy: p[5], nx: (p[4] - minX) / Math.max(1, maxX - minX),
        ny: (p[5] - textTop) / Math.max(1, textH), r1: r(), r2: r(), r3: r(), size, fx: 0, fy: 0, fc: [0, 0, 0] as RGB, lt: 0, bend: 0, pa: 0,
      };
    });
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    reroll();
  }

  function drawRealText() {
    const c = ctx as CanvasRenderingContext2D;
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height);
    c.globalAlpha = 1; c.drawImage(textCv, 0, 0); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function frame(now: number) {
    raf = 0;
    const c = ctx as CanvasRenderingContext2D;
    const prog = clamp((now - phaseStart) / TIMING.travel), out = phase === "dissolving";
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height);
    for (const p of parts) {
      const pl = plan(mode, p, W, H), lt = clamp((prog - pl.delay * 0.55) / 0.45);
      p.lt = lt; p.bend = pl.bend;
      p.pa = out ? 1 - smooth(lt / 0.18) : smooth((lt - 0.82) / 0.18);
      if (p.pa <= 0.002) continue;
      c.globalAlpha = p.pa; c.drawImage(textCv, p.rx, p.ry, p.rw, p.rh, p.rx, p.ry, p.rw, p.rh);
    }
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (const p of parts) {
      const lt = p.lt;
      if (lt <= 0 || lt >= 1) continue;
      const a: [number, number] = out ? [p.hx, p.hy] : [p.fx, p.fy];
      const b: [number, number] = out ? [p.fx, p.fy] : [p.hx, p.hy];
      const q = bowAt(a, b, out ? p.bend : -p.bend, lt), e = out ? q[2] : 1 - q[2];
      let alpha = 0.1 + 0.9 * (1 - smooth((e - 0.45) / 0.55));
      alpha *= out ? 1 - smooth((lt - 0.85) / 0.15) : smooth(lt / 0.15) * (1 - p.pa);
      if (alpha <= 0.004) continue;
      c.globalAlpha = Math.min(1, alpha); c.fillStyle = rgbStr(pal.ink, p.fc, smooth(e / 0.6));
      c.beginPath(); c.arc(q[0], q[1], (p.size * mix(1, 1.7, smooth(e))) / 2, 0, 6.2832); c.fill();
    }
    c.globalAlpha = 1;
    if (prog < 1) raf = requestAnimationFrame(frame); else advance();
  }

  function stopWork() { clearTimeout(timer); cancelAnimationFrame(raf); raf = 0; }

  function enter(next: Phase) {
    phase = next; phaseStart = performance.now(); stopWork();
    if (!active || destroyed) return;
    if (next === "text") { drawRealText(); timer = window.setTimeout(advance, TIMING.hold); }
    else if (next === "field") {
      ctx!.setTransform(1, 0, 0, 1, 0, 0); ctx!.clearRect(0, 0, cv.width, cv.height); ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      timer = window.setTimeout(advance, TIMING.field);
    } else {
      if (next === "dissolving") { mode = nextMode(); reroll(); }
      frame(performance.now());
    }
  }
  function advance() {
    enter(phase === "text" ? "dissolving" : phase === "dissolving" ? "field" : phase === "field" ? "gathering" : "text");
  }

  build();
  // Start crisp, so the headline reads immediately, then begin cycling.
  drawRealText();
  onReady();
  enter("text");
  return {
    setActive(on) {
      if (on === active || destroyed) return;
      active = on;
      if (on) enter(phase); else stopWork();
    },
    resize(t) {
      if (destroyed) return;
      typo = t;
      stopWork(); build();
      if (active) enter("text"); else drawRealText();
    },
    destroy() { destroyed = true; active = false; stopWork(); },
  };
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** Padding around the text that the dust is allowed to drift into. */
const BLEED = 64;

export interface ParticleTitleProps {
  /** One string per line. */
  lines: string[];
  /** Colours: ink for the text, page for the background it sits on, blobs for the glow the dust drifts into. */
  palette: Palette;
  className?: string;
  style?: React.CSSProperties;
}

export function ParticleTitle({ lines, palette, className = "", style }: ParticleTitleProps) {
  const reduce = usePrefersReducedMotion();
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const h1 = h1Ref.current;
    const cv = canvasRef.current;
    if (reduce || !h1 || !cv) return;
    let engine: Engine | null = null;
    let cancelled = false;

    const measure = (): Typo => {
      const cs = getComputedStyle(h1);
      const size = parseFloat(cs.fontSize);
      const lineHeight = parseFloat(cs.lineHeight) / size || 0.86;
      const tracking = parseFloat(cs.letterSpacing) || 0;
      const shown = cs.textTransform === "uppercase" ? lines.map((l) => l.toUpperCase()) : lines;
      return {
        lines: shown,
        font: `${cs.fontWeight} ${size}px ${cs.fontFamily}`,
        size,
        lineHeight,
        tracking,
        padX: BLEED + parseFloat(cs.paddingLeft || "0"),
        padY: BLEED + parseFloat(cs.paddingTop || "0"),
      };
    };

    let visible = true;
    const sync = () => engine?.setActive(visible && !document.hidden);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    let rz = 0;
    let size = "";
    const ro = new ResizeObserver(() => {
      const next = `${h1.clientWidth}x${h1.clientHeight}`;
      if (next === size) return;
      size = next;
      clearTimeout(rz);
      rz = window.setTimeout(() => engine?.resize(measure()), 200);
    });

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return;
      size = `${h1.clientWidth}x${h1.clientHeight}`;
      engine = createEngine(cv, measure(), palette, () => setReady(true));
      if (!engine) return;
      io.observe(cv);
      ro.observe(h1);
      document.addEventListener("visibilitychange", sync);
      sync();
    });

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", sync);
      clearTimeout(rz);
      io.disconnect();
      ro.disconnect();
      engine?.destroy();
      setReady(false);
    };
    // palette is a stable module-level object in practice
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, lines.join("|")]);

  return (
    <div className="relative">
      <h1
        ref={h1Ref}
        className={className}
        style={{ ...style, color: ready ? "transparent" : undefined }}
      >
        {lines.map((l) => (
          <span key={l} className="block">{l}</span>
        ))}
      </h1>
      {!reduce && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ left: -BLEED, top: -BLEED, width: `calc(100% + ${BLEED * 2}px)`, height: `calc(100% + ${BLEED * 2}px)` }}
        />
      )}
    </div>
  );
}

export default ParticleTitle;
