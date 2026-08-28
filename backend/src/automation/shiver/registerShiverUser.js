"use strict";

require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const { launchShiverBrowser, waitForShiverApp, waitForRegisterForm } = require("./launchShiverBrowser");
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
    success: status === "CREATED" || status === "SIMULATED",
    status,
    message,
    ...extra,
  };
}

function splitName(fullName) {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: parts[0] };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

/** A Shiver ainda exige nome e telefone; o form do Site A só pede e-mail/senha. */
function defaultsForShiver(email) {
  const local = String(email).split("@")[0] || "usuario";
  const cleaned = local.replace(/[._+-]+/g, " ").replace(/\d+/g, " ").trim() || "Usuario";
  const phone = process.env.SHIVER_DEFAULT_PHONE || "11999999999";
  return { name: cleaned, phone };
}

function optionalText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

async function saveErrorScreenshot(page) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  const filePath = path.join(SCREENSHOTS_DIR, `shiver-error-${Date.now()}.png`);
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
  for (const name of strategy.names || []) {
    parts.push(page.locator(`input[name="${name}"]`));
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

async function openRegisterForm(page) {
  log("Procurando cadastro");
  const link = page.getByRole("link", { name: SHIVER_SELECTORS.openRegisterLink });

  if (await link.first().isVisible().catch(() => false)) {
    log("Abrindo formulário de cadastro");
    await link.first().click();
    await page.waitForURL(/register/i, { timeout: 15000 }).catch(() => null);
    await page.waitForLoadState("domcontentloaded");
  }

  if (!/register/i.test(page.url())) {
    log("Abrindo formulário de cadastro");
    await page.goto(SHIVER_SELECTORS.urls.register, {
      waitUntil: "domcontentloaded",
      timeout: timeoutMs(),
    });
  }
}

async function clickSubmit(page) {
  let submit = page.getByRole("button", { name: SHIVER_SELECTORS.submitNames[0] });
  for (const name of SHIVER_SELECTORS.submitNames) {
    submit = submit.or(page.getByRole("button", { name }));
  }
  submit = submit.or(page.locator("button[type='submit']"));

  const visible = await submit.first().isVisible({ timeout: 4000 }).catch(() => false);
  if (!visible) {
    throw Object.assign(new Error("Botão de envio do cadastro não foi encontrado no DOM."), {
      code: "VALIDATION_ERROR",
    });
  }

  log("Enviando formulário");
  await submit.first().click();
}

async function readVisibleText(page) {
  return page.locator("body").innerText().catch(() => "");
}

async function detectOutcome(page, startedAtUrl) {
  log("Validando resposta");
  const wait = Math.min(timeoutMs(), 25000);

  await Promise.race([
    page.waitForURL(SHIVER_SELECTORS.successUrlPattern, { timeout: wait }).catch(() => null),
    page.getByText(SHIVER_SELECTORS.alreadyExistsPattern).first().waitFor({ state: "visible", timeout: wait }).catch(() => null),
    page.getByText(SHIVER_SELECTORS.successPattern).first().waitFor({ state: "visible", timeout: wait }).catch(() => null),
    page.waitForTimeout(8000),
  ]);

  const url = page.url();
  const text = await readVisibleText(page);

  if (SHIVER_SELECTORS.alreadyExistsPattern.test(text)) {
    return result("ALREADY_EXISTS", "Usuário já possui conta na Shiver", { url });
  }

  if (SHIVER_SELECTORS.successUrlPattern.test(url) && url !== startedAtUrl) {
    log("Usuário criado");
    return result("CREATED", "Usuário criado na Shiver", { url });
  }

  if (SHIVER_SELECTORS.successPattern.test(text)) {
    log("Usuário criado");
    return result("CREATED", "Usuário criado na Shiver", { url });
  }

  if (url !== startedAtUrl && !/\/login(?:[/?#]|$)/i.test(url) && !/\/register(?:[/?#]|$)/i.test(url)) {
    log("Usuário criado");
    return result("CREATED", "Usuário criado na Shiver", { url });
  }

  if (SHIVER_SELECTORS.validationPattern.test(text) && /\/register/i.test(url)) {
    return result("VALIDATION_ERROR", "A Shiver recusou o formulário de cadastro.", { url });
  }

  return result("TIMEOUT", "Não foi possível confirmar o resultado do cadastro na Shiver.", { url });
}

async function registerShiverUser({
  email,
  password,
  dryRun = false,
  name,
  phone,
  firstName,
  lastName,
}) {
  const defaults = defaultsForShiver(email);
  const resolvedPhone = optionalText(phone) || defaults.phone;

  let resolvedFirst = optionalText(firstName);
  let resolvedLast = optionalText(lastName);
  if (!resolvedFirst || !resolvedLast) {
    const fromName = splitName(optionalText(name) || defaults.name);
    resolvedFirst = resolvedFirst || fromName.firstName;
    resolvedLast = resolvedLast || fromName.lastName;
  }

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
    await openRegisterForm(page);
    await waitForRegisterForm(page);
    await dismissCookies(page);

    const fields = SHIVER_SELECTORS.fieldStrategies;

    const filledFirst = await fillIfPresent(page, fields.firstName, resolvedFirst, "nome");
    const filledLast = await fillIfPresent(page, fields.lastName, resolvedLast, "sobrenome");

    if (!filledFirst || !filledLast) {
      throw Object.assign(
        new Error("Campos Nome/Sobrenome não encontrados no cadastro da Shiver."),
        { code: "VALIDATION_ERROR" },
      );
    }

    const filledEmail = await fillIfPresent(page, fields.email, email, "email");
    if (!filledEmail) {
      throw Object.assign(
        new Error("Campo de e-mail não encontrado no cadastro da Shiver."),
        { code: "VALIDATION_ERROR" },
      );
    }

    const filledPhone = await fillIfPresent(page, fields.phone, resolvedPhone, "telefone");
    if (!filledPhone) {
      throw Object.assign(
        new Error("Campo de telefone não encontrado no cadastro da Shiver."),
        { code: "VALIDATION_ERROR" },
      );
    }

    const filledPassword = await fillIfPresent(page, fields.password, password, "senha");
    if (!filledPassword) {
      throw Object.assign(
        new Error("Campo de senha não encontrado no cadastro da Shiver."),
        { code: "VALIDATION_ERROR" },
      );
    }

    const startedAtUrl = page.url();

    if (dryRun) {
      log("Simulação: formulário preenchido, envio não executado");
      return result(
        "SIMULATED",
        "Simulação concluída. Nenhum cadastro foi enviado à Shiver.",
        { url: startedAtUrl, dryRun: true },
      );
    }

    await clickSubmit(page);

    const outcome = await detectOutcome(page, startedAtUrl);
    if (!outcome.success && outcome.status !== "ALREADY_EXISTS") {
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

module.exports = { registerShiverUser };
