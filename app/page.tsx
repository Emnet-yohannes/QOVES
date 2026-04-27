import AnalysisSection from "@/components/sections/AnalysisSection/AnalysisSection";
import FAQSection from "@/components/sections/FAQSection/FAQSection";
import HeroSection from "@/components/sections/HeroSection/HeroSection";

export default function Home() {
  return (
    <main>
      <div className="hidden lg:flex ">
        <HeroSection />
      </div>
      <AnalysisSection />
      <FAQSection />
    </main>
  );
}
