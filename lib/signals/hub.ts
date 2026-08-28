import {
  SIGNAL_HISTORY_LIMIT,
  SignalValidationError,
  normalizeDirection,
  type PublishSignalInput,
  type TradingSignal,
} from "@/lib/signals/types";

/**
 * Hub em memória para SSE.
 * Pressupõe uma instância persistente de Node.js.
 * Em ambiente serverless / várias instâncias, será necessário Redis, pub/sub
 * ou outro mecanismo compartilhado.
 */
type SignalClient = ReadableStreamDefaultController<Uint8Array>;

type SignalHub = {
  recent: TradingSignal[];
  clients: Set<SignalClient>;
};

const encoder = new TextEncoder();

function getHub(): SignalHub {
  const globalState = globalThis as typeof globalThis & {
    __shiverSignalHub?: SignalHub;
  };

  if (!globalState.__shiverSignalHub) {
    globalState.__shiverSignalHub = {
      recent: [],
      clients: new Set(),
    };
  }

  return globalState.__shiverSignalHub;
}

function optionalText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function createSignalId(): string {
  return `sig_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function encodeSse(event: string, data: unknown): Uint8Array {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export function sendSse(client: SignalClient, event: string, data: unknown): boolean {
  try {
    client.enqueue(encodeSse(event, data));
    return true;
  } catch {
    getHub().clients.delete(client);
    return false;
  }
}

export function sendSseComment(client: SignalClient, comment: string): boolean {
  try {
    client.enqueue(encoder.encode(`: ${comment}\n\n`));
    return true;
  } catch {
    getHub().clients.delete(client);
    return false;
  }
}

export function normalizeSignal(input: PublishSignalInput): TradingSignal {
  const asset = input.asset.trim();
  if (!asset) {
    throw new SignalValidationError("asset é obrigatório.");
  }

  const direction = normalizeDirection(input.direction);
  const timeframe = optionalText(input.timeframe);
  const expiration = optionalText(input.expiration);
  const entryTime = optionalText(input.entryTime);
  const id = optionalText(input.id) ?? createSignalId();

  const signal: TradingSignal = {
    id,
    asset,
    direction,
    createdAt: new Date().toISOString(),
  };

  if (timeframe) {
    signal.timeframe = timeframe;
  }
  if (expiration) {
    signal.expiration = expiration;
  }
  if (entryTime) {
    signal.entryTime = entryTime;
  }

  return signal;
}

export function publishSignal(input: PublishSignalInput): TradingSignal {
  const signal = normalizeSignal(input);
  const hub = getHub();

  hub.recent = [signal, ...hub.recent.filter((item) => item.id !== signal.id)].slice(
    0,
    SIGNAL_HISTORY_LIMIT,
  );

  for (const client of [...hub.clients]) {
    sendSse(client, "signal", signal);
  }

  return signal;
}

export function getRecentSignals(): TradingSignal[] {
  return [...getHub().recent];
}

export function subscribeSse(client: SignalClient): () => void {
  const hub = getHub();
  hub.clients.add(client);
  return () => {
    hub.clients.delete(client);
  };
}
