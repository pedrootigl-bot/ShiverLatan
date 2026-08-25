import { NextResponse } from "next/server";
import { publishSignal } from "@/lib/signals/hub";
import { SignalValidationError, type PublishSignalInput } from "@/lib/signals/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const secret = process.env.SIGNAL_TEST_SECRET;
  if (!secret) {
    return false;
  }

  return request.headers.get("x-signal-test-secret") === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const input: PublishSignalInput = {
    asset: typeof payload.asset === "string" ? payload.asset : "",
    direction: typeof payload.direction === "string" ? payload.direction : "",
  };

  if (typeof payload.timeframe === "string") {
    input.timeframe = payload.timeframe;
  }
  if (typeof payload.expiration === "string") {
    input.expiration = payload.expiration;
  }
  if (typeof payload.entryTime === "string") {
    input.entryTime = payload.entryTime;
  }

  try {
    const signal = publishSignal(input);
    return NextResponse.json({ signal }, { status: 201 });
  } catch (error) {
    if (error instanceof SignalValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Falha ao publicar sinal." }, { status: 500 });
  }
}
