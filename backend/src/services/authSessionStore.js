"use strict";

const TTL_MS = 10 * 60 * 1000;
const sessions = new Map();

function purgeExpired(now = Date.now()) {
  for (const [authId, session] of sessions.entries()) {
    if (session.expiresAt <= now) {
      sessions.delete(authId);
    }
  }
}

function createSession() {
  purgeExpired();
  const authId = crypto.randomUUID();
  const now = Date.now();
  const session = {
    authId,
    createdAt: now,
    expiresAt: now + TTL_MS,
    status: "pending",
    validatedAt: null,
  };
  sessions.set(authId, session);
  return session;
}

function getSession(authId) {
  purgeExpired();
  if (!authId || typeof authId !== "string") {
    return null;
  }
  const session = sessions.get(authId.trim());
  if (!session || session.expiresAt <= Date.now()) {
    if (session) {
      sessions.delete(authId.trim());
    }
    return null;
  }
  return session;
}

function completeSession(authId) {
  const session = getSession(authId);
  if (!session) {
    return null;
  }
  session.status = "validated";
  session.validatedAt = Date.now();
  sessions.delete(authId);
  return session;
}

module.exports = {
  createSession,
  getSession,
  completeSession,
};
