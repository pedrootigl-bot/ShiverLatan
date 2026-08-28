import { NextResponse } from "next/server";
import { publishSignal } from "@/lib/signals/hub";
import { SignalValidationError } from "@/lib/signals/types";
import { parseTelegramMessage } from "@/lib/telegram/parseTelegramMessage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TelegramChatMessage = {
  text?: unknown;
  caption?: unknown;
};

type TelegramUpdate = {
  message?: TelegramChatMessage;
  channel_post?: TelegramChatMessage;
  edited_message?: TelegramChatMessage;
  edited_channel_post?: TelegramChatMessage;
};

function readText(message: TelegramChatMessage | undefined): string {
  if (typeof message?.text === "string") {
    return message.text;
  }
  if (typeof message?.caption === "string") {
    return message.caption;
  }
  return "";
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token || !secret) {
    return NextResponse.json(
      { ok: false, reason: "telegram_not_configured" },
      { status: 503 },
    );
  }

  const header = request.headers.get("x-telegram-bot-api-secret-token");
  if (header !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: TelegramUpdate;
  try {
    body = (await request.json()) as TelegramUpdate;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const text = readText(
    body.channel_post ??
      body.message ??
      body.edited_channel_post ??
      body.edited_message,
  );

  const parsed = parseTelegramMessage(text);
  if (!parsed) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    const signal = publishSignal(parsed);
    return NextResponse.json({ ok: true, signal });
  } catch (error) {
    if (error instanceof SignalValidationError) {
      return NextResponse.json({ ok: true, ignored: true, error: error.message });
    }

    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
