"use client";

import { useEffect, useRef } from "react";

export default function Ambient() {
  const glowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const pendingX = useRef(0);
  const pendingY = useRef(0);
  const scheduled = useRef(false);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wideScreen = window.matchMedia("(min-width: 1024px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!finePointer || !wideScreen || reducedMotion) {
      glow.style.display = "none";
      return;
    }

    const flush = () => {
      scheduled.current = false;
      glow.style.transform = `translate3d(${pendingX.current}px, ${pendingY.current}px, 0)`;
    };

    const onMove = (event: MouseEvent) => {
      pendingX.current = event.clientX - 180;
      pendingY.current = event.clientY - 180;

      if (scheduled.current) {
        return;
      }

      scheduled.current = true;
      frameRef.current = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.22)_0%,transparent_70%)] opacity-80"
    />
  );
}
