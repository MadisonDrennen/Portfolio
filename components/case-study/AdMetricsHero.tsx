"use client";

import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────
 * Digital-marketing hero dressing for agency case studies.
 *
 *  <MetricsCards>  a floating ad dashboard: KPIs that count up, a chart
 *                  line that draws itself, Meta / Google Ads cards and
 *                  lead notifications that cycle.
 *
 * Decorative only (aria-hidden). Honours prefers-reduced-motion.
 * ──────────────────────────────────────────────────────────────── */

/* ── count-up number ─────────────────────────────────────────────── */
function useCountUp(target: number, decimals = 0, delay = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const t0 = window.setTimeout(() => {
      const tick = (t: number) => {
        if (start === null) start = t;
        const k = Math.min((t - start) / 1800, 1);
        setV(target * (1 - Math.pow(1 - k, 4)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t0);
      cancelAnimationFrame(raf);
    };
  }, [target, delay]);
  return v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

const LEADS_LINE = "M0 74 L18 70 L36 72 L54 62 L72 66 L90 55 L108 58 L126 46 L144 50 L162 38 L180 41 L198 29 L216 32 L234 20 L252 14";

const TOASTS = [
  { k: "New lead", v: "Free Marketing Audit · Meta Ads" },
  { k: "Call booked", v: "Tuesday, 2:30 PM · Google Ads" },
  { k: "New lead", v: "7-Day Trial · Instagram" },
  { k: "Budget shifted", v: "+18% to top performing ad set" },
];

const glass =
  "rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]";

export function MetricsCards({ accent, highlight = "#C6F432" }: { accent: string; highlight?: string }) {
  const leads = useCountUp(1248, 0, 400);
  const cpl = useCountUp(12.43, 2, 600);
  const roas = useCountUp(4.8, 1, 800);
  const ctr = useCountUp(2.91, 2, 900);
  const clicks = useCountUp(3904, 0, 1000);

  const [toast, setToast] = useState(0);
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const id = window.setInterval(() => setToast((t) => (t + 1) % TOASTS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden className="relative w-full h-full select-none">
      {/* Main performance card */}
      <div className={`absolute left-0 right-6 top-10 p-5 ${glass} metrics-float`} style={{ animationDelay: "-1s" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-white/45">Campaign Performance</p>
            <p className="font-sans text-xs text-white/80 mt-1">Last 30 days</p>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[0.5rem] tracking-[0.18em] uppercase" style={{ color: highlight }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: highlight }} />
            Live
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { k: "Leads", v: leads, d: "+32.6%" },
            { k: "Cost / Lead", v: `$${cpl}`, d: "−14.3%" },
            { k: "ROAS", v: `${roas}x`, d: "+0.9x" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
              <p className="font-mono text-[0.48rem] tracking-[0.18em] uppercase text-white/45">{m.k}</p>
              <p className="font-display text-lg font-bold text-white tabular-nums tracking-[-0.02em] mt-1">{m.v}</p>
              <p className="font-mono text-[0.5rem] mt-0.5" style={{ color: highlight }}>{m.d}</p>
            </div>
          ))}
        </div>

        <svg viewBox="0 0 252 80" className="w-full h-20">
          <defs>
            <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" x2="252" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />
          ))}
          <path d={`${LEADS_LINE} L252 80 L0 80 Z`} fill="url(#leadsFill)" className="metrics-fade" />
          <path d={LEADS_LINE} fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" pathLength={1} className="metrics-draw" />
          <circle cx="252" cy="14" r="3.5" fill={highlight} className="metrics-fade" />
        </svg>
      </div>

      {/* Meta Ads */}
      <div className={`absolute -left-10 top-[19.5rem] w-52 p-4 ${glass} metrics-float`} style={{ animationDelay: "-3s" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-[#0866FF] text-white text-[0.7rem] font-bold">∞</span>
          <p className="font-sans text-xs font-semibold text-white">Meta Ads</p>
          <span className="ml-auto font-mono text-[0.48rem] tracking-[0.15em] uppercase text-white/50">Active</span>
        </div>
        <p className="font-mono text-[0.48rem] tracking-[0.18em] uppercase text-white/45">CTR</p>
        <div className="flex items-baseline gap-2">
          <p className="font-display text-2xl font-bold text-white tabular-nums">{ctr}%</p>
          <p className="font-mono text-[0.55rem]" style={{ color: highlight }}>↑ 18.7%</p>
        </div>
      </div>

      {/* Google Ads */}
      <div className={`absolute right-0 top-[18rem] w-48 p-4 ${glass} metrics-float`} style={{ animationDelay: "-5s" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-white text-[0.75rem] font-bold">
            <span className="text-[#4285F4]">G</span>
          </span>
          <p className="font-sans text-xs font-semibold text-white">Google Ads</p>
        </div>
        <p className="font-mono text-[0.48rem] tracking-[0.18em] uppercase text-white/45">Clicks</p>
        <p className="font-display text-2xl font-bold text-white tabular-nums">{clicks}</p>
        <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full metrics-bar" style={{ background: accent }} />
        </div>
      </div>

      {/* Lead notification */}
      <div className="absolute left-6 right-10 top-[27.5rem]">
        <div key={toast} className={`flex items-center gap-3 px-4 py-3 ${glass} metrics-toast`}>
          <span className="w-8 h-8 rounded-full flex items-center justify-center text-[0.8rem] font-bold text-[#05082E]" style={{ background: highlight }}>
            +1
          </span>
          <div className="min-w-0">
            <p className="font-sans text-xs font-semibold text-white">{TOASTS[toast].k}</p>
            <p className="font-sans text-[0.7rem] text-white/60 truncate">{TOASTS[toast].v}</p>
          </div>
          <span className="ml-auto font-mono text-[0.48rem] tracking-[0.15em] uppercase text-white/40">now</span>
        </div>
      </div>
    </div>
  );
}
