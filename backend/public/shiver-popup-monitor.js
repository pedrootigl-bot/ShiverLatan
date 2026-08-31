"use strict";

(function shiverPopupMonitor(global) {
  var TRADEROOM_PATH = /\/traderoom(?:\/|$|\?)/i;
  var DONE_PATH = /\/auth\/shiver-done(?:\.html)?(?:\/|$|\?)/i;

  function watchPopupForLogin(options) {
    var popup = options.popup;
    var traderoomPath = options.traderoomPath || TRADEROOM_PATH;
    var donePath = options.donePath || DONE_PATH;
    var intervalMs = options.intervalMs || 400;
    var onTraderoom = options.onTraderoom;
    var done = false;

    function finish() {
      if (done) {
        return;
      }
      done = true;
      clearInterval(timer);
      onTraderoom();
    }

    var timer = setInterval(function () {
      if (popup.closed) {
        clearInterval(timer);
        return;
      }

      var href = "";
      try {
        href = popup.location.href;
      } catch (_err) {
        // Cross-origin: não conclui.
        return;
      }

      if (!href || href === "about:blank") {
        return;
      }

      if (traderoomPath.test(href) || donePath.test(href)) {
        finish();
      }
    }, intervalMs);

    return function stop() {
      done = true;
      clearInterval(timer);
    };
  }

  function listenForAuthComplete(onComplete) {
    function handler(event) {
      var data = event.data;
      if (!data || typeof data !== "object") {
        return;
      }
      if (data.type !== "shiver-auth-complete") {
        return;
      }
      onComplete();
    }

    window.addEventListener("message", handler);
    return function stop() {
      window.removeEventListener("message", handler);
    };
  }

  function buildPopupLauncherUrl(backendOrigin, loginUrl) {
    var url = new URL("/auth/shiver-popup.html", backendOrigin);
    url.searchParams.set("login", loginUrl);
    return url.toString();
  }

  global.ShiverPopupMonitor = {
    watchPopupForLogin: watchPopupForLogin,
    listenForAuthComplete: listenForAuthComplete,
    buildPopupLauncherUrl: buildPopupLauncherUrl,
  };
})(window);
