import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SITE_GRID } from "@/components/ui/grid";

const EMAIL = "madison.drennen7@gmail.com";

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
          <div className="relative sweep-bg text-snow rounded-[28px] overflow-hidden shadow-[0_40px_90px_-40px_rgba(37,2,9,0.6)]">
            <div className="absolute inset-0 bg-mahogany-deep/65 pointer-events-none" />
            <div className="chrome-aura chrome-aura--berry -top-24 -right-24 w-[30rem] h-[30rem] opacity-70" />

            <div className="relative p-7 sm:p-10 md:p-14 lg:p-16">
              {/* ── Specialty ── */}
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
                <div className="lg:col-span-5">
                  <p className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-petal mb-4">
                    ✦ &nbsp; My Specialty
                  </p>
                  <h3
                    className="font-display font-bold text-snow leading-[1.0] tracking-[-0.04em] mb-5 pb-1"
                    style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)" }}
                  >
                    Website <span className="text-berry">redesigns</span>
                  </h3>
                  <p className="font-sans text-sm md:text-base text-snow/70 leading-relaxed mb-7 max-w-md">
                    Taking a site that feels dated or disconnected and rebuilding it so it looks like the brand, reads clearly, and gives visitors a reason to reach out.
                  </p>

                  <p className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-snow/45 mb-2.5">
                    Recent redesigns
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "GYMRISE", href: "/work/gymrise" },
                      { label: "Social Mulli", href: "/work/social-mulli" },
                      { label: "This Portfolio", href: "/" },
                    ].map((p) => (
                      <a key={p.href} href={p.href} className="tag-dark hover:text-snow hover:border-berry transition-colors duration-300">
                        {p.label} ↗
                      </a>
                    ))}
                  </div>
                </div>

                <ol className="lg:col-span-7 border-t border-snow/12 self-start">
                  {[
                    { n: "01", t: "Audit & strategy", d: "What's working, what isn't, and what the site actually needs to do for the business." },
                    { n: "02", t: "Design system", d: "Layouts, type, and visuals that match the brand on every page, not just the homepage." },
                    { n: "03", t: "Build & launch", d: "Designed and built end to end, responsive, and ready to go live." },
                  ].map((s) => (
                    <li
                      key={s.n}
                      className="grid grid-cols-[48px_1fr] gap-5 py-5 border-b border-snow/12 last:border-b-0 last:pb-0 items-baseline"
                    >
                      <span className="font-mono text-xs font-medium tracking-[0.22em] text-berry">
                        {s.n}
                      </span>
                      <div>
                        <p className="font-display text-lg md:text-xl font-bold text-snow tracking-[-0.02em] mb-1">
                          {s.t}
                        </p>
                        <p className="font-sans text-sm text-snow/60 leading-relaxed">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* ── Call to action ── */}
              <div className="mt-14 md:mt-16 pt-12 md:pt-14 border-t border-snow/15 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div>
                  <p className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-petal mb-4">
                    ✦ &nbsp; Get in Touch
                  </p>
                  <h2
                    className="font-display font-bold text-snow leading-[1.0] tracking-[-0.045em] pb-1"
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
                  <a href={`mailto:${EMAIL}`} className="btn-outline px-7 py-4">
                    Just Say Hi
                  </a>
                </div>
              </div>

              {/* ── Contact details ── */}
              <div className="mt-12 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr_1fr] gap-6 md:gap-8 rounded-[20px] bg-snow/[0.05] border border-snow/10 p-6 md:p-7">
                {socials.map((c) => (
                  <div key={c.value} className="flex flex-col gap-2 min-w-0">
                    <span className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-snow/45">
                      {c.links.map((l, i) => (
                        <span key={l.label}>
                          {i > 0 && <span className="mx-1.5 text-snow/25">·</span>}
                          {c.links.length > 1 ? (
                            <a href={l.href} {...ext(l.href)} className="hover:text-petal transition-colors duration-300">
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
                      className="font-display text-base md:text-lg font-semibold text-snow hover:text-petal transition-colors duration-300 tracking-[-0.01em] break-words"
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
