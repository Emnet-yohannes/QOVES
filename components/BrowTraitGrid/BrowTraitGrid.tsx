"use client";

import { useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  x: number;
  y: number;
  intensity?: number;
  className?: string;
};

const SIZE = 10;

export default function TraitGrid({
  x,
  y,
  intensity = 0.35,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const nx = Math.max(-1, Math.min(1, x));
  const ny = Math.max(-1, Math.min(1, y));
  const ni = Math.max(0, Math.min(1, intensity));

  const activeCells = useMemo(() => {
    const cells = new Set<string>();

    const cx = Math.round(((nx + 1) / 2) * (SIZE - 1));
    const cy = Math.round((1 - (ny + 1) / 2) * (SIZE - 1));

    const radius = Math.max(1, Math.round(ni * 4));

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const dx = Math.abs(j - cx);
        const dy = Math.abs(i - cy);

        if (dx + dy <= radius) {
          cells.add(`${i}-${j}`);
        }
      }
    }

    return cells;
  }, [nx, ny, ni]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cells =
      containerRef.current.querySelectorAll("[data-active='true']");

    const tween = gsap.fromTo(
      cells,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: { each: 0.02 },
      }
    );

    return () => {
      tween.kill();
    };
  }, [activeCells]);

  return (
    <div
      className={cn(
        "relative w-full max-w-md min-w-40 lg:max-w-xl rounded-2xl border border-white/10 h-full",
        "bg-gradient-to-br from-[#6f6762] to-[#4f4a46]",
        "p-4 sm:p-6 text-white shadow-xl",
        "flex flex-col",
        className
      )}
    >
      {/* GRID AREA */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <div className="relative aspect-square w-full max-w-full">
          {/* INNER GRID */}
          <div className="absolute inset-8">
            {/* AXES */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="white"
                strokeDasharray="3 3"
                strokeOpacity="0.5"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="white"
                strokeDasharray="3 3"
                strokeOpacity="0.5"
              />
            </svg>

            {/* GRID */}
            <div
              ref={containerRef}
              className="grid h-full w-full"
              style={{
                gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
                gap: "clamp(6px, 1.2vw, 10px)",
              }}
            >
              {Array.from({ length: SIZE * SIZE }).map((_, idx) => {
                const row = Math.floor(idx / SIZE);
                const col = idx % SIZE;

                const key = `${row}-${col}`;
                const active = activeCells.has(key);

                return (
                  <div
                    key={key}
                    data-active={active}
                    className={cn(
                      "w-full aspect-square rounded-[4px]",
                      active ? "bg-white/80" : "bg-white/10"
                    )}
                  />
                );
              })}
            </div>
          </div>

          {/* LABELS */}
          <div className="pointer-events-none absolute inset-0 text-[7px] sm:text-[9px] tracking-widest text-white/60">
            <div className="absolute top-2 left-1/2 -translate-x-1/2">
              BOLD
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              SUBTLE
            </div>

            <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-left overflow-clip">
              FEMININE
            </div>

            <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-right">
              MASCULINE
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto rounded-md bg-white/10 px-3 py-2 text-xs sm:text-sm text-white/80">
        Brows fall in the top 20% for natural fullness.
      </div>
    </div>
  );
}