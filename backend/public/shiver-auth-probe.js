"use strict";

(function shiverAuthProbe(global) {
  var RELOAD_GAP_MS = 3200;
  var PROBE_TIMEOUT_MS = 45000;

  function probeTraderoomSession(traderoomUrl) {
    return new Promise(function (resolve) {
      var loads = 0;
      var settled = false;
      var iframe = document.createElement("iframe");

      iframe.setAttribute("aria-hidden", "true");
      iframe.tabIndex = -1;
      iframe.style.cssText =
        "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;border:0";

      function finish(ok) {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        iframe.remove();
        resolve(ok);
      }

      var timeout = setTimeout(function () {
        finish(false);
      }, PROBE_TIMEOUT_MS);

      iframe.onload = function () {
        loads += 1;
        if (loads === 1) {
          setTimeout(function () {
            var join = traderoomUrl.indexOf("?") >= 0 ? "&" : "?";
            iframe.src = traderoomUrl + join + "_probe=" + Date.now();
          }, RELOAD_GAP_MS);
          return;
        }
        finish(true);
      };

      iframe.onerror = function () {
        finish(false);
      };

      document.body.appendChild(iframe);
      iframe.src = traderoomUrl;
    });
  }

  global.ShiverAuthProbe = {
    probeTraderoomSession: probeTraderoomSession,
    PROBE_INTERVAL_MS: 4000,
  };
})(window);
