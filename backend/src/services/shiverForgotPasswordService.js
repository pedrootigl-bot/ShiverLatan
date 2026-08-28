"use strict";

const { forgotPasswordShiverUser } = require("../automation/shiver/forgotPasswordShiverUser");

async function forgotPasswordOnShiver(payload) {
  return forgotPasswordShiverUser(payload);
}

module.exports = { forgotPasswordOnShiver };
