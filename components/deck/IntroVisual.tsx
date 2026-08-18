import Image from "next/image";

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
            src="/images/intro-hand-phone.png"
            alt=""
            width={432}
            height={577}
            priority
            quality={80}
            sizes="(min-width: 1024px) 360px, 205px"
          />
        </div>
      </div>

      <p className="intro-visual__chip intro-visual__chip--top deck-enter">
        Tendência
        <strong>Alta</strong>
      </p>
      <p className="intro-visual__chip intro-visual__chip--side deck-enter">
        Momentum
        <strong>Forte</strong>
      </p>
    </div>
  );
}
