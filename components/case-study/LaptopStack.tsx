"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One large laptop, drawn in CSS, whose screen scrolls down a full-page
 * capture of each live redesign, then cross-fades to the next site.
 *
 * The screen is a size container, so 100cqh is its own height and each
 * capture travels exactly its height minus the screen's (.laptop-scroll).
 * The next site starts once the current one's scroll animation ends.
 */

const SITES = [
  { src: "/work/redesigns/full-gymrise.jpg", name: "gymrise.com" },
  { src: "/work/redesigns/full-kalero.jpg", name: "kalero.com" },
  { src: "/work/redesigns/full-socialmulli.jpg", name: "socialmulli.com" },
  { src: "/work/redesigns/full-o2suites.jpg", name: "o2suites.com" },
];

export default function LaptopStack() {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);
  const fallback = useRef(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Warm the cache so each switch is instant.
    SITES.forEach((s) => {
      new Image().src = s.src;
    });
  }, []);

  // With reduced motion there is no scroll, so step through statically.
  useEffect(() => {
    if (!reduced) return;
    fallback.current = window.setInterval(() => setI((n) => (n + 1) % SITES.length), 4000);
    return () => clearInterval(fallback.current);
  }, [reduced]);

  const next = () => setI((n) => (n + 1) % SITES.length);

  return (
    <div aria-hidden className="relative w-full h-full flex items-center justify-center laptop-float">
      <div className="w-full">
        {/* Lid */}
        <div className="relative mx-[6%] rounded-[18px] md:rounded-[22px] bg-[#0b0b0f] p-[1.8%] pb-[2.4%] ring-1 ring-white/15 shadow-[0_40px_80px_-30px_rgba(37,2,9,0.85),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <span className="absolute top-[0.8%] left-1/2 -translate-x-1/2 w-[0.9%] aspect-square rounded-full bg-white/20" />
          <div className="laptop-screen relative aspect-[16/10] rounded-[6px] md:rounded-[8px] overflow-hidden bg-white">
            {SITES.map((s, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={k === i ? `${s.src}-on` : s.src}
                src={s.src}
                alt=""
                draggable={false}
                onAnimationEnd={k === i ? next : undefined}
                className={`absolute inset-x-0 top-0 w-full h-auto transition-opacity duration-700 ${k === i && !reduced ? "laptop-scroll" : ""}`}
                style={{ opacity: k === i ? 1 : 0 }}
              />
            ))}
            {/* glass sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
            {/* site label */}
            <span className="absolute left-3 bottom-3 z-10 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md font-mono text-[0.5rem] md:text-[0.55rem] tracking-[0.18em] uppercase text-white/85">
              {SITES[i].name}
            </span>
          </div>
        </div>

        {/* Base */}
        <div
          className="relative h-[12px] md:h-[16px] rounded-b-[18px] rounded-t-[4px]"
          style={{
            background: "linear-gradient(180deg, #FFE7F2 0%, #F4BFD7 55%, #D58BAF 100%)",
            boxShadow: "0 24px 40px -14px rgba(37,2,9,0.7), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <span className="absolute left-1/2 -translate-x-1/2 top-0 w-[15%] h-[45%] rounded-b-[8px] bg-[#C67A9F]/60" />
        </div>
      </div>
    </div>
  );
}
