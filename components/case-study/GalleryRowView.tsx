import GalleryCarousel from "@/components/ui/GalleryCarousel";
import type { GalleryRow } from "@/lib/projects";

function colsClass(n: number): string {
  if (n <= 1) return "grid-cols-1";
  if (n === 2) return "grid-cols-1 sm:grid-cols-2";
  if (n === 3) return "grid-cols-2 md:grid-cols-3";
  if (n === 4) return "grid-cols-2 md:grid-cols-4";
  if (n === 5) return "grid-cols-2 md:grid-cols-5";
  return "grid-cols-2 md:grid-cols-6";
}

/**
 * One gallery row in the chapter layout. Rows of 9:16 videos render inside
 * phone frames; everything else gets a soft rounded card. `dark` switches
 * the label and card treatment for dark chapters.
 */
export default function GalleryRowView({
  row,
  accent,
  dark,
  showLabel,
}: {
  row: GalleryRow;
  accent: string;
  dark: boolean;
  showLabel: boolean;
}) {
  const fit = row.fit ?? "cover";
  const phones = row.aspect === "9/16" && row.items.every((i) => i.type === "video");
  const isTransparent = row.bg === "transparent";

  return (
    <div>
      {showLabel && row.label && (
        <div className="flex items-center gap-3 mb-5">
          <span className={`font-mono text-[0.6rem] font-bold tracking-[0.3em] uppercase ${dark ? "text-snow/70" : "text-ink/65"}`}>
            {row.label}
          </span>
          <span className={`flex-1 h-px ${dark ? "bg-snow/12" : "bg-ink/10"}`} />
        </div>
      )}

      {row.carousel ? (
        <GalleryCarousel items={row.items} aspect={row.aspect} accent={accent} />
      ) : (
        <div
          className={`grid ${phones ? "gap-4 md:gap-6" : "gap-3 md:gap-4"} ${colsClass(row.items.length)} ${
            row.narrow ? "md:max-w-[50%] md:mx-auto" : ""
          }`}
        >
          {row.items.map((item, i) => (
            <div
              key={i}
              className={
                phones
                  ? "relative rounded-[26px] md:rounded-[30px] p-[5px] md:p-[6px] bg-[#0b0b0f] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  : ""
              }
            >
              <div
                className={`group relative overflow-hidden ${
                  phones
                    ? "rounded-[21px] md:rounded-[24px]"
                    : isTransparent
                      ? ""
                      : `rounded-[10px] ${dark ? "ring-1 ring-snow/10 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)]" : "ring-1 ring-ink/5 shadow-[0_18px_44px_-26px_rgba(37,2,9,0.35)]"}`
                }`}
                style={{
                  aspectRatio: row.aspect,
                  background: isTransparent ? "transparent" : fit === "contain" ? row.bg ?? `${accent}0D` : "rgba(17,17,17,0.04)",
                }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    aria-label={item.alt}
                    className={`w-full h-full object-${fit}`}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className={`w-full h-full object-${fit} transition-transform duration-700 group-hover:scale-[1.02]`}
                  />
                )}

                {item.redact?.map((box, bi) => (
                  <div
                    key={bi}
                    className="absolute z-[2] pointer-events-none"
                    style={{
                      top: `${box.top}%`,
                      height: `${box.height}%`,
                      left: `${box.left ?? 0}%`,
                      width: `${box.width ?? 100}%`,
                      backdropFilter: "blur(18px)",
                      WebkitBackdropFilter: "blur(18px)",
                      background: "rgba(255,243,242,0.08)",
                    }}
                  />
                ))}

                {!isTransparent && !phones && item.type !== "video" && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <p className="font-sans text-xs font-normal text-snow leading-snug">{item.alt}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
