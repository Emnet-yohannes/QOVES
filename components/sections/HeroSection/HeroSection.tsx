import BeforeAfterShowcaseSection from "./BeforeAfterShowcaseSection";
import HeroSteps from "./HeroSteps";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-start justify-center  w-full">
      <div className="flex py-0 px-10 flex-col items-center gap-2.5 w-full">
        <div className="flex py-10 px-0 flex-col items-center gap-8 ">
          <div className="cursor-pointer text-nowrap flex flex-col justify-center items-center gap-4 w-full">
            <button className="cursor-pointer text-nowrap flex py-[7px] px-2.5 justify-center items-center gap-2 rounded-[99px] border border-[rgba(199,209,213,0.30)] bg-[#FFF] w-fit">
              <p className="text-[#9AAEB5] font-f37ZagmaMonoTrial text-xs leading-[14px] w-fit tracking-[-0.005em]">
                Personalized Analysis
              </p>
            </button>
            <p className="text-[#233137] font-pPNeueMontreal text-5xl leading-[56px] w-fit tracking-[-0.015em]">
              Get your personalised <span className="text-[#9AAEB5]">Qoves plan</span> 
            </p>
            <p className="text-[#515255] font-pPNeueMontreal text-lg leading-6  text-center">
              Understand your facial features and start your glow-up today <br/> with
              a proven action plan, no plastic surgery needed.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <BeforeAfterShowcaseSection />
      </div>
      <HeroSteps />
    </div>
  );
}
