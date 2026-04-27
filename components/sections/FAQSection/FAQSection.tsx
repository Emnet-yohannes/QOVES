"use client";

import { useState } from "react";
import { FAQ_CATEGORIES } from "@/data/faq";
import FAQCategory from "./FAQCategory";

export default function FAQSection() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-block px-3 py-1 text-xs border rounded-full text-[#9AAEB5] mb-4">
          Your Questions
        </div>
        <h2 className="text-3xl md:text-4xl mb-4">
          Frequently asked questions
        </h2>
        <div className="lg:w-[640px]">
          <p className="text-gray-500">
            If you have any further questions, please use the chat box in the
            bottom right or contact us by email at hello@qoves.com
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {FAQ_CATEGORIES.map((cat, index) => (
          <FAQCategory
            key={index}
            {...cat}
            isOpen={openCategory === index}
            onClick={() =>
              setOpenCategory(openCategory === index ? null : index)
            }
          />
        ))}
      </div>
    </section>
  );
}
