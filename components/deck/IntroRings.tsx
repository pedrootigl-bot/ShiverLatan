"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import MagicRings from "@/components/react-bits/MagicRings";
import { isSearchCrawler } from "@/lib/crawler";
import { DECK_SLIDE_EVENT, SLIDES, slideIndexFromHash } from "@/lib/slides";

export default function IntroRings() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [engineOn, setEngineOn] = useState(false);
  const [lite, setLite] = useState(true);
  const [staticFx, setStaticFx] = useState(false);

  useLayoutEffect(() => {
    const current = SLIDES[slideIndexFromHash(window.location.hash)]?.id;
    setActive(current === "inicio");

    if (
      isSearchCrawler() ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setStaticFx(true);
      return;
    }

    setLite(window.matchMedia("(max-width: 1023px)").matches);

    if (document.querySelector(".shiver-splash")) {
      const onDone = () => setReady(true);
      window.addEventListener("shiver:preloader-done", onDone, { once: true });
      return () => window.removeEventListener("shiver:preloader-done", onDone);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    const onSlide = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      setActive(id === "inicio");
    };

    window.addEventListener(DECK_SLIDE_EVENT, onSlide);
    return () => window.removeEventListener(DECK_SLIDE_EVENT, onSlide);
  }, []);

  useEffect(() => {
    if (ready && active && !staticFx) {
      setEngineOn(true);
    }
  }, [ready, active, staticFx]);

  if (staticFx || !ready || !engineOn) {
    return <div className="intro-visual__rings-fallback" aria-hidden />;
  }

  return (
    <MagicRings
      active={active}
      color="#38bdf8"
      colorTwo="#2563eb"
      ringCount={lite ? 4 : 6}
      speed={0.85}
      attenuation={11}
      lineThickness={lite ? 1.6 : 2.1}
      baseRadius={0.18}
      radiusStep={0.09}
      scaleRate={0.12}
      opacity={0.92}
      blur={0}
      noiseAmount={lite ? 0 : 0.06}
      rotation={18}
      ringGap={1.45}
      fadeIn={0.65}
      fadeOut={0.5}
      followMouse={!lite}
      mouseInfluence={0.16}
      hoverScale={1.08}
      parallax={0.04}
      clickBurst={false}
    />
  );
}
