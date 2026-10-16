"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import LoopingWords from "@/components/ui/looping-words";

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

  return (
    <>
      <Navbar />
      <main data-nav-theme="light" className="bg-ivory text-ink min-h-screen">
        {/* ── HERO ── */}
        <section className="relative pt-36 md:pt-44 pb-16 md:pb-24 px-6 overflow-hidden">
          {/* Soft chrome aura washes */}
          <div className="chrome-aura chrome-aura--petal -top-20 -right-32 w-[36rem] h-[36rem] opacity-50" />
          <div className="chrome-aura chrome-aura--icy top-20 -left-24 w-[28rem] h-[28rem] opacity-45" />

          <div className="relative max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-10">
              <Link
                href="/"
                className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-ink/40 hover:text-ink transition-colors link-underline"
              >
                Home
              </Link>
              <span className="text-ink/25 text-sm">/</span>
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-berry">
                About
              </span>
            </div>

            <SectionLabel label="About Me" />

            <h1
              className="font-display font-bold text-ink leading-[0.95] tracking-[-0.05em] mt-6 mb-8 pb-2"
              style={{ fontSize: "clamp(2.75rem, 8vw, 7rem)" }}
            >
              Hi, I&apos;m <span className="text-berry">Madison</span>.
            </h1>

            <p className="font-sans text-lg md:text-xl font-normal text-ink/75 leading-relaxed max-w-2xl">
              I work in digital marketing. I make brand systems, websites,
              campaign creative, and the content that carries them. This is
              where I keep track of what I&apos;m making and the thinking behind it.
            </p>

            {/* What I do, looping through every skill */}
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
              <span className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-berry flex-shrink-0">
                ✦ &nbsp; What I Do
              </span>
              <LoopingWords
                words={SKILLS}
                className="font-display font-bold uppercase text-ink tracking-[-0.03em] text-[clamp(1.4rem,6.4vw,2.25rem)] md:text-[clamp(2.5rem,5vw,4rem)] -ml-[0.5em] md:ml-0 w-full md:w-auto md:flex-1"
                cornerClassName="border-berry"
              />
            </div>
          </div>
        </section>

        {/* ── HEADSHOT + CHAPTERS ── */}
        <section className="relative px-6 pb-20 md:pb-28 overflow-hidden">
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

        {/* ── CTA, Let's connect ── */}
        <section className="relative px-6 py-20 md:py-28 bg-ivory overflow-hidden border-t border-ink/8">
          <div className="chrome-aura chrome-aura--berry -top-20 left-1/2 -translate-x-1/2 w-[50%] h-[18rem] opacity-50" />

          <div className="relative max-w-3xl mx-auto text-center">
            <SectionLabel label="Get in Touch" className="justify-center" />
            <h2
              className="font-display font-bold text-ink leading-[1.0] tracking-[-0.045em] mt-6 mb-6 pb-1"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Working on something{" "}
              <span className="text-berry">interesting?</span>
            </h2>
            <p className="font-sans text-base md:text-lg font-normal text-ink/70 mb-10 leading-relaxed max-w-xl mx-auto">
              Open to freelance work, brand collaborations, and design partnerships.
            </p>
            <Link href="/#contact" className="btn-primary px-8 py-4">
              Let&apos;s Talk
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
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
