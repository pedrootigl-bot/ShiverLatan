const GUEST_BOUNCE_MS = 2500;
const LOGIN_GAP_MS = 3000;
const RELOAD_GAP_MS = 3200;
const STABILITY_MS = 2200;
const PROBE_TIMEOUT_MS = 45000;

export const AUTH_PROBE_INTERVAL_MS = 4500;

/**
 * Detecta sessão no traderoom sem ler cookies cross-origin.
 *
 * Convidado: traderoom redireciona rápido para /login (bounce).
 * Autenticado: 2ª carga estável sem bounce para login.
 *
 * Navegations extras lentas (SPA) NÃO invalidam — só bounce rápido.
 */
export function probeTraderoomSession(traderoomUrl: string): Promise<boolean> {
  if (typeof document === "undefined") {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let loads = 0;
    let lastAt = 0;
    let settled = false;
    let candidate = false;
    let stabilityTimer: ReturnType<typeof setTimeout> | null = null;

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
      if (stabilityTimer !== null) {
        clearTimeout(stabilityTimer);
        stabilityTimer = null;
      }
      clearTimeout(timeout);
      iframe.remove();
      resolve(ok);
    };

    const timeout = window.setTimeout(() => finish(false), PROBE_TIMEOUT_MS);

    const armStability = () => {
      if (stabilityTimer !== null) {
        clearTimeout(stabilityTimer);
      }
      candidate = true;
      stabilityTimer = setTimeout(() => {
        stabilityTimer = null;
        if (settled) {
          return;
        }
        finish(candidate);
      }, STABILITY_MS);
    };

    iframe.onload = () => {
      loads += 1;
      const now = Date.now();
      const gap = lastAt === 0 ? 0 : now - lastAt;
      lastAt = now;

      // Bounce rápido = sem sessão (traderoom → login).
      if (loads >= 2 && gap < GUEST_BOUNCE_MS) {
        candidate = false;
        finish(false);
        return;
      }

      if (loads === 1) {
        window.setTimeout(() => {
          if (settled) {
            return;
          }
          const join = traderoomUrl.includes("?") ? "&" : "?";
          iframe.src = `${traderoomUrl}${join}_probe=${Date.now()}`;
        }, RELOAD_GAP_MS);
        return;
      }

      // 2ª+ carga com intervalo longo: candidata a autenticado.
      if (gap >= LOGIN_GAP_MS) {
        armStability();
        return;
      }

      finish(false);
    };

    iframe.onerror = () => finish(false);
    document.body.appendChild(iframe);
    iframe.src = traderoomUrl;
  });
}
