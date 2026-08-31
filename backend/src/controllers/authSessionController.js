"use strict";

const {
  createSession,
  getSession,
  completeSession,
} = require("../services/authSessionStore");

function startAuthSession(_req, res) {
  const session = createSession();
  res.json({
    success: true,
    authId: session.authId,
    expiresAt: session.expiresAt,
  });
}

function getAuthSessionStatus(req, res) {
  const authId = String(req.query.authId || "").trim();
  const session = getSession(authId);

  if (!session) {
    return res.status(404).json({
      success: false,
      status: "NOT_FOUND",
      message: "Sessão de autenticação expirada ou inexistente.",
    });
  }

  res.json({
    success: true,
    authId: session.authId,
    status: session.status,
    expiresAt: session.expiresAt,
  });
}

function completeAuthSession(req, res) {
  const authId = String(req.body?.authId || "").trim();

  if (!authId) {
    return res.status(400).json({
      success: false,
      status: "VALIDATION_ERROR",
      message: "authId é obrigatório.",
    });
  }

  const session = completeSession(authId);
  if (!session) {
    return res.status(404).json({
      success: false,
      status: "NOT_FOUND",
      message: "Sessão de autenticação expirada ou inexistente.",
    });
  }

  res.json({
    success: true,
    status: "VALIDATED",
    message: "Login validado pelo backend.",
    validatedAt: session.validatedAt,
    salaUrl: process.env.SALA_URL || "http://localhost:3000/sala",
  });
}

module.exports = {
  startAuthSession,
  getAuthSessionStatus,
  completeAuthSession,
};
