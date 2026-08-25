export const SIGNAL_HISTORY_LIMIT = 20;

export type SignalDirection = "BUY" | "SELL";

export type TradingSignal = {
  id: string;
  asset: string;
  direction: SignalDirection;
  timeframe?: string;
  expiration?: string;
  entryTime?: string;
  createdAt: string;
};

export type PublishSignalInput = {
  id?: string;
  asset: string;
  direction: string;
  timeframe?: string;
  expiration?: string;
  entryTime?: string;
};

export type SignalConnectionStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

export class SignalValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SignalValidationError";
  }
}

export function isSignalDirection(value: string): value is SignalDirection {
  return value === "BUY" || value === "SELL";
}

export function isTradingSignal(value: unknown): value is TradingSignal {
  if (!value || typeof value !== "object") {
    return false;
  }

  const signal = value as TradingSignal;
  return (
    typeof signal.id === "string" &&
    signal.id.length > 0 &&
    typeof signal.asset === "string" &&
    signal.asset.length > 0 &&
    isSignalDirection(signal.direction) &&
    typeof signal.createdAt === "string"
  );
}

export function normalizeDirection(value: string): SignalDirection {
  const key = value.trim().toUpperCase();

  switch (key) {
    case "BUY":
    case "COMPRA":
      return "BUY";
    case "SELL":
    case "VENDA":
      return "SELL";
    default:
      throw new SignalValidationError("direction deve ser BUY ou SELL.");
  }
}
