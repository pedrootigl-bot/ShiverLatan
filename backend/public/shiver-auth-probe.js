"use strict";

(function shiverAuthProbe(global) {
  var GUEST_BOUNCE_MS = 2500;
  var LOGIN_GAP_MS = 3000;
  var RELOAD_GAP_MS = 3200;
  var STABILITY_MS = 2800;
  var PROBE_TIMEOUT_MS = 45000;

  function probeTraderoomSession(traderoomUrl) {
    return new Promise(function (resolve) {
      var loads = 0;
      var lastAt = 0;
      var settled = false;
      var stabilityTimer = null;
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
        if (stabilityTimer !== null) {
          clearTimeout(stabilityTimer);
          stabilityTimer = null;
        }
        clearTimeout(timeout);
        iframe.remove();
        resolve(ok);
      }

      var timeout = setTimeout(function () {
        finish(false);
      }, PROBE_TIMEOUT_MS);

      iframe.onload = function () {
        loads += 1;
        var now = Date.now();
        var gap = lastAt === 0 ? 0 : now - lastAt;
        lastAt = now;

        if (stabilityTimer !== null) {
          clearTimeout(stabilityTimer);
          stabilityTimer = null;
        }

        if (loads >= 2 && gap < GUEST_BOUNCE_MS) {
          finish(false);
          return;
        }

        if (loads === 1) {
          setTimeout(function () {
            if (settled) {
              return;
            }
            var join = traderoomUrl.indexOf("?") >= 0 ? "&" : "?";
            iframe.src = traderoomUrl + join + "_probe=" + Date.now();
          }, RELOAD_GAP_MS);
          return;
        }

        if (gap >= LOGIN_GAP_MS) {
          var loadsAtCandidate = loads;
          stabilityTimer = setTimeout(function () {
            stabilityTimer = null;
            if (settled) {
              return;
            }
            finish(loads === loadsAtCandidate);
          }, STABILITY_MS);
          return;
        }

        finish(false);
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
    INTERVAL_MS: 4500,
  };
})(window);
