"use strict";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SHIVER_POPUP_DEFAULT_HEIGHT,
  SHIVER_POPUP_DEFAULT_WIDTH,
  SHIVER_POPUP_NAME,
} from "@/config/shiver";
import { probeTraderoomSession } from "@/lib/shiver/authProbe";
import {
  listenForAuthComplete,
  watchPopupForLogin,
} from "@/lib/shiver/popupMonitor";
import { isPopupOpen, openCenteredPopup } from "@/lib/shiver/popup";

export type ShiverAuthState =
  | "idle"
  | "opening"
  | "waiting_for_login"
  | "checking"
  | "ready"
  | "popup_blocked";

export type ConfirmLoginResult = {
  unlocked: boolean;
  sessionDetected: boolean;
  needsLoginPopup: boolean;
  /** Popup ainda aberto — peça para fechar após o login. */
  needsClosePopup: boolean;
  /** Fechou rápido demais sem tempo de login real. */
  needsMoreTime: boolean;
};

const POPUP_POLL_MS = 500;
const STATUS_CLEAR_MS = 6000;
const SESSION_POLL_MS = 5000;
const CONFIRM_SESSION_WAIT_MS = 1200;
const POST_CLOSE_PROBE_MS = 20000;
/**
 * Tempo mínimo com o popup aberto antes de aceitar "Já fiz login"
 * quando o iframe não enxerga cookies (bloqueio 3P).
 * Impede liberar só abrindo o card e clicando na hora.
 */
const MIN_LOGIN_MS = 15000;

type WatchLoginOptions = {
  traderoomUrl: string;
  popupUrl?: string;
  onValidated: () => void | Promise<void>;
  onReloadSession?: () => void;
  isSessionReady?: () => boolean;
};

export function useShiverPopupAuth(loginUrl: string) {
  const [authState, setAuthState] = useState<ShiverAuthState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const popupRef = useRef<Window | null>(null);
  const popupTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const postCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const probeInFlightRef = useRef(false);
  const completingRef = useRef(false);
  const loginPopupOpenedRef = useRef(false);
  const popupOpenedAtRef = useRef(0);
  const popupClosedRef = useRef(false);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const watchOptionsRef = useRef<WatchLoginOptions | null>(null);
  const stopPopupMonitorRef = useRef<(() => void) | null>(null);
  const stopMessageListenerRef = useRef<(() => void) | null>(null);

  const clearPopupTimer = useCallback(() => {
    if (popupTimerRef.current !== null) {
      clearInterval(popupTimerRef.current);
      popupTimerRef.current = null;
    }
  }, []);

  const clearSessionPoll = useCallback(() => {
    if (sessionPollRef.current !== null) {
      clearInterval(sessionPollRef.current);
      sessionPollRef.current = null;
    }
  }, []);

  const clearPostCloseTimer = useCallback(() => {
    if (postCloseTimerRef.current !== null) {
      clearTimeout(postCloseTimerRef.current);
      postCloseTimerRef.current = null;
    }
  }, []);

  const clearWatchers = useCallback(() => {
    stopPopupMonitorRef.current?.();
    stopPopupMonitorRef.current = null;
    stopMessageListenerRef.current?.();
    stopMessageListenerRef.current = null;
    clearSessionPoll();
    clearPostCloseTimer();
  }, [clearPostCloseTimer, clearSessionPoll]);

  const clearStatusTimer = useCallback(() => {
    if (statusTimerRef.current !== null) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }
  }, []);

  const scheduleStatusClear = useCallback(() => {
    clearStatusTimer();
    statusTimerRef.current = setTimeout(() => {
      setStatusMessage("");
      setAuthState("idle");
    }, STATUS_CLEAR_MS);
  }, [clearStatusTimer]);

  const closePopupSilently = useCallback(() => {
    const popup = popupRef.current;
    if (isPopupOpen(popup)) {
      popup.close();
    }
    popupRef.current = null;
    clearPopupTimer();
    clearWatchers();
  }, [clearPopupTimer, clearWatchers]);

  const finishValidated = useCallback(async () => {
    const options = watchOptionsRef.current;
    if (!options || completingRef.current) {
      return false;
    }

    completingRef.current = true;
    clearPopupTimer();
    clearWatchers();

    if (isPopupOpen(popupRef.current)) {
      popupRef.current.close();
    }
    popupRef.current = null;
    setAuthState("checking");

    try {
      await options.onValidated();
      loginPopupOpenedRef.current = false;
      popupOpenedAtRef.current = 0;
      popupClosedRef.current = false;
      return true;
    } finally {
      completingRef.current = false;
    }
  }, [clearPopupTimer, clearWatchers]);

  const openDurationMs = useCallback(() => {
    if (popupOpenedAtRef.current === 0) {
      return 0;
    }
    return Date.now() - popupOpenedAtRef.current;
  }, []);

  const runSessionProbe = useCallback(async () => {
    const options = watchOptionsRef.current;
    if (!options?.traderoomUrl || probeInFlightRef.current || completingRef.current) {
      return false;
    }

    probeInFlightRef.current = true;
    try {
      const ok = await probeTraderoomSession(options.traderoomUrl);
      if (ok) {
        await finishValidated();
        return true;
      }
      return false;
    } finally {
      probeInFlightRef.current = false;
    }
  }, [finishValidated]);

  const startSessionPoll = useCallback(() => {
    clearSessionPoll();
    const options = watchOptionsRef.current;
    if (!options?.traderoomUrl) {
      return;
    }

    sessionPollRef.current = setInterval(() => {
      if (completingRef.current) {
        return;
      }
      void runSessionProbe();
    }, SESSION_POLL_MS);
  }, [clearSessionPoll, runSessionProbe]);

  const startLoginWatchers = useCallback(() => {
    clearWatchers();

    const popup = popupRef.current;
    if (popup && isPopupOpen(popup)) {
      stopPopupMonitorRef.current = watchPopupForLogin({
        popup,
        onTraderoom: () => {
          void finishValidated();
        },
      });
    }

    stopMessageListenerRef.current = listenForAuthComplete(() => {
      void finishValidated();
    });

    // Não sonda na abertura (ainda sem login). Espera um ciclo.
    startSessionPoll();
  }, [clearWatchers, finishValidated, startSessionPoll]);

  const handlePopupClosed = useCallback(
    async (onClosed: () => void) => {
      const options = watchOptionsRef.current;
      popupClosedRef.current = true;
      setAuthState("checking");

      options?.onReloadSession?.();

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, CONFIRM_SESSION_WAIT_MS);
      });

      if (completingRef.current) {
        return;
      }

      if (options?.traderoomUrl) {
        const probed = await runSessionProbe();
        if (probed) {
          return;
        }
      }

      // Sem cookies no iframe: não libera no chute. Usuário usa "Já fiz login"
      // depois de fechar o popup (com tempo mínimo de login).
      setAuthState("waiting_for_login");
      startSessionPoll();
      clearPostCloseTimer();
      postCloseTimerRef.current = setTimeout(() => {
        postCloseTimerRef.current = null;
        if (completingRef.current) {
          return;
        }
        clearSessionPoll();
        onClosed();
      }, POST_CLOSE_PROBE_MS);
    },
    [clearPostCloseTimer, clearSessionPoll, runSessionProbe, startSessionPoll],
  );

  const watchPopupClose = useCallback(
    (onClosed: () => void) => {
      clearPopupTimer();
      popupTimerRef.current = setInterval(() => {
        const popup = popupRef.current;
        if (isPopupOpen(popup)) {
          return;
        }

        clearPopupTimer();
        popupRef.current = null;
        void handlePopupClosed(onClosed);
      }, POPUP_POLL_MS);
    },
    [clearPopupTimer, handlePopupClosed],
  );

  const openLoginPopup = useCallback(
    (onClosed: () => void, watchOptions?: WatchLoginOptions) => {
      watchOptionsRef.current = watchOptions ?? null;
      completingRef.current = false;

      if (isPopupOpen(popupRef.current)) {
        popupRef.current.focus();
        loginPopupOpenedRef.current = true;
        if (popupOpenedAtRef.current === 0) {
          popupOpenedAtRef.current = Date.now();
        }
        setAuthState("waiting_for_login");
        if (watchOptions) {
          startLoginWatchers();
        }
        return true;
      }

      setAuthState("opening");
      setStatusMessage("");

      const targetUrl = watchOptions?.popupUrl ?? loginUrl;
      const popup = openCenteredPopup({
        url: targetUrl,
        name: SHIVER_POPUP_NAME,
        width: SHIVER_POPUP_DEFAULT_WIDTH,
        height: SHIVER_POPUP_DEFAULT_HEIGHT,
      });

      if (!popup) {
        popupRef.current = null;
        watchOptionsRef.current = null;
        setAuthState("popup_blocked");
        return false;
      }

      popupRef.current = popup;
      loginPopupOpenedRef.current = true;
      popupClosedRef.current = false;
      popupOpenedAtRef.current = Date.now();
      setAuthState("waiting_for_login");
      watchPopupClose(onClosed);
      if (watchOptions) {
        startLoginWatchers();
      }
      return true;
    },
    [loginUrl, startLoginWatchers, watchPopupClose],
  );

  const focusLoginPopup = useCallback(() => {
    if (isPopupOpen(popupRef.current)) {
      popupRef.current.focus();
      setAuthState("waiting_for_login");
    }
  }, []);

  /**
   * Liberação:
   * 1) sessão detectada no traderoom → libera;
   * 2) senão, só se o popup oficial foi aberto, ficou >= 15s e já foi fechado
   *    (login real costuma passar disso; abrir o card e clicar na hora não).
   */
  const confirmLoginDone = useCallback(
    async (watchOptions?: WatchLoginOptions): Promise<ConfirmLoginResult> => {
      const empty = {
        unlocked: false,
        sessionDetected: false,
        needsLoginPopup: false,
        needsClosePopup: false,
        needsMoreTime: false,
      };

      if (watchOptions) {
        watchOptionsRef.current = watchOptions;
      }

      const options = watchOptionsRef.current;
      if (!options?.traderoomUrl || completingRef.current) {
        return { ...empty, needsLoginPopup: true };
      }

      if (!loginPopupOpenedRef.current && !isPopupOpen(popupRef.current)) {
        return { ...empty, needsLoginPopup: true };
      }

      clearStatusTimer();
      clearPostCloseTimer();
      setAuthState("checking");

      probeInFlightRef.current = true;
      let sessionDetected = false;
      try {
        sessionDetected = await probeTraderoomSession(options.traderoomUrl);
      } finally {
        probeInFlightRef.current = false;
      }

      if (sessionDetected) {
        const unlocked = await finishValidated();
        return {
          unlocked,
          sessionDetected: true,
          needsLoginPopup: false,
          needsClosePopup: false,
          needsMoreTime: false,
        };
      }

      const stillOpen = isPopupOpen(popupRef.current);
      const duration = openDurationMs();
      const closed = popupClosedRef.current && !stillOpen;

      if (stillOpen) {
        setAuthState("waiting_for_login");
        return { ...empty, needsClosePopup: true };
      }

      if (!closed || duration < MIN_LOGIN_MS) {
        setAuthState("waiting_for_login");
        return { ...empty, needsMoreTime: true };
      }

      // Fluxo completo (abriu, tempo de login, fechou) com iframe sem cookies 3P.
      const unlocked = await finishValidated();
      return {
        unlocked,
        sessionDetected: false,
        needsLoginPopup: false,
        needsClosePopup: false,
        needsMoreTime: false,
      };
    },
    [clearPostCloseTimer, clearStatusTimer, finishValidated, openDurationMs],
  );

  const setReadyStatus = useCallback(
    (message: string) => {
      setAuthState("ready");
      setStatusMessage(message);
      scheduleStatusClear();
    },
    [scheduleStatusClear],
  );

  const setCheckingStatus = useCallback((message: string) => {
    setAuthState("checking");
    setStatusMessage(message);
  }, []);

  const setFailedStatus = useCallback(
    (message: string) => {
      setAuthState(loginPopupOpenedRef.current ? "waiting_for_login" : "idle");
      setStatusMessage(message);
      scheduleStatusClear();
    },
    [scheduleStatusClear],
  );

  const resetAuthUi = useCallback(() => {
    clearPopupTimer();
    clearStatusTimer();
    clearWatchers();
    closePopupSilently();
    watchOptionsRef.current = null;
    completingRef.current = false;
    loginPopupOpenedRef.current = false;
    popupOpenedAtRef.current = 0;
    popupClosedRef.current = false;
    setAuthState("idle");
    setStatusMessage("");
  }, [clearPopupTimer, clearStatusTimer, clearWatchers, closePopupSilently]);

  useEffect(() => {
    if (authState !== "waiting_for_login") {
      return;
    }

    const onReturn = () => {
      if (document.visibilityState !== "visible" || completingRef.current) {
        return;
      }
      void runSessionProbe();
    };

    document.addEventListener("visibilitychange", onReturn);
    window.addEventListener("focus", onReturn);
    return () => {
      document.removeEventListener("visibilitychange", onReturn);
      window.removeEventListener("focus", onReturn);
    };
  }, [authState, runSessionProbe]);

  useEffect(() => {
    return () => {
      clearPopupTimer();
      clearStatusTimer();
      clearWatchers();
      closePopupSilently();
    };
  }, [clearPopupTimer, clearStatusTimer, clearWatchers, closePopupSilently]);

  return {
    authState,
    statusMessage,
    openLoginPopup,
    focusLoginPopup,
    confirmLoginDone,
    finishValidated,
    setReadyStatus,
    setCheckingStatus,
    setFailedStatus,
    resetAuthUi,
    isWaitingForLogin:
      authState === "opening" ||
      authState === "waiting_for_login" ||
      authState === "checking",
  };
}
