"use client";

import { useCallback, useRef, useState } from "react";

const GUEST_BOUNCE_MS = 2500;
const LOGIN_GAP_MS = 3000;

export function useBrokerSession() {
  const [authed, setAuthed] = useState(false);
  const authedRef = useRef(false);
  const loadsRef = useRef(0);
  const lastAtRef = useRef(0);

  const lock = useCallback(() => {
    authedRef.current = false;
    setAuthed(false);
  }, []);

  const unlock = useCallback(() => {
    authedRef.current = true;
    setAuthed(true);
  }, []);

  const resetSession = useCallback(() => {
    loadsRef.current = 0;
    lastAtRef.current = 0;
    lock();
  }, [lock]);

  const markResume = useCallback(() => {
    loadsRef.current = 0;
    lastAtRef.current = 0;
    lock();
  }, [lock]);

  const onFrameLoad = () => {
    if (authedRef.current) {
      return;
    }

    loadsRef.current += 1;
    const loads = loadsRef.current;
    const now = Date.now();
    const gap = lastAtRef.current === 0 ? 0 : now - lastAtRef.current;
    lastAtRef.current = now;

    if (loads === 1) {
      lock();
      return;
    }

    if (gap < GUEST_BOUNCE_MS) {
      lock();
      return;
    }

    if (gap >= LOGIN_GAP_MS) {
      unlock();
    }
  };

  return { authed, onFrameLoad, resetSession, markResume };
}
