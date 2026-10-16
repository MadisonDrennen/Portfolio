"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoopingWords from "@/components/ui/looping-words";
import GlassFold from "@/components/ui/glass-fold";

const SKILLS = [
  "Website Design",
  "Web Development",
  "Brand Systems",
  "Social Media",
  "Content Creation",
  "Paid Ads",
  "Email Marketing",
  "Copywriting",
  "Graphic Design",
  "Video Editing",
  "Product Photography",
  "Marketing Strategy",
  "AI Workflows",
];

type Chapter = {
  id: string;
  n: string;
  name: string;
  tag: string;
  hex: string;
  bg: string;        // closed-pill background
  fg: string;        // closed-pill foreground text
  openBg: string;    // open content card bg tint (ivory-tinted)
  openAccent: string;// highlight color for open content
  body: string[];    // paragraphs
};

const chapters: Chapter[] = [
  {
    id: "my-story",
    n: "01",
    name: "My Story",
    tag: "Base · The Beginning",
    hex: "#250209",
    bg: "linear-gradient(100deg,#250209 0%,#1A0714 40%,#3A0E1E 100%)",
    fg: "#FFF3F2",
    openBg: "#FFFFFF",
    openAccent: "#250209",
    body: [
      "I'm 25. I've been working in marketing since I was 22, but I've been drawn to anything creative for as long as I can remember.",
      "In college I took my first graphic design class and that was it. The amount you can make from nothing in a design file was mesmerizing. Logos, color palettes, brand systems. I was hooked.",
      "The following year I took marketing. I'd ignored it before, but this time two worlds collided: creativity and business. Making something that was both beautiful and useful. That's when it clicked.",
    ],
  },
  {
    id: "my-experience",
    n: "02",
    name: "My Experience",
    tag: "Accent · The Work",
    hex: "#89235B",
    bg: "linear-gradient(100deg,#89235B 0%,#6E1A49 50%,#4A0F30 100%)",
    fg: "#FFF3F2",
    openBg: "#FFFFFF",
    openAccent: "#89235B",
    body: [
      "My first real marketing role was at RekMed, a healthcare education brand run by a CEO who designs every product herself in Illustrator. The work is colorful, interactive, built so nurses and students actually retain what they're studying.",
      "I shot the product photography in Photoshop and Lightroom, ran the social accounts (reels, carousels, you name it), and designed the full booth for her first nurse convention. That was my first real marketing event, and I loved it.",
      "Now I work for a digital marketing ad agency, where I manage multiple social accounts, design and build websites and client portals, write ad copy, make the creative that goes with it, run email campaigns, and sit in on client meetings. The variety is the best part.",
    ],
  },
  {
    id: "my-goals",
    n: "03",
    name: "My Goals",
    tag: "Primary · What's Next",
    hex: "#BA006D",
    bg: "linear-gradient(100deg,#BA006D 0%,#9A0B5A 50%,#6E0A42 100%)",
    fg: "#FFF3F2",
    openBg: "#FFFFFF",
    openAccent: "#BA006D",
    body: [
      "I love what I do and the business I work for. MadisonInMarketing is my newest side quest, a place for me, and for you.",
      "I make this kind of creative work for other brands every day. It felt wrong not to do the same for my own.",
      "This is where I'll keep what I'm making, how I'm thinking about it, and what I'm learning as I go. To inspire, to teach, and to keep evolving in the marketing space.",
    ],
  },
];

const supportSwatches = [
  { name: "Petal", hex: "#FFCAE4", bg: "#FFCAE4", tag: "Soft" },
  { name: "Snow", hex: "#FFF3F2", bg: "#FFF3F2", tag: "Text + Light" },
  { name: "Icy Blue", hex: "#D9EAFE", bg: "#D9EAFE", tag: "The Cool Note" },
];

export default function AboutPage() {
  const [openId, setOpenId] = useState<string | null>("my-story");
  const heroContent = useRef<HTMLDivElement>(null);
  const scrollCue = useRef<HTMLDivElement>(null);

  // As the About Me section slides up over the pinned hero, the skills
  // recede: fade, shrink, drift up and soften.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      const el = heroContent.current;
      if (el) {
        el.style.opacity = String(1 - p * 1.15);
        el.style.transform = `translateY(${-p * 80}px) scale(${1 - p * 0.14})`;
        el.style.filter = `blur(${p * 6}px)`;
      }
      if (scrollCue.current) scrollCue.current.style.opacity = String(1 - p * 3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main data-nav-theme="light" className="bg-ivory text-ink min-h-screen">
        {/* ── HERO: glass folds + looping skills, pinned while the
             About Me section slides up over it ── */}
        <section
          data-nav-theme="dark"
          className="sticky top-0 z-0 h-[100svh] min-h-[560px] overflow-hidden bg-mahogany-deep text-snow"
        >
          <GlassFold
            color1="#89235B"
            color2="#250209"
            color3="#FFCAE4"
            speed={0.45}
            scale={1}
            noise={0.1}
            className="absolute inset-0"
          />
          {/* Veil so the words always read over the brightest folds */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 50%, rgba(26,7,20,0.55) 0%, rgba(26,7,20,0.15) 70%, transparent 100%)",
            }}
          />

          <div
            ref={heroContent}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 will-change-transform"
          >
            <span className="font-mono text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.22em] uppercase text-petal mb-5 md:mb-7">
              ✦ &nbsp; What I Do
            </span>
            <LoopingWords
              words={SKILLS}
              align="center"
              className="w-full font-display font-bold uppercase text-snow tracking-[-0.03em] text-[clamp(1.4rem,6.2vw,5.5rem)]"
              cornerClassName="border-petal"
            />
          </div>

          {/* Scroll cue */}
          <div
            ref={scrollCue}
            aria-hidden
            className="absolute bottom-8 inset-x-0 z-10 flex flex-col items-center gap-3 font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-snow/60"
          >
            <span>Scroll</span>
            <span className="block w-px h-10 bg-gradient-to-b from-snow/60 to-transparent animate-pulse" />
          </div>
        </section>

        {/* ── HEADSHOT + CHAPTERS ── */}
        <section className="relative z-10 px-6 pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden bg-ivory rounded-t-[32px] md:rounded-t-[48px] shadow-[0_-40px_80px_-30px_rgba(37,2,9,0.55)]">
          {/* Chrome sculpture backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              backgroundImage: "url('/brand/v4/bg-chrome-sculpture.png')",
              backgroundSize: "cover",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
              maskImage:
                "linear-gradient(to left, black 10%, rgba(0,0,0,0.5) 55%, transparent 90%)",
              WebkitBackgroundClip: "border-box",
              WebkitMaskImage:
                "linear-gradient(to left, black 10%, rgba(0,0,0,0.5) 55%, transparent 90%)",
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-start">
            {/* Portrait */}
            <div className="md:col-span-4 md:sticky md:top-28">
              <div className="relative glass-tile-light p-3">
                <div className="relative w-full aspect-[1545/1999] overflow-hidden rounded-[18px] bg-petal/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/headshot.jpg"
                    alt="Madison Drennen"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Meta rail */}
              <div className="mt-6 space-y-3 font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-ink/55">
                <div className="flex justify-between pb-2 border-b border-ink/10">
                  <span>Based</span>
                  <span className="text-ink/80">Denver, CO</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-ink/10">
                  <span>Est.</span>
                  <span className="text-ink/80">2022</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-ink/10">
                  <span>Working In</span>
                  <span className="text-ink/80">Brand · Web · Social · Ads</span>
                </div>
              </div>
            </div>

            {/* Chapters (color-palette accordion) */}
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-berry">
                  ✦ &nbsp; The Chapters
                </span>
                <span className="flex-1 h-px bg-ink/10" />
                <span className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-ink/40">
                  Tap to Open
                </span>
              </div>

              <div className="space-y-4">
                {chapters.map((c) => (
                  <ChapterPill
                    key={c.id}
                    chapter={c}
                    open={openId === c.id}
                    onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                  />
                ))}
              </div>

              {/* Support palette strip */}
              <div className="mt-10 pt-6 border-t border-ink/10">
                <span className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-ink/50 mb-4 block">
                  Supporting Palette
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {supportSwatches.map((s) => (
                    <div
                      key={s.name}
                      className="relative rounded-2xl p-5 min-h-[8rem] flex flex-col justify-between overflow-hidden border border-ink/10"
                      style={{ background: s.bg }}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-display text-base font-bold text-ink tracking-[-0.02em]">
                          {s.name}
                        </span>
                        <span className="font-mono text-[0.5rem] font-medium text-ink/55 tabular-nums">
                          {s.hex}
                        </span>
                      </div>
                      <span className="font-mono text-[0.5rem] font-medium tracking-[0.22em] uppercase text-ink/50">
                        {s.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────── */
/* Color-palette accordion pill                */
/* ─────────────────────────────────────────── */
function ChapterPill({
  chapter,
  open,
  onToggle,
}: {
  chapter: Chapter;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`relative rounded-[26px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? "shadow-[0_18px_50px_-18px_rgba(37,2,9,0.35)]" : "shadow-[0_6px_20px_-10px_rgba(37,2,9,0.25)] hover:shadow-[0_12px_30px_-12px_rgba(37,2,9,0.35)]"
      }`}
    >
      {/* Pill header (always visible) */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left relative px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-6 cursor-pointer"
        style={{
          background: chapter.bg,
          color: chapter.fg,
        }}
      >
        {/* Highlight sheen */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.08) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative flex items-baseline gap-5 md:gap-6">
          <span className="font-mono text-[0.65rem] md:text-[0.7rem] font-medium tracking-[0.22em] opacity-70">
            {chapter.n}
          </span>
          <div className="flex flex-col gap-1">
            <span
              className="font-display font-bold leading-none tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}
            >
              {chapter.name}
            </span>
            <span className="font-mono text-[0.55rem] md:text-[0.6rem] font-medium tracking-[0.22em] uppercase opacity-60">
              {chapter.tag}
            </span>
          </div>
        </div>

        <div className="relative flex items-center gap-4 flex-shrink-0">
          <span className="hidden sm:inline font-mono text-[0.55rem] md:text-[0.6rem] font-medium tracking-[0.1em] uppercase opacity-60 tabular-nums">
            {chapter.hex}
          </span>
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border transition-transform duration-500"
            style={{
              borderColor: "rgba(255,243,242,0.35)",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
            }}
            aria-hidden="true"
          >
            <span className="text-base leading-none">+</span>
          </span>
        </div>
      </button>

      {/* Expandable body */}
      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          background: chapter.openBg,
        }}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-10 py-6 md:py-8 border-t border-ink/8">
            <div
              className="h-px w-10 mb-5"
              style={{ background: chapter.openAccent }}
            />
            <div className="space-y-4">
              {chapter.body.map((p, i) => (
                <p
                  key={i}
                  className="font-sans text-base md:text-lg font-normal text-ink/80 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
