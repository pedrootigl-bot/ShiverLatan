"use client";

import { useEffect } from "react";

export default function BfcacheHmr() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const onUnload = () => undefined;

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("unload", onUnload);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.removeEventListener("unload", onUnload);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
