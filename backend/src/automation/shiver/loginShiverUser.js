"use strict";

require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const { launchShiverBrowser, waitForShiverApp, waitForLoginForm } = require("./launchShiverBrowser");
const { SHIVER_SELECTORS } = require("./shiverSelectors");

const SCREENSHOTS_DIR = path.resolve(__dirname, "../../../screenshots");

function log(message) {
  console.log(`[SHIVER] ${message}`);
}

function timeoutMs() {
  const parsed = Number(process.env.SHIVER_TIMEOUT_MS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 45000;
}

function result(status, message, extra = {}) {
  return {
    success: status === "LOGGED_IN" || status === "SIMULATED",
    status,
    message,
    ...extra,
  };
}

async function saveErrorScreenshot(page) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  const filePath = path.join(SCREENSHOTS_DIR, `shiver-login-error-${Date.now()}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}

async function dismissCookies(page) {
  for (const name of SHIVER_SELECTORS.cookieAcceptNames) {
    const button = page.getByRole("button", { name });
    if (await button.first().isVisible().catch(() => false)) {
      await button.first().click();
      return;
    }
  }
}

function locatorFromStrategy(page, strategy) {
  const parts = [];
  for (const fieldName of strategy.names || []) {
    parts.push(page.locator(`input[name="${fieldName}"]`));
  }
  for (const placeholder of strategy.placeholders || []) {
    parts.push(page.getByPlaceholder(placeholder));
  }
  for (const type of strategy.types || []) {
    parts.push(page.locator(`input[type="${type}"]`));
  }
  for (const label of strategy.labels || []) {
    parts.push(page.getByLabel(label));
  }

  if (parts.length === 0) {
    return page.locator("[data-shiver-unconfirmed='true']");
  }

  return parts.reduce((acc, current) => acc.or(current));
}

async function fillIfPresent(page, strategy, value, label) {
  const locator = locatorFromStrategy(page, strategy).first();
  const visible = await locator.isVisible({ timeout: 2500 }).catch(() => false);
  if (!visible) {
    return false;
  }
  log(`Preenchendo ${label}`);
  await locator.fill(value);
  return true;
}

async function clickLoginSubmit(page) {
  let submit = page.getByRole("button", { name: SHIVER_SELECTORS.loginSubmitNames[0] });
  for (const name of SHIVER_SELECTORS.loginSubmitNames) {
    submit = submit.or(page.getByRole("button", { name }));
  }
  submit = submit.or(page.locator("button[type='submit']"));

  const visible = await submit.first().isVisible({ timeout: 4000 }).catch(() => false);
  if (!visible) {
    throw Object.assign(new Error("Botão Entrar não foi encontrado no login da Shiver."), {
      code: "VALIDATION_ERROR",
    });
  }

  log("Enviando login");
  await submit.first().click();
}

async function readVisibleText(page) {
  return page.locator("body").innerText().catch(() => "");
}

async function detectLoginOutcome(page, startedAtUrl) {
  log("Validando resposta do login");
  const wait = Math.min(timeoutMs(), 25000);

  await Promise.race([
    page.waitForURL(SHIVER_SELECTORS.successUrlPattern, { timeout: wait }).catch(() => null),
    page
      .getByText(SHIVER_SELECTORS.invalidCredentialsPattern)
      .first()
      .waitFor({ state: "visible", timeout: wait })
      .catch(() => null),
    page.waitForTimeout(8000),
  ]);

  const url = page.url();
  const text = await readVisibleText(page);

  if (SHIVER_SELECTORS.invalidCredentialsPattern.test(text)) {
    return result("INVALID_CREDENTIALS", "E-mail ou senha inválidos na Shiver.", { url });
  }

  if (SHIVER_SELECTORS.successUrlPattern.test(url) && url !== startedAtUrl) {
    log("Login concluído");
    return result("LOGGED_IN", "Login realizado na Shiver.", { url });
  }

  if (url !== startedAtUrl && !/\/login(?:[/?#]|$)/i.test(url)) {
    log("Login concluído");
    return result("LOGGED_IN", "Login realizado na Shiver.", { url });
  }

  if (SHIVER_SELECTORS.validationPattern.test(text) && /\/login/i.test(url)) {
    return result("VALIDATION_ERROR", "A Shiver recusou o formulário de login.", { url });
  }

  return result("TIMEOUT", "Não foi possível confirmar o resultado do login na Shiver.", { url });
}

async function loginShiverUser({ email, password, dryRun = false }) {
  const browser = await launchShiverBrowser();
  const context = await browser.newContext({
    locale: "pt-BR",
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    log("Abrindo login");
    await page.goto(SHIVER_SELECTORS.urls.login, {
      waitUntil: "domcontentloaded",
      timeout: timeoutMs(),
    });
    await waitForShiverApp(page);
    await dismissCookies(page);
    await waitForLoginForm(page);

    const fields = SHIVER_SELECTORS.fieldStrategies;

    const filledEmail = await fillIfPresent(page, fields.email, email, "email");
    if (!filledEmail) {
      throw Object.assign(
        new Error("Campo de e-mail não encontrado no login da Shiver."),
        { code: "VALIDATION_ERROR" },
      );
    }

    const filledPassword = await fillIfPresent(page, fields.password, password, "senha");
    if (!filledPassword) {
      throw Object.assign(
        new Error("Campo de senha não encontrado no login da Shiver."),
        { code: "VALIDATION_ERROR" },
      );
    }

    const startedAtUrl = page.url();

    if (dryRun) {
      log("Simulação: login preenchido, envio não executado");
      return result(
        "SIMULATED",
        "Simulação de login concluída. Nada foi enviado à Shiver.",
        { url: startedAtUrl, dryRun: true },
      );
    }

    await clickLoginSubmit(page);

    const outcome = await detectLoginOutcome(page, startedAtUrl);
    if (!outcome.success && outcome.status !== "INVALID_CREDENTIALS") {
      outcome.screenshot = await saveErrorScreenshot(page);
    }
    return outcome;
  } catch (error) {
    let screenshot;
    try {
      screenshot = await saveErrorScreenshot(page);
    } catch {
      screenshot = undefined;
    }

    if (error.name === "TimeoutError") {
      return result("TIMEOUT", "A Shiver demorou demais para responder.", { screenshot });
    }

    if (error.code === "VALIDATION_ERROR") {
      return result("VALIDATION_ERROR", error.message, { screenshot });
    }

    return result("AUTOMATION_ERROR", error.message, { screenshot });
  } finally {
    await context.close().catch(() => undefined);
    await browser.close().catch(() => undefined);
  }
}

module.exports = { loginShiverUser };
