"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/**
 * Looping Words (after Osmo's "Looping Words with Selector").
 *
 * A column of words scrolls up one line at a time with an elastic ease. The
 * window shows three lines, the middle one framed by four bracket corners
 * whose width springs to fit each word. When the list nears its end, the
 * first word is moved to the bottom and the offset snapped back, so it loops
 * forever without a visible jump.
 *
 * Sizes in em, so it scales with the font size it's given.
 */
export function LoopingWords({
  words,
  className,
  cornerClassName = "border-berry",
  align = "left",
}: {
  words: string[];
  className?: string;
  cornerClassName?: string;
  align?: "left" | "center";
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const index = useRef(0);

  useEffect(() => {
    const list = listRef.current;
    const selector = selectorRef.current;
    if (!list || !selector || words.length < 4) return;

    const total = words.length;
    const step = 100 / total;
    index.current = 0;
    gsap.set(list, { yPercent: 0 });

    // The framed word is always the list's second visible child.
    const fit = (instant = false) => {
      const word = list.children[index.current + 1]?.firstElementChild as HTMLElement | undefined;
      if (!word) return;
      const pad = parseFloat(getComputedStyle(selector).fontSize) * 0.5;
      gsap.to(selector, {
        width: word.getBoundingClientRect().width + pad * 2,
        duration: instant ? 0 : 0.5,
        ease: "expo.out",
      });
    };

    const move = () => {
      index.current += 1;
      gsap.to(list, {
        yPercent: -step * index.current,
        duration: 0.95,
        ease: "elastic.out(1, 0.85)",
        onStart: () => fit(),
        onComplete: () => {
          if (index.current >= total - 3) {
            list.appendChild(list.children[0]);
            index.current -= 1;
            gsap.set(list, { yPercent: -step * index.current });
          }
        },
      });
    };

    // Fonts can land after mount and change every word's width.
    fit(true);
    document.fonts?.ready.then(() => fit(true));
    const onResize = () => fit(true);
    window.addEventListener("resize", onResize);

    const timeline = gsap.timeline({ repeat: -1, delay: 0.6 }).call(move).to({}, { duration: 1.3 });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) timeline.pause();

    return () => {
      timeline.kill();
      gsap.killTweensOf([list, selector]);
      window.removeEventListener("resize", onResize);
    };
  }, [words]);

  const corner = cn("absolute w-[0.2em] h-[0.2em] border-[0.045em]", cornerClassName);

  return (
    <div className={cn("relative h-[3.6em] leading-none select-none", className)}>
      {/* The neighbouring words fade out above and below via a mask, so it
          works over any background, including animated ones. */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(180deg, transparent 2%, #000 38%, #000 62%, transparent 98%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 2%, #000 38%, #000 62%, transparent 98%)",
        }}
      >
        <ul ref={listRef} className="relative m-0 p-0 list-none">
          {words.map((word, i) => (
            <li
              key={`${word}-${i}`}
              className={cn("h-[1.2em] flex items-center", align === "center" ? "justify-center" : "pl-[0.5em]")}
            >
              <span className="whitespace-nowrap">{word}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Selector: four bracket corners around the middle word */}
      <div
        ref={selectorRef}
        aria-hidden
        className={cn(
          "absolute top-[1.2em] h-[1.2em] pointer-events-none",
          align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
        )}
        style={{ width: "4em" }}
      >
        <span className={cn(corner, "top-0 left-0 border-r-0 border-b-0")} />
        <span className={cn(corner, "top-0 right-0 border-l-0 border-b-0")} />
        <span className={cn(corner, "bottom-0 left-0 border-r-0 border-t-0")} />
        <span className={cn(corner, "bottom-0 right-0 border-l-0 border-t-0")} />
      </div>

      <span className="sr-only">{words.join(", ")}</span>
    </div>
  );
}

export default LoopingWords;
