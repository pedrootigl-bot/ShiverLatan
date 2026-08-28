"use strict";

(function authApp() {
  const VIEWS = {
    login: {
      paths: ["/login"],
      title: "Entrar",
      documentTitle: "Entrar — Shiver Broker",
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

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotForm = document.getElementById("forgotForm");

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const registerFirstName = document.getElementById("registerFirstName");
  const registerLastName = document.getElementById("registerLastName");
  const registerPhone = document.getElementById("registerPhone");
  const forgotEmail = document.getElementById("forgotEmail");

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

  function sharedEmail() {
    return (
      String(loginEmail.value || registerEmail.value || forgotEmail.value || "").trim()
    );
  }

  function syncEmailInputs(value) {
    if (loginEmail) loginEmail.value = value;
    if (registerEmail) registerEmail.value = value;
    if (forgotEmail) forgotEmail.value = value;
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

  function humanTitle(success, status, action) {
    switch (status) {
      case "SIMULATED":
        if (action === "login") return "Simulação de login funcionou";
        if (action === "register") return "Simulação de cadastro funcionou";
        return "Simulação de recuperação funcionou";
      case "CREATED":
        return "Conta criada na Shiver";
      case "LOGGED_IN":
        return "Login realizado na Shiver";
      case "RESET_EMAIL_SENT":
        return "E-mail de recuperação enviado";
      case "ALREADY_EXISTS":
        return "E-mail já cadastrado na Shiver";
      case "NOT_FOUND":
        return "E-mail não encontrado na Shiver";
      case "INVALID_CREDENTIALS":
        return "E-mail ou senha inválidos";
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

  function validateLogin() {
    const email = String(loginEmail.value || "").trim();
    const password = String(loginPassword.value || "");
    const emailError = validateEmail(email);
    if (emailError) return emailError;
    if (!password) return "Informe a senha.";
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
    controls.forEach((el) => {
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
  }

  async function handleLogin(event) {
    event.preventDefault();
    clearResult();
    const error = validateLogin();
    if (error) {
      showResult("is-err", "Dados inválidos", error);
      return;
    }

    const submit = loginForm.querySelector(".btn-primary");
    setBusy(true, submit, "Entrando…");
    showResult("is-wait", "Processando…", "Abrindo o login da Shiver. Aguarde.");

    try {
      await callApi(
        "/api/login",
        {
          email: String(loginEmail.value || "").trim(),
          password: String(loginPassword.value || ""),
          dryRun: dryRunInput.checked,
        },
        "login",
      );
    } catch (err) {
      showResult("is-err", "Não foi possível falar com o backend", err.message || String(err));
    } finally {
      setBusy(false);
    }
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
    pageTitle.textContent = config.title;

    if (config.lead) {
      pageLead.textContent = config.lead;
      pageLead.hidden = false;
    } else {
      pageLead.textContent = "";
      pageLead.hidden = true;
    }

    document.querySelectorAll(".auth-view").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.view === view);
    });

    if (!busy) {
      const submit = document.querySelector(`#${view}Form .btn-primary`);
      if (submit) {
        if (view === "login") submit.textContent = "Entrar";
        if (view === "register") submit.textContent = "Abrir uma conta gratis";
        if (view === "forgot") submit.textContent = "Enviar";
      }
    }

    const email = sharedEmail();
    if (email) syncEmailInputs(email);
  }

  function bindInternalLinks() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("[data-nav]");
      if (!link || busy) return;
      event.preventDefault();
      const target = link.getAttribute("data-nav");
      if (target) navigate(target);
    });

    window.addEventListener("popstate", () => {
      renderView(viewFromPath(window.location.pathname));
    });
  }

  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);
  forgotForm.addEventListener("submit", handleForgot);

  bindInternalLinks();

  const initial = viewFromPath(window.location.pathname);
  if (window.location.pathname.endsWith(".html")) {
    navigate(VIEWS[initial].paths[0], true);
  } else {
    renderView(initial);
  }
})();
