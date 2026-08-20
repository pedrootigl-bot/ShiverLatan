import Image from "next/image";
import { MOCK_INTRO_CHIPS } from "@/lib/mock-market-data";

export default function IntroVisual() {
  return (
    <div className="intro-visual" aria-hidden>
      <div className="intro-visual__glow" />
      <div className="intro-visual__orb">
        <span className="intro-visual__shine" />
      </div>
      <div className="intro-visual__ring" />

      <div className="intro-visual__figure">
        <div className="intro-visual__hover">
          <Image
            className="intro-visual__hand"
            src="/images/intro-hand-v2.png"
            alt=""
            width={432}
            height={578}
            priority
            quality={80}
            sizes="(min-width: 1024px) 360px, 46vw"
          />
        </div>
      </div>

      <p className="intro-visual__chip intro-visual__chip--top deck-enter">
        {MOCK_INTRO_CHIPS[0].label}
        <strong>{MOCK_INTRO_CHIPS[0].value}</strong>
      </p>
      <p className="intro-visual__chip intro-visual__chip--side deck-enter">
        {MOCK_INTRO_CHIPS[1].label}
        <strong>{MOCK_INTRO_CHIPS[1].value}</strong>
      </p>
    </div>
  );
}
