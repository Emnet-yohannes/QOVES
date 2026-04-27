import DensityChart from "../../DensityChart/DensityChart";
import BrowTraitGrid from "../../BrowTraitGrid/BrowTraitGrid";
import LipSmoothness from "../../LipSmoothness/LipSmoothness";
import EyeMelaninScale from "../../EyeMelaninScale/EyeMelaninScale";
import SymmetryBenchmarkRecharts from "../../SymmetryBenchmarkRecharts/SymmetryBenchmarkRecharts";
import FacialThirds from "../../FacialThirdsChart/FacialThirdsChart";
import Image from "next/image";

export default function AnalysisSection() {
  return (
    <section className="relative bg-[#9AAEB5] overflow-hidden flex flex-col items-center w-full">
      <div className="text-center pt-14 flex flex-col gap-6 z-20 px-4 md:px-6">
        <p className="text-[8px] text-white border border-white/10 px-3 py-1 rounded-full w-fit mx-auto">
          Personalized aesthetics
        </p>

        <h2 className="text-white/50 text-4xl md:text-5xl">
          Your complete facial analysis
        </h2>

        <p className="text-white/70 max-w-[600px] mx-auto">
          Every face is unique. We assess more than 100 unique facial markers to
          give you a precise understanding of your aesthetics.
        </p>
      </div>

      <div className="relative w-full mt-20 flex justify-center px-4 md:px-8 xl:px-0">
        <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] grid grid-cols-2 gap-6 lg:flex lg:justify-between items-stretch">
          <div className="w-full flex flex-col gap-6 lg:w-[40%] lg:grid lg:grid-cols-2">
            <div className="flex flex-col gap-6 flex-1 lg:hidden">
              <div className="flex-1">
                <DensityChart value={78} />
              </div>
              <div className="flex-1">
                <LipSmoothness value={56} />
              </div>
            </div>

            <div className="flex-1 lg:hidden">
              <BrowTraitGrid x={0.6} y={0.7} intensity={0.4} />
            </div>

            <div className="hidden lg:block h-full">
              <BrowTraitGrid x={0.6} y={0.7} intensity={0.4} />
            </div>

            <div className="hidden lg:flex flex-col gap-6 h-full">
              <div className="flex-1">
                <DensityChart value={78} />
              </div>
              <div className="flex-1">
                <LipSmoothness value={56} />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 lg:w-[40%] lg:grid lg:grid-cols-2">
            <div className="flex-1 lg:hidden flex justify-end">
              <EyeMelaninScale position={58} />
            </div>

            <div className="flex flex-col gap-6 flex-1 lg:hidden">
              <div className="flex-1 flex justify-end">
                <SymmetryBenchmarkRecharts
                  data={[
                    { label: "IDEAL", value: 82 },
                    { label: "YOU", value: 75 },
                    { label: "AVERAGE", value: 55 },
                  ]}
                />
              </div>

              <div className="flex-1 flex justify-end">
                <FacialThirds lower={0.31} middle={0.38} upper={0.31} />
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <EyeMelaninScale position={58} />
            </div>

            <div className="hidden lg:flex flex-col gap-6 h-full">
              <div className="flex-1 flex justify-end">
                <FacialThirds lower={0.31} middle={0.38} upper={0.31} />
              </div>

              <div className="flex-1 flex justify-end">
                <SymmetryBenchmarkRecharts
                  data={[
                    { label: "IDEAL", value: 82 },
                    { label: "YOU", value: 75 },
                    { label: "AVERAGE", value: 55 },
                  ]}
                />
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 md:top-1/12 lg:-top-1/3 2xl:-top-1/4 z-20 w-full min-w-[366px] md:max-w-[736px]">
              <Image
                src="/QovesAnalysisImage.png"
                alt="Face analysis"
                width={736}
                height={800}
                priority
                className="object-contain w-full h-auto"
                sizes="(max-width: 768px) 100vw, 736px"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9AAEB5] via-transparent to-[#9AAEB5]" />
          </div>
        </div>
      </div>
    </section>
  );
}