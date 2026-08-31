const GUEST_BOUNCE_MS = 2500;
const LOGIN_GAP_MS = 3000;
const RELOAD_GAP_MS = 3200;
const PROBE_TIMEOUT_MS = 45000;

export const AUTH_PROBE_INTERVAL_MS = 4500;

/**
 * Mesma heurística do useBrokerSession: 2ª carga com intervalo típico pós-login.
 */
export function probeTraderoomSession(traderoomUrl: string): Promise<boolean> {
  if (typeof document === "undefined") {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let loads = 0;
    let lastAt = 0;
    let settled = false;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.style.cssText =
      "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;border:0";

    const finish = (ok: boolean) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timeout);
      iframe.remove();
      resolve(ok);
    };

    const timeout = window.setTimeout(() => finish(false), PROBE_TIMEOUT_MS);

    iframe.onload = () => {
      loads += 1;
      const now = Date.now();
      const gap = lastAt === 0 ? 0 : now - lastAt;
      lastAt = now;

      if (loads === 1) {
        window.setTimeout(() => {
          const join = traderoomUrl.includes("?") ? "&" : "?";
          iframe.src = `${traderoomUrl}${join}_probe=${Date.now()}`;
        }, RELOAD_GAP_MS);
        return;
      }

      if (gap < GUEST_BOUNCE_MS) {
        finish(false);
        return;
      }

      if (gap >= LOGIN_GAP_MS) {
        finish(true);
        return;
      }

      finish(false);
    };

    iframe.onerror = () => finish(false);
    document.body.appendChild(iframe);
    iframe.src = traderoomUrl;
  });
}
