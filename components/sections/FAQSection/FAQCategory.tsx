"use client";

import { useState, useRef } from "react";
import {
  useGsapHeightAccordion,
  useResizeObserverHeightSync,
} from "@/lib/animations/useGsapHeightAccordion";
import { FAQCategoryType } from "./types";
import FAQItem from "./FAQItem";

export default function FAQCategory({
  title,
  items,
  isOpen,
  onClick,
}: FAQCategoryType & {
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGsapHeightAccordion({
    isOpen,
    contentRef,
    getOpenHeight: () => innerRef.current?.scrollHeight,
  });

  useResizeObserverHeightSync({
    enabled: isOpen,
    contentRef,
    observedRef: innerRef,
  });

  return (
    <div
      className={` transition-all duration-300 ${
        isOpen
          ? "bg-[#9AAEB5] rounded-xl text-white shadow-lg"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 pr-10"
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {items && (
        <div
          ref={contentRef}
          style={{ height: 0, overflow: "hidden" }}
        >
          <div ref={innerRef} className="px-4 pb-4">
            <div className="rounded-lg  backdrop-blur-sm p-3">
              {items.map((item, i) => (
                <FAQItem
                  key={i}
                  {...item}
                  isOpen={openIndex === i}
                  isParentOpen={isOpen}
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}