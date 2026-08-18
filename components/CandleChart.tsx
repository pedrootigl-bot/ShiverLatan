import { useId } from "react";

type Candle = {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
};

type CandleChartProps = {
  variant?: "hero" | "panel" | "clarity" | "slide";
  className?: string;
  uid?: string;
};

function buildCandles(
  count: number,
  spacing: number,
  startX: number,
  startY: number,
  trend: number,
) {
  const candles: Candle[] = [];
  let price = startY;

  for (let index = 0; index < count; index += 1) {
    const cycle = Math.sin(index / 4.2) * 16;
    const noise = Math.sin(index * 1.73) * 9 + Math.cos(index * 0.91) * 5;
    const open = price;
    const close = open - (trend + noise * 0.35 - cycle * 0.2);
    const wick = 5 + Math.abs(Math.sin(index * 1.1)) * 10;

    candles.push({
      x: startX + index * spacing,
      open,
      close,
      high: Math.min(open, close) - wick * 0.55,
      low: Math.max(open, close) + wick * 0.7,
    });

    price = close;
  }

  return candles;
}

const PRESETS = {
  hero: {
    viewBox: "0 0 1440 520",
    candles: buildCandles(52, 26, 36, 360, 1.35),
    width: 11,
    up: "#22d3ee",
    down: "#e879f9",
  },
  panel: {
    viewBox: "0 0 900 300",
    candles: buildCandles(38, 22, 18, 210, 1.05),
    width: 9,
    up: "#22d3ee",
    down: "#e879f9",
  },
  clarity: {
    viewBox: "0 0 640 260",
    candles: buildCandles(24, 24, 20, 175, 1.7),
    width: 10,
    up: "#67e8f9",
    down: "#e879f9",
  },
  slide: {
    viewBox: "0 0 520 280",
    candles: buildCandles(20, 24, 18, 198, 1.55),
    width: 11,
    up: "#67e8f9",
    down: "#e879f9",
  },
} as const;

export default function CandleChart({
  variant = "panel",
  className = "",
  uid,
}: CandleChartProps) {
  const preset = PRESETS[variant];
  const lineId = `candle-line-${uid ?? variant}`;
  const closes = preset.candles
    .map((candle) => `${candle.x + preset.width / 2},${candle.close}`)
    .join(" ");

  return (
    <svg
      viewBox={preset.viewBox}
      preserveAspectRatio={variant === "slide" ? "xMidYMid meet" : "none"}
      className={`candle-glow h-full w-full ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id={lineId} x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>

      {preset.candles.map((candle) => {
        const isUp = candle.close < candle.open;
        const color = isUp ? preset.up : preset.down;
        const bodyTop = Math.min(candle.open, candle.close);
        const bodyHeight = Math.max(Math.abs(candle.close - candle.open), 2);
        const mid = candle.x + preset.width / 2;

        return (
          <g key={candle.x}>
            <line
              x1={mid}
              y1={candle.high}
              x2={mid}
              y2={candle.low}
              stroke={color}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <rect
              x={candle.x}
              y={bodyTop}
              width={preset.width}
              height={bodyHeight}
              rx="1"
              fill={color}
              opacity={isUp ? 0.95 : 0.55}
            />
          </g>
        );
      })}

      <polyline
        points={closes}
        fill="none"
        stroke={`url(#${lineId})`}
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

type SparklineProps = {
  tone: "blue" | "purple" | "amber";
  points: string;
  filled?: boolean;
  className?: string;
};

const SPARK_COLORS = {
  blue: "#22d3ee",
  purple: "#e879f9",
  amber: "#fbbf24",
} as const;

function sparkArea(points: string, height = 48) {
  const tokens = points.trim().split(/\s+/);
  const firstX = tokens[0]?.split(",")[0] ?? "0";
  const lastX = tokens[tokens.length - 1]?.split(",")[0] ?? "160";

  return `${points} ${lastX},${height} ${firstX},${height}`;
}

export function Sparkline({
  tone,
  points,
  filled = false,
  className = "",
}: SparklineProps) {
  const color = SPARK_COLORS[tone];
  const fillId = `spark-fill-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 160 48"
      className={`h-12 w-full ${className}`.trim()}
      aria-hidden
    >
      {filled ? (
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.38" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      ) : null}
      <line
        x1="0"
        y1="16"
        x2="160"
        y2="16"
        stroke="currentColor"
        strokeOpacity="0.08"
      />
      <line
        x1="0"
        y1="32"
        x2="160"
        y2="32"
        stroke="currentColor"
        strokeOpacity="0.08"
      />
      {filled ? (
        <polygon
          className="sparkline-fill"
          points={sparkArea(points)}
          fill={`url(#${fillId})`}
        />
      ) : null}
      <polyline
        className="sparkline-stroke"
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
