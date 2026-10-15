import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SITE_GRID } from "@/components/ui/grid";

const EMAIL = "madisoninmarketing@gmail.com";

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
    <section id="contact" data-nav-theme="light" className="relative pt-20 md:pt-28 pb-20 md:pb-28 bg-ivory text-ink overflow-hidden">
      <div className="chrome-aura chrome-aura--petal top-10 -right-32 w-[40rem] h-[40rem] opacity-60" />
      <div className="chrome-aura chrome-aura--icy top-[30%] -left-40 w-[34rem] h-[34rem] opacity-50" />

      <div className={`relative ${SITE_GRID}`}>
        {/* ── Call to action ── */}
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
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
        </RevealOnScroll>

        {/* ── Contact details ── */}
        <RevealOnScroll>
          <div className="mt-12 md:mt-14 pt-8 border-t border-ink/10 grid sm:grid-cols-2 xl:grid-cols-[repeat(4,auto)] xl:justify-between gap-6 md:gap-8">
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
        </RevealOnScroll>
      </div>
    </section>
  );
}
