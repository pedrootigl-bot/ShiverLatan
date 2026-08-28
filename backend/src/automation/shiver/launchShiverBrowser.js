"use strict";

require("dotenv").config();

const { chromium } = require("playwright");

function isHeadless() {
  return process.env.HEADLESS === "true";
}

function launchOptions() {
  return {
    headless: isHeadless(),
    slowMo: isHeadless() ? 0 : 150,
  };
}

async function launchShiverBrowser() {
  const options = launchOptions();
  const channel = process.env.PLAYWRIGHT_CHANNEL;

  if (channel) {
    return chromium.launch({ ...options, channel });
  }

  try {
    return await chromium.launch(options);
  } catch {
    console.log("[SHIVER] Chromium empacotado indisponível; usando Microsoft Edge.");
    return chromium.launch({ ...options, channel: "msedge" });
  }
}

async function waitForShiverApp(page) {
  await page.getByRole("heading", { name: /entrar|registrar/i }).waitFor({
    timeout: 20000,
  }).catch(async () => {
    await page.getByText(/entrar|registrar-se|inscrever-se/i).first().waitFor({
      timeout: 10000,
    });
  });
}

async function waitForRegisterForm(page) {
  await page
    .locator("input[name='first_name']")
    .or(page.getByPlaceholder(/^Nome$/))
    .first()
    .waitFor({ timeout: 20000 });
}

async function waitForLoginForm(page) {
  await page
    .locator("input[name='identifier']")
    .or(page.getByPlaceholder(/^E-mail$/i))
    .first()
    .waitFor({ timeout: 20000 });
}

async function waitForForgotPasswordForm(page) {
  await page
    .getByRole("heading", { name: /senha|recuperar|redefinir|esqueceu/i })
    .waitFor({ timeout: 20000 })
    .catch(async () => {
      await page.getByText(/esqueceu a senha|recuperar senha|redefinir senha/i).first().waitFor({
        timeout: 10000,
      });
    });

  await page
    .locator("input[name='identifier']")
    .or(page.locator("input[type='email']"))
    .or(page.getByPlaceholder(/^E-mail$/i))
    .first()
    .waitFor({ timeout: 20000 });
}

module.exports = {
  isHeadless,
  launchShiverBrowser,
  waitForShiverApp,
  waitForRegisterForm,
  waitForLoginForm,
  waitForForgotPasswordForm,
};
