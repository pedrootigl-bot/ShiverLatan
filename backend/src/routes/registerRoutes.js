"use strict";

const { Router } = require("express");
const { register } = require("../controllers/registerController");
const { login } = require("../controllers/loginController");
const { forgotPassword } = require("../controllers/forgotPasswordController");

const registerRoutes = Router();

registerRoutes.post("/register", register);
registerRoutes.post("/login", login);
registerRoutes.post("/forgot-password", forgotPassword);

module.exports = { registerRoutes };
