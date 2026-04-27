"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

type Options = {
  isOpen: boolean;
  contentRef: React.RefObject<HTMLElement | null>;
  duration?: number;
  ease?: string;
};

export function useGsapCollapseFade({
  isOpen,
  contentRef,
  duration = 0.35,
  ease = "power2.out",
}: Options) {
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      height: isOpen ? el.scrollHeight : 0,
      opacity: isOpen ? 1 : 0,
      duration,
      ease,
    });

    return () => {
      tween.kill();
    };
  }, [contentRef, duration, ease, isOpen]);
}

