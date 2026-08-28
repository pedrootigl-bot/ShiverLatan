"use strict";

const { loginShiverUser } = require("../automation/shiver/loginShiverUser");

async function loginOnShiver(payload) {
  return loginShiverUser(payload);
}

module.exports = { loginOnShiver };
