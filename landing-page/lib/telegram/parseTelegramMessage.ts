import { type PublishSignalInput } from "@/lib/signals/types";

function field(text: string, label: string): string | undefined {
  const match = text.match(new RegExp(`${label}\\s*[:：]\\s*(.+)`, "i"));
  const value = match?.[1]?.trim();
  return value ? value.replace(/\r$/, "") : undefined;
}

/**
 * Parser mínimo e substituível. Quando o formato real do bot chegar,
 * ajuste só este arquivo — o restante do fluxo já chama publishSignal().
 */
export function parseTelegramMessage(text: string): PublishSignalInput | null {
  const raw = text.trim();
  if (!raw) {
    return null;
  }

  const asset = field(raw, "Ativo") ?? field(raw, "Asset");
  const direction = field(raw, "Dire[cç][aã]o") ?? field(raw, "Direction");
  const expiration = field(raw, "Expira[cç][aã]o") ?? field(raw, "Expiration");
  const entryTime = field(raw, "Entrada") ?? field(raw, "Entry");
  const timeframe = field(raw, "Timeframe") ?? field(raw, "Tempo");

  if (!asset || !direction) {
    return null;
  }

  const input: PublishSignalInput = {
    asset,
    direction,
  };

  if (expiration) {
    input.expiration = expiration;
  }
  if (entryTime) {
    input.entryTime = entryTime;
  }
  if (timeframe) {
    input.timeframe = timeframe;
  }

  return input;
}
