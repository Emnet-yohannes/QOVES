"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

type Options = {
  isOpen: boolean;
  contentRef: React.RefObject<HTMLElement | null>;
  /**
   * If provided, used to compute the desired open height.
   * This is useful when the animated element is a wrapper and
   * the actual content height comes from an inner element.
   */
  getOpenHeight?: () => number | undefined;
  duration?: number;
  ease?: string;
};

export function useGsapHeightAccordion({
  isOpen,
  contentRef,
  getOpenHeight,
  duration = 0.4,
  ease = "power2.out",
}: Options) {
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const openHeight = getOpenHeight?.();

    const tween = gsap.to(el, {
      height: isOpen ? (openHeight ?? el.scrollHeight) : 0,
      duration,
      ease,
    });

    return () => {
      tween.kill();
    };
  }, [contentRef, ease, duration, getOpenHeight, isOpen]);
}

type ResizeSyncOptions = {
  enabled: boolean;
  contentRef: React.RefObject<HTMLElement | null>;
  observedRef: React.RefObject<HTMLElement | null>;
  duration?: number;
};

export function useResizeObserverHeightSync({
  enabled,
  contentRef,
  observedRef,
  duration = 0.3,
}: ResizeSyncOptions) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const contentEl = contentRef.current;
    const observedEl = observedRef.current;
    if (!contentEl || !observedEl) return;

    const resizeObserver = new ResizeObserver(() => {
      gsap.killTweensOf(contentEl);
      gsap.to(contentEl, {
        height: observedEl.scrollHeight,
        duration,
      });
    });

    resizeObserver.observe(observedEl);
    return () => resizeObserver.disconnect();
  }, [contentRef, duration, enabled, observedRef]);
}

