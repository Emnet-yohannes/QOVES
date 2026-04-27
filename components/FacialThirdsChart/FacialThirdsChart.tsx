"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  lower: number;  // e.g. 0.31
  middle: number; // e.g. 0.38
  upper: number;  // e.g. 0.31
  className?: string;
};

export default function FacialThirds({
  lower,
  middle,
  upper,
  className,
}: Props) {
  const barRef = useRef<HTMLDivElement>(null);

  // normalize just in case
  const total = lower + middle + upper;
  const l = lower / total;
  const m = middle / total;
  const u = upper / total;

  useEffect(() => {
    if (!barRef.current) return;

    const segments = barRef.current.querySelectorAll("[data-seg]");

    const tween = gsap.fromTo(
      segments,
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
  <div
    className={cn(
      "w-full min-w-40 max-w-md lg:max-w-xl",
      "rounded-xl md:rounded-2xl border border-white/10",
      "bg-gradient-to-br from-[#6f6762] to-[#4f4a46]",
      "p-3 sm:p-4 md:p-6",
      "text-white shadow-lg md:shadow-xl",
      className
    )}
  >
    {/* TITLE */}
    <div className="text-[8px] sm:text-xs tracking-wide md:tracking-widest text-white/70 uppercase">
      Facial Thirds
    </div>

    {/* SPACER */}
    <div className="h-16 sm:h-24 md:h-32 lg:h-40" />

    {/* LABELS */}
    <div className="flex text-[9px] sm:text-[10px] md:text-[11px] tracking-wide md:tracking-widest text-white/70 mb-2 sm:mb-3">
      <div
        className="text-center truncate px-1"
        style={{ width: `${l * 100}%` }}
      >
        <span className="hidden sm:inline">LOWER THIRD</span>
        <span className="sm:hidden">LOWER</span>
      </div>

      <div
        className="text-center truncate px-1"
        style={{ width: `${m * 100}%` }}
      >
        <span className="hidden sm:inline">MIDDLE THIRD</span>
        <span className="sm:hidden">MID</span>
      </div>

      <div
        className="text-center truncate px-1"
        style={{ width: `${u * 100}%` }}
      >
        <span className="hidden sm:inline">UPPER THIRD</span>
        <span className="sm:hidden">UPPER</span>
      </div>
    </div>

    {/* BAR */}
    <div
      ref={barRef}
      className="flex w-full h-1.5 sm:h-2 md:h-2.5 rounded-full overflow-hidden"
    >
      <div
        data-seg
        style={{ width: `${l * 100}%` }}
        className="bg-[#5f7882]"
      />
      <div
        data-seg
        style={{ width: `${m * 100}%` }}
        className="bg-[#8fa3ab]"
      />
      <div
        data-seg
        style={{ width: `${u * 100}%` }}
        className="bg-[#c7d2d8]"
      />
    </div>

    {/* VALUES */}
    <div className="mt-2 sm:mt-3 flex text-[11px] sm:text-xs md:text-sm text-white/80">
      <div className="text-center" style={{ width: `${l * 100}%` }}>
        {l.toFixed(2)}
      </div>
      <div className="text-center" style={{ width: `${m * 100}%` }}>
        {m.toFixed(2)}
      </div>
      <div className="text-center" style={{ width: `${u * 100}%` }}>
        {u.toFixed(2)}
      </div>
    </div>
  </div>
);
}