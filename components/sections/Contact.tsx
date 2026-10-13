import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Contact() {
  // Platforms that share a handle are grouped: each platform name in the
  // label is its own link, and the handle links to the first one.
  const socials: { value: string; links: { label: string; href: string }[] }[] = [
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
    <section id="contact" data-nav-theme="light" className="relative py-28 md:py-36 bg-ivory text-ink overflow-hidden">
      <div className="chrome-aura chrome-aura--petal top-20 -right-32 w-[36rem] h-[36rem] opacity-55" />
      <div className="chrome-aura chrome-aura--icy bottom-0 -left-32 w-[30rem] h-[30rem] opacity-45" />

      <div className="relative mx-auto w-full max-w-[1040px] px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Specialty: website redesign */}
        <RevealOnScroll>
          <div className="glass-tile-light p-7 sm:p-9 md:p-10 mb-20 md:mb-24">
            <div className="grid md:grid-cols-12 gap-8 md:gap-10">
              <div className="md:col-span-5">
                <p className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-berry mb-4">
                  ✦ &nbsp; My Specialty
                </p>
                <h3
                  className="font-display font-bold text-ink leading-[1.0] tracking-[-0.04em] mb-4 pb-1"
                  style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}
                >
                  Website <span className="text-berry">redesigns</span>
                </h3>
                <p className="font-sans text-sm md:text-base text-ink/70 leading-relaxed mb-6">
                  Taking a site that feels dated or disconnected and rebuilding it so it looks like the brand, reads clearly, and gives visitors a reason to reach out.
                </p>

                <p className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase text-ink/45 mb-2.5">
                  Recent redesigns
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {[
                    { label: "GYMRISE", href: "/work/gymrise" },
                    { label: "Social Mulli", href: "/work/social-mulli" },
                    { label: "This Portfolio", href: "/" },
                  ].map((p) => (
                    <a key={p.href} href={p.href} className="tag-light">
                      {p.label} ↗
                    </a>
                  ))}
                </div>

                <a
                  href="mailto:madison.drennen7@gmail.com?subject=Website%20redesign"
                  className="btn-primary px-6 py-3.5 text-[0.62rem]"
                >
                  Start a Redesign
                  <span>→</span>
                </a>
              </div>

              <ol className="md:col-span-7 border-t border-ink/10">
                {[
                  { n: "01", t: "Audit & strategy", d: "What's working, what isn't, and what the site actually needs to do for the business." },
                  { n: "02", t: "Design system", d: "Layouts, type, and visuals that match the brand on every page, not just the homepage." },
                  { n: "03", t: "Build & launch", d: "Designed and built end to end, responsive, and ready to go live." },
                ].map((s) => (
                  <li
                    key={s.n}
                    className="grid grid-cols-[48px_1fr] gap-5 py-5 border-b border-ink/10 items-baseline"
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
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <SectionLabel label="Get in Touch" />
        </RevealOnScroll>

        <RevealOnScroll variant="clip" className="mt-8">
          <h2
            className="font-display font-bold text-ink leading-[1.0] tracking-[-0.05em] mb-12 pb-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Let&apos;s make something{" "}
            <span className="text-berry">memorable</span>
          </h2>
        </RevealOnScroll>

        {/* Featured email */}
        <RevealOnScroll delay={2}>
          <a
            href="mailto:madison.drennen7@gmail.com"
            className="group inline-flex items-baseline gap-4 mb-14 pb-3 border-b-2 border-ink/15 hover:border-berry transition-colors duration-400 max-w-full"
          >
            <span
              className="font-display font-semibold text-ink group-hover:text-berry transition-colors duration-400 leading-none tracking-[-0.02em] break-all"
              style={{ fontSize: "clamp(1.3rem, 3vw, 2.75rem)" }}
            >
              madison.drennen7@gmail.com
            </span>
            <span className="inline-block text-berry text-2xl transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1 flex-shrink-0">
              →
            </span>
          </a>
        </RevealOnScroll>

        {/* Contact rows */}
        <RevealOnScroll delay={3}>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10 pt-6 border-t border-ink/10">
            {socials.map((c) => (
              <div key={c.value} className="flex flex-col gap-2">
                <span className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-ink/45">
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
                  className="font-display text-xl md:text-2xl font-semibold text-ink hover:text-berry transition-colors duration-300 tracking-[-0.02em]"
                >
                  {c.value}
                </a>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
