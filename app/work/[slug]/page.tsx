import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SiteScroll from "@/components/ui/SiteScroll";
import GalleryCarousel from "@/components/ui/GalleryCarousel";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title}, Madison Drennen`,
    description: project.shortDescription,
  };
}

/** Tailwind class for "show N per row on md+; collapse responsively on small screens." */
function colsClass(n: number): string {
  if (n <= 1) return "grid-cols-1";
  if (n === 2) return "grid-cols-1 sm:grid-cols-2";
  if (n === 3) return "grid-cols-2 md:grid-cols-3";
  if (n === 4) return "grid-cols-2 md:grid-cols-4";
  if (n === 5) return "grid-cols-2 md:grid-cols-5";
  return "grid-cols-2 md:grid-cols-6"; // 6+ items
}

export default function CaseStudyPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main data-nav-theme="light" className="bg-snow min-h-screen">
        {/* ── Hero ── */}
        <section className="relative pt-40 pb-16 px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 -z-10"
            style={{ background: project.accentColor }}
          />
          {/* Soft brand washes */}
          <div className="absolute top-10 -right-32 w-[28rem] h-[28rem] bg-petal/30 blur-[110px] rounded-full pointer-events-none -z-10" />
          <div className="absolute -bottom-10 -left-24 w-[22rem] h-[22rem] bg-icy-blue/35 blur-[100px] rounded-full pointer-events-none -z-10" />
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-12">
              <Link
                href="/"
                className="font-sans text-[0.65rem] font-medium tracking-widest uppercase text-ink/40 hover:text-ink transition-colors link-underline"
              >
                Home
              </Link>
              <span className="text-ink/20 text-sm">/</span>
              <Link
                href="/#work"
                className="font-sans text-[0.65rem] font-medium tracking-widest uppercase text-ink/40 hover:text-ink transition-colors link-underline"
              >
                Work
              </Link>
              <span className="text-ink/20 text-sm">/</span>
              <span className="font-sans text-[0.65rem] font-medium tracking-widest uppercase text-berry">
                {project.title}
              </span>
            </div>

            <div className="grid md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-8">
                <span
                  className="font-sans text-[0.65rem] font-medium tracking-[0.25em] uppercase mb-4 flex items-center gap-2"
                  style={{ color: project.accentColor }}
                >
                  <span className="w-5 h-px inline-block" style={{ background: project.accentColor }} />
                  {project.category}
                </span>
                <h1
                  className="font-display font-bold text-ink leading-[0.9] tracking-[-0.04em] lowercase mb-6"
                  style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
                >
                  {project.title}
                </h1>
                <p className="font-sans text-base font-normal text-ink-muted leading-relaxed max-w-xl">
                  {project.shortDescription}
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col gap-4 md:items-end">
                <div className="text-right">
                  <p className="font-sans text-[0.6rem] tracking-widest uppercase text-ink/30 mb-1">Year</p>
                  <p className="font-display text-2xl font-semibold text-ink">{project.year}</p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-[0.6rem] tracking-widest uppercase text-ink/30 mb-1">Company</p>
                  <p className="font-sans text-sm font-medium text-ink">{project.client}</p>
                </div>
                {project.pdfs && project.pdfs.length > 0 && (
                  <div className="flex flex-col gap-2 md:items-end mt-2">
                    {project.pdfs.map((pdf) => (
                      <a
                        key={pdf.href}
                        href={pdf.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-sans text-[0.65rem] font-medium tracking-widest uppercase px-4 py-2.5 rounded-[4px] border border-ink/15 text-ink/70 hover:border-berry hover:bg-berry hover:text-snow transition-all duration-300"
                      >
                        <span>↓ {pdf.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {project.heroCompact ? (
          <>
            {/* ── Compact layout: Hero image (left) + My Role (right) ── */}
            <section className="px-6 mb-20">
              <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                {/* Hero image, left */}
                <div className="md:col-span-7">
                  {project.heroImage ? (
                    <div className="relative w-full overflow-hidden rounded-[4px] ring-1 ring-ink/5 shadow-[0_30px_80px_-20px_rgba(17,17,17,0.18)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.heroImage}
                        alt={`${project.title}, hero`}
                        className="w-full h-auto block"
                        loading="eager"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full aspect-video relative overflow-hidden flex items-center justify-center"
                      style={{ background: `${project.accentColor}10` }}
                    >
                      <span
                        className="absolute font-display text-[20rem] font-bold leading-none pointer-events-none select-none"
                        style={{ color: `${project.accentColor}06` }}
                      >
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* My Role, right */}
                <div className="md:col-span-5 relative md:pl-8">
                  {/* Vertical accent rail */}
                  <span
                    className="hidden md:block absolute left-0 top-2 bottom-2 w-px"
                    style={{ background: `linear-gradient(to bottom, ${project.accentColor}, transparent)` }}
                  />

                  {/* Eyebrow */}
                  <span
                    className="font-mono text-[0.65rem] font-bold tracking-[0.32em] uppercase flex items-center gap-2.5 mb-4"
                    style={{ color: project.accentColor }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: project.accentColor, boxShadow: `0 0 10px ${project.accentColor}80` }} />
                    My Role
                  </span>

                  {/* Big display heading */}
                  <h2
                    className="font-display font-bold text-ink leading-[0.9] tracking-[-0.045em] mb-8"
                    style={{ fontSize: "clamp(2rem, 3.4vw, 3.25rem)" }}
                  >
                    What I{" "}
                    <span style={{ color: project.accentColor }}>
                      built<span style={{ color: project.accentColor }}>.</span>
                    </span>
                  </h2>

                  {/* Role list, bigger, numbered */}
                  <ul className="space-y-4 mb-10">
                    {project.whatIDid.map((item, idx) => (
                      <li key={item} className="flex items-baseline gap-4 group">
                        <span
                          className="font-mono text-[0.65rem] font-bold tracking-[0.2em] tabular-nums flex-shrink-0 transition-colors duration-300"
                          style={{ color: `${project.accentColor}80` }}
                        >
                          0{idx + 1}
                        </span>
                        <span className="font-display text-lg md:text-xl font-semibold text-ink leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-ink/8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.6rem] font-bold tracking-[0.22em] uppercase px-3 py-2 rounded-[3px] transition-colors duration-300"
                        style={{
                          background: `${project.accentColor}10`,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── Full-width: Challenge + Approach ── */}
            {(project.challenge || project.approach) && (
              <section className="px-6 pb-24">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
                  {project.challenge && (
                    <div>
                      <h2 className="font-display text-display-md font-bold text-ink tracking-[-0.03em] lowercase mb-4">
                        The Challenge
                      </h2>
                      {project.challenge.split("\n\n").map((para, i) => (
                        <p key={i} className="font-sans text-base font-normal text-ink-muted leading-relaxed mb-3 last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {project.approach && (
                    <div>
                      <h2 className="font-display text-display-md font-bold text-ink tracking-[-0.03em] lowercase mb-4">
                        The Approach
                      </h2>
                      {project.approach.split("\n\n").map((para, i) => (
                        <p key={i} className="font-sans text-base font-normal text-ink-muted leading-relaxed mb-3 last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            {/* ── Default layout: Full-width hero, then My Role | Challenge+Approach ── */}
            <section className="px-6 mb-24">
              <div className="max-w-7xl mx-auto">
                {project.heroImage ? (
                  <div className="relative w-full overflow-hidden rounded-[4px] ring-1 ring-ink/5 shadow-[0_30px_80px_-20px_rgba(17,17,17,0.18)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.heroImage}
                      alt={`${project.title}, hero`}
                      className="w-full h-auto block"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full aspect-video relative overflow-hidden flex items-center justify-center"
                    style={{ background: `${project.accentColor}10` }}
                  >
                    <span
                      className="absolute font-display text-[20rem] font-bold leading-none pointer-events-none select-none"
                      style={{ color: `${project.accentColor}06` }}
                    >
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </section>

            <section className="px-6 pb-24">
              <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16">
                <div className="md:col-span-4">
                  <span className="font-sans text-[0.65rem] font-medium tracking-[0.25em] uppercase text-accent flex items-center gap-2 mb-6">
                    <span className="w-5 h-px bg-accent" />
                    My Role
                  </span>
                  <ul className="space-y-3">
                    {project.whatIDid.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                          style={{ background: project.accentColor }}
                        />
                        <span className="font-sans text-sm font-normal text-ink-muted">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[0.6rem] font-medium tracking-wider uppercase px-3 py-1.5 border text-ink/50"
                        style={{ borderColor: `${project.accentColor}40` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-8 space-y-6">
                  {project.challenge && (
                    <div>
                      <h2 className="font-display text-display-md font-bold text-ink tracking-[-0.03em] lowercase mb-4">
                        The Challenge
                      </h2>
                      {project.challenge.split("\n\n").map((para, i) => (
                        <p key={i} className="font-sans text-base font-normal text-ink-muted leading-relaxed mb-3 last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {project.approach && (
                    <div>
                      <h2 className="font-display text-display-md font-bold text-ink tracking-[-0.03em] lowercase mb-4">
                        The Approach
                      </h2>
                      {project.approach.split("\n\n").map((para, i) => (
                        <p key={i} className="font-sans text-base font-normal text-ink-muted leading-relaxed mb-3 last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── Live site, scrolling through the full page ── */}
        {project.liveSite && (
          <section className="px-6 pb-24">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[0.6rem] font-bold tracking-[0.3em] uppercase text-ink/65">
                  The Live Site
                </span>
                <span className="flex-1 h-px bg-ink/10" />
                <span className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-ink/30">
                  Hover to pause
                </span>
              </div>
              <SiteScroll
                src={project.liveSite.scroll}
                url={project.liveSite.url}
                alt={`${project.title} website, full page`}
                accent={project.accentColor}
              />
            </div>
          </section>
        )}

        {/* ── Project Gallery (row-based, no staggering, no cropping) ── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="px-6 pb-24 bg-snow-dark/50 py-20">
            <div className="max-w-7xl mx-auto">
              <p className="font-sans text-[0.65rem] font-medium tracking-[0.25em] uppercase text-accent flex items-center gap-2 mb-12">
                <span className="w-5 h-px bg-accent" />
                Selected Visuals
              </p>

              <div className="space-y-14 md:space-y-16">
                {project.gallery.map((row, ri) => {
                  const fit = row.fit ?? "cover";
                  const rowBg = row.bg ?? `${project.accentColor}0D`; // ~5% accent tint
                  return (
                    <div key={ri}>
                      {row.label && (
                        <div className="flex items-center gap-3 mb-5">
                          <span className="font-mono text-[0.6rem] font-bold tracking-[0.3em] uppercase text-ink/65">
                            {row.label}
                          </span>
                          <span className="flex-1 h-px bg-ink/10" />
                          <span className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-ink/30 tabular-nums">
                            {String(row.items.length).padStart(2, "0")}
                          </span>
                        </div>
                      )}

                      {row.carousel ? (
                        <GalleryCarousel items={row.items} aspect={row.aspect} accent={project.accentColor} />
                      ) : (
                      <div className={`grid gap-3 md:gap-4 ${colsClass(row.items.length)} ${row.narrow ? "md:max-w-[50%] md:mx-auto" : ""}`}>
                        {row.items.map((item, i) => {
                          const isTransparent = row.bg === "transparent";
                          return (
                            <div
                              key={i}
                              className={`group relative overflow-hidden ${isTransparent ? "" : "rounded-[4px] ring-1 ring-ink/5"}`}
                              style={{
                                aspectRatio: row.aspect,
                                background: isTransparent
                                  ? "transparent"
                                  : fit === "contain"
                                  ? rowBg
                                  : "rgba(17,17,17,0.04)",
                              }}
                            >
                              {item.type === "video" ? (
                                <video
                                  src={item.src}
                                  muted
                                  loop
                                  playsInline
                                  autoPlay
                                  preload="metadata"
                                  className={`w-full h-full object-${fit} transition-transform duration-700 group-hover:scale-[1.015]`}
                                />
                              ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={item.src}
                                  alt={item.alt}
                                  loading="lazy"
                                  className={`w-full h-full object-${fit} transition-transform duration-700 group-hover:scale-[1.015]`}
                                />
                              )}

                              {item.type === "video" && (
                                <span className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-ink/70 backdrop-blur-sm text-snow text-[0.5rem] font-mono font-bold tracking-[0.2em] uppercase">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                  Video
                                </span>
                              )}

                              {/* ── Per-box name redaction overlays ── */}
                              {item.redact?.map((box, bi) => (
                                <div
                                  key={bi}
                                  className="absolute z-[2] pointer-events-none"
                                  style={{
                                    top: `${box.top}%`,
                                    height: `${box.height}%`,
                                    left: `${box.left ?? 0}%`,
                                    width: `${box.width ?? 100}%`,
                                    backdropFilter: "blur(18px)",
                                    WebkitBackdropFilter: "blur(18px)",
                                    background: "rgba(255,243,242,0.08)",
                                  }}
                                />
                              ))}

                              {!isTransparent && (
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                                  <p className="font-sans text-xs font-normal text-snow leading-snug">
                                    {item.alt}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Results ── */}
        {project.results && project.results.length > 0 && (
          <section className="px-6 py-24">
            <div className="max-w-7xl mx-auto">
              <p className="font-sans text-[0.65rem] font-medium tracking-[0.25em] uppercase text-accent flex items-center gap-2 mb-10">
                <span className="w-5 h-px bg-accent" />
                Results
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8">
                {project.results.map((stat, i) => (
                  <div key={i} className="bg-snow p-8 md:p-10 text-center">
                    <p className="font-display text-4xl md:text-5xl font-bold text-ink mb-2 leading-none">{stat.value}</p>
                    <p className="font-sans text-[0.6rem] tracking-widest uppercase text-ink/40">{stat.label}</p>
                  </div>
                ))}
              </div>
              {project.resultsCaption && (
                <p className="font-mono text-xs font-medium tracking-[0.22em] uppercase text-berry/70 mt-4 text-center">
                  {project.resultsCaption}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── Next project ── */}
        <section className="px-6 py-16 border-t border-ink/8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <Link
                href="/#work"
                className="font-sans text-[0.7rem] font-medium tracking-widest uppercase text-ink/40 hover:text-ink transition-colors link-underline"
              >
                ← All Work
              </Link>
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex items-center gap-4"
              >
                <div className="text-right">
                  <p className="font-sans text-[0.6rem] tracking-widest uppercase text-ink/30 mb-1">Next Project</p>
                  <p className="font-display text-2xl font-semibold text-ink group-hover:text-accent transition-colors duration-300">
                    {nextProject.title}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full border border-ink/20 group-hover:border-accent group-hover:bg-accent group-hover:text-snow flex items-center justify-center transition-all duration-300 text-ink/40">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
