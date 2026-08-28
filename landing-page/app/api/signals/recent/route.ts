import { NextResponse } from "next/server";
import { getRecentSignals } from "@/lib/signals/hub";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { signals: getRecentSignals() },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
