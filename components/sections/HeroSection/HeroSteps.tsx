"use client";

import { useCallback, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Get your expert facial analysis",
  },
  {
    id: 2,
    title: "Visualise your best looking self",
  },
  {
    id: 3,
    title: "Get your personalized glow-up protocol",
  },
  {
    id: 4,
    title: "Track your progress and see dramatic results",
  },
];

export default function StepsSection() {
  const [activeStepId, setActiveStepId] = useState<number>(2);

  const handleStepSelect = useCallback((id: number) => {
    setActiveStepId(id);
  }, []);

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-16">
      <div className="max-w-7xl mx-auto">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              id={step.id}
              title={step.title}
              active={activeStepId === step.id}
              onSelect={handleStepSelect}
            />
          ))}

        </div>
      </div>
    </section>
  );
}

function StepCard({
  id,
  title,
  active,
  onSelect,
}: {
  id: number;
  title: string;
  active?: boolean;
  onSelect: (id: number) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(id);
      }}
      className={`
        group relative rounded-2xl border p-6 transition-all duration-300
        ${active
          ? "bg-[#9AAEB5] text-white border-transparent shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)]"
          : "bg-white text-[#233137] border-[#E6ECEF] hover:shadow-md"}
      `}
    >
      {/* subtle background accent for active */}
      {active && (
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/40 to-transparent rounded-2xl pointer-events-none" />
      )}

      <div className="relative flex flex-col gap-6">

        {/* STEP NUMBER */}
        <div
          className={`
            flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium
            ${active
              ? "bg-white/20 text-white"
              : "bg-[#9AAEB5] text-white"}
          `}
        >
          {id}
        </div>

        {/* TITLE */}
        <p className="text-base md:text-lg leading-snug font-medium w-[200px]">
          {title}
        </p>

      </div>
    </div>
  );
}