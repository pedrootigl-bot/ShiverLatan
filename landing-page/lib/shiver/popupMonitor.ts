const TRADEROOM_PATH = /\/traderoom(?:\/|$|\?)/i;
const DONE_PATH = /\/auth\/shiver-done(?:\.html)?(?:\/|$|\?)/i;

export type PopupLoginMonitorOptions = {
  popup: Window;
  traderoomPath?: RegExp;
  donePath?: RegExp;
  intervalMs?: number;
  onTraderoom: () => void;
};

/**
 * Só conclui quando a URL do popup (se legível) aponta para traderoom ou página done.
 * Não usa “saiu do /login” — isso fecha cedo no Google OAuth e no cadastro.
 */
export function watchPopupForLogin({
  popup,
  traderoomPath = TRADEROOM_PATH,
  donePath = DONE_PATH,
  intervalMs = 400,
  onTraderoom,
}: PopupLoginMonitorOptions): () => void {
  let done = false;

  const finish = () => {
    if (done) {
      return;
    }
    done = true;
    clearInterval(timer);
    onTraderoom();
  };

  const timer = window.setInterval(() => {
    if (popup.closed) {
      clearInterval(timer);
      return;
    }

    let href = "";
    try {
      href = popup.location.href;
    } catch {
      // Cross-origin (Shiver / Google): não dá para ler — não conclui.
      return;
    }

    if (!href || href === "about:blank") {
      return;
    }

    if (traderoomPath.test(href) || donePath.test(href)) {
      finish();
    }
  }, intervalMs);

  return () => {
    done = true;
    clearInterval(timer);
  };
}

export const SHIVER_AUTH_MESSAGE = "shiver-auth-complete";

export function listenForAuthComplete(onComplete: () => void): () => void {
  const handler = (event: MessageEvent) => {
    const data = event.data;
    if (!data || typeof data !== "object") {
      return;
    }
    if ((data as { type?: string }).type !== SHIVER_AUTH_MESSAGE) {
      return;
    }
    onComplete();
  };

  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
}

export function buildPopupLauncherUrl(
  backendOrigin: string,
  loginUrl: string,
): string {
  const url = new URL("/auth/shiver-popup.html", backendOrigin);
  url.searchParams.set("login", loginUrl);
  return url.toString();
}
