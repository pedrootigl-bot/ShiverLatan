"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

type BorderGlowProps = {
  children?: ReactNode;
  className?: string;
  borderRadius?: number;
};

export default function BorderGlow({
  children,
  className = "",
  borderRadius = 24,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const rectRef = useRef<DOMRect | null>(null);
  const scheduled = useRef(false);
  const pointRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const paint = () => {
    scheduled.current = false;
    const card = cardRef.current;
    const rect = rectRef.current;
    if (!card || !rect) {
      return;
    }

    const x = Math.min(Math.max(pointRef.current.x - rect.left, 0), rect.width);
    const y = Math.min(Math.max(pointRef.current.y - rect.top, 0), rect.height);

    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    card.style.setProperty("--glow-strength", "1");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    pointRef.current = { x: event.clientX, y: event.clientY };

    if (scheduled.current) {
      return;
    }

    scheduled.current = true;
    frameRef.current = requestAnimationFrame(paint);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    rectRef.current = card.getBoundingClientRect();
    card.classList.add("is-active");
    pointRef.current = { x: event.clientX, y: event.clientY };
    paint();
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    card.classList.remove("is-active");
    card.style.setProperty("--glow-strength", "0");
    rectRef.current = null;
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`border-glow ${className}`.trim()}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      <span className="border-glow-ring" aria-hidden />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
