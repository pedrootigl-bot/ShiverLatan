"use strict";

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const file = path.join(os.tmpdir(), "shiver-main.js");
const s = fs.readFileSync(file, "utf8");

for (const needle of ["testAuth", "doLogin", "login:", "LOGIN", "ssid", "authenticate"]) {
  let i = 0;
  let c = 0;
  while ((i = s.indexOf(needle, i)) !== -1 && c < 3) {
    console.log("\n---", needle, "---");
    console.log(s.slice(Math.max(0, i - 80), i + 200).replace(/\s+/g, " "));
    i += needle.length;
    c += 1;
  }
}
