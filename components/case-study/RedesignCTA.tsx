import ChromeBorder from "@/components/ui/chrome-border";

const EMAIL = "madisoninmarketing@gmail.com";

// Live redesigns, fanned out on the right of the card.
const SHOTS = [
  { src: "/work/redesigns/gymrise-1.jpg", alt: "GYMRISE homepage", cls: "left-[4%] top-[14%] rotate-[-6deg] z-[1]" },
  { src: "/work/redesigns/kalero-1.jpg", alt: "Kalero homepage", cls: "right-[2%] top-[6%] rotate-[5deg] z-[2]" },
  { src: "/work/redesigns/socialmulli-1.jpg", alt: "Social Mulli homepage", cls: "left-[14%] bottom-[6%] rotate-[3deg] z-[3]" },
  { src: "/work/redesigns/o2suites-1.jpg", alt: "O2 Suites homepage", cls: "right-[8%] bottom-[12%] rotate-[-4deg] z-[4]" },
];

/** End-of-case-study call to action for a website redesign, used on the last project in the loop. */
export default function RedesignCTA() {
  return (
    <div
      className="relative overflow-hidden rounded-[22px] md:rounded-[30px] text-snow"
      style={{
        background:
          "radial-gradient(70% 90% at 85% 50%, #BA006D 0%, #8E1259 40%, #4A0A2C 75%, #250209 100%)",
      }}
    >
      <div className="grid md:grid-cols-12 items-center">
        <div className="relative z-10 md:col-span-6 p-8 md:p-12 lg:p-14">
          <p className="font-mono text-[0.6rem] font-medium tracking-[0.25em] uppercase text-petal mb-4">
            ✦ &nbsp; Your Turn
          </p>
          <h2
            className="font-display font-bold leading-[0.95] tracking-[-0.045em] mb-6"
            style={{ fontSize: "clamp(2.25rem, 4.6vw, 4.25rem)" }}
          >
            Ready for a <span className="text-petal">website redesign?</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-snow/75 leading-relaxed max-w-md mb-8">
            Taking a site that feels dated or disconnected and rebuilding it so it looks like the brand, reads clearly, and gives visitors a reason to reach out.
          </p>
          <div className="flex flex-wrap gap-3">
            <ChromeBorder>
              <a
                href={`mailto:${EMAIL}?subject=Website%20redesign`}
                className="btn px-7 py-4 bg-snow text-berry shadow-[0_14px_34px_-10px_rgba(37,2,9,0.6)] hover:-translate-y-0.5 hover:bg-white"
              >
                Start a Redesign
                <span>→</span>
              </a>
            </ChromeBorder>
            <a href={`mailto:${EMAIL}?subject=Let%27s%20talk`} className="btn-outline px-7 py-4">
              Let&apos;s Talk
            </a>
          </div>
        </div>

        <div aria-hidden className="relative md:col-span-6 h-[300px] sm:h-[360px] md:h-[440px]">
          {SHOTS.map((s) => (
            <div
              key={s.src}
              className={`absolute w-[58%] md:w-[56%] aspect-[16/10] rounded-[10px] overflow-hidden ring-2 ring-white/80 shadow-[0_30px_60px_-20px_rgba(37,2,9,0.75)] ${s.cls}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
