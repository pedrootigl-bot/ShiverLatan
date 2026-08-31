"use strict";

const { Router } = require("express");
const { register } = require("../controllers/registerController");
const { login } = require("../controllers/loginController");
const { forgotPassword } = require("../controllers/forgotPasswordController");
const {
  startAuthSession,
  getAuthSessionStatus,
  completeAuthSession,
} = require("../controllers/authSessionController");

const registerRoutes = Router();

registerRoutes.post("/register", register);
registerRoutes.post("/login", login);
registerRoutes.post("/forgot-password", forgotPassword);
registerRoutes.post("/auth/start", startAuthSession);
registerRoutes.get("/auth/status", getAuthSessionStatus);
registerRoutes.post("/auth/complete", completeAuthSession);

module.exports = { registerRoutes };
