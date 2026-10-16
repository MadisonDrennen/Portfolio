import Link from "next/link";
import type { Project } from "@/lib/projects";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SITE_GRID } from "@/components/ui/grid";
import StatCounter from "./StatCounter";
import GalleryRowView from "./GalleryRowView";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Chapter case-study layout: a full-bleed opening in the client's own
 * colours, results up front, the story as an editorial spread, the work as
 * numbered chapters that alternate light and dark, and a large next-project
 * card to finish.
 */
export default function CaseStudyV2({ project, next }: { project: Project; next: Project }) {
  const dark = project.brand?.dark ?? "#250209";
  const accent = project.brand?.accent ?? project.accentColor;
  const host = project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const facts = [
    { k: "Client", v: project.client },
    { k: "Year", v: project.year },
    { k: "Services", v: (project.services ?? project.tags).join(" · ") },
  ];

  const chapters = (project.chapters ?? [])
    .map((c) => ({ ...c, rows: (project.gallery ?? []).filter((r) => r.chapter === c.id) }))
    .filter((c) => c.rows.length > 0);

  const [challengeLead, ...challengeRest] = (project.challenge ?? "").split("\n\n");
  const [approachLead, ...approachRest] = (project.approach ?? "").split("\n\n");

  return (
    <>
      {/* ── 1. Opening ── */}
      {/* No overflow clipping here: the cover hangs over into the results. */}
      <section data-nav-theme="dark" className="relative text-snow" style={{ background: dark }}>
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(60% 55% at 78% 18%, ${accent}33 0%, transparent 60%), radial-gradient(45% 40% at 10% 90%, ${accent}1f 0%, transparent 65%)`,
            }}
          />
        </div>
        <div className={`relative ${SITE_GRID} pt-32 md:pt-40`}>
          <div className="flex items-center gap-2 mb-10 md:mb-14 font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase">
            <Link href="/" className="text-snow/45 hover:text-snow transition-colors">Home</Link>
            <span className="text-snow/25">/</span>
            <Link href="/#work" className="text-snow/45 hover:text-snow transition-colors">Work</Link>
            <span className="text-snow/25">/</span>
            <span style={{ color: accent }}>{project.title}</span>
          </div>

          <p className="font-mono text-[0.62rem] font-medium tracking-[0.25em] uppercase flex items-center gap-3 mb-5" style={{ color: accent }}>
            <span className="w-6 h-px" style={{ background: accent }} />
            {project.category}
          </p>

          <h1
            className="font-display font-bold uppercase leading-[0.86] tracking-[-0.05em] pb-2"
            style={{ fontSize: "clamp(3.5rem, 12.5vw, 12rem)" }}
          >
            {project.title}
          </h1>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-8 md:mt-10">
            <p className="lg:col-span-6 font-sans text-base md:text-lg text-snow/75 leading-relaxed max-w-xl">
              {project.shortDescription}
            </p>
            <dl className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-snow/15 pt-6 self-start">
              {facts.map((f) => (
                <div key={f.k} className={f.k === "Services" ? "col-span-2" : ""}>
                  <dt className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-snow/45 mb-2">{f.k}</dt>
                  <dd className="font-sans text-sm text-snow/90 leading-snug">{f.v}</dd>
                </div>
              ))}
              {project.liveUrl && (
                <div className="col-span-2 sm:col-span-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-mono text-[0.62rem] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-75"
                    style={{ color: accent }}
                  >
                    Visit {host}
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border" style={{ borderColor: `${accent}66` }}>↗</span>
                  </a>
                </div>
              )}
            </dl>
          </div>

          {/* Cover, sitting over the edge into the next section */}
          {project.heroImage && (
            <div className="relative mt-14 md:mt-20 -mb-24 md:-mb-40 z-10">
              <div
                className="overflow-hidden rounded-[18px] md:rounded-[26px] ring-1 ring-snow/10"
                style={{ boxShadow: `0 50px 120px -40px ${accent}55, 0 40px 90px -40px rgba(0,0,0,0.8)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.heroImage} alt={`${project.title}, cover`} className="block w-full h-auto" loading="eager" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 2. Results ── */}
      {project.results && project.results.length > 0 && (
        <section className="relative bg-snow pt-36 md:pt-56 pb-16 md:pb-20">
          <div className={SITE_GRID}>
            <RevealOnScroll>
              <p className="font-mono text-[0.6rem] font-medium tracking-[0.25em] uppercase text-berry flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-berry" />
                The Results
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-ink/10 divide-x divide-ink/10">
                {project.results.map((r, i) => (
                  <div key={r.label} className={i >= 2 ? "border-t border-ink/10 lg:border-t-0" : ""}>
                    <StatCounter value={r.value} label={r.label} accent={accent} />
                  </div>
                ))}
              </div>
              {project.resultsCaption && (
                <p className="mt-5 font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-ink/45">
                  {project.resultsCaption.replace(/^Focus:\s*/, "")}
                </p>
              )}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ── 3. The story ── */}
      <section
        className={`relative bg-snow pb-24 md:pb-32 ${project.results?.length ? "" : "pt-36 md:pt-56"}`}
      >
        <div className={`${SITE_GRID} grid lg:grid-cols-12 gap-12 lg:gap-16`}>
          <RevealOnScroll className="lg:col-span-4">
            <p className="font-mono text-[0.6rem] font-medium tracking-[0.25em] uppercase text-berry mb-6">My Role</p>
            <ol className="border-t border-ink/10">
              {project.whatIDid.map((item, i) => (
                <li key={item} className="grid grid-cols-[36px_1fr] gap-3 py-4 border-b border-ink/10 items-baseline">
                  <span className="font-mono text-[0.62rem] font-bold tracking-[0.2em]" style={{ color: accent }}>{pad(i + 1)}</span>
                  <span className="font-display text-lg font-semibold text-ink leading-snug tracking-[-0.01em]">{item}</span>
                </li>
              ))}
            </ol>
          </RevealOnScroll>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-12 md:gap-14">
            {[
              { title: "The challenge", lead: challengeLead, rest: challengeRest },
              { title: "The approach", lead: approachLead, rest: approachRest },
            ]
              .filter((b) => b.lead)
              .map((b, i) => (
                <RevealOnScroll key={b.title} delay={(i + 1) as 1 | 2}>
                  <p className="font-mono text-[0.6rem] font-medium tracking-[0.25em] uppercase text-ink/45 mb-5">
                    {pad(i + 1)} · {b.title}
                  </p>
                  <p
                    className="font-display font-semibold text-ink leading-[1.3] tracking-[-0.02em] mb-5"
                    style={{ fontSize: "clamp(1.15rem, 1.55vw, 1.4rem)" }}
                  >
                    {b.lead}
                  </p>
                  {b.rest.map((para, k) => (
                    <p key={k} className="font-sans text-base text-ink/65 leading-relaxed mb-3 last:mb-0">{para}</p>
                  ))}
                </RevealOnScroll>
              ))}
          </div>
        </div>
      </section>

      {/* ── 4. The work, in chapters ── */}
      {chapters.map((c, ci) => {
        const isDark = c.tone === "dark";
        return (
          <section
            key={c.id}
            data-nav-theme={isDark ? "dark" : "light"}
            className={`relative overflow-hidden py-20 md:py-28 ${isDark ? "text-snow" : "bg-snow-dark/40 text-ink"}`}
            style={isDark ? { background: dark } : undefined}
          >
            {isDark && (
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(55% 45% at 50% 0%, ${accent}24 0%, transparent 70%)` }}
              />
            )}
            <div className={`relative ${SITE_GRID}`}>
              <RevealOnScroll className="grid md:grid-cols-12 gap-6 md:gap-10 items-end mb-10 md:mb-14">
                <div className="md:col-span-7">
                  <p className="font-mono text-[0.65rem] font-bold tracking-[0.25em] mb-3" style={{ color: isDark ? accent : undefined }}>
                    <span className={isDark ? "" : "text-berry"}>{pad(ci + 1)}</span>
                    <span className={isDark ? "text-snow/35" : "text-ink/30"}> / {pad(chapters.length)}</span>
                  </p>
                  <h2
                    className="font-display font-bold leading-[0.95] tracking-[-0.045em]"
                    style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}
                  >
                    {c.title}
                  </h2>
                </div>
                <p className={`md:col-span-5 font-sans text-base leading-relaxed ${isDark ? "text-snow/65" : "text-ink/60"}`}>
                  {c.caption}
                </p>
              </RevealOnScroll>

              <div className="space-y-12 md:space-y-16">
                {c.rows.map((row, ri) => (
                  <RevealOnScroll key={ri}>
                    <GalleryRowView row={row} accent={accent} dark={isDark} showLabel={c.rows.length > 1} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── 5. Next project ── */}
      <section className="bg-snow py-16 md:py-24">
        <div className={SITE_GRID}>
          <Link
            href={`/work/${next.slug}`}
            className="group relative block overflow-hidden rounded-[22px] md:rounded-[30px] text-snow"
            style={{ background: next.brand?.dark ?? "#250209" }}
          >
            <div className="grid md:grid-cols-12 items-center">
              <div className="md:col-span-5 p-8 md:p-12 lg:p-14">
                <p className="font-mono text-[0.6rem] font-medium tracking-[0.25em] uppercase text-snow/50 mb-4">Next Project</p>
                <p
                  className="font-display font-bold uppercase leading-[0.9] tracking-[-0.045em] mb-6"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}
                >
                  {next.title}
                </p>
                <p className="font-sans text-sm text-snow/65 leading-relaxed max-w-sm mb-8">{next.shortDescription}</p>
                <span className="inline-flex items-center gap-3 font-mono text-[0.62rem] font-medium tracking-[0.22em] uppercase">
                  View Case Study
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-snow/30 transition-all duration-300 group-hover:bg-snow group-hover:text-ink group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
              {next.heroImage && (
                <div className="md:col-span-7 h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={next.heroImage}
                    alt={`${next.title}, cover`}
                    loading="lazy"
                    className="w-full h-full max-h-[460px] object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
              )}
            </div>
          </Link>
          <div className="mt-6">
            <Link href="/#work" className="font-mono text-[0.62rem] font-medium tracking-[0.22em] uppercase text-ink/45 hover:text-ink transition-colors">
              ← All Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
