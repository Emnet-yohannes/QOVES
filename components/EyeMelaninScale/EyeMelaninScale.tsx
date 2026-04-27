"use client";
import Image from "next/image";

type Props = {
  position?: number; // 0 - 100 (where YOU appears)
};

export default function EyeMelaninScale({ position = 55 }: Props) {
  return (
    <div className="w-full min-w-40 max-w-md lg:max-w-xl p-3 sm:p-4 md:p-2  rounded-lg md:rounded-xl bg-gradient-to-br from-[#6f6762] to-[#4f4a46] text-white h-full flex flex-col">
      <div className="relative flex-1 flex items-center justify-center">
        <div className="relative h-[260px] sm:h-[300px] md:h-[337px] w-full flex justify-center">
          <div className="absolute top-0 bottom-0 flex justify-center">
            <Image
              src={"/eye-spectrum.svg"}
              width={20}
              height={300}
              alt="color spectrum"
              className="sm:w-[24px] md:w-[30px]"
            />
          </div>

          <Label text="Blue" top="8%" side="right" />
          <Label text="Green" top="38%" side="left" />
          <Label text="Brown" top="60%" side="right" />
          <Label text="Deep" top="86%" side="left" />

          <div
            className="absolute left-0 right-0 border-t border-dashed border-white/40"
            style={{ top: `${position}%` }}
          />

          <div
            className="absolute flex items-center gap-1 sm:gap-2"
            style={{ top: `calc(${position}% - 12px)`, left: "8%" }}
          >
            <div className="bg-white text-black text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-1 shadow">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#5a3a28] rounded-sm"></span>
              DARK BROWN
            </div>
          </div>

          <div
            className="absolute"
            style={{ top: `calc(${position}% - 12px)`, right: "6%" }}
          >
            <div className="bg-white text-black text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shadow">
              YOU
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto mt-3 sm:mt-4 md:mt-6 bg-white/20 rounded-md p-2 sm:p-3 text-[8px] sm:text-sm">
        Your eyes have a medium melanin concentration.
      </div>
    </div>
  );
}

type LabelProps = {
  text: string;
  top: string;
  side: "left" | "right";
};

function Label({ text, top, side }: LabelProps) {
  return (
    <div
      className="absolute flex items-center text-[8px] sm:text-xs md:text-sm text-white/80"
      style={{ top }}
    >
      {side === "left" && (
        <div className="absolute right-[50%] mr-2 sm:mr-3 md:mr-4 flex items-center">
          <span>{text}</span>
          <div className="w-4 sm:w-5 md:w-6 border-t border-white/40 ml-1 sm:ml-2" />
        </div>
      )}

      {side === "right" && (
        <div className="absolute left-[50%] ml-2 sm:ml-3 md:ml-4 flex items-center">
          <div className="w-4 sm:w-5 md:w-6 border-t border-white/40 mr-1 sm:mr-2" />
          <span>{text}</span>
        </div>
      )}
    </div>
  );
}