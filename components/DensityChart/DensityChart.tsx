"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  value: number; // 0 → 100
  className?: string;
};

const WIDTH = 600;
const HEIGHT = 260;
const PADDING = 40;

function generateCurve() {
  const points: { x: number; y: number }[] = [];

  const mean = 55;
  const std = 18;

  for (let i = 0; i <= 100; i += 1) {
    const y = Math.exp(-0.5 * Math.pow((i - mean) / std, 2)) * 100;
    points.push({ x: i, y });
  }

  return points;
}

export default function DensityChart({ value, className }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const data = useMemo(() => generateCurve(), []);

  const maxY = Math.max(...data.map((d) => d.y));

  const scaleX = (x: number) =>
    PADDING + (x / 100) * (WIDTH - PADDING * 2);

  const scaleY = (y: number) =>
    HEIGHT - PADDING - (y / maxY) * (HEIGHT - PADDING * 2);

  const pathD = useMemo(() => {
    return data
      .map((d, i) => {
        const x = scaleX(d.x);
        const y = scaleY(d.y);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [data]);

  const areaD = useMemo(() => {
    const filtered = data.filter((d) => d.x >= value);
    if (!filtered.length) return "";

    const path = filtered
      .map((d, i) => {
        const x = scaleX(d.x);
        const y = scaleY(d.y);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

    const last = filtered[filtered.length - 1];

    return `
      ${path}
      L ${scaleX(last.x)} ${HEIGHT - PADDING}
      L ${scaleX(value)} ${HEIGHT - PADDING}
      Z
    `;
  }, [data, value]);

  const valueX = scaleX(value);
  const valueY = scaleY(
    data.reduce((prev, curr) =>
      Math.abs(curr.x - value) < Math.abs(prev.x - value)
        ? curr
        : prev
    ).y
  );

  useEffect(() => {
    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength();

    const curveTween = gsap.fromTo(
      pathRef.current,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 1, ease: "power2.out" }
    );

    const areaTween = gsap.fromTo(
      areaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.4 }
    );

    const markerTween = gsap.fromTo(
      [markerRef.current, dotRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.4, delay: 0.6 }
    );

    return () => {
      curveTween.kill();
      areaTween.kill();
      markerTween.kill();
    };
  }, [value]);

  const percentile = Math.round(value);

  return (
    <div
      className={cn(
        "w-full max-w-md min-w-40 lg:max-w-xl rounded-2xl border border-white/10",
        "bg-gradient-to-br from-[#6f6762] to-[#4f4a46]",
        "p-4 sm:p-5 md:p-6 text-white shadow-xl",
        className
      )}
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
        {Array.from({ length: 11 }).map((_, i) => {
          const x = scaleX((i / 10) * 100);
          return (
            <line
              key={i}
              x1={x}
              x2={x}
              y1={PADDING}
              y2={HEIGHT - PADDING}
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="2 4"
            />
          );
        })}

        {Array.from({ length: 6 }).map((_, i) => {
          const y = PADDING + (i / 5) * (HEIGHT - PADDING * 2);
          return (
            <line
              key={i}
              x1={PADDING}
              x2={WIDTH - PADDING}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.15)"
            />
          );
        })}

        <path ref={areaRef} d={areaD} fill="rgba(180,210,220,0.25)" />

        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
        />

        <line
          ref={markerRef}
          x1={valueX}
          x2={valueX}
          y1={HEIGHT - PADDING}
          y2={valueY}
          stroke="rgba(180,210,220,0.8)"
          strokeDasharray="4 4"
        />

        <circle ref={dotRef} cx={valueX} cy={valueY} r="4" fill="#9ec3cf" />

        <circle cx={scaleX(0)} cy={scaleY(data[0].y)} r="3" fill="white" opacity="0.7" />
        <circle cx={scaleX(100)} cy={scaleY(data[data.length - 1].y)} r="3" fill="white" opacity="0.7" />

        {Array.from({ length: 5 }).map((_, i) => {
          const x = scaleX((i / 4) * 100);
          return (
            <rect
              key={i}
              x={x - 3}
              y={HEIGHT - PADDING + 6}
              width="6"
              height="6"
              fill="rgba(255,255,255,0.7)"
            />
          );
        })}
      </svg>

      <div className="mt-2 flex justify-between text-[8px] sm:text-[clamp(10px,1vw,14px)] text-white/70 tracking-wider">
        <span>LOW DENSITY</span>
        <span>MEDIUM DENSITY</span>
        <span>HIGH DENSITY</span>
      </div>

      <div className="mt-4 rounded-md bg-white/10 px-3 py-3 text-[8px] sm:text-[clamp(11px,1.2vw,16px)] text-white/80">
        Your eyebrow density is in the mid {percentile}th percentile
      </div>
    </div>
  );
}