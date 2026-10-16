"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const projects = [
  { label: "GYMRISE", slug: "gymrise" },
  { label: "Social Mulli", slug: "social-mulli" },
  { label: "RekMed", slug: "rekmed" },
  { label: "Explorations", slug: "explorations" },
];

type NavTheme = "dark" | "light";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<NavTheme>("light");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-switch glass theme based on which [data-nav-theme] section
  // sits behind the navbar bottom edge (~96px).
  useEffect(() => {
    const update = () => {
      const navBottom = 96;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]")
      );
      let next: NavTheme = "light";
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= navBottom && r.bottom > navBottom) {
          const val = s.getAttribute("data-nav-theme");
          if (val === "light" || val === "dark") next = val;
        }
      }
      setTheme((prev) => (prev === next ? prev : next));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  // ── Theme-aware classes ──
  const isDark = theme === "dark";
  // Frosted glassmorphism everywhere; dark glass over dark sections,
  // light glass over light sections. A touch denser on scroll.
  const headerBg = isDark
    ? scrolled
      ? "bg-mahogany-deep/35 backdrop-blur-2xl backdrop-saturate-150 border-b border-snow/10 py-2.5 shadow-[inset_0_1px_0_rgba(255,243,242,0.08),0_8px_32px_-12px_rgba(0,0,0,0.45)]"
      : "bg-mahogany-deep/20 backdrop-blur-xl backdrop-saturate-150 border-b border-snow/[0.06] py-3 shadow-[inset_0_1px_0_rgba(255,243,242,0.06)]"
    : scrolled
    ? "bg-white/30 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/50 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_32px_-12px_rgba(37,2,9,0.12)]"
    : "bg-white/20 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]";

  const linkColor = isDark
    ? "text-snow/75 hover:text-snow"
    : "text-ink/70 hover:text-berry";
  const ringTone = isDark ? "ring-snow/20" : "ring-ink/15";

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" aria-label="Madison Drennen, Home" className="flex items-center gap-3 group">
            <span
              className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full overflow-hidden ring-1 ${ringTone} shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105`}
            >
              <Image
                src="/logos/v4/monogram-light-bg.png"
                alt=""
                width={32}
                height={32}
                className="object-cover w-full h-full"
                priority
              />
            </span>
            <Logo variant={isDark ? "dark" : "compact"} />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`font-mono text-[0.65rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 link-underline ${linkColor}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`font-mono text-[0.65rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 link-underline ${linkColor}`}
            >
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setWorkOpen(true)}
              onMouseLeave={() => setWorkOpen(false)}
            >
              <button
                onClick={() => handleNav("#work")}
                className={`flex items-center gap-1.5 font-mono text-[0.65rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${linkColor}`}
              >
                Work
                <span
                  className={`inline-block text-[0.6rem] transition-transform duration-300 ${
                    workOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ${
                  workOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div
                  className={`min-w-[240px] overflow-hidden py-2 rounded-[18px] backdrop-blur-xl border ${
                    isDark
                      ? "bg-mahogany-deep/95 border-snow/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
                      : "bg-ivory/95 border-ink/10 shadow-[0_20px_50px_-12px_rgba(37,2,9,0.15)]"
                  }`}
                >
                  <span className="block px-5 pt-2 pb-2.5 font-mono text-[0.52rem] font-medium tracking-[0.3em] uppercase text-berry">
                    ✦ &nbsp; Case Studies
                  </span>
                  {projects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/work/${p.slug}`}
                      className={`group flex items-center justify-between px-5 py-2.5 font-display text-base font-semibold transition-colors duration-200 ${
                        isDark
                          ? "text-snow/85 hover:text-snow hover:bg-berry/15"
                          : "text-ink/85 hover:text-ink hover:bg-berry/8"
                      }`}
                    >
                      {p.label}
                      <span className="text-berry opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-sm">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNav("#contact")}
              className={`font-mono text-[0.65rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 link-underline ${linkColor}`}
            >
              Contact
            </button>
          </nav>

          <a
            href="mailto:madisoninmarketing@gmail.com"
            className="hidden md:inline-flex btn-primary px-5 py-2.5 text-[0.6rem]"
          >
            Let&apos;s Talk
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-7 h-5 justify-center"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-full h-px transition-all duration-300 origin-center ${
                isDark ? "bg-snow" : "bg-ink"
              } ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`}
            />
            <span
              className={`block w-full h-px transition-all duration-300 ${
                isDark ? "bg-snow" : "bg-ink"
              } ${menuOpen ? "opacity-0 -translate-x-2" : ""}`}
            />
            <span
              className={`block w-full h-px transition-all duration-300 origin-center ${
                isDark ? "bg-snow" : "bg-ink"
              } ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu — always dark burgundy for consistency */}
      <div
        className={`fixed inset-0 z-40 sweep-bg flex flex-col justify-center items-center gap-6 transition-all duration-500 overflow-y-auto py-24 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-mahogany-deep/70 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="mb-2 text-center">
            <Logo variant="dark" />
          </div>
          <div className="w-8 h-px bg-berry/70 mb-1" />

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-display text-4xl font-bold text-snow hover:text-berry transition-colors duration-300 tracking-[-0.03em]"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="font-display text-4xl font-bold text-snow hover:text-berry transition-colors duration-300 tracking-[-0.03em]"
          >
            About
          </Link>

          <button
            onClick={() => handleNav("#work")}
            className="font-display text-4xl font-bold text-snow hover:text-berry transition-colors duration-300 tracking-[-0.03em]"
          >
            Work
          </button>
          <div className="flex flex-col items-center gap-3 -mt-1">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs font-medium tracking-[0.22em] uppercase text-snow/55 hover:text-berry transition-colors duration-300"
              >
                {p.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => handleNav("#contact")}
            className="font-display text-4xl font-bold text-snow hover:text-berry transition-colors duration-300 tracking-[-0.03em]"
          >
            Contact
          </button>

          <a
            href="mailto:madisoninmarketing@gmail.com"
            className="mt-4 font-mono text-xs font-medium tracking-[0.22em] uppercase text-berry"
          >
            madisoninmarketing@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
