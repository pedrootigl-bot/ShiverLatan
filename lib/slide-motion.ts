export const SLIDE_MOTIONS = [
  "rise",
  "cover",
  "fadeScale",
  "wipe",
  "fadeScale",
  "tilt",
  "zoom",
] as const;

export type SlideMotionId = (typeof SLIDE_MOTIONS)[number];

export type MotionPreset = {
  compact: boolean;
  duration: number;
  travel: number;
  contentFrom: number;
  stagger: number;
  contentDelay: number;
  easeIn: string;
  easeOut: string;
};

export type MotionTween = {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  autoAlpha?: number;
  clipPath?: string;
};

export type SlideMotion = {
  id: SlideMotionId;
  outTo: MotionTween;
  inFrom: MotionTween;
  inTo: MotionTween;
  contentFrom: MotionTween;
  contentTo: MotionTween;
  contentOut: MotionTween;
};

function assertNever(value: never): never {
  throw new Error(`Motion não tratada: ${String(value)}`);
}

export function resolveSlideMotion(): SlideMotionId {
  return "rise";
}

function compactReverseRise(preset: MotionPreset): SlideMotion {
  const travel = preset.travel;
  const from = preset.contentFrom;

  return {
    id: "rise",
    outTo: {
      y: -travel * 0.4,
      autoAlpha: 0,
      scale: 1,
    },
    inFrom: {
      y: travel,
      autoAlpha: 1,
      x: 0,
      rotation: 0,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0%)",
    },
    inTo: { y: 0, x: 0, scale: 1, rotation: 0 },
    contentFrom: { y: from, x: 0, autoAlpha: 0, scale: 1 },
    contentTo: { y: 0, x: 0, autoAlpha: 1, scale: 1 },
    contentOut: { y: -16, autoAlpha: 0 },
  };
}

export function buildSlideMotion(
  _index: number,
  direction: number,
  preset: MotionPreset,
): SlideMotion {
  if (preset.compact && direction < 0) {
    return compactReverseRise(preset);
  }

  const id = resolveSlideMotion();
  const travel = preset.travel;
  const from = preset.contentFrom;

  switch (id) {
    case "rise":
      return {
        id,
        outTo: {
          y: -travel * 0.42 * direction,
          autoAlpha: 0,
          scale: preset.compact ? 1 : 0.97,
        },
        inFrom: {
          y: travel * direction,
          autoAlpha: 1,
          scale: preset.compact ? 1 : 1.03,
          x: 0,
          rotation: 0,
          clipPath: "inset(0% 0% 0% 0%)",
        },
        inTo: { y: 0, x: 0, scale: 1, rotation: 0 },
        contentFrom: { y: from * direction, x: 0, autoAlpha: 0, scale: 1 },
        contentTo: { y: 0, x: 0, autoAlpha: 1, scale: 1 },
        contentOut: { y: -16 * direction, autoAlpha: 0 },
      };
    case "cover":
      return {
        id,
        outTo: {
          x: -88 * direction,
          autoAlpha: 0,
          scale: preset.compact ? 1 : 0.94,
        },
        inFrom: {
          x: travel * 1.15 * direction,
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          clipPath: "inset(0% 0% 0% 0%)",
        },
        inTo: { x: 0, y: 0, scale: 1 },
        contentFrom: { x: 32 * direction, y: 10, autoAlpha: 0, scale: 1 },
        contentTo: { x: 0, y: 0, autoAlpha: 1, scale: 1 },
        contentOut: { x: -24 * direction, autoAlpha: 0 },
      };
    case "fadeScale":
      return {
        id,
        outTo: {
          scale: preset.compact ? 1 : 1.08,
          autoAlpha: 0,
          y: -12 * direction,
        },
        inFrom: {
          scale: preset.compact ? 1 : 0.88,
          autoAlpha: 1,
          y: 18 * direction,
          x: 0,
          rotation: 0,
          clipPath: "inset(0% 0% 0% 0%)",
        },
        inTo: { scale: 1, y: 0, x: 0 },
        contentFrom: { y: 18, autoAlpha: 0, scale: 0.96 },
        contentTo: { y: 0, autoAlpha: 1, scale: 1 },
        contentOut: { y: -10, autoAlpha: 0, scale: 1.04 },
      };
    case "wipe": {
      const clipFrom =
        direction > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
      return {
        id,
        outTo: {
          autoAlpha: 0,
          scale: preset.compact ? 1 : 0.97,
          y: -18 * direction,
        },
        inFrom: {
          clipPath: clipFrom,
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
        },
        inTo: { clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0 },
        contentFrom: { y: 20 * direction, autoAlpha: 0, scale: 1 },
        contentTo: { y: 0, autoAlpha: 1, scale: 1 },
        contentOut: { y: -14 * direction, autoAlpha: 0 },
      };
    }
    case "tilt":
      return {
        id,
        outTo: {
          rotation: -3.4 * direction,
          x: -48 * direction,
          autoAlpha: 0,
        },
        inFrom: {
          rotation: 4.2 * direction,
          x: 36 * direction,
          y: 28,
          autoAlpha: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        },
        inTo: { rotation: 0, x: 0, y: 0, scale: 1 },
        contentFrom: { x: 22 * direction, y: 16, autoAlpha: 0, scale: 1 },
        contentTo: { x: 0, y: 0, autoAlpha: 1 },
        contentOut: { x: -18 * direction, autoAlpha: 0 },
      };
    case "zoom":
      return {
        id,
        outTo: { scale: 0.9, autoAlpha: 0, y: -8 * direction },
        inFrom: {
          scale: 1.12,
          autoAlpha: 1,
          y: 0,
          x: 0,
          rotation: 0,
          clipPath: "inset(0% 0% 0% 0%)",
        },
        inTo: { scale: 1, y: 0, x: 0 },
        contentFrom: { scale: 0.92, y: 14, autoAlpha: 0 },
        contentTo: { scale: 1, y: 0, autoAlpha: 1 },
        contentOut: { scale: 1.06, autoAlpha: 0 },
      };
    default:
      return assertNever(id);
  }
}
