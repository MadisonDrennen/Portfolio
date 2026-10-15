import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SITE_GRID } from "@/components/ui/grid";
import TiltedGridHero from "@/components/ui/tilted-grid-hero";

const EMAIL = "madisoninmarketing@gmail.com";

// Screenshots of live redesigns, interleaved so neighbouring tiles differ.
const REDESIGN_SHOTS = [
  { src: "/work/redesigns/gymrise-1.jpg", alt: "GYMRISE homepage" },
  { src: "/work/redesigns/kalero-1.jpg", alt: "Kalero homepage" },
  { src: "/work/redesigns/socialmulli-1.jpg", alt: "Social Mulli homepage" },
  { src: "/work/redesigns/o2suites-1.jpg", alt: "O2 Suites homepage" },
  { src: "/work/redesigns/gymrise-2.jpg", alt: "GYMRISE testimonials" },
  { src: "/work/redesigns/kalero-2.jpg", alt: "Kalero filter finder" },
  { src: "/work/redesigns/socialmulli-2.jpg", alt: "Social Mulli services" },
  { src: "/work/redesigns/o2suites-2.jpg", alt: "O2 Suites practices" },
  { src: "/work/redesigns/gymrise-3.jpg", alt: "GYMRISE pricing" },
  { src: "/work/redesigns/kalero-3.jpg", alt: "Kalero shop" },
  { src: "/work/redesigns/socialmulli-3.jpg", alt: "Social Mulli about" },
  { src: "/work/redesigns/o2suites-3.jpg", alt: "O2 Suites partnership roadmap" },
  { src: "/work/redesigns/kalero-4.jpg", alt: "Kalero filter lineup" },
  { src: "/work/redesigns/o2suites-4.jpg", alt: "O2 Suites benefits" },
];

export default function Contact() {
  // Platforms that share a handle are grouped: each platform name in the
  // label is its own link, and the handle links to the first one.
  const socials: { value: string; links: { label: string; href: string }[] }[] = [
    { value: EMAIL, links: [{ label: "Email", href: `mailto:${EMAIL}` }] },
    { value: "720.550.0655", links: [{ label: "Phone", href: "tel:+17205500655" }] },
    {
      value: "@madisoninmarketing",
      links: [
        { label: "Instagram", href: "https://www.instagram.com/madisoninmarketing/" },
        { label: "TikTok", href: "https://www.tiktok.com/@madisoninmarketing" },
        { label: "Pinterest", href: "https://www.pinterest.com/madisoninmarketing/" },
      ],
    },
    {
      value: "Madison Drennen",
      links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/madison-drennen-465685162/" }],
    },
  ];

  const ext = (href: string) =>
    href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <section id="contact" data-nav-theme="light" className="relative py-20 md:py-28 bg-ivory text-ink overflow-hidden">
      <div className="chrome-aura chrome-aura--petal top-20 -right-32 w-[36rem] h-[36rem] opacity-55" />
      <div className="chrome-aura chrome-aura--icy bottom-0 -left-32 w-[30rem] h-[30rem] opacity-45" />

      <div className={`relative ${SITE_GRID}`}>
        <RevealOnScroll>
          {/* One closing card: specialty, call to action, and contact details */}
          <div className="relative glass-tile-light text-ink rounded-[28px] overflow-hidden">
            <div className="chrome-aura chrome-aura--petal -top-24 -right-24 w-[30rem] h-[30rem] opacity-60" />
            <div className="chrome-aura chrome-aura--icy -bottom-32 -left-24 w-[28rem] h-[28rem] opacity-50" />

            {/* ── Specialty: redesign reel ── */}
            <TiltedGridHero
              images={REDESIGN_SHOTS}
              aspectRatio={16 / 10}
              tileHeight={40}
              axis={62}
              curve={55}
              speed={6}
              fade={10}
              className="h-[290px] sm:h-[400px] md:h-[500px] w-full"
            >
              <div className="relative z-10 pt-10 md:pt-14 px-6 text-center">
                <p className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-berry mb-3">
                  ✦ &nbsp; My Specialty
                </p>
                <h3
                  className="font-display font-bold text-ink leading-[1.0] tracking-[-0.04em] pb-1"
                  style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)" }}
                >
                  Website <span className="text-berry">redesigns</span>
                </h3>
              </div>
            </TiltedGridHero>

            <div className="relative px-7 pb-7 pt-10 sm:px-10 sm:pb-10 md:px-14 md:pb-14 md:pt-12 lg:px-16 lg:pb-16 border-t border-ink/10">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
                <div className="lg:col-span-5">
                  <p className="font-sans text-base md:text-lg text-ink/75 leading-relaxed max-w-md">
                    Taking a site that feels dated or disconnected and rebuilding it so it looks like the brand, reads clearly, and gives visitors a reason to reach out.
                  </p>
                </div>

                <ol className="lg:col-span-7 border-t border-ink/10 self-start">
                  {[
                    { n: "01", t: "Audit & strategy", d: "What's working, what isn't, and what the site actually needs to do for the business." },
                    { n: "02", t: "Design system", d: "Layouts, type, and visuals that match the brand on every page, not just the homepage." },
                    { n: "03", t: "Build & launch", d: "Designed and built end to end, responsive, and ready to go live." },
                  ].map((s) => (
                    <li
                      key={s.n}
                      className="grid grid-cols-[48px_1fr] gap-5 py-5 border-b border-ink/10 last:border-b-0 last:pb-0 items-baseline"
                    >
                      <span className="font-mono text-xs font-medium tracking-[0.22em] text-berry">
                        {s.n}
                      </span>
                      <div>
                        <p className="font-display text-lg md:text-xl font-bold text-ink tracking-[-0.02em] mb-1">
                          {s.t}
                        </p>
                        <p className="font-sans text-sm text-ink/65 leading-relaxed">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* ── Call to action ── */}
              <div className="mt-14 md:mt-16 pt-12 md:pt-14 border-t border-ink/10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div>
                  <p className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-berry mb-4">
                    ✦ &nbsp; Get in Touch
                  </p>
                  <h2
                    className="font-display font-bold text-ink leading-[1.0] tracking-[-0.045em] pb-1"
                    style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
                  >
                    Let&apos;s make something{" "}
                    <span className="text-berry">memorable</span>
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3 flex-shrink-0">
                  <a href={`mailto:${EMAIL}?subject=Website%20redesign`} className="btn-primary px-7 py-4">
                    Start a Redesign
                    <span>→</span>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="btn-outline-dark px-7 py-4">
                    Just Say Hi
                  </a>
                </div>
              </div>

              {/* ── Contact details ── */}
              <div className="mt-12 md:mt-14 grid sm:grid-cols-2 xl:grid-cols-[repeat(4,auto)] xl:justify-between gap-6 md:gap-8 rounded-[20px] bg-snow/70 border border-ink/[0.07] p-6 md:p-7">
                {socials.map((c) => (
                  <div key={c.value} className="flex flex-col gap-2 min-w-0">
                    <span className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-ink/45">
                      {c.links.map((l, i) => (
                        <span key={l.label}>
                          {i > 0 && <span className="mx-1.5 text-ink/25">·</span>}
                          {c.links.length > 1 ? (
                            <a href={l.href} {...ext(l.href)} className="hover:text-berry transition-colors duration-300">
                              {l.label}
                            </a>
                          ) : (
                            l.label
                          )}
                        </span>
                      ))}
                    </span>
                    <a
                      href={c.links[0].href}
                      {...ext(c.links[0].href)}
                      className="font-display text-base md:text-lg font-semibold text-ink hover:text-berry transition-colors duration-300 tracking-[-0.01em] break-words"
                    >
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
