"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Item = {
  label: "IDEAL" | "YOU" | "AVERAGE";
  value: number;
};

type Props = {
  data: Item[];
  className?: string;
};

export default function SymmetryComparison({ data, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll("[data-line]");
    const tags = containerRef.current.querySelectorAll("[data-tag]");

    const linesTween = gsap.fromTo(
      lines,
      { width: "0%" },
      {
        width: (i, el) => (el as HTMLElement).dataset.value + "%",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      }
    );

    const tagsTween = gsap.fromTo(
      tags,
      { opacity: 0, y: 6, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
      }
    );

    return () => {
      linesTween.kill();
      tagsTween.kill();
    };
  }, [data]);

  const getColor = (label: Item["label"]) => {
    if (label === "IDEAL") return "bg-white/70";
    if (label === "YOU") return "bg-white/60";
    return "bg-cyan-200/40";
  };

  return (
    <div
      className={cn(
        "relative w-full min-w-40 max-w-md lg:max-w-xl rounded-2xl border border-white/10",
        "bg-gradient-to-br from-[#6f6762] to-[#4f4a46]",
        "px-3 py-4 sm:px-4 sm:py-5 md:p-6 text-white shadow-xl",
        className
      )}
    >
      {/* GRID */}
      <div className="pointer-events-none absolute inset-4 sm:inset-5 md:inset-6 flex justify-between">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-px border-l border-dotted border-white/20"
          />
        ))}
      </div>

      {/* LINES */}
      <div
        ref={containerRef}
        className="relative flex flex-col gap-6 sm:gap-8 md:gap-10 py-6 sm:py-8 md:py-10"
      >
        {data.map((item, idx) => (
          <div key={idx} className="relative">
            {/* line */}
            <div className="h-[5px] sm:h-[6px] w-full">
              <div
                data-line
                data-value={item.value}
                className={cn("h-full rounded-full", getColor(item.label))}
                style={{ width: "0%" }}
              />
            </div>

            {/* dashed connector */}
            <div
              className="absolute top-1/2 h-px border-t border-dashed border-white/40"
              style={{
                left: `${item.value}%`,
                right: 0,
              }}
            />

            {/* tag */}
            <div
              data-tag
              className="absolute -translate-y-1/2"
              style={{
                left: `min(calc(${item.value}% + 6px), calc(100% - 60px))`,
                top: "50%",
              }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-md bg-white px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-xs text-black shadow">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-sm bg-gray-400" />
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AXIS LABELS */}
      <div className="mt-2 flex justify-between text-[8px] sm:text-xs text-white/70 tracking-wide sm:tracking-wider">
        <span>ASYMMETRICAL</span>
        <span>SYMMETRICAL</span>
      </div>
    </div>
  );
}