"use strict";

(function authApp() {
  const VIEWS = {
    login: {
      paths: ["/login"],
      title: "Conectar conta",
      documentTitle: "Conectar conta — Shiver Broker",
    },
    register: {
      paths: ["/cadastro", "/register"],
      title: "Abrir uma conta",
      documentTitle: "Abrir uma conta — Shiver Broker",
    },
    forgot: {
      paths: ["/esqueci-senha", "/recuperar-senha"],
      title: "Esqueceu a senha?",
      documentTitle: "Recuperar senha — Shiver Broker",
      lead: "Informe o e-mail da sua conta. Enviaremos instruções para redefinir a senha na Shiver.",
    },
  };

  const result = document.getElementById("result");
  const pageTitle = document.getElementById("pageTitle");
  const pageLead = document.getElementById("pageLead");
  const dryRunInput = document.getElementById("dryRun");

  const openShiverLoginBtn = document.getElementById("openShiverLoginBtn");
  const connectClose = document.getElementById("connectClose");
  const loginActions = document.getElementById("loginActions");
  const focusPopupBtn = document.getElementById("focusPopupBtn");
  const doneLoginBtn = document.getElementById("doneLoginBtn");

  const registerForm = document.getElementById("registerForm");
  const forgotForm = document.getElementById("forgotForm");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const registerFirstName = document.getElementById("registerFirstName");
  const registerLastName = document.getElementById("registerLastName");
  const registerPhone = document.getElementById("registerPhone");
  const forgotEmail = document.getElementById("forgotEmail");

  let salaUrl = "http://localhost:3000/sala";
  let landingUrl = "http://localhost:3000";
  let shiverLoginUrl = "https://trade.shiverbroker.com/pt/login";
  let shiverTraderoomUrl = "https://trade.shiverbroker.com/pt/traderoom";
  let authId = null;
  let popupRef = null;
  let popupTimerRef = null;
  let sessionPollRef = null;
  let probeInFlight = false;
  let finishingAuth = false;
  let stopPopupMonitor = null;
  let stopMessageListener = null;
  let currentView = "login";
  let busy = false;

  function viewFromPath(pathname) {
    const path = pathname.replace(/\/+$/, "") || "/login";
    for (const [view, config] of Object.entries(VIEWS)) {
      if (config.paths.includes(path)) {
        return view;
      }
    }
    return "login";
  }

  function navigate(path, replace) {
    if (replace) {
      history.replaceState({ view: viewFromPath(path) }, "", path);
    } else {
      history.pushState({ view: viewFromPath(path) }, "", path);
    }
    renderView(viewFromPath(path));
  }

  function showResult(kind, title, detail) {
    result.className = kind;
    result.innerHTML = '<p class="title"></p><p class="detail"></p>';
    result.querySelector(".title").textContent = title;
    result.querySelector(".detail").textContent = detail;
  }

  function clearResult() {
    result.className = "";
    result.innerHTML = "";
  }

  function setLoginActionsVisible(visible) {
    if (loginActions) {
      loginActions.hidden = !visible;
    }
  }

  function setConnectButtonState(state) {
    if (!openShiverLoginBtn) {
      return;
    }

    if (state === "open") {
      openShiverLoginBtn.disabled = false;
      openShiverLoginBtn.innerHTML =
        '<span class="btn-connect__icon" aria-hidden="true">↗</span> Abrir login da corretora';
      return;
    }

    if (state === "waiting") {
      openShiverLoginBtn.disabled = true;
      openShiverLoginBtn.textContent = "Login aberto";
      return;
    }

    openShiverLoginBtn.disabled = false;
    openShiverLoginBtn.innerHTML =
      '<span class="btn-connect__icon" aria-hidden="true">↗</span> Abrir login da corretora';
  }

  function clearSessionPoll() {
    if (sessionPollRef !== null) {
      clearInterval(sessionPollRef);
      sessionPollRef = null;
    }
  }

  function clearWatchers() {
    if (typeof stopPopupMonitor === "function") {
      stopPopupMonitor();
    }
    stopPopupMonitor = null;
    if (typeof stopMessageListener === "function") {
      stopMessageListener();
    }
    stopMessageListener = null;
    clearSessionPoll();
  }

  async function runSessionProbe() {
    if (
      probeInFlight ||
      finishingAuth ||
      typeof ShiverSessionWatch === "undefined" ||
      !shiverTraderoomUrl
    ) {
      return;
    }

    probeInFlight = true;
    try {
      const ok = await ShiverSessionWatch.probeTraderoomSession(shiverTraderoomUrl);
      if (ok) {
        await finishAuthFlow(true);
      }
    } finally {
      probeInFlight = false;
    }
  }

  function startSessionPoll() {
    clearSessionPoll();
    if (typeof ShiverSessionWatch === "undefined") {
      return;
    }
    sessionPollRef = setInterval(function () {
      if (!ShiverPopup.isPopupOpen(popupRef) || finishingAuth) {
        return;
      }
      void runSessionProbe();
    }, ShiverSessionWatch.POLL_MS);
  }

  function popupLauncherUrl() {
    return shiverLoginUrl;
  }

  function startLoginWatchers() {
    clearWatchers();

    if (ShiverPopup.isPopupOpen(popupRef) && typeof ShiverPopupMonitor !== "undefined") {
      stopPopupMonitor = ShiverPopupMonitor.watchPopupForLogin({
        popup: popupRef,
        onTraderoom: function () {
          void finishAuthFlow(true);
        },
      });
    }

    if (typeof ShiverPopupMonitor !== "undefined") {
      stopMessageListener = ShiverPopupMonitor.listenForAuthComplete(function () {
        void finishAuthFlow(true);
      });
    }

    startSessionPoll();
    void runSessionProbe();
  }

  async function startAuthSession() {
    try {
      const response = await fetch("/api/auth/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        return null;
      }
      const json = await response.json();
      return typeof json.authId === "string" ? json.authId : null;
    } catch (_err) {
      return null;
    }
  }

  async function completeAuthSession() {
    if (!authId) {
      return false;
    }
    try {
      const response = await fetch("/api/auth/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authId: authId }),
      });
      if (!response.ok) {
        return false;
      }
      const json = await response.json();
      return json.success === true && json.status === "VALIDATED";
    } catch (_err) {
      return false;
    }
  }

  async function finishAuthFlow(validated) {
    if (finishingAuth) {
      return;
    }
    finishingAuth = true;
    clearPopupTimer();
    clearWatchers();

    if (ShiverPopup.isPopupOpen(popupRef)) {
      popupRef.close();
    }
    popupRef = null;

    setConnectButtonState("open");
    setLoginActionsVisible(false);

    if (validated) {
      showResult("is-wait", "Validando login…", "Confirmando sua sessão na Shiver.");
      await completeAuthSession();
      showResult("is-ok", "Login confirmado", "Abrindo a sala de sinais…");
      goToSala();
      return;
    }

    finishingAuth = false;
  }

  function clearPopupTimer() {
    if (popupTimerRef !== null) {
      clearInterval(popupTimerRef);
      popupTimerRef = null;
    }
  }

  function watchPopupClose() {
    clearPopupTimer();
    popupTimerRef = setInterval(function () {
      if (ShiverPopup.isPopupOpen(popupRef)) {
        return;
      }

      clearPopupTimer();
      clearWatchers();
      popupRef = null;

      void (async function () {
        if (typeof ShiverSessionWatch !== "undefined" && shiverTraderoomUrl) {
          const ok = await ShiverSessionWatch.probeTraderoomSession(shiverTraderoomUrl);
          if (ok) {
            await finishAuthFlow(true);
            return;
          }
        }
        setConnectButtonState("open");
        setLoginActionsVisible(true);
        showResult(
          "is-ok",
          "Janela fechada",
          "Se você concluiu o login na Shiver, clique em Já fiz login para abrir a sala.",
        );
      })();
    }, ShiverPopup.POPUP_POLL_MS);
  }

  async function openOfficialLoginPopup() {
    if (ShiverPopup.isPopupOpen(popupRef)) {
      popupRef.focus();
      return true;
    }

    finishingAuth = false;
    authId = await startAuthSession();

    popupRef = ShiverPopup.openCenteredPopup(
      popupLauncherUrl(),
      ShiverPopup.POPUP_NAME,
      ShiverPopup.DEFAULT_WIDTH,
      ShiverPopup.DEFAULT_HEIGHT,
    );

    if (!ShiverPopup.isPopupOpen(popupRef)) {
      popupRef = null;
      authId = null;
      showResult(
        "is-err",
        "Popup bloqueado",
        "Permita pop-ups neste site para abrir o login oficial da Shiver.",
      );
      return false;
    }

    clearResult();
    setConnectButtonState("waiting");
    setLoginActionsVisible(true);
    watchPopupClose();
    startLoginWatchers();
    return true;
  }

  function focusOfficialLoginPopup() {
    if (ShiverPopup.isPopupOpen(popupRef)) {
      popupRef.focus();
      return;
    }
    openOfficialLoginPopup();
  }

  function goToSala() {
    if (ShiverPopup.isPopupOpen(popupRef)) {
      popupRef.close();
    }
    clearPopupTimer();
    clearWatchers();
    popupRef = null;

    const target = new URL(salaUrl, window.location.origin);
    target.searchParams.set("fromAuth", "1");
    window.location.href = target.toString();
  }

  async function handleDoneLogin() {
    await finishAuthFlow(true);
  }

  async function loadConfig() {
    try {
      const response = await fetch("/api/config");
      if (!response.ok) {
        return;
      }
      const json = await response.json();
      if (typeof json.salaUrl === "string" && json.salaUrl.trim()) {
        salaUrl = json.salaUrl.trim();
      }
      if (typeof json.landingUrl === "string" && json.landingUrl.trim()) {
        landingUrl = json.landingUrl.trim();
      }
      if (typeof json.shiverLoginUrl === "string" && json.shiverLoginUrl.trim()) {
        shiverLoginUrl = json.shiverLoginUrl.trim();
      }
      if (typeof json.shiverTraderoomUrl === "string" && json.shiverTraderoomUrl.trim()) {
        shiverTraderoomUrl = json.shiverTraderoomUrl.trim();
      }
    } catch (_err) {
      // Mantém padrões locais.
    }
  }

  function humanTitle(success, status, action) {
    switch (status) {
      case "SIMULATED":
        if (action === "register") return "Simulação de cadastro funcionou";
        return "Simulação de recuperação funcionou";
      case "CREATED":
        return "Conta criada na Shiver";
      case "RESET_EMAIL_SENT":
        return "E-mail de recuperação enviado";
      case "ALREADY_EXISTS":
        return "E-mail já cadastrado na Shiver";
      case "NOT_FOUND":
        return "E-mail não encontrado na Shiver";
      case "VALIDATION_ERROR":
        return "Dados inválidos";
      case "TIMEOUT":
        return "Tempo esgotado";
      case "AUTOMATION_ERROR":
        return "Erro na automação";
      default:
        return success ? "Concluído" : "Não funcionou";
    }
  }

  function validateEmail(email) {
    if (!email) return "Informe o e-mail.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido.";
    return "";
  }

  function normalizePhone(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function validateRegister() {
    const firstName = String(registerFirstName.value || "").trim();
    const lastName = String(registerLastName.value || "").trim();
    const email = String(registerEmail.value || "").trim();
    const phone = normalizePhone(registerPhone.value);
    const password = String(registerPassword.value || "");

    if (!firstName) return "Informe o nome.";
    if (!lastName) return "Informe o sobrenome.";
    const emailError = validateEmail(email);
    if (emailError) return emailError;
    if (!phone) return "Informe o número de telefone.";
    if (phone.length < 10 || phone.length > 15) {
      return "Número de telefone inválido.";
    }
    if (!password) return "Informe a senha.";
    return "";
  }

  function validateForgot() {
    return validateEmail(String(forgotEmail.value || "").trim());
  }

  function setBusy(nextBusy, submitButton, busyLabel) {
    busy = nextBusy;
    const controls = document.querySelectorAll("button, a.text-link, input:not(#dryRun)");
    controls.forEach(function (el) {
      if (el.id === "openShiverLoginBtn" && currentView === "login") {
        return;
      }
      if (el.tagName === "A") {
        el.style.pointerEvents = busy ? "none" : "";
        el.style.opacity = busy ? "0.65" : "";
        el.setAttribute("aria-disabled", busy ? "true" : "false");
        return;
      }
      el.disabled = busy;
    });

    if (submitButton) {
      if (!busy) {
        renderView(currentView);
        return;
      }
      submitButton.textContent = busyLabel;
    }
  }

  async function callApi(endpoint, body, action) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, dryRun: dryRunInput.checked }),
    });
    const json = await response.json();
    const shiver = json.shiver || {};
    const status = shiver.status || json.status || "UNKNOWN";
    const message = shiver.message || json.message || "";
    const detail = [
      message,
      body.dryRun && status === "SIMULATED" ? "Nada foi enviado à Shiver." : "",
      shiver.url ? "URL: " + shiver.url : "",
      "Status técnico: " + status,
    ]
      .filter(Boolean)
      .join("\n");

    showResult(
      json.success ? "is-ok" : "is-err",
      humanTitle(json.success, status, action),
      detail,
    );

    return json;
  }

  async function handleRegister(event) {
    event.preventDefault();
    clearResult();
    const error = validateRegister();
    if (error) {
      showResult("is-err", "Dados inválidos", error);
      return;
    }

    const submit = registerForm.querySelector(".btn-primary");
    setBusy(true, submit, "Enviando…");
    showResult("is-wait", "Processando…", "Abrindo o cadastro da Shiver. Aguarde.");

    try {
      await callApi(
        "/api/register",
        {
          firstName: String(registerFirstName.value || "").trim(),
          lastName: String(registerLastName.value || "").trim(),
          email: String(registerEmail.value || "").trim(),
          password: String(registerPassword.value || ""),
          phone: normalizePhone(registerPhone.value),
          dryRun: dryRunInput.checked,
        },
        "register",
      );
    } catch (err) {
      showResult("is-err", "Não foi possível falar com o backend", err.message || String(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleForgot(event) {
    event.preventDefault();
    clearResult();
    const error = validateForgot();
    if (error) {
      showResult("is-err", "Dados inválidos", error);
      return;
    }

    const submit = forgotForm.querySelector(".btn-primary");
    setBusy(true, submit, "Enviando…");
    showResult("is-wait", "Processando…", "Abrindo a recuperação de senha na Shiver. Aguarde.");

    try {
      await callApi(
        "/api/forgot-password",
        {
          email: String(forgotEmail.value || "").trim(),
          dryRun: dryRunInput.checked,
        },
        "forgot",
      );
    } catch (err) {
      showResult("is-err", "Não foi possível falar com o backend", err.message || String(err));
    } finally {
      setBusy(false);
    }
  }

  function renderView(view) {
    currentView = view;
    const config = VIEWS[view];

    document.title = config.documentTitle;

    if (view === "login") {
      pageTitle.hidden = true;
      pageLead.hidden = true;
    } else {
      pageTitle.hidden = false;
      pageTitle.textContent = config.title;
      if (config.lead) {
        pageLead.textContent = config.lead;
        pageLead.hidden = false;
      } else {
        pageLead.textContent = "";
        pageLead.hidden = true;
      }
    }

    document.querySelectorAll(".auth-view").forEach(function (panel) {
      panel.classList.toggle("is-active", panel.dataset.view === view);
    });

    if (!busy) {
      const submit = document.querySelector("#" + view + "Form .btn-primary");
      if (submit) {
        if (view === "register") submit.textContent = "Abrir uma conta gratis";
        if (view === "forgot") submit.textContent = "Enviar";
      }
    }
  }

  function bindInternalLinks() {
    document.addEventListener("click", function (event) {
      const link = event.target.closest("[data-nav]");
      if (!link || busy) return;
      event.preventDefault();
      const target = link.getAttribute("data-nav");
      if (target) navigate(target);
    });

    window.addEventListener("popstate", function () {
      renderView(viewFromPath(window.location.pathname));
    });
  }

  if (openShiverLoginBtn) {
    openShiverLoginBtn.addEventListener("click", openOfficialLoginPopup);
  }

  if (focusPopupBtn) {
    focusPopupBtn.addEventListener("click", focusOfficialLoginPopup);
  }

  if (doneLoginBtn) {
    doneLoginBtn.addEventListener("click", function () {
      void handleDoneLogin();
    });
  }

  if (connectClose) {
    connectClose.addEventListener("click", function () {
      window.location.href = landingUrl;
    });
  }

  registerForm.addEventListener("submit", handleRegister);
  forgotForm.addEventListener("submit", handleForgot);

  window.addEventListener("beforeunload", function () {
    clearPopupTimer();
    clearWatchers();
  });

  bindInternalLinks();

  loadConfig().finally(function () {
    const initial = viewFromPath(window.location.pathname);
    if (window.location.pathname.endsWith(".html")) {
      navigate(VIEWS[initial].paths[0], true);
    } else {
      renderView(initial);
    }
  });
})();
