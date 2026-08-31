"use strict";

(function shiverPopup(global) {
  function openCenteredPopup(url, name, width, height) {
    if (typeof window === "undefined") {
      return null;
    }

    const margin = 12;
    const maxWidth = Math.max(320, window.outerWidth - margin * 2);
    const maxHeight = Math.max(420, window.outerHeight - margin * 2);
    const popupWidth = Math.min(width || 520, maxWidth);
    const popupHeight = Math.min(height || 720, maxHeight);
    const left = Math.round(window.screenX + (window.outerWidth - popupWidth) / 2);
    const top = Math.round(window.screenY + (window.outerHeight - popupHeight) / 2);
    const features = [
      "width=" + popupWidth,
      "height=" + popupHeight,
      "left=" + left,
      "top=" + top,
      "resizable=yes",
      "scrollbars=yes",
    ].join(",");

    return window.open(url, name, features);
  }

  function isPopupOpen(popup) {
    return Boolean(popup && !popup.closed);
  }

  global.ShiverPopup = {
    openCenteredPopup,
    isPopupOpen,
    POPUP_NAME: "shiver-auth",
    DEFAULT_WIDTH: 520,
    DEFAULT_HEIGHT: 720,
    POPUP_POLL_MS: 500,
  };
})(window);
