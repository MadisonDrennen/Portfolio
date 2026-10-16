"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = { src: string; alt: string };

/**
 * Horizontal, swipeable gallery row. Native scroll-snap does the motion (so
 * touch, trackpad and keyboard all work); the arrows and dots just scroll
 * it one tile at a time.
 */
export default function GalleryCarousel({
  items,
  aspect,
  accent = "#BA006D",
}: {
  items: Item[];
  aspect: string;
  accent?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const tiles = Array.from(el.children) as HTMLElement[];
    const left = el.scrollLeft;
    let nearest = 0;
    tiles.forEach((t, i) => {
      if (Math.abs(t.offsetLeft - left) < Math.abs(tiles[nearest].offsetLeft - left)) nearest = i;
    });
    setActive(nearest);
    setEdges({ start: left < 4, end: left + el.clientWidth > el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    sync();
    const el = track.current;
    el?.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const goTo = (i: number) => {
    const el = track.current;
    const tile = el?.children[Math.max(0, Math.min(items.length - 1, i))] as HTMLElement | undefined;
    if (el && tile) el.scrollTo({ left: tile.offsetLeft, behavior: "smooth" });
  };

  const arrow =
    "flex items-center justify-center w-10 h-10 rounded-full border border-ink/15 text-ink/70 " +
    "hover:border-berry hover:bg-berry hover:text-snow transition-all duration-300 " +
    "disabled:opacity-30 disabled:pointer-events-none";

  return (
    <div>
      <div
        ref={track}
        className="relative flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.src}
            className="group relative flex-shrink-0 snap-start overflow-hidden rounded-[4px] ring-1 ring-ink/5 bg-ink/[0.04] w-[78%] sm:w-[46%] lg:w-[38%]"
            style={{ aspectRatio: aspect }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <p className="font-sans text-xs font-normal text-snow leading-snug">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Show ${item.alt}`}
              onClick={() => goTo(i)}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{ width: i === active ? 32 : 12, background: i === active ? accent : "rgba(37,2,9,0.18)" }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous" className={arrow} onClick={() => goTo(active - 1)} disabled={edges.start}>
            ←
          </button>
          <button type="button" aria-label="Next" className={arrow} onClick={() => goTo(active + 1)} disabled={edges.end}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
