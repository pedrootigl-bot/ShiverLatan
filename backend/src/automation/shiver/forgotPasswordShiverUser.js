"use strict";

require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const {
  launchShiverBrowser,
  waitForForgotPasswordForm,
} = require("./launchShiverBrowser");
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
    success: status === "RESET_EMAIL_SENT" || status === "SIMULATED",
    status,
    message,
    ...extra,
  };
}

async function saveErrorScreenshot(page) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  const filePath = path.join(SCREENSHOTS_DIR, `shiver-forgot-error-${Date.now()}.png`);
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

function emailLocator(page) {
  const fields = SHIVER_SELECTORS.fieldStrategies.email;
  const parts = [];
  for (const fieldName of fields.names || []) {
    parts.push(page.locator(`input[name="${fieldName}"]`));
  }
  for (const placeholder of fields.placeholders || []) {
    parts.push(page.getByPlaceholder(placeholder));
  }
  parts.push(page.locator("input[type='email']"));
  return parts.reduce((acc, current) => acc.or(current)).first();
}

async function openForgotPasswordForm(page) {
  log("Abrindo recuperação de senha");
  await page.goto(SHIVER_SELECTORS.urls.changePassword, {
    waitUntil: "domcontentloaded",
    timeout: timeoutMs(),
  });
  await waitForForgotPasswordForm(page);
}

async function clickForgotSubmit(page) {
  let submit = page.getByRole("button", { name: SHIVER_SELECTORS.forgotPasswordSubmitNames[0] });
  for (const name of SHIVER_SELECTORS.forgotPasswordSubmitNames) {
    submit = submit.or(page.getByRole("button", { name }));
  }
  submit = submit.or(page.locator("button[type='submit']"));

  const visible = await submit.first().isVisible({ timeout: 4000 }).catch(() => false);
  if (!visible) {
    throw Object.assign(
      new Error("Botão de recuperação de senha não foi encontrado na Shiver."),
      { code: "VALIDATION_ERROR" },
    );
  }

  log("Enviando recuperação de senha");
  await submit.first().click();
}

async function readVisibleText(page) {
  return page.locator("body").innerText().catch(() => "");
}

async function detectForgotOutcome(page, startedAtUrl) {
  log("Validando resposta da recuperação de senha");
  const wait = Math.min(timeoutMs(), 25000);

  await Promise.race([
    page
      .getByText(SHIVER_SELECTORS.forgotPasswordSuccessPattern)
      .first()
      .waitFor({ state: "visible", timeout: wait })
      .catch(() => null),
    page
      .getByText(SHIVER_SELECTORS.forgotPasswordNotFoundPattern)
      .first()
      .waitFor({ state: "visible", timeout: wait })
      .catch(() => null),
    page.waitForTimeout(8000),
  ]);

  const url = page.url();
  const text = await readVisibleText(page);

  if (SHIVER_SELECTORS.forgotPasswordNotFoundPattern.test(text)) {
    return result("NOT_FOUND", "E-mail não encontrado na Shiver.", { url });
  }

  if (SHIVER_SELECTORS.forgotPasswordSuccessPattern.test(text)) {
    log("E-mail de recuperação solicitado");
    return result(
      "RESET_EMAIL_SENT",
      "Instruções de recuperação enviadas. Verifique seu e-mail.",
      { url },
    );
  }

  if (url !== startedAtUrl && !/change-password/i.test(url)) {
    return result(
      "RESET_EMAIL_SENT",
      "Solicitação de recuperação enviada. Verifique seu e-mail.",
      { url },
    );
  }

  if (SHIVER_SELECTORS.validationPattern.test(text)) {
    return result("VALIDATION_ERROR", "A Shiver recusou o formulário de recuperação.", { url });
  }

  return result(
    "TIMEOUT",
    "Não foi possível confirmar o envio da recuperação de senha na Shiver.",
    { url },
  );
}

async function forgotPasswordShiverUser({ email, dryRun = false }) {
  const browser = await launchShiverBrowser();
  const context = await browser.newContext({
    locale: "pt-BR",
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    await openForgotPasswordForm(page);
    await dismissCookies(page);

    const emailField = emailLocator(page);
    const visible = await emailField.isVisible({ timeout: 4000 }).catch(() => false);
    if (!visible) {
      throw Object.assign(
        new Error("Campo de e-mail não encontrado na recuperação de senha da Shiver."),
        { code: "VALIDATION_ERROR" },
      );
    }

    log("Preenchendo email");
    await emailField.fill(email);

    const startedAtUrl = page.url();

    if (dryRun) {
      log("Simulação: recuperação preenchida, envio não executado");
      return result(
        "SIMULATED",
        "Simulação de recuperação concluída. Nada foi enviado à Shiver.",
        { url: startedAtUrl, dryRun: true },
      );
    }

    await clickForgotSubmit(page);

    const outcome = await detectForgotOutcome(page, startedAtUrl);
    if (!outcome.success && outcome.status !== "NOT_FOUND") {
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

module.exports = { forgotPasswordShiverUser };
