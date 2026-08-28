import {
  sendSse,
  sendSseComment,
  subscribeSse,
} from "@/lib/signals/hub";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  let unsubscribe = () => {};
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      unsubscribe = subscribeSse(controller);
      sendSse(controller, "connected", { ok: true });
      heartbeat = setInterval(() => {
        sendSseComment(controller, "ping");
      }, 15000);
    },
    cancel() {
      if (heartbeat) {
        clearInterval(heartbeat);
      }
      unsubscribe();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
