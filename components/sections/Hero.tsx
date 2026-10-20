"use client";

import { useEffect, useMemo, useState } from "react";
import MorphGallery from "@/components/ui/morph-gallery";

type Slide = { src: string; project: string; category: string; year: string };

// Device mockups of the live sites, for wide screens.
const DESKTOP: Slide[] = [
  { src: "/hero/m2-gymrise-devices.jpg", project: "GYMRISE", category: "Website · Brand · Growth", year: "2026" },
  { src: "/hero/m2-kalero-site.jpg", project: "Kalero", category: "Website · E-commerce", year: "2026" },
  { src: "/hero/m2-socialmulli-monitor.jpg", project: "Social Mulli", category: "Website · Brand · Web Design", year: "2026" },
  { src: "/hero/m2-o2suites-site.jpg", project: "O2 Suites", category: "Website · Brand", year: "2026" },
  { src: "/hero/m2-gymrise-site.jpg", project: "GYMRISE", category: "Website · Systems", year: "2026" },
  { src: "/hero/m2-kalero-filters.jpg", project: "Kalero", category: "Website · Shop Experience", year: "2026" },
  { src: "/hero/m2-socialmulli-devices.jpg", project: "Social Mulli", category: "Website · Responsive", year: "2026" },
  { src: "/hero/m2-o2suites-office.jpg", project: "O2 Suites", category: "Website · In Practice", year: "2026" },
];

// Phone-sized captures of the live sites, so a portrait screen is filled
// with the real mobile design instead of a cropped sliver of a desktop one.
const MOBILE: Slide[] = [
  { src: "/hero/m-gymrise-1.jpg", project: "GYMRISE", category: "Website · Brand · Growth", year: "2026" },
  { src: "/hero/m-socialmulli-1.jpg", project: "Social Mulli", category: "Website · Brand", year: "2026" },
  { src: "/hero/m-kalero-1.jpg", project: "Kalero", category: "Website · E-commerce", year: "2026" },
  { src: "/hero/m-o2suites-1.jpg", project: "O2 Suites", category: "Website · Brand", year: "2026" },
  { src: "/hero/m-gymrise-2.jpg", project: "GYMRISE", category: "Website · Systems", year: "2026" },
  { src: "/hero/m-socialmulli-2.jpg", project: "Social Mulli", category: "Website · Testimonials", year: "2026" },
  { src: "/hero/m-o2suites-2.jpg", project: "O2 Suites", category: "Website · Patient Story", year: "2026" },
];

const ROTATION_MS = 2800;

/**
 * Shared grid container, so the caption's edges line up with the rest of
 * the site.
 */
const GRID = "mx-auto w-full max-w-[1280px] px-6 sm:px-8 md:px-12 lg:px-20";

const reveal = (y: number) => ({
  opacity: 0,
  transform: `translateY(${y}px)`,
  transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
});

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  // Chosen after mount from the viewport, so each device only ever loads
  // its own set of images.
  const [slides, setSlides] = useState<Slide[] | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setSlides(mq.matches ? MOBILE : DESKTOP);
      setActiveIdx(0);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-hero-reveal]");
    elements.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translate(0, 0)";
      }, 180 + i * 140);
    });
  }, []);

  const list = slides ?? DESKTOP;
  const active = list[activeIdx % list.length];
  const items = useMemo(
    () => list.map((s) => ({ src: s.src, alt: `${s.project}, ${s.category}` })),
    [list],
  );

  return (
    <section
      id="hero"
      data-nav-theme="dark"
      className="relative overflow-hidden h-[100svh] min-h-[600px] bg-mahogany-deep"
    >
      {/* ── Full-bleed gallery ── */}
      {slides && (
        <MorphGallery
          items={items}
          index={activeIdx}
          onIndexChange={setActiveIdx}
          autoplay={ROTATION_MS}
          duration={1200}
          thumbnails={false}
          arrows={slides === DESKTOP}
          pauseOnHover={false}
          height="100%"
          className="!absolute inset-0 bg-mahogany-deep"
        />
      )}

      {/* Mahogany veil: darker under the nav and behind the caption */}
      <div
        className="absolute inset-0 pointer-events-none z-[6]"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,7,20,0.75) 0%, rgba(26,7,20,0.2) 18%, rgba(26,7,20,0.08) 40%, rgba(26,7,20,0.7) 62%, rgba(26,7,20,0.96) 78%, rgb(26,7,20) 100%)",
        }}
      />

      {/* ── BOTTOM: caption, indicator, CTA ── */}
      <div className={`absolute z-[7] inset-x-0 bottom-0 ${GRID} pb-8 md:pb-12 pointer-events-none`}>
        <div data-hero-reveal style={reveal(24)}>
          <div className="flex items-end justify-between gap-6 mb-6 md:mb-8">
            <div className="min-w-0 flex-1">
              <p
                className="font-mono text-[0.55rem] md:text-[0.65rem] font-medium tracking-[0.22em] uppercase text-petal mb-3 flex items-center gap-2.5 flex-wrap"
                key={`cat-${activeIdx}`}
                style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                <span className="w-5 h-px bg-berry hidden sm:inline-block" />
                <span>{active.category}</span>
                <span className="text-snow/30 hidden sm:inline">·</span>
                <span className="text-snow/55 hidden sm:inline">{active.year}</span>
              </p>
              <h2
                key={`proj-${activeIdx}`}
                className="font-display font-bold text-snow leading-[0.92] tracking-[-0.045em] pb-1"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 6rem)",
                  animation: "fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s both",
                }}
              >
                {active.project}
              </h2>
            </div>

            <span className="font-mono text-[0.55rem] md:text-[0.65rem] font-medium tracking-[0.22em] uppercase text-snow/60 tabular-nums flex-shrink-0 pb-2">
              <span className="text-snow font-semibold">
                {String((activeIdx % list.length) + 1).padStart(2, "0")}
              </span>
              <span className="mx-1.5 text-snow/30">/</span>
              <span>{String(list.length).padStart(2, "0")}</span>
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 pt-5 border-t border-snow/15">
            <div className="flex items-center gap-2 pointer-events-auto">
              {list.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  aria-label={`Show ${s.project}`}
                  onClick={() => setActiveIdx(i)}
                  className="relative h-[3px] overflow-hidden rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    width: i === activeIdx ? 44 : 14,
                    background: "rgba(255,243,242,0.25)",
                  }}
                >
                  <span
                    key={i === activeIdx ? `on-${activeIdx}` : "off"}
                    className="absolute inset-y-0 left-0 bg-berry rounded-full"
                    style={{
                      width: i === activeIdx ? "100%" : 0,
                      animation:
                        i === activeIdx ? `heroProgress ${ROTATION_MS}ms linear both` : undefined,
                    }}
                  />
                </button>
              ))}
            </div>

            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="pointer-events-auto group inline-flex items-center gap-3 font-mono text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.22em] uppercase text-snow/85 hover:text-petal transition-colors duration-300"
            >
              <span>View All Work</span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-snow/30 group-hover:border-berry group-hover:bg-berry text-snow group-hover:text-snow transition-all duration-300">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
