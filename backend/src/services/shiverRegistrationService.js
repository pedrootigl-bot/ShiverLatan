"use strict";

const { registerShiverUser } = require("../automation/shiver/registerShiverUser");

async function registerOnShiver(payload) {
  return registerShiverUser(payload);
}

module.exports = { registerOnShiver };
