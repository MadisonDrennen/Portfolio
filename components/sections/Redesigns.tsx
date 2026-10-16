import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SITE_GRID } from "@/components/ui/grid";
import TiltedGridHero from "@/components/ui/tilted-grid-hero";
import ChromeBorder from "@/components/ui/chrome-border";

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

const STEPS = [
  { n: "01", t: "Audit & strategy", d: "What's working, what isn't, and what the site actually needs to do for the business." },
  { n: "02", t: "Design system", d: "Layouts, type, and visuals that match the brand on every page, not just the homepage." },
  { n: "03", t: "Build & launch", d: "Designed and built end to end, responsive, and ready to go live." },
];

export default function Redesigns() {
  return (
    <section
      id="redesigns"
      data-nav-theme="dark"
      className="relative text-snow overflow-hidden pt-20 md:pt-28 pb-20 md:pb-28"
      style={{
        // Toned-down Berry, lit from the centre and deepening to wine.
        background:
          "radial-gradient(70% 60% at 50% 42%, #A8166C 0%, #8E1259 45%, #761A4D 80%, #5E1642 100%)",
      }}
    >

      {/* ── Full-bleed redesign reel ── */}
      <RevealOnScroll>
        <div className="relative">
          {/* Depth: a dark halo behind the row and a soft floor shadow
              beneath it, so the screenshots float off the Berry. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-[34%] h-[60%] pointer-events-none"
            style={{
              background:
                "radial-gradient(48% 50% at 50% 50%, rgba(37,2,9,0.55) 0%, rgba(74,7,36,0.3) 45%, transparent 75%)",
              filter: "blur(30px)",
            }}
          />
          <div
            aria-hidden
            className="absolute left-[8%] right-[8%] bottom-[2%] h-[20%] pointer-events-none rounded-[50%]"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, rgba(37,2,9,0.8) 0%, rgba(37,2,9,0.35) 45%, transparent 72%)",
              filter: "blur(22px)",
            }}
          />

          <TiltedGridHero
            images={REDESIGN_SHOTS}
            aspectRatio={16 / 10}
            tileHeight={53}
            gap={5}
            axis={63}
            curve={55}
            speed={6}
            fade={0}
            sliceClassName="border-y-2 border-white"
            edgeClassNames={["border-l-2 border-white", "border-r-2 border-white"]}
            className="h-[320px] sm:h-[460px] md:h-[580px] w-full"
          >
            <div className="relative z-10 pt-2 md:pt-4 px-6 text-center">
              <p className="font-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-snow/85 mb-3">
                ✦ &nbsp; Recently Launched
              </p>
              <h2
                className="font-display font-bold text-snow leading-[1.0] tracking-[-0.04em] pb-1"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                Website <span className="text-petal">redesigns</span>
              </h2>
            </div>
          </TiltedGridHero>
        </div>
      </RevealOnScroll>

      {/* ── Pitch + process ── */}
      <div className={`relative ${SITE_GRID} mt-8 md:mt-10`}>
        <RevealOnScroll>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="font-sans text-base md:text-lg text-snow/85 leading-relaxed max-w-md mb-8">
                Taking a site that feels dated or disconnected and rebuilding it so it looks like the brand, reads clearly, and gives visitors a reason to reach out.
              </p>
              <ChromeBorder>
                <a
                  href={`mailto:${EMAIL}?subject=Website%20redesign`}
                  className="btn px-7 py-4 bg-snow text-berry shadow-[0_14px_34px_-10px_rgba(74,7,36,0.55),inset_0_-2px_3px_rgba(186,0,109,0.12)] hover:-translate-y-0.5 hover:bg-white"
                >
                  Start a Redesign
                  <span>→</span>
                </a>
              </ChromeBorder>
            </div>

            <ol className="lg:col-span-7 border-t border-snow/25 self-start">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[48px_1fr] gap-5 py-5 border-b border-snow/25 items-baseline"
                >
                  <span className="font-mono text-xs font-medium tracking-[0.22em] text-petal">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg md:text-xl font-bold text-snow tracking-[-0.02em] mb-1">
                      {s.t}
                    </p>
                    <p className="font-sans text-sm text-snow/75 leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
