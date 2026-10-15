/**
 * A browser window that slowly scrolls a full-page screenshot top to
 * bottom and back, so a case study can show a whole live site in motion.
 * Pure CSS: the viewport is a size container, so the image can travel
 * exactly its own height minus the window's (see .site-scroll-img).
 */
export default function SiteScroll({
  src,
  url,
  alt,
  accent = "#BA006D",
}: {
  src: string;
  url: string;
  alt: string;
  accent?: string;
}) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="rounded-[18px] overflow-hidden bg-[#0d0d12] ring-1 ring-ink/10 shadow-[0_40px_90px_-30px_rgba(37,2,9,0.35)]">
      {/* Window chrome */}
      <div className="flex items-center gap-4 px-4 md:px-5 h-11 bg-[#16161d] border-b border-white/5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="font-mono text-[0.65rem] tracking-[0.08em] text-white/55 bg-white/5 rounded-full px-4 py-1 truncate max-w-[60%]">
            {host}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.55rem] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-70"
          style={{ color: accent }}
        >
          Visit ↗
        </a>
      </div>

      {/* Viewport */}
      <div className="site-scroll relative w-full aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="site-scroll-img block w-full h-auto" />
      </div>
    </div>
  );
}
