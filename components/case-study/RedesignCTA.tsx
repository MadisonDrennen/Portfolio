import ChromeBorder from "@/components/ui/chrome-border";
import LaptopStack from "./LaptopStack";

const EMAIL = "madisoninmarketing@gmail.com";


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
        <div className="relative z-10 md:col-span-6 lg:col-span-5 p-8 md:p-12 lg:p-14">
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

        <div className="relative md:col-span-6 lg:col-span-7 py-8 md:py-12 px-4 md:pl-0 md:pr-8">
          <LaptopStack />
        </div>
      </div>
    </div>
  );
}
