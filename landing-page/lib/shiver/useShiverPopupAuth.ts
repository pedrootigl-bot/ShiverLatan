"use strict";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SHIVER_POPUP_DEFAULT_HEIGHT,
  SHIVER_POPUP_DEFAULT_WIDTH,
  SHIVER_POPUP_NAME,
} from "@/config/shiver";
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

const POPUP_POLL_MS = 500;
const STATUS_CLEAR_MS = 4000;
const SESSION_POLL_MS = 4500;

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
  const probeInFlightRef = useRef(false);
  const completingRef = useRef(false);
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

  const clearWatchers = useCallback(() => {
    stopPopupMonitorRef.current?.();
    stopPopupMonitorRef.current = null;
    stopMessageListenerRef.current?.();
    stopMessageListenerRef.current = null;
    clearSessionPoll();
  }, [clearSessionPoll]);

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
      return true;
    } finally {
      completingRef.current = false;
    }
  }, [clearPopupTimer, clearWatchers]);

  const tryCompleteSession = useCallback(() => {
    const options = watchOptionsRef.current;
    if (!options?.isSessionReady?.()) {
      return false;
    }
    void finishValidated();
    return true;
  }, [finishValidated]);

  const runSessionProbe = useCallback(async () => {
    const options = watchOptionsRef.current;
    if (!options?.traderoomUrl || probeInFlightRef.current || completingRef.current) {
      return;
    }

    probeInFlightRef.current = true;
    try {
      const { probeTraderoomSession } = await import("@/lib/shiver/authProbe");
      const ok = await probeTraderoomSession(options.traderoomUrl);
      if (ok) {
        await finishValidated();
      }
    } finally {
      probeInFlightRef.current = false;
    }
  }, [finishValidated]);

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

    const options = watchOptionsRef.current;
    options?.onReloadSession?.();

    if (options?.traderoomUrl || options?.isSessionReady) {
      void runSessionProbe();
      sessionPollRef.current = setInterval(() => {
        if (!isPopupOpen(popupRef.current) || completingRef.current) {
          return;
        }
        if (tryCompleteSession()) {
          return;
        }
        if (options.traderoomUrl) {
          void runSessionProbe();
        }
      }, SESSION_POLL_MS);
    }
  }, [clearWatchers, finishValidated, runSessionProbe, tryCompleteSession]);

  const beginPopupClose = useCallback(
    (onClosed: () => void) => {
      clearPopupTimer();
      clearWatchers();
      popupRef.current = null;
      setAuthState("checking");
      onClosed();
    },
    [clearPopupTimer, clearWatchers],
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
        clearWatchers();
        popupRef.current = null;

        void (async () => {
          const options = watchOptionsRef.current;
          options?.onReloadSession?.();
          if (tryCompleteSession()) {
            return;
          }
          if (
            options?.traderoomUrl &&
            typeof options.onValidated === "function"
          ) {
            const { probeTraderoomSession } = await import("@/lib/shiver/authProbe");
            const ok = await probeTraderoomSession(options.traderoomUrl);
            if (ok) {
              await finishValidated();
              return;
            }
          }
          beginPopupClose(onClosed);
        })();
      }, POPUP_POLL_MS);
    },
    [beginPopupClose, clearPopupTimer, clearWatchers, finishValidated, tryCompleteSession],
  );

  const openLoginPopup = useCallback(
    (onClosed: () => void, watchOptions?: WatchLoginOptions) => {
      watchOptionsRef.current = watchOptions ?? null;
      completingRef.current = false;

      if (isPopupOpen(popupRef.current)) {
        popupRef.current.focus();
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

  const confirmLoginDone = useCallback(
    (_onClosed: () => void) => {
      void finishValidated();
    },
    [finishValidated],
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

  const resetAuthUi = useCallback(() => {
    clearPopupTimer();
    clearStatusTimer();
    clearWatchers();
    closePopupSilently();
    watchOptionsRef.current = null;
    completingRef.current = false;
    setAuthState("idle");
    setStatusMessage("");
  }, [clearPopupTimer, clearStatusTimer, clearWatchers, closePopupSilently]);

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
    resetAuthUi,
    isWaitingForLogin:
      authState === "opening" ||
      authState === "waiting_for_login" ||
      authState === "checking",
  };
}
