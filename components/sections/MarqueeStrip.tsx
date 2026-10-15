"use client";

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

type Tool = {
  name: string;
  src?: string;
  /** Optional per-tool size override (Tailwind w/h classes) */
  iconClass?: string;
};

const tools: Tool[] = [
  { name: "Adobe Illustrator", src: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
  { name: "Adobe Photoshop", src: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { name: "Adobe InDesign", src: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg" },
  { name: "Figma", src: si("figma") },
  { name: "Canva", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" },
  { name: "CapCut", src: "/logos/tools/capcut.webp", iconClass: "w-8 h-8" },
  { name: "Meta Ads", src: si("meta") },
  { name: "Go HighLevel", src: "/logos/tools/ghl.jpg" },
  { name: "UpHex", src: "/logos/tools/uphex.png" },
  { name: "Vercel", src: si("vercel") },
  { name: "Claude", src: si("claude") },
  { name: "Next.js", src: si("nextdotjs") },
];

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <span className="inline-flex items-center gap-3 flex-shrink-0">
      {tool.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tool.src}
          alt=""
          aria-hidden="true"
          className={`${tool.iconClass ?? "w-5 h-5"} object-contain opacity-80`}
          loading="lazy"
        />
      ) : (
        <span
          className="w-1.5 h-1.5 rounded-full bg-berry/65 flex-shrink-0"
          aria-hidden="true"
        />
      )}
      <span className="font-mono text-[0.68rem] font-medium tracking-[0.22em] uppercase text-ink/70 whitespace-nowrap">
        {tool.name}
      </span>
    </span>
  );
}

export default function MarqueeStrip() {
  const looped = [...tools, ...tools];

  return (
    <section
      id="marquee-strip"
      aria-label="Tools and platforms I work with"
      data-nav-theme="light"
      className="relative bg-ivory text-ink overflow-hidden"
    >
      {/* Marquee row */}
      <div className="marquee-wrapper marquee-pause-hover relative py-5 border-y border-ink/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {looped.map((tool, i) => (
            <span key={i} className="flex items-center gap-7 md:gap-9 px-5 md:px-7">
              <ToolItem tool={tool} />
              <span
                className="w-1 h-1 rounded-full bg-berry/30 flex-shrink-0"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
