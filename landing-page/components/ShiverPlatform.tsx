"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { shiverLoginUrl } from "@/config/shiver";
import { completeBackendAuthSession, shiverPopupLauncherUrl, startBackendAuthSession } from "@/lib/shiver/backendAuth";
import { useShiverPopupAuth } from "@/lib/shiver/useShiverPopupAuth";
import {
  BROKER_BACKEND_AUTH_KEY,
  BROKER_BACKEND_AUTH_RELOAD_KEY,
  BROKER_SESSION_WAIT_KEY,
} from "@/lib/sala";

const AWAY_MS = 4000;

const AUTH_RELOAD_GAP_MS = 3200;

export default function ShiverPlatform({
  src,
  authed,
  resumeOnReturn,
  onFrameLoad,
  onFrameReset,
  onResume,
  onAuthSuccess,
}: {
  src: string;
  authed: boolean;
  resumeOnReturn: boolean;
  onFrameLoad: () => void;
  onFrameReset: () => void;
  onResume: () => void;
  onAuthSuccess?: () => void;
}) {
  const { locale, t } = useI18n();
  const loginUrl = shiverLoginUrl(locale);
  const [loaded, setLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [showCookieHint, setShowCookieHint] = useState(false);
  const [pendingAuthCheck, setPendingAuthCheck] = useState(false);
  const hiddenAtRef = useRef(0);
  const authReloadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const authReloadsPendingRef = useRef(0);
  const backendAuthIdRef = useRef<string | null>(null);

  const reloadIframe = useCallback(
    (options?: { resetSession?: boolean; showLoading?: boolean }) => {
      const resetSession = options?.resetSession ?? true;
      const showLoading = options?.showLoading ?? true;
      if (showLoading) {
        setLoaded(false);
      }
      if (resetSession) {
        onResume();
      }
      setIframeKey((current) => current + 1);
    },
    [onResume],
  );

  const clearAuthReloadTimer = useCallback(() => {
    if (authReloadTimerRef.current !== null) {
      clearTimeout(authReloadTimerRef.current);
      authReloadTimerRef.current = null;
    }
  }, []);

  const authedRef = useRef(authed);
  useEffect(() => {
    authedRef.current = authed;
  }, [authed]);

  const {
    authState,
    statusMessage,
    openLoginPopup,
    focusLoginPopup,
    confirmLoginDone,
    setReadyStatus,
    setCheckingStatus,
    setFailedStatus,
    isWaitingForLogin,
  } = useShiverPopupAuth(loginUrl);

  const refreshSessionAfterAuth = useCallback(() => {
    clearAuthReloadTimer();
    setPendingAuthCheck(true);
    setShowCookieHint(false);
    authReloadsPendingRef.current = 2;
    setCheckingStatus(t.sala.authChecking);
    reloadIframe({ resetSession: false, showLoading: true });
    authReloadTimerRef.current = setTimeout(() => {
      authReloadTimerRef.current = null;
      reloadIframe({ resetSession: false, showLoading: false });
    }, AUTH_RELOAD_GAP_MS);
    setReadyStatus(t.sala.authUpdated);
  }, [
    clearAuthReloadTimer,
    reloadIframe,
    setCheckingStatus,
    setReadyStatus,
    t.sala.authChecking,
    t.sala.authUpdated,
  ]);

  const handleAuthValidated = useCallback(async () => {
    setShowCookieHint(false);
    setCheckingStatus(t.sala.authChecking);
    await completeBackendAuthSession(backendAuthIdRef.current);
    window.sessionStorage.setItem(BROKER_BACKEND_AUTH_KEY, "1");
    window.sessionStorage.setItem(BROKER_BACKEND_AUTH_RELOAD_KEY, "1");
    onAuthSuccess?.();
    refreshSessionAfterAuth();
  }, [
    onAuthSuccess,
    refreshSessionAfterAuth,
    setCheckingStatus,
    t.sala.authChecking,
  ]);

  const handleAuthFlowComplete = useCallback(() => {
    setShowCookieHint(false);
    refreshSessionAfterAuth();
  }, [refreshSessionAfterAuth]);

  const handleConnect = useCallback(() => {
    setShowCookieHint(false);
    // Zera heurística antiga do iframe para não liberar sem login.
    onResume();
    void (async () => {
      backendAuthIdRef.current = await startBackendAuthSession();
      openLoginPopup(handleAuthFlowComplete, {
        traderoomUrl: src,
        popupUrl: shiverPopupLauncherUrl(loginUrl),
        onValidated: handleAuthValidated,
        onReloadSession: () => reloadIframe({ resetSession: false, showLoading: false }),
        isSessionReady: () => authedRef.current,
      });
    })();
  }, [
    handleAuthFlowComplete,
    handleAuthValidated,
    loginUrl,
    onResume,
    openLoginPopup,
    reloadIframe,
    src,
  ]);

  const handleAlreadyLoggedIn = useCallback(() => {
    void (async () => {
      setShowCookieHint(false);
      setCheckingStatus(t.sala.authChecking);

      if (!backendAuthIdRef.current) {
        backendAuthIdRef.current = await startBackendAuthSession();
      }

      const result = await confirmLoginDone({
        traderoomUrl: src,
        onValidated: handleAuthValidated,
        onReloadSession: () =>
          reloadIframe({ resetSession: false, showLoading: false }),
        isSessionReady: () => authedRef.current,
      });

      if (!result.unlocked) {
        const message = result.needsLoginPopup
          ? t.sala.authOpenLoginFirst
          : result.needsClosePopup
            ? t.sala.authClosePopupFirst
            : result.needsMoreTime
              ? t.sala.authNeedMoreTime
              : t.sala.authNotLoggedIn;
        setFailedStatus(message);
        return;
      }

      if (!result.sessionDetected) {
        setShowCookieHint(true);
      }
    })();
  }, [
    confirmLoginDone,
    handleAuthValidated,
    reloadIframe,
    setCheckingStatus,
    setFailedStatus,
    src,
    t.sala.authChecking,
    t.sala.authClosePopupFirst,
    t.sala.authNeedMoreTime,
    t.sala.authNotLoggedIn,
    t.sala.authOpenLoginFirst,
  ]);

  const handleTryAgain = useCallback(() => {
    setShowCookieHint(false);
    setCheckingStatus(t.sala.authUpdating);
    refreshSessionAfterAuth();
  }, [refreshSessionAfterAuth, setCheckingStatus, t.sala.authUpdating]);

  useEffect(() => {
    if (window.sessionStorage.getItem(BROKER_BACKEND_AUTH_RELOAD_KEY) !== "1") {
      return;
    }
    window.sessionStorage.removeItem(BROKER_BACKEND_AUTH_RELOAD_KEY);
    refreshSessionAfterAuth();
  }, [refreshSessionAfterAuth]);

  useEffect(() => {
    setLoaded(false);
    onFrameReset();
  }, [src, onFrameReset]);

  useEffect(() => {
    if (!pendingAuthCheck) {
      return;
    }
    if (!loaded) {
      return;
    }
    if (authReloadsPendingRef.current > 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (authed) {
        setPendingAuthCheck(false);
        setShowCookieHint(false);
        return;
      }
      setPendingAuthCheck(false);
      setShowCookieHint(true);
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [authed, iframeKey, loaded, pendingAuthCheck]);

  useEffect(() => {
    return () => {
      clearAuthReloadTimer();
    };
  }, [clearAuthReloadTimer]);

  useEffect(() => {
    if (!resumeOnReturn) {
      hiddenAtRef.current = 0;
      return;
    }

    if (document.visibilityState === "hidden") {
      hiddenAtRef.current = Date.now();
    }

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        hiddenAtRef.current = Date.now();
        return;
      }

      const awaitingBroker = window.sessionStorage.getItem(BROKER_SESSION_WAIT_KEY) === "1";
      const awayMs = hiddenAtRef.current === 0 ? 0 : Date.now() - hiddenAtRef.current;
      hiddenAtRef.current = 0;

      if (!awaitingBroker && awayMs < AWAY_MS) {
        return;
      }

      if (awaitingBroker) {
        window.sessionStorage.removeItem(BROKER_SESSION_WAIT_KEY);
      }

      reloadIframe();
    };

    const onFocus = () => {
      if (document.visibilityState !== "visible") {
        return;
      }
      onVisibility();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener("pageshow", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pageshow", onVisibility);
    };
  }, [reloadIframe, resumeOnReturn]);

  const primaryLabel =
    authState === "waiting_for_login" || authState === "checking"
      ? t.sala.authLoginOpen
      : t.sala.authConnect;

  const primaryDisabled = authState === "opening" || authState === "checking";

  const showAuthBar =
    !authed ||
    showCookieHint ||
    authState === "opening" ||
    authState === "waiting_for_login" ||
    authState === "checking" ||
    authState === "popup_blocked";

  return (
    <section className="sala-modal" aria-label={t.sala.roomAria}>
      <div className="shiver-platform">
        <header className="sala-modal__bar sala-modal__bar--auth">
          <div className="sala-modal__copy">
            <p>{t.sala.roomTitle}</p>
            <span>{t.sala.roomSubtitle}</span>
          </div>

          {showAuthBar ? (
            <div className="shiver-platform__auth" aria-live="polite">
              <div className="shiver-platform__actions">
                {authState === "popup_blocked" ? (
                  <p className="shiver-platform__alert" role="status">
                    {t.sala.authPopupBlocked}
                  </p>
                ) : null}

                <button
                  type="button"
                  className="shiver-platform__btn shiver-platform__btn--primary"
                  disabled={primaryDisabled}
                  onClick={
                    isWaitingForLogin && authState !== "popup_blocked"
                      ? focusLoginPopup
                      : handleConnect
                  }
                >
                  {primaryLabel}
                </button>

                <button
                  type="button"
                  className="shiver-platform__btn shiver-platform__btn--secondary"
                  disabled={authState === "opening" || authState === "checking"}
                  onClick={handleAlreadyLoggedIn}
                >
                  {t.sala.authAlreadyDone}
                </button>

                {authState === "waiting_for_login" ? (
                  <button
                    type="button"
                    className="shiver-platform__btn shiver-platform__btn--ghost"
                    onClick={focusLoginPopup}
                  >
                    {t.sala.authBackToLogin}
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </header>

        {showAuthBar ? (
          <div className="shiver-platform__meta" aria-live="polite">
            {statusMessage ? (
              <p className="shiver-platform__status" role="status">
                {statusMessage}
              </p>
            ) : null}

            {authState === "waiting_for_login" && !statusMessage ? (
              <p className="shiver-platform__status" role="status">
                {t.sala.authWaitingAuto}
              </p>
            ) : null}

            {showCookieHint ? (
              <div className="shiver-platform__hint">
                <p>{t.sala.authCookieHint}</p>
                <button
                  type="button"
                  className="shiver-platform__btn shiver-platform__btn--ghost"
                  onClick={handleTryAgain}
                >
                  {t.sala.authTryAgain}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="sala-modal__frame">
        {loaded ? null : (
          <div className="sala-modal__wait" aria-hidden>
            <p>{t.sala.opening}</p>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                window.sessionStorage.setItem(BROKER_SESSION_WAIT_KEY, "1");
              }}
            >
              {t.sala.openTab}
            </a>
          </div>
        )}
        <iframe
          key={`${src}-${iframeKey}`}
          title={t.sala.roomTitle}
          src={src}
          allow="clipboard-read; clipboard-write; fullscreen; payment"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => {
            setLoaded(true);
            onFrameLoad();
            if (authReloadsPendingRef.current > 0) {
              authReloadsPendingRef.current -= 1;
            }
          }}
        />
      </div>
      </div>
    </section>
  );
}
