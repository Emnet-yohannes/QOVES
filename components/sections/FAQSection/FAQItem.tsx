"use client";

import { useRef } from "react";
import { useGsapCollapseFade } from "@/lib/animations/useGsapCollapseFade";

interface Props {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  isParentOpen: boolean;
}

export default function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  isParentOpen,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGsapCollapseFade({ isOpen, contentRef });

  return (
    <div
      className={`border-b last:border-none ${
        isParentOpen
          ? "border-white/10 text-white"
          : "border-gray-200 text-[#233137]"
      } ${isOpen ? "bg-white/30 rounded-xl p-3" : "p-3"} `}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="text-sm md:text-base">{question}</span>
        <span className="text-lg">{isOpen ? "−" : "+"}</span>
      </button>

      <div
        ref={contentRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <p className="pb-4 text-sm opacity-80">{answer}</p>
      </div>
    </div>
  );
}