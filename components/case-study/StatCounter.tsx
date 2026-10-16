"use client";

import { useEffect, useRef, useState } from "react";

/** "$231M+" → { prefix: "$", num: 231, suffix: "M+" }; "1 System" → 1 / " System". */
function parse(value: string) {
  const m = value.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], num: parseInt(m[2].replace(/,/g, ""), 10), suffix: m[3] };
}

/**
 * A results figure that counts up from zero the first time it scrolls into
 * view. Values without a leading number simply show as written.
 */
export default function StatCounter({ value, label, accent }: { value: string; label: string; accent: string }) {
  const parsed = parse(value);
  const [shown, setShown] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const p = parse(value);
    if (!el || !p) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let start: number | null = null;
        const tick = (t: number) => {
          if (start === null) start = t;
          const k = Math.min((t - start) / 1800, 1);
          const eased = 1 - Math.pow(1 - k, 4);
          setShown(`${p.prefix}${Math.round(eased * p.num).toLocaleString("en-US")}${p.suffix}`);
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="py-8 md:py-10 px-4 md:px-6 text-center">
      <p
        className="font-display font-bold text-ink tabular-nums tracking-[-0.045em] leading-none whitespace-nowrap"
        style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.4rem)" }}
      >
        {shown}
      </p>
      <p className="mt-3 font-mono text-[0.58rem] font-medium tracking-[0.22em] uppercase text-ink/50 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        {label}
      </p>
    </div>
  );
}
