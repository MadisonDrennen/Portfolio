"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A liquid-chrome ring around any pill-shaped child (a button or link).
 *
 * Adapted from the LiquidMetalButton: the same Paper Shaders liquid-metal
 * fragment shader is mounted on a layer behind the child, and the child sits
 * on top inset by `thickness`, so only a thin ring of moving chrome shows.
 * Unlike the original it sizes itself to whatever it wraps, so any button
 * keeps its own label, colours and width.
 *
 * Speeds up on hover, like the original. If WebGL is unavailable the ring
 * falls back to a static silver gradient.
 */
export default function ChromeBorder({
  children,
  thickness = 1.5,
  fill,
  className,
}: {
  children: React.ReactNode;
  thickness?: number;
  /** Solid colour behind the child, for buttons with see-through backgrounds. */
  fill?: string;
  className?: string;
}) {
  const shaderRef = React.useRef<HTMLSpanElement>(null);
  const mount = React.useRef<any>(null);

  React.useEffect(() => {
    let disposed = false;
    const el = shaderRef.current;
    if (!el) return;

    (async () => {
      try {
        const { ShaderMount, liquidMetalFragmentShader, emptyPixel } = await import(
          "@paper-design/shaders"
        );
        // The shader samples u_image even when not in image mode, so it
        // needs a real (1px) texture bound.
        const blank = new Image();
        blank.src = emptyPixel;
        await blank.decode().catch(() => {});
        if (disposed) return;

        mount.current = new ShaderMount(
          el,
          liquidMetalFragmentShader,
          {
            u_colorBack: [0, 0, 0, 0],
            u_colorTint: [1, 1, 1, 1],
            u_image: blank,
            u_isImage: false,
            // Same settings as the original LiquidMetalButton: a circle
            // scaled far past the button, so only a smooth slice of its
            // chrome surface shows instead of repeating stripes.
            u_shape: 1,
            u_repetition: 3,
            u_softness: 0.7,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_fit: 1,
            u_scale: 8,
            u_rotation: 0,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
            u_originX: 0.5,
            u_originY: 0.5,
            u_worldWidth: 0,
            u_worldHeight: 0,
          },
          { premultipliedAlpha: false, alpha: true },
          0.6,
        );
      } catch (err) {
        // Static silver ring stays visible underneath.
        console.warn("ChromeBorder: shader unavailable", err);
      }
    })();

    return () => {
      disposed = true;
      mount.current?.dispose?.();
      mount.current = null;
    };
  }, []);

  return (
    <span
      className={cn("relative inline-flex rounded-full", className)}
      style={{ padding: thickness }}
      onMouseEnter={() => mount.current?.setSpeed?.(1.2)}
      onMouseLeave={() => mount.current?.setSpeed?.(0.6)}
    >
      {/* Static silver fallback, covered by the shader canvas once it runs */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #f8f8fa 0%, #9a9aa3 28%, #ffffff 50%, #7d7d86 72%, #e9e9ee 100%)",
        }}
      />
      <span
        ref={shaderRef}
        aria-hidden
        className="absolute inset-0 rounded-full overflow-hidden [&_canvas]:brightness-[1.18] [&_canvas]:!absolute [&_canvas]:!inset-0 [&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!rounded-full"
      />
      <span className="relative inline-flex rounded-full" style={fill ? { background: fill } : undefined}>
        {children}
      </span>
    </span>
  );
}
