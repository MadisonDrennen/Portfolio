"use client";

import Link from "next/link";
import { projects } from "@/lib/projects";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";
import { SITE_GRID } from "@/components/ui/grid";

type Project = (typeof projects)[number];

// Native hero-image proportions so nothing gets cropped.
const HERO_ASPECT: Record<string, string> = {
  gymrise: "4 / 3",
  "social-mulli": "1 / 1",
  rekmed: "3 / 2",
  explorations: "4 / 3",
};

// Each spread gets its own asymmetric placement on the 12-col grid (lg+).
const SPREADS = [
  { image: "lg:col-start-1 lg:col-span-8", text: "lg:col-start-9 lg:col-span-4 lg:self-end" },
  { image: "lg:col-start-6 lg:col-span-7", text: "lg:col-start-1 lg:col-span-4 lg:self-start" },
  { image: "lg:col-start-2 lg:col-span-7", text: "lg:col-start-9 lg:col-span-4 lg:self-center" },
  { image: "lg:col-start-5 lg:col-span-8", text: "lg:col-start-1 lg:col-span-4 lg:self-end" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function FeaturedWork() {
  return (
    <section
      id="work"
      data-nav-theme="dark"
      className="relative pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-24 plum-bloom overflow-hidden"
    >
      <div className="chrome-aura chrome-aura--berry top-10 -right-32 w-[36rem] h-[36rem]" />
      <div className="chrome-aura chrome-aura--petal bottom-20 -left-32 w-[32rem] h-[32rem] opacity-30" />

      <div className={`relative ${SITE_GRID}`}>
        {/* ── Header: headline + project index ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-x-16 items-end mb-16 md:mb-20 lg:mb-24">
          <div className="lg:col-span-8">
            <RevealOnScroll>
              <SectionLabel label="Recent Work" variant="dark" />
            </RevealOnScroll>
            <RevealOnScroll delay={1} variant="clip">
              <h2
                className="font-display font-bold text-snow leading-[1.0] tracking-[-0.045em] mt-5 pb-1"
                style={{ fontSize: "clamp(2.5rem, 5.4vw, 4.75rem)" }}
              >
                A little look at what I&apos;ve been{" "}
                <span className="text-berry">making lately</span>
              </h2>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={2} className="lg:col-span-4">
            <p className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-snow/45 mb-4">
              Selected Projects · {pad(projects.length)}
            </p>
            <ol className="border-t border-snow/12">
              {projects.map((p, i) => (
                <li key={p.slug} className="border-b border-snow/12">
                  <Link
                    href={`/work/${p.slug}`}
                    className="group/idx flex items-baseline gap-4 py-3.5"
                  >
                    <span className="font-mono text-[0.6rem] font-medium tracking-[0.22em] text-berry tabular-nums">
                      {pad(i + 1)}
                    </span>
                    <span className="font-display text-lg font-semibold text-snow/85 tracking-[-0.02em] group-hover/idx:text-snow transition-colors duration-300">
                      {p.title}
                    </span>
                    <span className="ml-auto font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-snow/40 tabular-nums group-hover/idx:text-berry transition-colors duration-300">
                      {p.year}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </RevealOnScroll>
        </div>

        {/* ── Project spreads ── */}
        <div className="space-y-20 md:space-y-24 lg:space-y-28">
          {projects.map((project, index) => (
            <ProjectSpread key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll className="mt-20 md:mt-24 text-center">
          <p className="font-sans text-sm font-normal text-snow/55 mb-5">
            More work, process notes, and explorations, happy to share.
          </p>
          <a href="mailto:madisoninmarketing@gmail.com" className="btn-primary px-8 py-4">
            Say Hi
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function ProjectSpread({ project, index }: { project: Project; index: number }) {
  const layout = SPREADS[index % SPREADS.length];
  const aspect = HERO_ASPECT[project.slug] ?? "4 / 3";

  return (
    <RevealOnScroll>
      <Link href={`/work/${project.slug}`} className="block group">
        {/* Chapter rule */}
        <div className="flex items-center gap-5 pb-4 mb-8 md:mb-10 border-b border-snow/12">
          <span className="font-mono text-[0.65rem] font-medium tracking-[0.22em] text-berry tabular-nums">
            {pad(index + 1)}
          </span>
          <span className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-snow/45">
            {project.client}
          </span>
          <span className="hidden sm:inline font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-snow/30 tabular-nums">
            {project.year}
          </span>
          <span className="ml-auto flex items-center gap-3 font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-snow/70 group-hover:text-berry transition-colors duration-300">
            <span className="hidden sm:inline">View Case Study</span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-snow/25 group-hover:border-berry group-hover:bg-berry group-hover:text-snow transition-all duration-300">
              →
            </span>
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 lg:gap-x-12">
          {/* Image */}
          <div className={`${layout.image} lg:row-start-1`}>
            <div className="glass-tile p-2.5 md:p-3">
              <div
                className="relative w-full overflow-hidden rounded-[16px]"
                style={{ aspectRatio: aspect, background: `${project.accentColor}22` }}
              >
                {project.heroImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.heroImage}
                    alt={`${project.title}, preview`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`${layout.text} lg:row-start-1`}>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: project.accentColor, boxShadow: `0 0 12px ${project.accentColor}95` }}
              />
              <span
                className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase"
                style={{ color: project.accentColor }}
              >
                {project.category}
              </span>
            </div>

            <h3
              className="font-display font-bold text-snow leading-[0.92] tracking-[-0.045em] mb-6 transition-colors duration-400 group-hover:text-petal"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3.75rem)" }}
            >
              {project.title}
            </h3>

            <p className="font-sans text-base font-normal text-snow/65 leading-relaxed mb-7 max-w-md group-hover:text-snow/85 transition-colors duration-400">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-dark">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </RevealOnScroll>
  );
}
