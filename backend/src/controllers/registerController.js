"use strict";

const { registerOnShiver } = require("../services/shiverRegistrationService");

function asString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePhone(value) {
  return asString(value).replace(/\D/g, "");
}

function validateBody(body) {
  const firstName = asString(body?.firstName);
  const lastName = asString(body?.lastName);
  const email = asString(body?.email);
  const password = typeof body?.password === "string" ? body.password : "";
  const phone = normalizePhone(body?.phone);

  const missing = [];
  if (!firstName) missing.push("firstName");
  if (!lastName) missing.push("lastName");
  if (!email) missing.push("email");
  if (!password) missing.push("password");
  if (!phone) missing.push("phone");

  if (missing.length > 0) {
    return {
      ok: false,
      message: `Campos obrigatórios: ${missing.join(", ")}.`,
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "E-mail inválido." };
  }

  if (phone.length < 10 || phone.length > 15) {
    return { ok: false, message: "Número de telefone inválido." };
  }

  const dryRun = body?.dryRun === true || body?.dryRun === "true";

  return {
    ok: true,
    data: { firstName, lastName, email, password, phone, dryRun },
  };
}

function httpStatusFor(shiverStatus) {
  switch (shiverStatus) {
    case "CREATED":
      return 201;
    case "SIMULATED":
      return 200;
    case "VALIDATION_ERROR":
    case "ALREADY_EXISTS":
      return 400;
    case "TIMEOUT":
    case "AUTOMATION_ERROR":
      return 500;
    default:
      return 500;
  }
}

async function register(req, res, next) {
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

    const shiver = await registerOnShiver(parsed.data);
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

module.exports = { register };
