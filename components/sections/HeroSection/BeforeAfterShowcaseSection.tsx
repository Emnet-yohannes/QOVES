"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";

gsap.registerPlugin(MotionPathPlugin);
export default function BeforeAfter() {
  const dotRef = useRef<SVGRectElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useLayoutEffect(() => {
    if (!dotRef.current || !pathRef.current) return;

    gsap.set(dotRef.current, { transformOrigin: "50% 50%" });

    const tween = gsap.to(dotRef.current, {
      duration: 6,
      repeat: -1,
      ease: "none",
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        autoRotate: false,
        alignOrigin: [0.5, 0.5],
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="w-full py-24 flex justify-center ">
      <div className="relative w-full max-w-[1200px] h-[600px]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="-11.5 -11.5 1012 414"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M16.9998 0.498047C7.88706 0.498047 0.499756 7.88536 0.499756 16.9981V374.838C0.499756 383.951 7.88708 391.338 16.9998 391.338H328C337.113 391.338 344.5 383.951 344.5 374.838V274.859V268.474V226.359C344.5 217.799 351.44 210.859 360 210.859H629C637.56 210.859 644.5 217.799 644.5 226.359L644.5 268.474V374.838C644.5 383.951 651.887 391.338 661 391.338H972C981.113 391.338 988.5 383.951 988.5 374.838V16.9981C988.5 7.88536 981.113 0.498047 972 0.498047H661C651.887 0.498047 644.5 7.88535 644.5 16.998V60.1582H644.257V166.158C644.257 174.719 637.317 181.658 628.757 181.658H360C351.44 181.658 344.5 174.719 344.5 166.158V146.111V111.158V16.998C344.5 7.88535 337.113 0.498047 328 0.498047H16.9998Z"
            stroke="#D7E5EB"
            strokeWidth="2"
            fill="none"
          />

          <rect
            ref={dotRef}
            x={-3}
            y={-3}
            width="6"
            height="6"
            rx="2"
            fill="#869AA1"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <FaceCard label="Before" img="/Before.png" />
          <FaceCard label="After" img="/Before(1).png" />
        </div>
      </div>
    </section>
  );
}

function FaceCard({ label, img }: { label: string; img: string }) {
  return (
    <div className="w-[390px]">
      <div className={`${label === "Before" ? "ml-3" : "mr-3"} p-[6px] rounded-2xl  bg-white`}>
        <div className="relative h-[530px] rounded-xl overflow-hidden bg-[#9fb3ba]">
          <Image
            src={img}
            alt={label}
            fill
            className="object-cover"
            sizes="390px"
            priority
          />


          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[16px] tracking-widest text-white/80">
            {label.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}