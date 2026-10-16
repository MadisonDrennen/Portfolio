"use client";

import { useEffect, useState } from "react";

/**
 * A fanned stack of laptops drawn in CSS: one open laptop on top whose
 * screen cycles through live redesigns, with closed laptops in brand
 * colours tilted beneath it.
 */

const SCREENS = [
  { src: "/work/redesigns/gymrise-1.jpg", alt: "GYMRISE homepage" },
  { src: "/work/redesigns/kalero-1.jpg", alt: "Kalero homepage" },
  { src: "/work/redesigns/socialmulli-1.jpg", alt: "Social Mulli homepage" },
  { src: "/work/redesigns/o2suites-1.jpg", alt: "O2 Suites homepage" },
];

// Closed lids, back to front: colour + placement.
const LIDS = [
  { body: "#D9EAFE", edge: "#9DB9DE", cls: "left-[8%] top-[60%] w-[56%]", rot: "rotateX(56deg) rotateZ(-7deg)" },
  { body: "#FFCAE4", edge: "#E08DB6", cls: "left-[32%] top-[48%] w-[58%]", rot: "rotateX(56deg) rotateZ(10deg)" },
  { body: "#BA006D", edge: "#6E0040", cls: "left-[6%] top-[36%] w-[60%]", rot: "rotateX(56deg) rotateZ(-12deg)" },
];

function Lid({ body, edge }: { body: string; edge: string }) {
  return (
    <div
      className="relative w-full aspect-[16/10.5] rounded-[16px]"
      style={{
        background: `linear-gradient(135deg, ${body} 0%, ${body} 55%, ${edge} 100%)`,
        boxShadow: `0 2px 0 ${edge}, 0 5px 0 ${edge}, 0 40px 60px -20px rgba(37,2,9,0.55), inset 0 1px 0 rgba(255,255,255,0.55)`,
      }}
    >
      {/* soft sheen */}
      <div
        className="absolute inset-0 rounded-[16px]"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 40%)" }}
      />
      {/* monogram where a logo would be */}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[1.6rem] leading-none"
        style={{ color: edge, opacity: 0.7 }}
      >
        M
      </span>
    </div>
  );
}

export default function LaptopStack() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % SCREENS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden className="relative w-full h-full" style={{ perspective: "1600px" }}>
      {LIDS.map((l, k) => (
        <div
          key={k}
          className={`absolute ${l.cls} laptop-float`}
          style={{ transform: l.rot, transformStyle: "preserve-3d", animationDelay: `${-k * 1.6}s` }}
        >
          <Lid body={l.body} edge={l.edge} />
        </div>
      ))}

      {/* Open laptop on top */}
      <div className="absolute left-[18%] top-[6%] w-[64%] z-10 laptop-float" style={{ animationDelay: "-0.8s" }}>
        <div style={{ transform: "rotateX(10deg) rotateY(-14deg) rotateZ(-4deg)", transformStyle: "preserve-3d" }}>
          {/* screen */}
          <div className="relative rounded-[14px] bg-[#0b0b0f] p-[2.2%] pb-[2.8%] shadow-[0_30px_60px_-25px_rgba(37,2,9,0.7)] ring-1 ring-white/10">
            <div className="relative aspect-[16/10] rounded-[6px] overflow-hidden bg-black">
              {SCREENS.map((s, k) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.src}
                  src={s.src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
                  style={{ opacity: k === i ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            </div>
            <span className="absolute top-[0.9%] left-1/2 -translate-x-1/2 w-[1.2%] aspect-square rounded-full bg-white/15" />
          </div>
          {/* base */}
          <div
            className="relative mx-[-4%] h-[10px] md:h-[12px] rounded-b-[14px] rounded-t-[3px]"
            style={{
              background: "linear-gradient(180deg, #FFE3F0 0%, #F2B8D3 60%, #D98FB3 100%)",
              boxShadow: "0 18px 30px -12px rgba(37,2,9,0.55)",
            }}
          >
            <span className="absolute left-1/2 -translate-x-1/2 top-0 w-[16%] h-[45%] rounded-b-[6px] bg-[#D98FB3]/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
