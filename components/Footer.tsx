import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

type IconProps = { size?: number; strokeWidth?: number };

// lucide has no TikTok / Pinterest marks; outline versions to match its style.
function TikTok({ size = 20, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8.2a5.5 5.5 0 0 0 4 1.6V6.3a4 4 0 0 1-4-4h-3.3v12.8a2.8 2.8 0 1 1-2.8-2.8c.3 0 .6 0 .9.1V9a6.1 6.1 0 1 0 5.2 6.1V8.2z" />
    </svg>
  );
}

function Pinterest({ size = 20, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M10.6 8.3c3.1-.9 5.6.9 5.4 3.6-.2 2.3-1.8 3.8-3.7 3.6-1.1-.1-1.8-.9-1.6-1.9M11.6 10.4 9.2 20.6" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/madisoninmarketing/", Icon: Instagram },
    { label: "TikTok", href: "https://www.tiktok.com/@madisoninmarketing", Icon: TikTok },
    { label: "Pinterest", href: "https://www.pinterest.com/madisoninmarketing/", Icon: Pinterest },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/madison-drennen-465685162/", Icon: Linkedin },
    { label: "Email", href: "mailto:madison.drennen7@gmail.com", Icon: Mail },
  ];

  return (
    <footer data-nav-theme="dark" className="relative sweep-bg text-snow overflow-hidden border-t border-snow/8">
      {/* Dark veil for legibility */}
      <div className="absolute inset-0 bg-mahogany-deep/70 pointer-events-none" />
      {/* Ambient berry glow behind the star */}
      <div className="chrome-aura chrome-aura--berry top-10 left-1/2 -translate-x-1/2 w-[60%] h-[20rem] opacity-80" />
      <div className="chrome-aura chrome-aura--petal top-24 left-1/2 -translate-x-1/2 w-[30%] h-[12rem] opacity-50" />

      {/* Top hairline gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,202,228,0.35) 30%, rgba(186,0,109,0.9) 50%, rgba(255,202,228,0.35) 70%, transparent)",
        }}
      />

      <div className="relative flex flex-col items-center justify-center px-6 pt-16 pb-14 md:pt-20 md:pb-16">
        {/* ── STAR LOCKUP ── */}
        <Link
          href="#hero"
          aria-label="Back to top"
          className="group flex flex-col items-center text-center"
        >
          {/* Chrome 4-point sparkle (concave) */}
          <span className="relative inline-block mb-6" aria-hidden="true">
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_32px_rgba(224,90,159,0.7)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
            >
              <defs>
                {/* Berry core gradient (shiny chrome belly) */}
                <radialGradient id="sparkCore" cx="42%" cy="36%" r="68%">
                  <stop offset="0%" stopColor="#FFF3F2" />
                  <stop offset="18%" stopColor="#FFCAE4" />
                  <stop offset="48%" stopColor="#E05A9F" />
                  <stop offset="78%" stopColor="#BA006D" />
                  <stop offset="100%" stopColor="#6E0A42" />
                </radialGradient>
                {/* Chrome white rim gradient */}
                <linearGradient id="sparkRim" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#FFE4EF" />
                  <stop offset="70%" stopColor="#D8C4CC" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                {/* Inner specular highlight */}
                <radialGradient id="sparkGlint" cx="40%" cy="32%" r="22%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="60%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>

              {/*
                4-point star with CONCAVE curves between the points ,
                the signature ✦ geometry. Points touch 50,4 / 96,50 / 50,96 / 4,50;
                arms pinch inward through quadratic control points at (50,50).
              */}
              {/* Outer chrome rim */}
              <path
                d="M50 2
                   Q 50 50, 98 50
                   Q 50 50, 50 98
                   Q 50 50, 2 50
                   Q 50 50, 50 2 Z"
                fill="url(#sparkRim)"
                opacity="0.95"
              />
              {/* Core berry body, slightly inset */}
              <path
                d="M50 8
                   Q 50 50, 92 50
                   Q 50 50, 50 92
                   Q 50 50, 8 50
                   Q 50 50, 50 8 Z"
                fill="url(#sparkCore)"
              />
              {/* Specular glint on upper-left arm */}
              <path
                d="M50 8
                   Q 50 50, 8 50
                   Q 50 50, 50 8 Z"
                fill="url(#sparkGlint)"
                opacity="0.85"
              />
            </svg>
          </span>

          {/* MADISON IN MARKETING tight caps */}
          <h2
            className="font-display font-bold text-snow leading-none tracking-[-0.01em] mb-5 whitespace-nowrap"
            style={{ fontSize: "clamp(1.1rem, 6vw, 3rem)" }}
          >
            MADISON <span className="text-berry">IN</span> MARKETING
          </h2>

          {/* Subtitle */}
          <p className="font-mono text-[0.6rem] md:text-[0.7rem] font-medium tracking-[0.35em] md:tracking-[0.42em] uppercase text-petal/85 whitespace-nowrap">
            Creative · Marketing · AI
          </p>
        </Link>

        {/* Hairline divider */}
        <div className="w-full max-w-md mt-10 mb-6 h-px bg-gradient-to-r from-transparent via-snow/15 to-transparent" />

        {/* Copyright + socials */}
        <p className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-snow/50 text-center">
          © {year} · Madison Drennen · Est. 2026
        </p>

        <div className="flex items-center gap-5 mt-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-snow/60 hover:text-berry hover:-translate-y-0.5 transition-all duration-300"
            >
              <Icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
