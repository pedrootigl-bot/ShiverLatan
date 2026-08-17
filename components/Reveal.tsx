"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealAnimation =
  | "fade-up"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "blur-in";

type RevealProps = {
  children: ReactNode;
  className?: string;
  animation?: RevealAnimation;
  delay?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(element);
          }

          return;
        }

        if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: once ? 0.06 : [0, 0.14, 0.28],
        rootMargin: once ? "0px 0px -4% 0px" : "0px 0px -6% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${animation} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
