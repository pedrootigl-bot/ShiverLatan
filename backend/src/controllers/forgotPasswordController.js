"use strict";

const { forgotPasswordOnShiver } = require("../services/shiverForgotPasswordService");

function asString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateBody(body) {
  const email = asString(body?.email);

  if (!email) {
    return { ok: false, message: "Campo obrigatório: email." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "E-mail inválido." };
  }

  const dryRun = body?.dryRun === true || body?.dryRun === "true";

  return {
    ok: true,
    data: { email, dryRun },
  };
}

function httpStatusFor(shiverStatus) {
  switch (shiverStatus) {
    case "RESET_EMAIL_SENT":
      return 200;
    case "SIMULATED":
      return 200;
    case "NOT_FOUND":
    case "VALIDATION_ERROR":
      return 400;
    case "TIMEOUT":
    case "AUTOMATION_ERROR":
      return 500;
    default:
      return 500;
  }
}

async function forgotPassword(req, res, next) {
  try {
    const dryRunQuery = req.query?.dryRun === "true" || req.query?.dryRun === "1";
    const parsed = validateBody(req.body);
    if (!parsed.ok) {
      return res.status(400).json({
        success: false,
        status: "VALIDATION_ERROR",
        message: parsed.message,
      });
    }

    if (dryRunQuery) {
      parsed.data.dryRun = true;
    }

    const shiver = await forgotPasswordOnShiver(parsed.data);
    const statusCode = httpStatusFor(shiver.status);

    if (shiver.success) {
      return res.status(statusCode).json({
        success: true,
        shiver: {
          status: shiver.status,
          url: shiver.url,
          message: shiver.message,
          dryRun: shiver.dryRun === true,
        },
      });
    }

    return res.status(statusCode).json({
      success: false,
      shiver: {
        status: shiver.status,
        url: shiver.url,
        message: shiver.message,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { forgotPassword };
