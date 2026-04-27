"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  value: number; // 0–100
  className?: string;
};

export default function LipSmoothness({ value, className }: Props) {
  const clamped = Math.max(0, Math.min(100, value));

  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!barRef.current || !labelRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(barRef.current, {
      width: `${clamped}%`,
      duration: 0.9,
    });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, [clamped]);

  return (
  <div
    className={cn(
      "relative w-full min-w-40  max-w-md lg:max-w-xl",
      "rounded-xl md:rounded-2xl border border-white/10",
      "bg-gradient-to-br from-[#6f6762] to-[#4f4a46]",
      "p-4 sm:p-5 md:p-8",
      "text-white shadow-lg md:shadow-xl",
      className
    )}
  >
    <div className="text-[8px] sm:text-xs tracking-wide md:tracking-widest text-white/40 uppercase">
      Lip Smoothness
    </div>

    <div className="mt-1 sm:mt-2 text-3xl sm:text-4xl md:text-6xl font-light tracking-tight">
      {clamped}%
    </div>

    <div className="pointer-events-none absolute inset-y-4 sm:inset-y-5 md:inset-y-6 left-1/2 flex justify-center">
      <div className="relative h-full">
        <div className="h-full w-px border-l border-dashed border-white/30" />
        <div className="absolute -top-1.5 sm:-top-2 left-1/2 h-1.5 w-1.5 sm:h-2 sm:w-2 -translate-x-1/2 rounded-full bg-white/60" />
      </div>
    </div>

    <div className="mt-5 sm:mt-7 md:mt-10">
      <div className="mb-2 sm:mb-3 flex items-center justify-between text-[11px] sm:text-xs md:text-sm text-white/60">
        <span>Rough (0%)</span>

        <span
          ref={labelRef}
          className="rounded-full bg-white/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-xs text-white/80 backdrop-blur"
        >
          {clamped}% (You)
        </span>

        <span>Smooth (100%)</span>
      </div>

      <div className="relative h-2 sm:h-2.5 md:h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full rounded-full bg-white/30"
          style={{ width: "0%" }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40" />
      </div>
    </div>
  </div>
);
}