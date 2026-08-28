"use strict";

require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const { launchShiverBrowser, waitForShiverApp, waitForRegisterForm } = require("./launchShiverBrowser");
const { SHIVER_SELECTORS } = require("./shiverSelectors");

const SCREENSHOTS_DIR = path.resolve(__dirname, "../../../screenshots");

function redactInput(item) {
  if (String(item.type || "").toLowerCase() === "password") {
    return { ...item, value: "[redacted]" };
  }
  return item;
}

async function collectDom(page) {
  return page.evaluate(() => {
    function attrs(el) {
      return {
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute("type"),
        name: el.getAttribute("name"),
        id: el.id || null,
        placeholder: el.getAttribute("placeholder"),
        autocomplete: el.getAttribute("autocomplete"),
        ariaLabel: el.getAttribute("aria-label"),
        role: el.getAttribute("role"),
        text: (el.innerText || el.textContent || "").trim().slice(0, 80),
        href: el.getAttribute("href"),
      };
    }

    function walk(root) {
      const inputs = [];
      const buttons = [];
      const links = [];

      const scan = (node) => {
        if (!node.querySelectorAll) {
          return;
        }

        for (const el of node.querySelectorAll("input, textarea, select")) {
          inputs.push(attrs(el));
        }
        for (const el of node.querySelectorAll("button, [role='button']")) {
          buttons.push(attrs(el));
        }
        for (const el of node.querySelectorAll("a")) {
          links.push(attrs(el));
        }
        for (const el of node.querySelectorAll("*")) {
          if (el.shadowRoot) {
            scan(el.shadowRoot);
          }
        }
      };

      scan(root);
      return { inputs, buttons, links };
    }

    return {
      url: location.href,
      title: document.title,
      ...walk(document),
    };
  });
}

async function dumpFrame(label, pageOrFrame) {
  console.log(`\n======== ${label} ========`);
  console.log("URL:", pageOrFrame.url());

  const locInputs = await pageOrFrame.locator("input").evaluateAll((nodes) =>
    nodes.map((el) => ({
      type: el.getAttribute("type"),
      name: el.getAttribute("name"),
      id: el.id || null,
      placeholder: el.getAttribute("placeholder"),
      autocomplete: el.getAttribute("autocomplete"),
      ariaLabel: el.getAttribute("aria-label"),
    })),
  );

  const locButtons = await pageOrFrame.locator("button").evaluateAll((nodes) =>
    nodes.map((el) => ({
      type: el.getAttribute("type"),
      text: (el.innerText || "").trim().slice(0, 80),
      ariaLabel: el.getAttribute("aria-label"),
    })),
  );

  const locLinks = await pageOrFrame.locator("a").evaluateAll((nodes) =>
    nodes.map((el) => ({
      text: (el.innerText || "").trim().slice(0, 80),
      href: el.getAttribute("href"),
    })),
  );

  console.log("\n[locator input]");
  console.table(locInputs.map(redactInput));
  console.log("\n[locator button]");
  console.table(locButtons);
  console.log("\n[locator a]");
  console.table(locLinks);

  const deep = await collectDom(pageOrFrame);
  console.log("\n[incluindo shadow DOM] inputs:", deep.inputs.length);
  console.table(deep.inputs.map(redactInput));
  console.log("\n[incluindo shadow DOM] buttons:", deep.buttons.length);
  console.table(deep.buttons);
  console.log("\n[incluindo shadow DOM] links:", deep.links.length);
  console.table(deep.links);
}

async function inspectShiverPage() {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await launchShiverBrowser();
  const context = await browser.newContext({
    locale: "pt-BR",
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    console.log("[SHIVER] Abrindo login");
    await page.goto(SHIVER_SELECTORS.urls.login, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    await waitForShiverApp(page);

    const cookie = page.getByRole("button", { name: /entendi|aceitar|accept/i });
    if (await cookie.first().isVisible().catch(() => false)) {
      await cookie.first().click();
      await page.waitForTimeout(400);
    }

    const frames = page.frames().map((frame) => ({
      name: frame.name(),
      url: frame.url(),
    }));
    console.log("\n[page.frames()]");
    console.table(frames);

    await dumpFrame("LOGIN", page);

    for (const [index, frame] of page.frames().entries()) {
      if (frame === page.mainFrame()) {
        continue;
      }
      await dumpFrame(`IFRAME ${index} ${frame.url()}`, frame);
    }

    const loginShot = path.join(SCREENSHOTS_DIR, "shiver-login.png");
    await page.screenshot({ path: loginShot, fullPage: true });
    console.log("\n[SHIVER] Screenshot:", loginShot);

    console.log("[SHIVER] Procurando cadastro");
    const registerControl = page.getByRole("link", { name: /inscrever-se/i });

    if (await registerControl.first().isVisible().catch(() => false)) {
      console.log("[SHIVER] Abrindo formulário de cadastro");
      await registerControl.first().click();
      await page.waitForURL(/register/i, { timeout: 15000 }).catch(() => null);
      await page.waitForLoadState("domcontentloaded");
    }

    if (!/register/i.test(page.url())) {
      console.log("[SHIVER] Controle de cadastro não navegou; indo para /pt/register");
      await page.goto(SHIVER_SELECTORS.urls.register, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
    }

    await waitForShiverApp(page);
    await waitForRegisterForm(page);
    console.table(
      page.frames().map((frame) => ({
        name: frame.name(),
        url: frame.url(),
      })),
    );

    await dumpFrame("CADASTRO", page);

    const registerShot = path.join(SCREENSHOTS_DIR, "shiver-register.png");
    await page.screenshot({ path: registerShot, fullPage: true });
    console.log("\n[SHIVER] Screenshot:", registerShot);
    console.log("\n[SHIVER] URL final:", page.url());
  } finally {
    await context.close();
    await browser.close();
  }
}

inspectShiverPage().catch((error) => {
  console.error("[SHIVER] Falha no inspetor:", error.message);
  process.exitCode = 1;
});
